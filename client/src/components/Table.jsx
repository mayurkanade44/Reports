const Table = ({ user, th1, th2, th3, th4, data, download, deleteUser }) => {
  return (
    <table className="table table-striped-columns table-bordered mt-2">
      <thead>
        <tr>
          <th style={{ width: 240 }}>{th1}</th>
          <th>{th2}</th>
          <th>{th3}</th>
          {user === "Mail" && <th>{th4}</th>}
        </tr>
      </thead>
      <tbody>
        {user === "User"
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
          : user === "Card"
          ? data?.map((item) => (
              <tr key={item._id}>
                <td>{item.contract}</td>
                <td>{item.serviceName}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      download(item.image || item.image[0], item.contract)
                    }
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))
          : data?.map((data, index) => (
              <tr key={index}>
                <td style={{ width: 150 }}>{data.date.split("T")[0]}</td>
                <td>{data.to}</td>
                <td>{data.files}</td>
                <td>{data.from}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};
export default Table