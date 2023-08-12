import React, { useEffect, useState } from "react";
import { GetProductById } from "../../apicalls/product";
import { SetLoader } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { useParams } from "react-router-dom";
import DIvider from "../../components/DIvider";
import moment from "moment";

const ProductInfo = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      if (response.sucess) {
        dispatch(SetLoader(false));
        setProduct(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    product && (
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* images */}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-md"
            />

            <div className="flex gap-5">
              {product.images.map((img, i) => {
                return (
                  <img
                    className={`w-20 h-20  object-cover rounded-md cursor-pointer ${
                      selectedImageIndex === i
                        ? "border-green-700 border-dashed border-2 p-2"
                        : ""
                    }`}
                    onMouseEnter={() => setSelectedImageIndex(i)}
                    src={img}
                    alt=""
                  />
                );
              })}
            </div>
            <div className="text-gray-600">
              <h1>Added on</h1>
              <span>
                {moment(product.createdAt).format("MMM D, YYYY hh:mm A")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product.name}
              </h1>
              <span className="">{product.description}</span>
            </div>
            <DIvider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Product Details
              </h1>
              <div className="flex justify-between w-full mt-2">
                <span>Price</span>
                <span>${product.price}</span>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span>Bill Available</span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
            </div>
            <DIvider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between w-full mt-2">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between w-full mt-2">
                <span>Email</span>
                <span className="">{product.seller.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductInfo;
