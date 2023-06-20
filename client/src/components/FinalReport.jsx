import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReportDetails, submitReport } from "../redux/reportSlice";
import Loading from "./Loading";

const FinalReport = ({ id, name }) => {
  const { singleReport, reportLoading } = useSelector((store) => store.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReportDetails(id));
  }, [id]);

  if (reportLoading) return <Loading />;

  return (
    <div>
      <div className="col-md-6 my-3">
        <h4>Report Name - {singleReport.reportName}</h4>
        <h4>Report Pages - {singleReport.details?.length + 2}</h4>
        <h4>Report By - {name}</h4>
      </div>
      <div className="col-md-6 d-flex justify-content-center mt-5">
        <button
          className="btn btn-success mt"
          onClick={() => dispatch(submitReport(id))}
          disabled={
            reportLoading || isNaN(singleReport.details?.length) ? true : false
          }
        >
          {reportLoading ? "Submitting..." : "Submit Report"}
        </button>
      </div>
    </div>
  );
};
export default FinalReport;
