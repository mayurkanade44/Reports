import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { InputRow, InputSelect } from ".";
import { addAdminValues } from "../redux/adminSlice";
import { addPage } from "../redux/reportSlice";

const initialState = {
  pest: "",
  floor: "",
  subFloor: "",
  location: "",
  finding: "",
  suggestion: "",
};

const RIM = ({
  handleSubmit,
  reportType,
  findings,
  suggestions,
  handleImage1,
  handleImage2,
  templateType,
  image1,
  image2,
  reportLoading,
  setLastPage, 
  lastPage
}) => {
  const [other, setOther] = useState({ find: "", suggest: "" });

  const ref = useRef();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialState);
  const { pest, floor, subFloor, location, finding, suggestion } = formValue;

  const next = async () => {
    if (reportType === "RIM") formValue.pest = "Rodent";
    if (image1) formValue.image1 = image1;
    if (image2) formValue.image2 = image2;
    if (finding === "Other") {
      formValue.finding = other.find;
      dispatch(addAdminValues({ finding: other.find }));
    }
    if (suggestion === "Other") {
      formValue.suggestion = other.suggest;
      dispatch(addAdminValues({ suggestion: other.suggest }));
    }
    await dispatch(addPage({ formValue }));
    setFormValue(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleLastPage = () => {
    next();
    setTimeout(() => {
      setLastPage(true);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container row my-3">
        {!lastPage ? (
          <>
            {reportType !== "RIM" && (
              <div className="col-md-6">
                <InputRow
                  label="Pest:"
                  type="text"
                  name="pest"
                  value={pest}
                  handleChange={handleChange}
                />
              </div>
            )}
            <div className="col-md-6">
              <InputRow
                label="Floor:"
                type="text"
                name="floor"
                value={floor}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputRow
                label="Sub Floor:"
                type="text"
                name="subFloor"
                value={subFloor}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputRow
                label="Location:"
                type="text"
                name="location"
                value={location}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              {finding !== "Other" ? (
                <InputSelect
                  label="Findings:"
                  name="finding"
                  value={finding}
                  data={["Select", ...findings, "Other"]}
                  handleChange={handleChange}
                />
              ) : (
                <InputRow
                  label="Finding"
                  type="text"
                  name="otherFinding"
                  value={other.find}
                  handleChange={(e) =>
                    setOther({ ...other, find: e.target.value })
                  }
                />
              )}
            </div>
            <div className="col-md-6">
              {suggestion !== "Other" ? (
                <InputSelect
                  label="Suggestions:"
                  name="suggestion"
                  value={suggestion}
                  data={["Select", ...suggestions, "Other"]}
                  handleChange={handleChange}
                />
              ) : (
                <InputRow
                  label="Suggestions"
                  type="text"
                  name="otherFinding"
                  value={other.suggest}
                  handleChange={(e) =>
                    setOther({ ...other, suggest: e.target.value })
                  }
                />
              )}
            </div>
            <div className="col-md-6 mt-3 mb-2 d-flex">
              <h4 className="img me-1">
                {templateType === "Before-After Picture" ? "Before" : "Image1"}
              </h4>
              <input
                type="file"
                accept="image/*"
                ref={ref}
                onChange={handleImage1}
              />
            </div>
            <div className="col-md-6 my-2 d-flex">
              {templateType !== "Single Picture" && (
                <>
                  <h4 className="img me-1">
                    {templateType === "Before-After Picture"
                      ? "After"
                      : "Image2"}
                  </h4>
                  <input
                    type="file"
                    accept="image/*"
                    ref={ref}
                    onChange={handleImage2}
                  />
                </>
              )}
            </div>
            <div className="col-2 mt-4">
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
          <div className="col-md-6 d-flex justify-content-center mt-5">
            <button
              className="btn btn-success mt"
              type="submit"
              disabled={reportLoading ? true : false}
            >
              {reportLoading ? "Generating Report..." : "Generate Report"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
export default RIM;
