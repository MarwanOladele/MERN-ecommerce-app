const { axiosInstance } = require("./axiosIntance");

// add product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products/add-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get product
export const GetProduct = async () => {
  try {
    const response = await axiosInstance.get("/api/products/get-products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
