import React, { useRef } from "react";
import Select from "react-select";
import DropdownIndicator from "./DropdownIndicator";
import { customStyles } from "../styles/customStyles";

const FilterCard = ({ setSearchParams, searchParams }) => {
  const selectRef = useRef();

  const handleChange = (selectedOption) => {
    const { name, value } = selectedOption;
    let newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(name, value);
    setSearchParams(newSearchParams);
  };

  const sortByOptions = [
    { value: "created_at", label: "Date", name: "sortBy" },
    { value: "comments", label: "Comment Count", name: "sortBy" },
    { value: "votes", label: "Votes", name: "sortBy" },
  ];

  const orderOptions = [
    { value: "asc", label: "Ascending", name: "order" },
    { value: "desc", label: "Descending", name: "order" },
  ];

  return (
    <div className="flex items-center gap-5">
      <Select
        ref={selectRef}
        name="sortBy"
        options={sortByOptions}
        className="basic-single"
        classNamePrefix="select"
        onChange={handleChange}
        styles={customStyles}
        placeholder="Choose a Filter"
        isSearchable={false}
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
      />

      <Select
        ref={selectRef}
        name="order"
        options={orderOptions}
        className="basic-single"
        classNamePrefix="select"
        onChange={handleChange}
        styles={customStyles}
        placeholder="Order By"
        isSearchable={false}
        components={{
          DropdownIndicator,
          IndicatorSeparator: null,
        }}
      />
    </div>
  );
};

export default FilterCard;
