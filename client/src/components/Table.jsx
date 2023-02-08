const Table = ({ user, th1, th2, th3, th4, data, deleteUser }) => {
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
                      onClick={() => deleteUser(item._id)}
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
                  <button className="btn btn-success">
                    <a
                      href={item.link}
                      style={{ textDecoration: "none", color: "whitesmoke" }}
                    >
                      Download
                    </a>
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
export default Table;
