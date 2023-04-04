import { PlayPauseIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useMemo } from "react";
import { useAudioPlayer } from "../../atoms/AudioProvider";
import { FormattedDate } from "../../atoms/FormattedDate";

const EpisodeEntry = ({ episode, key }) => {
  const audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode]
  );
  const player = useAudioPlayer(audioPlayerData);

  const handleListen = () => {
    console.log("Listening");
  };
  const handleTranscribe = () => {
    console.log("Transcribe");
  };
  const handleDiscuss = () => {
    console.log("Discussing");
  };

  return (
    <article key={key} className="mb-12">
      <FormattedDate
        date={new Date(episode.pub_date_ms)}
        className="order-first font-mono text-sm leading-7 text-slate-400"
      />
      <h2 className="text-xl text-slate-300">{episode.title}</h2>
      <div
        className="mt-2 text-justify text-base leading-7 text-slate-300 line-clamp-2 lg:max-w-4xl"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
      <div>
        <button
          className="mt-2 mr-4 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={handleListen}
        >
          Listen
        </button>
        <button
          className="mt-2 mr-4 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={handleTranscribe}
        >
          Read Transcript
        </button>
        <button
          className="mt-2 mr-4 hidden bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-sm font-bold leading-6 text-transparent hover:text-pink-700 active:text-pink-900 lg:inline-block"
          onClick={handleDiscuss}
        >
          Discuss with GPT
        </button>
      </div>
    </article>
  );
};

export default EpisodeEntry;
