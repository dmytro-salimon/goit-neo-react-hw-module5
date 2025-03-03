import css from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const inputElement = form.querySelector("input");
    const query = inputElement.value;

    if (query.trim()) {
      form.reset();
      return onSearch(query.toLowerCase());
    } else {
      alert("Please enter a valid search query!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        type="text"
        name="query"
        placeholder="Search movies..."
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
