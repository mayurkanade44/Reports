import { useSelector, useDispatch } from "react-redux";
import { InputRow } from "../components";
import { handleUserChange, login } from "../redux/userSlice";

const Home = () => {
  const { userLoading, email, password } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <div className="col-md-4">
            <InputRow
              label="Email:"
              type="email"
              name="email"
              value={email}
              handleChange={(e) => {
                dispatch(
                  handleUserChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Password:"
              type="password"
              name="password"
              value={password}
              handleChange={(e) => {
                dispatch(
                  handleUserChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                );
              }}
            />
          </div>
          <div className="col-md-2 text-center mt-2">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={userLoading ? true : false}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Home;
