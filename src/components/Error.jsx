const Error = ({ message }) => {
  if (message === "Unable to update votes") {
    return (
      <p className="text-4 ml-2">
        Unable to update votes, please try again later.
      </p>
    );
  }

  return <p>Error: {message}</p>;
};

export default Error;
