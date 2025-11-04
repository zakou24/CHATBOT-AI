import React from 'react';

interface IconProps {
    className?: string;
}

const SearchIcon: React.FC<IconProps> = ({ className = "w-3 h-3 mr-1.5 text-gray-500" }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const ExternalLinkIcon: React.FC<IconProps> = ({ className = "w-3.5 h-3.5 text-gray-500 group-hover:text-gray-700" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-4.5L21 3m0 0l-7.5 7.5M21 3h-5.25A2.25 2.25 0 0013.5 5.25V10.5"
        />
    </svg>
);

const PremiumTypingAnimation: React.FC = () => (
    <div className="flex items-center">
        <div className="flex items-center space-x-1.5">
            {[0, 300, 600].map((delay, i) => (
                <div
                    key={i}
                    className="w-1.5 h-1.5 bg-gray-400/70 rounded-full animate-pulse"
                    style={{ animationDuration: '1s', animationDelay: `${delay}ms` }}
                ></div>
            ))}
        </div>
    </div>
);

interface SearchInfo {
    stages: string[];
    query?: string;
    urls?: string[] | string;
    error?: string;
}

interface SearchStagesProps {
    searchInfo: SearchInfo;
}

const SearchStages: React.FC<SearchStagesProps> = ({ searchInfo }) => {
    if (!searchInfo?.stages?.length) return null;

    return (
        <div className="mb-3 mt-1 relative pl-4">
            <div className="flex flex-col space-y-4 text-sm text-gray-700">

                {/* Searching Stage */}
                {searchInfo.stages.includes('searching') && (
                    <div className="relative">
                        <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-[#7799b9] rounded-full shadow-sm"></div>

                        {searchInfo.stages.includes('reading') && (
                            <div className="absolute -left-[7px] top-3 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-[#a6bcd3] to-[#d0dbe7]"></div>
                        )}

                        <div className="flex flex-col">
                            <span className="font-medium mb-2 ml-2">Searching the web</span>
                            <div className="flex flex-wrap gap-2 pl-2 mt-1">
                                <div className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 inline-flex items-center">
                                    <SearchIcon />
                                    {searchInfo.query}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reading Stage */}
                {searchInfo.stages.includes('reading') && (
                    <div className="relative">
                        <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-[#7799b9] rounded-full shadow-sm"></div>

                        <div className="flex flex-col">
                            <span className="font-medium mb-2 ml-2">Reading</span>

                            {searchInfo.urls && (
                                <div className="pl-2 mt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {Array.isArray(searchInfo.urls)
                                        ? searchInfo.urls.map((url: string, index: number) => {
                                            const displayText = url.replace(/^https?:\/\//, '').slice(0, 50);
                                            return (
                                                <a
                                                    key={index}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 truncate transition-all duration-200 hover:bg-[#f3f4f6] hover:border-gray-300 flex items-center space-x-1 group"
                                                >
                                                    <ExternalLinkIcon />
                                                    <span className="truncate">{displayText}</span>
                                                </a>
                                            );
                                        })
                                        : (
                                            <a
                                                href={searchInfo.urls}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-gray-100 text-xs px-3 py-1.5 rounded border border-gray-200 truncate transition-all duration-200 hover:bg-[#f3f4f6] hover:border-gray-300 flex items-center space-x-1 group"
                                            >
                                                <ExternalLinkIcon />
                                                <span className="truncate">
                                                    {searchInfo.urls.substring(0, 50)}
                                                </span>
                                            </a>
                                        )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Writing Stage */}
                {searchInfo.stages.includes('writing') && (
                    <div className="relative">
                        <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-[#7799b9] rounded-full shadow-sm"></div>
                        <span className="font-medium pl-2">Writing answer</span>
                    </div>
                )}

                {/* Error Message */}
                {searchInfo.stages.includes('error') && (
                    <div className="relative">
                        <div className="absolute -left-3 top-1 w-2.5 h-2.5 bg-red-400 rounded-full shadow-sm"></div>
                        <span className="font-medium">Search error</span>
                        <div className="pl-4 text-xs text-red-500 mt-1">
                            {searchInfo.error || 'An error occurred during search.'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

interface Message {
    id: string;
    isUser: boolean;
    isLoading?: boolean;
    content?: string;
    searchInfo?: SearchInfo;
}

interface MessageAreaProps {
    messages: Message[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages }) => (
    <div className="grow overflow-y-auto bg-[#FAFAFA] border-b border-gray-100" style={{ minHeight: 0 }}>
        <div className="max-w-4xl mx-auto p-6">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-5`}
                >
                    <div className="flex flex-col">
                        {!message.isUser && message.searchInfo && <SearchStages searchInfo={message.searchInfo} />}

                        <div
                            className={`rounded-lg py-3 px-5 ${message.isUser
                                ? 'bg-gradient-to-br from-[#7799b9] to-[#426287] text-white rounded-br-none shadow-md'
                                : 'bg-[#eaeef4] text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                                }`}
                        >
                            {message.isLoading ? (
                                <PremiumTypingAnimation />
                            ) : (
                                message.content || (
                                    <span className="text-gray-400 text-xs italic">
                                        Waiting for response...
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default MessageArea;
