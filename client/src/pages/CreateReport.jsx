import { useState } from "react";
import { Loading, RIM } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { createReport, uploadImage } from "../redux/reportSlice";

const CreateReport = () => {
  const {
    reportLoading,
    image1,
    image2,
    meetTo,
    meetContact,
    meetEmail,
    shownTo,
    shownContact,
    shownEmail,
    inspectionDate,
    contract,
    reportName,
    details,
    reportType,
    templateType,
  } = useSelector((store) => store.report);
  const { adminLoading, findings, suggestions } = useSelector(
    (store) => store.admin
  );
  const { user } = useSelector((store) => store.user);
  const [lastPage, setLastPage] = useState(false);

  const dispatch = useDispatch();

  const handleImage1 = (e) => {
    const image = e.target.files[0];

    const form = new FormData();
    form.set("imageCount", "image1");
    form.append("image", image);

    dispatch(uploadImage(form));
  };

  const handleImage2 = (e) => {
    const image = e.target.files[0];

    const form = new FormData();
    form.set("imageCount", "image2");
    form.append("image", image);

    dispatch(uploadImage(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createReport({
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
        details,
        contract,
      })
    );
  };

  if (adminLoading) return <Loading />;
  return (
    <div className="container row my-3">
      <h5 className="text-center">
        {!lastPage ? "New Report" : "Report Summary"}
      </h5>
      {lastPage ? (
        <div className="col-md-6 my-3">
          <h4>Report Name - {reportName}</h4>
          <h4>Report Pages - {details.length + 2}</h4>
          <h4>Report By - {user.name}</h4>
        </div>
      ) : (
        <RIM
          handleSubmit={handleSubmit}
          reportType={reportType}
          findings={findings}
          suggestions={suggestions}
          handleImage1={handleImage1}
          handleImage2={handleImage2}
          templateType={templateType}
          image1={image1}
          image2={image2}
          reportLoading={reportLoading}
          lastPage={lastPage}
          setLastPage={setLastPage}
        />
      )}
    </div>
  );
};
export default CreateReport;
