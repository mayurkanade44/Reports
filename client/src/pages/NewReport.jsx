import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateReport,
  InputRow,
  InputSelect,
  SearchContainer,
} from "../components";
import { getAdminValues } from "../redux/adminSlice";
import { contractDetails, reportHandleChange } from "../redux/reportSlice";

const NewReport = () => {
  const {
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
  } = useSelector((store) => store.report);
  const { templates } = useSelector((store) => store.admin);
  const dispatch = useDispatch();
  const [showReport, setShowReport] = useState(false);
  const [newReport, setNewReport] = useState(false);

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

  return showReport ? (
    <CreateReport />
  ) : (
    <div className="row m-2 d-flex flex-column min-vh-100 justify-content-center align-items-center">
      {!newReport ? (
        <>
          <div className="col-md-6">
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
            <>
              <div className="col-10">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Bill To Details</th>
                      <th>Ship To Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Name - {contract.billToName}</th>
                      <th>Name - {contract.shipToName}</th>
                    </tr>
                    <tr>
                      <th>Address - {contract.billToAddress}</th>
                      <th>Address - {contract.shipToAddress}</th>
                    </tr>
                    <tr>
                      <th>Email - {contract.billToEmails}</th>
                      <th>Email - {contract.shipToEmails}</th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => setNewReport(true)}
                >
                  Create New Report
                </button>
              </div>
            </>
          )}
        </>
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
