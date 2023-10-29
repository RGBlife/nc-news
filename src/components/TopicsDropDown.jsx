import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getTopics } from "../apis/api";

const TopicsDropDown = () => {
  const [topicOptions, setTopicOptions] = useState([]);
  const isFirstRender = useRef(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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
      } catch (error) {}
    };
    fetchTopics();
  }, []);

  const handleChange = (event) => {
    const selectedTopic = event.target.value;
    let newSearchParams = new URLSearchParams(searchParams);

    if (selectedTopic === "All Topics") {
      newSearchParams.delete("topic");
    } else {
      newSearchParams.set("topic", selectedTopic);
    }
    navigate(`/articles?${newSearchParams}`);
  };

  return (
    <li className="flex group items-center">
      <select
        onChange={handleChange}
        className="text-[20px] group-hover:text-[#50192b] text-[#D83367] font-semibold transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline"
        aria-label="Filter Articles by Topic"
      >
        <option defaultValue="">All Topics</option>
        {topicOptions.map((topicOption) => {
          return (
            <option className="capitalize" key={topicOption} value={topicOption}>
              {topicOption}
            </option>
          );
        })}
      </select>
      <svg className="text-[20px] text-[#D83367] group-hover:text-[#50192b] font-semibold transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/></svg>
    </li>
  );
};

export default TopicsDropDown;
