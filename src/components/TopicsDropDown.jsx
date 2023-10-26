import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getTopics } from "../apis/api";
import { capitaliseFirstLetter } from "../utils/utils";

const TopicsDropDown = () => {
  const [topicOptions, setTopicOptions] = useState([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchTopics = async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      try {
        const topics = await getTopics();
        setTopicOptions(() => {
          return topics.map((topic) => {
            return topic.slug;
          });
        });
      } catch (error) {
      }
    };
    fetchTopics();
  }, []);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedTopic = event.target.value;
    if (selectedTopic === "All Topics") {
      navigate("/");
    } else {
      navigate(`/articles?topic=${selectedTopic}`);
    }
  };

  return (
    <li>
      <select
        onChange={handleChange}
        className=" text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline"
      >
        <option defaultValue="">All Topics</option>
        {topicOptions.map((topicOption) => {
          return (
            <option key={topicOption} value={topicOption}>
              {capitaliseFirstLetter(topicOption)}
            </option>
          );
        })}
      </select>
    </li>
  );
};

export default TopicsDropDown;
