import { useState } from "react";
import { patchArticleById } from "../apis/api";

const Voting = ({ article: { votes, article_id } }) => {
  const [adjustVote, setAdjustVote] = useState(0);

  const handleVotes = async (value) => {
    setAdjustVote((adjustVote) => {
      return adjustVote + value;
    });
    try {
      const response = await patchArticleById(value, article_id);
    } catch (error) {
      setAdjustVote(0);
    }
  };

  return (
    <>
      <button
        disabled={adjustVote === 1}
        onClick={() => {
          handleVotes(1);
        }}
      >
        ⬆️
      </button>
      <p>Votes</p>
      <p>{votes + adjustVote}</p>
      <button
        disabled={adjustVote === -1}
        onClick={() => {
          handleVotes(-1);
        }}
      >
        ⬇️
      </button>
    </>
  );
};

export default Voting;
