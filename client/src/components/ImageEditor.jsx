import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import { useDispatch, useSelector } from "react-redux";
import { imageUpload, reportHandleChange } from "../redux/reportSlice";

const ImageEditor = ({ onClose, name }) => {
  const { reportLoading } = useSelector((store) => store.report);
  const dispatch = useDispatch();
  let imgObj;

  const upload = async () => {
    const image = convertImageToBase64(imgObj.getImageData());
    try {
      const res = await dispatch(imageUpload({ image })).unwrap();
      dispatch(reportHandleChange({ name, value: res.url }));
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const convertImageToBase64 = (img) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.putImageData(img, 0, 0);
    const dataUrl = canvas.toDataURL();
    return dataUrl;
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <ImageEditorComponent
          ref={(img) => {
            imgObj = img;
          }}
        ></ImageEditorComponent>
        <button
          disabled={reportLoading}
          className="btn btn-primary my-2"
          onClick={upload}
        >
          Save
        </button>
        <button type="button" className="btn btn-danger" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
export default ImageEditor;
