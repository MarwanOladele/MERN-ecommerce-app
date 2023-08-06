import { Button, Upload, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { UploadProductImage } from "../../../apicalls/product";

const Images = ({
  selectedProduct,
  getData,
  setSelectedProduct,
  setShowProductForm,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      // Upload Image to Cloudinary and Get the URL
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));
      if (response.sucess) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
        dispatch(SetLoader(false));
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload="false"
        onChange={(info) => setFile(info.file)}
      >
        <Button type="dashed">Upload Image</Button>
      </Upload>

      <div className="flex justify-end gap-5 mt-5">
        <Button type="default" onClick={() => setShowProductForm(false)}>
          Cancel
        </Button>
        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
