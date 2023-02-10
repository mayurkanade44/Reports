import { useEffect, useState } from "react";
import { InputRow, InputSelect } from ".";
import { useDispatch, useSelector } from "react-redux";
import { addPage, createReport, uploadImage } from "../redux/reportSlice";
import { getAdminValues } from "../redux/adminSlice";

const initialState = {
  pest: "",
  floor: "",
  subFloor: "",
  location: "",
  finding: "",
  suggestion: "",
};

const CreateReport = () => {
  const {
    loading,
    image1,
    image2,
    reportName,
    details,
    reportType,
    inspectionBy,
    templateType,
  } = useSelector((store) => store.report);
  const { findings, suggestions } = useSelector((store) => store.admin);
  const [lastPage, setLastPage] = useState(false);
  const [formValue, setFormValue] = useState(initialState);
  const { pest, floor, subFloor, location, finding, suggestion } = formValue;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleImage1 = (e) => {
    const image = e.target.files[0];

    const form = new FormData();
    form.set("imageCount", "image1");
    form.append("image", image);

    dispatch(uploadImage(form));
  };

  useEffect(() => {
    dispatch(getAdminValues());
  }, []);

  const handleImage2 = (e) => {
    const image = e.target.files[0];

    const form = new FormData();
    form.set("imageCount", "image2");
    form.append("image", image);

    dispatch(uploadImage(form));
  };

  const next = () => {
    if (reportType === "RIM") formValue.pest = "Rodent";
    if (image1) formValue.image1 = image1;
    if (image2) formValue.image2 = image2;
    dispatch(addPage({ formValue }));
    setTimeout(() => {
      setFormValue(initialState);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReport());
  };

  const handleLastPage = () => {
    next();
    setTimeout(() => {
      setLastPage(true);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container row my-3">
        <h5 className="text-center">
          {!lastPage ? "New Report" : "Report Summary"}
        </h5>
        {!lastPage ? (
          <>
            {reportType !== "RIM" && (
              <div className="col-md-6">
                <InputRow
                  label="Pest"
                  type="text"
                  name="pest"
                  value={pest}
                  handleChange={handleChange}
                />
              </div>
            )}
            <div className="col-md-6">
              <InputRow
                label="Floor"
                type="text"
                name="floor"
                value={floor}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputRow
                label="Sub Floor"
                type="text"
                name="subFloor"
                value={subFloor}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputRow
                label="Location"
                type="text"
                name="location"
                value={location}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputSelect
                label="Findings:"
                name="finding"
                value={finding}
                data={["Select", ...findings]}
                handleChange={handleChange}
              />
              {/* <InputRow
                label="Finding"
                type="text"
                name="finding"
                value={finding}
                handleChange={handleChange}
              /> */}
            </div>
            <div className="col-md-6">
              <InputSelect
                label="Suggestions:"
                name="suggestion"
                value={suggestion}
                data={["Select", ...suggestions]}
                handleChange={handleChange}
              />
              {/* <InputRow
                label="Suggestions"
                type="text"
                name="suggestion"
                value={suggestion}
                handleChange={handleChange}
              /> */}
            </div>
            <div className="col-md-6 mt-3 mb-2 d-flex">
              <h4 className="img me-1">Image1:</h4>
              <input type="file" accept="image/*" onChange={handleImage1} />
            </div>
            {templateType !== "Single Picture" && (
              <div className="col-md-6 my-2 d-flex">
                <h4 className="img me-1">Image2:</h4>
                <input type="file" accept="image/*" onChange={handleImage2} />
              </div>
            )}

            <div className="col-4 mt-4">
              <button
                type="button"
                className="btn btn-primary"
                disabled={
                  templateType === "Single Picture"
                    ? image1 === null
                      ? true
                      : false
                    : image2 === null
                    ? true
                    : false
                }
                onClick={next}
              >
                Next
              </button>
            </div>
            <div className="col-8 mt-4 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleLastPage}
                disabled={
                  templateType === "Single Picture"
                    ? image1 === null
                      ? true
                      : false
                    : image2 === null
                    ? true
                    : false
                }
              >
                Add Last Page
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6 my-3">
              <h4>Report Name - {reportName}</h4>
              <h4>Report Pages - {details.length + 2}</h4>
              <h4>Report By - {inspectionBy}</h4>
            </div>
            <div className="col-md-6 d-flex justify-content-center mt-5">
              <button
                className="btn btn-success mt"
                type="submit"
                disabled={loading || details.length === 0 ? true : false}
              >
                {loading ? "Generating Report..." : "Generate Report"}
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};
export default CreateReport;
