import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateReport, InputRow, InputSelect } from "../components";
import { reportHandleChange } from "../redux/reportSlice";

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
    inspectionBy,
  } = useSelector((store) => store.report);
  const dispatch = useDispatch();
  const [showReport, setShowReport] = useState(false);

  const templates = [
    "Single Picture",
    "Double Pictures",
    "Before/After Pictures",
  ];

  const reports = ["RIM"];

  const startReport = () => {
    setTimeout(() => {
      setShowReport(true);
    }, 500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(reportHandleChange({ name, value }));
  };

  return showReport ? (
    <CreateReport />
  ) : (
    <div className="row m-2 d-flex flex-column min-vh-100 justify-content-center align-items-center">
      
      <div className="col-md-6">
        <InputSelect
          label="Template Type:"
          name="templateType"
          value={templateType}
          data={["Select", ...templates]}
          handleChange={handleChange}
        />
      </div>
      <div className="col-md-6">
        <InputSelect
          label="Report Type:"
          name="reportType"
          value={reportType}
          data={["Select", ...reports]}
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
            !inspectionBy ||
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
    </div>
  );
};
export default NewReport;
