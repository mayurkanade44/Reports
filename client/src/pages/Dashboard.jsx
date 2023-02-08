import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  InputRow,
  InputSelect,
  Loading,
  SearchContainer,
} from "../components";
import { allReports, reportHandleChange } from "../redux/reportSlice";
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
  const { reports, reportLoading, search } = useSelector((store) => store.report);
  const dispatch = useDispatch();
  const [show, setShow] = useState("All Reports");

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(allReports());

    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    dispatch(userDelete(id));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, role, password }));
  };

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(allReports(search));
  }

  if (reportLoading || userLoading) return <Loading />;

  return (
    <div className="container my-2">
      <div className="row">
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={(e) => setShow(e.target.textContent)}
          >
            All Reports
          </button>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={(e) => setShow(e.target.textContent)}
          >
            All Users
          </button>
        </div>
        <div className="col-2">
          <button
            className="btn btn-primary"
            onClick={(e) => setShow(e.target.textContent)}
          >
            Register User
          </button>
        </div>
        <div className="col-4">
          <SearchContainer
            name="search"
            value={search}
            placeholder="Enter report name"
            handleSearch={handleSearch}
            handleChange={(e) =>
              dispatch(
                reportHandleChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              )
            }
          />
        </div>
        {show === "All Users" && (
          <div className="col-12">
            <Table
              user="Admin"
              th1="Name"
              th2="Role"
              th3="Delete"
              data={allUsers}
              deleteUser={handleDelete}
            />
          </div>
        )}
        {show === "All Reports" && (
          <div className="col-12">
            <Table
              th1="Report Name"
              th2="Report By"
              th3="Inspection Date"
              th4="Download"
              data={reports}
              deleteUser={handleDelete}
            />
          </div>
        )}
        {show === "Register User" && (
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
        )}
      </div>
    </div>
  );
};
export default Dashboard;
