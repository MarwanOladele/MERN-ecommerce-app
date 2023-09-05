import { Button, Upload, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { EditProduct, UploadProductImage } from "../../../apicalls/product";

const Images = ({
  selectedProduct,
  getData,
  setSelectedProduct,
  setShowProductForm,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(selectedProduct.images);
  const [showPreview, setShowPreview] = useState(true);

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
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
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

  const deleteImage = async (image) => {
    try {
      dispatch(SetLoader(true));
      const updatedImage = images.filter((img) => img !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImage };
      const response = await EditProduct(selectedProduct._id, updatedProduct);
      if (response.sucess) {
        dispatch(SetLoader(false));
        message.success(response.message);
        setImages(updatedImage);
        setFile(null);
        getData();
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex gap-5 mb-3">
        {images.map((image, i) => {
          return (
            <div className="flex gap-2 border-solid border-gray-500 rounded p-2 items-center">
              <img src={image} alt="" className="h-20 w-20 object-cover" />
              <i
                className="ri-delete-bin-line"
                onClick={() => deleteImage(image)}
              ></i>
            </div>
          );
        })}
      </div>

      <Upload
        listType="picture"
        beforeUpload="false"
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
        fileList={file ? [file] : []}
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
