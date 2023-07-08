import React, { useEffect, useState } from "react";
import PromptBox from "ui/molecules/PromptBox";
import ResultWithSources from "ui/molecules/ResultWithSources";
import { trpc } from "utils/trpc";

const ChatBox = () => {
  // Managing prompt, messages, and error states with useState
  const [prompt, setPrompt] = useState("Who benefits from this bill?");
  const [history, setHistory] = useState<string[]>([]);
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm LegisGPT. Pick a bill and we'll discuss it.",
      type: "bot",
      sourceDocuments: [],
    },
  ]);
  const [error, setError] = useState("");
  const [enabled, setEnabled] = useState(false);
  const {
    data,
    error: errorFromTRPC,
    isError,
    isLoading,
    isSuccess,
  } = trpc.openai.prompt.useQuery(
    { question: prompt, namespace: "118-HR-3941", history },
    { enabled },
  );
  // This function updates the prompt value when the user types in the prompt box
  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  // This function handles the submission of the user's prompt when the user hits 'Enter' or 'Submit'
  // It sends a POST request to the provided endpoint with the current prompt in the request body
  const handleSubmitPrompt = async () => {
    if (!prompt) return; // If the prompt is empty, return early (do nothing)
    try {
      // refetch from trpc with prompt
      setEnabled(true);

      setPrompt("");

      // Push the user's message into the messages array
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: [] },
      ]);

      setHistory((prevHistory) => [...prevHistory, prompt]);

      // Throw an error if the HTTP status is not OK
      if (isError) {
        throw new Error(`HTTP error! status: ${errorFromTRPC}`);
      }

      setError(""); // Clear any existing error messages
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: data.result?.text,
          type: "bot",
          sourceDocuments: data.result?.sourceDocuments,
        },
      ]);
      setEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="h-screen">
      <ResultWithSources messages={messages} isLoading={enabled && isLoading} />
      <PromptBox
        prompt={prompt}
        handlePromptChange={handlePromptChange}
        handleSubmit={() => handleSubmitPrompt()}
        // handleSubmit={() => handleSubmitQuery("/pdfquery-agent")}
        placeHolderText={"Who benefits from this bill?"}
        error={error}
      />
    </div>
  );
};

export default ChatBox;
