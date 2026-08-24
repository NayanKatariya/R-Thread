import React, { useState } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { RxCopy } from 'react-icons/rx';

export const ChatMessage = ({ isUser, message, lastMessage }) => {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(message).then(() => {
            setCopiedId(message);
            setTimeout(() => setCopiedId(null), 1500); // Reset after 1.5 sec
        });
    };
    if (isUser) {
        return (
            <div className={`${lastMessage ? 'mb-7' : ''} flex flex-col justify-center items-end self-end px-1 py-1.5 max-w-full text-xs font-light bg-white bg-opacity-0 text-foreground  max-md:mr-2`}>
                <p className="px-3.5 text-sm py-3 rounded-xl bg-zinc-100">
                    {message}
                </p>
            </div>
        );
    }

    const formatMessage = (message) => {
        const paragraphs = message.split('\n\n');

        return paragraphs.map((paragraph, index) => {
            const lines = paragraph.split('\n');

            return (
                <React.Fragment key={index}>
                    {lines.map((line, lineIndex) => (
                        <p key={lineIndex}>{line}</p> 
                    ))}

                    {index < paragraphs.length - 1 && <p>&nbsp;</p>}
                </React.Fragment>
            );
        });
    };
    return (
        <div className={`${lastMessage ? 'mb-7' : ''}  flex flex-col pr-8 pl-2 mt-20 w-full max-md:pr-5 max-md:mt-10 max-md:max-w-full`}>
            <p className="text-sm leading-5 text-foreground max-md:max-w-full" >
                {formatMessage(message)}
            </p>
            <div className="flex gap-3 self-start mt-5">
                {!copiedId ? <div className="flex gap-2.5 rotate-90" onClick={() => handleCopy()}>
                    <RxCopy color='#5d5d5d' />
                </div> : <IoCheckmarkOutline color='#5d5d5d' />}
            </div>
        </div>
    );
};
