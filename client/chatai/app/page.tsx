"use client"
import Header from '@/components/Header';
import InputBar from '@/components/InputBar';
import MessageArea from '@/components/MessageArea';
import React, { useState } from 'react';

interface SearchInfo {
  stages: string[];
  query: string;
  urls: string[];
  error?: string;
}

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  type: string;
  isLoading?: boolean;
  searchInfo?: SearchInfo;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: 'Hi there, how can I help you?',
      isUser: false,
      type: 'message'
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [checkpointId, setCheckpointId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const newMessageId = messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1;
    setMessages(prev => [
      ...prev,
      {
        id: newMessageId,
        content: currentMessage,
        isUser: true,
        type: 'message'
      }
    ]);

    const userInput = currentMessage;
    setCurrentMessage("");

    try {
      // Create AI response placeholder
      const aiResponseId = newMessageId + 1;
      setMessages(prev => [
        ...prev,
        {
          id: aiResponseId,
          content: "",
          isUser: false,
          type: 'message',
          isLoading: true,
          searchInfo: {
            stages: [],
            query: "",
            urls: []
          }
        }
      ]);

      // Create URL with checkpoint ID if it exists
      let url = `http://127.0.0.1:8000/chat_stream/${encodeURIComponent(userInput)}`;
      if (checkpointId) {
        url += `?checkpoint_id=${encodeURIComponent(checkpointId)}`;
      }

      // Connect to SSE endpoint
      const eventSource = new EventSource(url);
      let streamedContent = "";
      let searchData: SearchInfo | null = null;

      // Process incoming messages
      eventSource.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data) as {
            type: string;
            checkpoint_id?: string;
            content?: string;
            query?: string;
            urls?: string | string[];
            error?: string;
          };

          if (data.type === 'checkpoint' && data.checkpoint_id) {
            setCheckpointId(data.checkpoint_id);
          }
          else if (data.type === 'content' && data.content !== undefined) {
            streamedContent += data.content;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === aiResponseId
                  ? { ...msg, content: streamedContent, isLoading: false }
                  : msg
              )
            );
          }
          else if (data.type === 'search_start' && data.query) {
            const newSearchInfo: SearchInfo = {
              stages: ['searching'],
              query: data.query,
              urls: []
            };
            searchData = newSearchInfo;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === aiResponseId
                  ? { ...msg, content: streamedContent, searchInfo: newSearchInfo, isLoading: false }
                  : msg
              )
            );
          }
          else if (data.type === 'search_results' && data.urls) {
            try {
              const urls = typeof data.urls === 'string' ? JSON.parse(data.urls) : data.urls;
              if (Array.isArray(urls)) {
                const newSearchInfo: SearchInfo = {
                  stages: searchData ? [...searchData.stages, 'reading'] : ['reading'],
                  query: searchData?.query || "",
                  urls: urls
                };
                searchData = newSearchInfo;
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === aiResponseId
                      ? { ...msg, content: streamedContent, searchInfo: newSearchInfo, isLoading: false }
                      : msg
                  )
                );
              }
            } catch (err) {
              console.error("Error parsing search results:", err);
            }
          }
          else if (data.type === 'search_error' && data.error) {
            const newSearchInfo: SearchInfo = {
              stages: searchData ? [...searchData.stages, 'error'] : ['error'],
              query: searchData?.query || "",
              error: data.error,
              urls: []
            };
            searchData = newSearchInfo;
            setMessages(prev =>
              prev.map(msg =>
                msg.id === aiResponseId
                  ? { ...msg, content: streamedContent, searchInfo: newSearchInfo, isLoading: false }
                  : msg
              )
            );
          }
          else if (data.type === 'end') {
            if (searchData) {
              const finalSearchInfo: SearchInfo = {
                ...searchData,
                stages: [...searchData.stages, 'writing']
              };
              setMessages(prev =>
                prev.map(msg =>
                  msg.id === aiResponseId
                    ? { ...msg, searchInfo: finalSearchInfo, isLoading: false }
                    : msg
                )
              );
            }
            eventSource.close();
          }
        } catch (error) {
          console.error("Error parsing event data:", error);
        }
      };

      // Handle errors
      eventSource.onerror = (error: Event) => {
        console.error("EventSource error:", error);
        eventSource.close();
        if (!streamedContent) {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === aiResponseId
                ? { ...msg, content: "Sorry, there was an error processing your request.", isLoading: false }
                : msg
            )
          );
        }
      };

      // Listen for end event
      eventSource.addEventListener('end', () => {
        eventSource.close();
      });

    } catch (error) {
      console.error("Error setting up EventSource:", error);
      setMessages(prev => [
        ...prev,
        {
          id: newMessageId + 1,
          content: "Sorry, there was an error connecting to the server.",
          isUser: false,
          type: 'message',
          isLoading: false
        }
      ]);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen py-8 px-4">
      {/* 800 */}
      <div className="w-[70%] bg-white flex flex-col rounded-xl shadow-lg border border-gray-100 overflow-hidden h-[90vh]">
        <Header />
        <MessageArea messages={messages} />
        <InputBar
          currentMessage={currentMessage}
          setCurrentMessage={setCurrentMessage}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Home;
