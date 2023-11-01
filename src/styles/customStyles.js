export const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: "none",
      boxShadow: "none",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#D83367",
      borderRadius: 0,
      '@media (min-width: 1024px)': {
        fontSize: "20px",
      },
    }),
    dropdownIndicator: () => ({}),
    indicatorSeparator: () => ({}),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: '#D83367',
      };
    },
    option: (provided, state) => ({
      ...provided,
      fontWeight: "bold",
      color: state.isSelected ? '#fff' : '#000',
      backgroundColor: state.isSelected ? '#4A90E2' : 'transparent',
      "&:hover": {
        color: "#85394a",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#D83367",
      fontWeight: "bold",
    }),
  };
