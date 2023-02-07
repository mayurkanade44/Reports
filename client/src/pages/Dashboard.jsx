import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, InputRow, InputSelect } from "../components";
import {
  getAllUsers,
  handleUserChange,
  register,
  userDelete,
} from "../redux/userSlice";

const Dashboard = () => {
  const { userLoading, allUsers, name, email, password, role } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, role, password }));
  };

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-2">
          <button className="btn btn-primary">All Users</button>
        </div>
        <div className="col-2">
          <button className="btn btn-primary">Register User</button>
        </div>
        <div className="col-12">
          <Table
            user="User"
            th1="Name"
            th2="Role"
            th3="Delete"
            data={allUsers}
            deleteUser={handleDelete}
          />
        </div>
        <form className="row" onSubmit={handleRegisterSubmit}>
          <div className="col-5">
            <InputRow
              label="Name"
              name="name"
              value={name}
              handleChange={(e) =>
                dispatch(
                  handleUserChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="col-4 mb-3">
            <InputSelect
              label="Role:"
              name="role"
              value={role}
              data={["Select", "Field", "Back Office"]}
              handleChange={(e) =>
                dispatch(
                  handleUserChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
          </div>

          <div className="col-4">
            <InputRow
              label="User Email"
              type="email"
              name="email"
              value={email}
              placeholder="abc@xyz.com"
              handleChange={(e) =>
                dispatch(
                  handleUserChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="col-4">
            <InputRow
              label="Password"
              name="password"
              value={password}
              handleChange={(e) =>
                dispatch(
                  handleUserChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />
          </div>
          <div className="col-auto mt-1">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Dashboard;
