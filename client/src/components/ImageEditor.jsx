import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import { useDispatch } from "react-redux";
import { testUpload } from "../redux/reportSlice";

const ImageEditor = ({onClose}) => {
  const dispatch = useDispatch();
  let imgObj;

  const openImage = () => {};

  const base64_arraybuffer = async (data) => {
    // Use a FileReader to generate a base64 data URI
    const base64url = await new Promise((r) => {
      const reader = new FileReader();
      reader.onload = () => r(reader.result);
      reader.readAsDataURL(new Blob([data]));
    });

    /*
    The result looks like 
    "data:application/octet-stream;base64,<your base64 data>", 
    so we split off the beginning:
    */
    return base64url.substring(base64url.indexOf(",") + 1);
  };

  const imageDetails = async () => {
    // imgObj.export("PNG", "test");
    console.log(imgObj.getImageData());
    const image = convertImageToBase64(imgObj.getImageData());
    const form = { image };
    dispatch(testUpload(form));
  };

  function convertImageToBase64(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.putImageData(img, 0, 0);
    const dataUrl = canvas.toDataURL();
    return dataUrl;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <ImageEditorComponent
          created={openImage}
          ref={(img) => {
            imgObj = img;
          }}
        ></ImageEditorComponent>
        <button className="btn btn-primary my-2" onClick={imageDetails}>
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
