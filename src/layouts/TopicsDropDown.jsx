import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTopics } from "../apis/api";
import Select from "react-select";
import DropdownIndicator from "../components/DropdownIndicator";
import { customStyles } from "../styles/customStyles";
import { capitalise } from "../utils/utils";

const TopicsDropDown = () => {
  const [topicOptions, setTopicOptions] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getTopics();
        setTopicOptions(
          topics.map((topic) => ({
            value: topic.slug,
            label: capitalise(topic.slug),
          }))
        );
      } catch (error) {}
    };
    fetchTopics();
  }, []);

  const handleChange = (selectedOption) => {
    let newSearchParams = new URLSearchParams(searchParams);

    if (selectedOption.value === "All Topics") {
      newSearchParams.delete("topic");
    } else {
      newSearchParams.set("topic", selectedOption.value);
    }
    navigate(`/articles?${newSearchParams}`);
  };

  return (
    <li className="flex group items-center">
      <Select
        onChange={handleChange}
        options={[
          { value: "All Topics", label: "All Topics" },
          ...topicOptions,
        ]}
        styles={customStyles}
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
        isSearchable={false}
        placeholder="All Topics"
      />
    </li>
  );
};

export default TopicsDropDown;
