const SearchContainer = ({
  handleSearch,
  name,
  value,
  handleChange,
  placeholder,
}) => {
  return (
    <form onSubmit={handleSearch}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
        />
        <button
          className="input-group-text btn btn-primary"
          id="basic-addon2"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchContainer;
