import React from 'react';
import { GrMicrophone } from 'react-icons/gr';
import { IoArrowUp } from 'react-icons/io5';
import { PiWaveformBold } from 'react-icons/pi';
import { RiLoader4Fill } from 'react-icons/ri';

export const ChatInput = ({ message, setMessage, handleSubmit, loading, selectedProduct }) => {
    return (
        <div className="sticky bottom-2 z-50  px-1.5 py-2  w-full">
            <div className="flex flex-col justify-center px-1 py-px">
                <div className="flex flex-col pt-5 pr-1.5 pb-2 pl-3.5 w-full bg-white rounded-3xl border border-solid border-input">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder=" Ask a question about your order or product..."
                            value={message}
                            disabled={loading}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-3 text-sm placeholder:text-placeholder border-none focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-end gap-1 mt-3.5">
                        <div className="rounded-full p-2">
                            <GrMicrophone size={20} />
                        </div>
                        <button
                            className="bg-black rounded-full w-9 p-2 flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
                            onClick={handleSubmit}
                            disabled={!message.trim() || loading || !selectedProduct}
                        >
                            {loading ?
                                <RiLoader4Fill className="animate-spin text-white" size={18} /> : message.trim() ? (
                                    <IoArrowUp color="white" size={18} />
                                ) : (
                                    <PiWaveformBold color="white" size={18} />
                                )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

