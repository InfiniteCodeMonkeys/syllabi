import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import userImage from "../../assets/user.svg";
import botImage from "../../assets/bot.svg";
import { useUser } from "@clerk/nextjs";

const MessageItem = ({
  message,
  isLast,
  showSources,
  setShowSources,
}: {
  message: {
    type: string;
    text: string;
    sourceDocuments?: {
      pageContent: string;
      metadata: any;
      docIndex: number;
    }[];
  };
  isLast?: boolean;
  showSources: boolean;
  setShowSources: (showSources: boolean) => void;
}) => {
  const { isSignedIn, user } = useUser();
  const avatar = isSignedIn ? user?.profileImageUrl : userImage;

  return (
    <div className={`flex flex-col ${isLast ? "flex-grow" : ""}  `}>
      <div
        className={`mb-4 flex ${
          message.type === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div className={`relative mr-4 h-10 w-10 overflow-hidden `}>
          <Image
            src={message.type === "user" ? avatar : botImage}
            alt={`${message.type}'s profile`}
            width={32}
            height={32}
            className="rounded"
            priority
            unoptimized
          />
        </div>
        <p className="mt-2" style={{ maxWidth: "90%" }}>
          {message.text}
        </p>
      </div>

      {message.sourceDocuments?.length !== 0 && (
        <div className="mb-6">
          <button
            className="text-sm font-bold text-gray-600"
            onClick={() => setShowSources(!showSources)}
          >
            Source Documents {showSources ? "(Hide)" : "(Show)"}
          </button>
          {showSources &&
            message.sourceDocuments?.map((document, docIndex) => (
              <div key={docIndex}>
                <h3 className="text-sm font-bold text-gray-600">
                  Source {docIndex + 1}:
                </h3>
                <p className="mt-2 text-sm text-gray-800">
                  {document.pageContent}
                </p>
                <pre className="mt-2 text-xs text-gray-500">
                  {JSON.stringify(document.metadata, null, 2)}
                </pre>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const ResultWithSources = ({
  messages,
  maxMsgs,
  isLoading,
}: {
  messages: {
    type: string;
    text: string;
    sourceDocuments: {
      pageContent: string;
      metadata: any;
      docIndex: number;
    }[];
  }[];
  maxMsgs?: number;
  isLoading?: boolean;
}) => {
  const [showSources, setShowSources] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      const element = messagesContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [messages, showSources]);

  // E.g. Before we reach the max messages, we should add the justify-end property, which pushes messages to the bottom
  const maxMsgToScroll = maxMsgs || 5;

  return (
    <div
      ref={messagesContainerRef}
      className={`mb-8 flex h-[80%] max-h-[80%] flex-col space-y-4 overflow-y-auto rounded-lg bg-white p-10 shadow-lg ${
        messages.length < maxMsgToScroll && !showSources && "justify-end"
      }`}
    >
      {messages
        ? messages.map((message, index) => (
            <MessageItem
              key={index}
              message={message}
              showSources={showSources}
              setShowSources={setShowSources}
            />
          ))
        : null}
      {isLoading && (
        <div className={`flex  flex-col  `}>
          <div className="mb-4 flex  justify-start">
            <div className={`relative mr-4 h-10 w-10 overflow-hidden `}>
              <Image
                src={botImage}
                alt="loading"
                width={32}
                height={32}
                className="rounded"
                priority
                unoptimized
              />
            </div>
            <div className="mt-4 flex justify-center">
              <div className="dot-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultWithSources;
