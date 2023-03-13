const Headings = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

Headings.defaultProps = {
  title: "Title Not Provided",
};

export default Headings;
