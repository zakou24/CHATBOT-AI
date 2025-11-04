import { useState } from "react";

interface InputBarProps {
    currentMessage: string;
    setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InputBar: React.FC<InputBarProps> = ({
    currentMessage,
    setCurrentMessage,
    onSubmit,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(e.target.value);
    };

    return (
        <form onSubmit={onSubmit} className="p-4 bg-white">
            <div className="flex items-center bg-[#F9F9F5] rounded-full p-3 border border-gray-200">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={currentMessage}
                    onChange={handleChange}
                    className="grow px-4 py-2 bg-transparent focus:outline-none text-gray-700"
                />
                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#557ca2] to-[#7799b9] hover:from-[#426287] hover:to-[#557ca2] rounded-full p-3 ml-2 shadow-md transition-all duration-200 group"
                >
                    <svg
                        className="w-6 h-6 text-white transform rotate-45 group-hover:scale-110 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default InputBar;
