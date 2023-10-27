const FilterCard = ({ setSearchParams, searchParams }) => {
  const handleChange = (filterType, value) => {
    let newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(filterType, value);
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <select className="text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline" defaultValue="" aria-label="Filter Type" onChange={(event) => handleChange("sortBy", event.target.value)}>
        <option disabled value="">Choose a filter</option>
        <option value="created_at">Date</option>
        <option value="comments">Comment Count</option>
        <option value="votes">Votes</option>
      </select>

      <select className="text-[20px] text-[#D83367] font-semibold hover:text-[#50192b] transition delay-75 appearance-none bg-transparent border-none leading-tight focus:outline-none focus:shadow-outline" defaultValue="" aria-label="Order Type" onChange={(event) => handleChange("order", event.target.value)}>
        <option disabled value="">Order</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default FilterCard;
