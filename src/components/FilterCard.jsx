const FilterCard = ({ setSearchParams, searchParams }) => {
  const handleChange = (filterType, value) => {
    let newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filterType, value);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex items-center gap-5">
      <select
        className="text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline"
        defaultValue=""
        aria-label="Filter Type"
        onChange={(event) => handleChange("sortBy", event.target.value)}
      >
        <option disabled value="">
          Choose a filter
        </option>
        <option value="created_at">Date</option>
        <option value="comments">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <svg
        className="text-[20px] text-[#D83367] group-hover:text-[#50192b] font-semibold transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
        />
      </svg>

      <select
        className="text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline"
        defaultValue=""
        aria-label="Order Type"
        onChange={(event) => handleChange("order", event.target.value)}
      >
        <option disabled value="">
          Order By
        </option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <svg
        className="text-[20px] text-[#D83367] group-hover:text-[#50192b] font-semibold transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"
        />
      </svg>
    </div>
  );
};

export default FilterCard;
