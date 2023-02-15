import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateReport,
  InputRow,
  InputSelect,
  SearchContainer,
} from "../components";
import { getAdminValues } from "../redux/adminSlice";
import {
  contractDetails,
  reportHandleChange,
  directUpload,
  createReport,
} from "../redux/reportSlice";

const NewReport = () => {
  const {
    reportName,
    templateType,
    reportType,
    meetTo,
    meetContact,
    meetEmail,
    shownTo,
    shownContact,
    shownEmail,
    inspectionDate,
    search,
    contract,
    directReport,
  } = useSelector((store) => store.report);
  const { templates } = useSelector((store) => store.admin);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showReport, setShowReport] = useState(false);
  const [newReport, setNewReport] = useState(false);
  const [file, setFile] = useState("");

  const repoType = [];

  for (let temp of templates) {
    if (!repoType.includes(temp.reportType)) repoType.push(temp.reportType);
  }
  const tempTypes = [
    "Single Picture",
    "Double Pictures",
    "Before/After Pictures",
  ];

  useEffect(() => {
    dispatch(getAdminValues());

    // eslint-disable-next-line
  }, []);

  const startReport = () => {
    const name = "reportName";
    const value = `${contract.number.replace(
      /\//g,
      "-"
    )} ${reportType} ${templateType}`;
    dispatch(reportHandleChange({ name, value }));
    setTimeout(() => {
      setShowReport(true);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(reportHandleChange({ name, value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(contractDetails(search));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();

    form.set("reportName", reportName);
    form.set("templateType", templateType);
    form.set("reportType", reportType);
    form.set("meetTo", meetTo);
    form.set("shownTo", shownTo);
    form.set("contract", contract);
    form.set("inspectionDate", inspectionDate);
    form.append("file", file);

    dispatch(createReport(form));
    setNewReport(false);
  };

  return showReport ? (
    <CreateReport />
  ) : (
    <div className="row my-3 mx-1 d-flex justify-content-center">
      {!newReport ? (
        <>
          <div className="col-md-6 mt-1">
            <SearchContainer
              placeholder="Contract Number"
              name="search"
              value={search}
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
          {contract && (
            <div className="row">
              <div className="col-md-6">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Bill To Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name - {contract.billToName}</td>
                    </tr>
                    <tr>
                      <td>Address - {contract.billToAddress}</td>
                    </tr>
                    <tr>
                      <td>Email - {contract.billToEmails.toString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-md-6">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">Ship To Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name - {contract.shipToName}</td>
                    </tr>
                    <tr>
                      <td>Address - {contract.shipToAddress}</td>
                    </tr>
                    <tr>
                      <td>Email - {contract.shipToEmails.toString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => setNewReport(true)}
                >
                  Create New Report
                </button>
                {user.role === "Admin" && (
                  <button
                    className="btn btn-info ms-3"
                    onClick={() => dispatch(directUpload(), setNewReport(true))}
                  >
                    Direct Upload
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      ) : directReport ? (
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column min-vh-100 justify-content-center align-items-center"
        >
          <div className="col-md-4">
            <InputRow
              label="Report Name:"
              type="text"
              name="reportName"
              value={reportName}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <InputRow
              label="Inspection Date:"
              type="date"
              name="inspectionDate"
              value={inspectionDate}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-4 my-3">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="col-md-4 text-center">
            <button className="btn btn-primary" type="submit">
              Submit Report
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="col-md-6">
            <InputSelect
              label="Template Type:"
              name="templateType"
              value={templateType}
              data={["Select", ...tempTypes]}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputSelect
              label="Report Type:"
              name="reportType"
              value={reportType}
              data={["Select", ...repoType]}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Inspection Date:"
              type="date"
              name="inspectionDate"
              value={inspectionDate}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Meet To:"
              type="text"
              name="meetTo"
              value={meetTo}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Meet Contact:"
              type="text"
              name="meetContact"
              value={meetContact}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Meet Email:"
              type="email"
              name="meetEmail"
              value={meetEmail}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Show To:"
              type="text"
              name="shownTo"
              value={shownTo}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Shown Contact:"
              type="text"
              name="shownContact"
              value={shownContact}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <InputRow
              label="Shown Email:"
              type="email"
              name="shownEmail"
              value={shownEmail}
              handleChange={handleChange}
            />
          </div>
          <div className="col-md-6 mt-3 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={startReport}
              disabled={
                !templateType ||
                !reportType ||
                !meetTo ||
                !inspectionDate ||
                !shownTo
                  ? true
                  : false
              }
            >
              Start Report
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default NewReport;
