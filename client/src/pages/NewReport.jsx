import { useState } from "react";
import { InputRow } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../redux/reportSlice";

const initialState = {
  pest: "",
  floor: "",
  subFloor: "",
  location: "",
  finding: "",
  suggestion: "",
};

const NewReport = () => {
  const { loading, images } = useSelector((store) => store.report);

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

  return (
    <div className="container row my-3">
      <h6 className="text-center">New Report</h6>
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
      <div className="col-md-6">
        <input type="file" accept="image/*" onChange={handleImage} multiple />
      </div>
      <div className="col-md-6 my-2">
        <button
          className="btn btn-primary"
          disabled={images.length > 0 ? false : true}
        >
          Add New Page
        </button>
      </div>
    </div>
  );
};
export default NewReport;
