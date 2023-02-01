import { useState } from "react";
import { InputRow } from ".";
import { useDispatch, useSelector } from "react-redux";
import { addPage, createReport, uploadImage } from "../redux/reportSlice";

const initialState = {
  pest: "",
  floor: "",
  subFloor: "",
  location: "",
  finding: "",
  suggestion: "",
};

const CreateReport = () => {
  const { loading, images, reportName, details } = useSelector(
    (store) => store.report
  );
  const [lastPage, setLastPage] = useState(false);

  const [formValue, setFormValue] = useState(initialState);
  const { pest, floor, subFloor, location, finding, suggestion } = formValue;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  };

  const handleImage = (e) => {
    const file = Array.from(e.target.files);

    const form = new FormData();
    file.forEach((image) => {
      form.append("image", image);
    });
    dispatch(uploadImage(form));
  };

  const next = () => {
    formValue.image = images;
    dispatch(addPage({ formValue }));
    setTimeout(() => {
      setFormValue(initialState);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReport())
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
        <h6 className="text-center">New Report</h6>
        {!lastPage ? (
          <>
            <div className="col-md-6">
              <InputRow
                label="Pest"
                type="text"
                name="pest"
                value={pest}
                handleChange={handleChange}
              />
            </div>
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
              <InputRow
                label="Finding"
                type="text"
                name="finding"
                value={finding}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <InputRow
                label="Suggestions"
                type="text"
                name="suggestion"
                value={suggestion}
                handleChange={handleChange}
              />
            </div>
            <div className="col-md-6 my-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                multiple
              />
            </div>
            <div className="col-4 mt-4">
              <button
                className="btn btn-primary"
                disabled={images.length > 0 ? false : true}
                onClick={next}
              >
                Next
              </button>
            </div>
            <div className="col-8 mt-4 d-flex justify-content-end">
              <button
                className="btn btn-success"
                disabled={images.length > 0 ? false : true}
                onClick={handleLastPage}
              >
                Add Last Page
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6 my-3">
              <h3>Report Name - {reportName}</h3>
              <h4>Report Pages - {details.length + 2}</h4>
              <h4>Report By - Mallu Yadav</h4>
              <button className="btn btn-success" type="submit">Generate Report</button>
            </div>
          </>
        )}
      </div>
    </form>
  );
};
export default CreateReport;
