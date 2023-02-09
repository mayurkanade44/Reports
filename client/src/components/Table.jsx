const Table = ({ user, th1, th2, th3, th4, data, handleButton }) => {
  return (
    <table className="table table-striped-columns table-bordered mt-2">
      <thead>
        <tr>
          <th style={{ width: 240 }}>{th1}</th>
          <th>{th2}</th>
          <th>{th3}</th>
          {th4 && <th>{th4}</th>}
        </tr>
      </thead>
      <tbody>
        {user === "Admin" || user === "Back Office"
          ? data?.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.role}</td>
                <td>
                  {item.role !== "Admin" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleButton(item._id)}
                    >
                      Remove User
                    </button>
                  )}
                </td>
              </tr>
            ))
          : data?.map((item) => (
              <tr key={item._id}>
                <td>{item.reportName}</td>
                <td>{item.inspectionBy}</td>
                <td>{item.inspectionDate}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    <a
                      href={item.link}
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                      Download
                    </a>
                  </button>
                  {item.approved ? (
                    <button
                      className="btn btn-info btn-sm"
                      onClick={(e) =>
                        handleButton(item._id + "-" + e.target.textContent)
                      }
                    >
                      Send Email
                    </button>
                  ) : (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={(e) =>
                        handleButton(item._id + "-" + e.target.textContent)
                      }
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
export default Table;
