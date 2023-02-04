import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateReport, InputRow, InputSelect } from "../components";
import { reportHandleChange } from "../redux/reportSlice";

const NewReport = () => {
  const { templateType, reportType, meetTo, inspectionDate } =
    useSelector((store) => store.report);
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
      <div className="col-md-6">
        <InputSelect
          label="Report Type:"
          name="reportType"
          value={reportType}
          data={["Select", ...reports]}
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
      <div className="col-md-6">
        <InputRow
          label="Inspection Date:"
          type="date"
          name="inspectionDate"
          value={inspectionDate}
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
      <div className="col-md-6">
        <InputRow
          label="Meet To:"
          type="text"
          name="meetTo"
          value={meetTo}
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
      <div className="col-md-6 mt-3 d-flex justify-content-center">
        <button
          className="btn btn-primary"
          onClick={startReport}
          disabled={
            !templateType || !reportType || !meetTo || !inspectionDate
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
