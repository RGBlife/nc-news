import { useState } from "react";
import { patchArticleById } from "../apis/api";

const Voting = ({votes, article_id}) => {
  const [adjustVote, setAdjustVote] = useState(0);
  const [VoteColour, setVoteColour] = useState("#83878c");

  const handleVotes = (value) => {
    const newVote = adjustVote + value;
    setAdjustVote(newVote);

    setVoteColour(() => {
      if (newVote === 1) {
        return "#D83367";
      } else if (newVote === -1) {
        return "#9494FF";
      } else {
        return "#83878c";
      }
    });

    patchArticleById(value, article_id).catch(() => {
      setAdjustVote(0);
      setVoteColour("#83878c");
    });
  };



  return (
    <div className="m-2 p-1 w-auto font-semibold align-center flex flex-row justify-center border-solid border-2 border-[#d5dbe0] rounded-2xl">
      <button
        disabled={adjustVote === 1}
        onClick={() => {
          handleVotes(1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="2"
            stroke={adjustVote === 1 ? "#D83367" : "#9ea3a8"}
            fill={adjustVote === 1 ? "#D83367" : "none"}
            d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"
          />
        </svg>
      </button>
      <span style={{ color: VoteColour }} className={`m-2 text-14 text-center`}>
        {votes + adjustVote}
      </span>
      <button
        disabled={adjustVote === -1}
        onClick={() => {
          handleVotes(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="2"
            stroke={adjustVote === -1 ? "#9494FF" : "#9ea3a8"}
            fill={adjustVote === -1 ? "#9494FF" : "none"}
            d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Voting;
