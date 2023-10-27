import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getTopics } from "../apis/api";
import { capitaliseFirstLetter } from "../utils/utils";

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
            <option key={topicOption} value={topicOption}>
              {capitaliseFirstLetter(topicOption)}
            </option>
          );
        })}
      </select>
      <svg className="text-[20px] text-[#D83367] group-hover:text-[#50192b] font-semibold transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"/></svg>
      {/* <svg  className="text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.5" d="M19 3H5c-1.414 0-2.121 0-2.56.412C2 3.824 2 4.488 2 5.815v.69c0 1.037 0 1.556.26 1.986c.26.43.733.698 1.682 1.232l2.913 1.64c.636.358.955.537 1.183.735c.474.411.766.895.898 1.49c.064.284.064.618.064 1.285v2.67c0 .909 0 1.364.252 1.718c.252.355.7.53 1.594.88c1.879.734 2.818 1.101 3.486.683c.668-.417.668-1.372.668-3.282v-2.67c0-.666 0-1 .064-1.285a2.68 2.68 0 0 1 .899-1.49c.227-.197.546-.376 1.182-.735l2.913-1.64c.948-.533 1.423-.8 1.682-1.23c.26-.43.26-.95.26-1.988v-.69c0-1.326 0-1.99-.44-2.402C21.122 3 20.415 3 19 3Z"/></svg> */}
    </li>
  );
};

export default TopicsDropDown;
