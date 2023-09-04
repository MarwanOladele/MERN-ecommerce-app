const { axiosInstance } = require("./axiosIntance");

export const AddNotification = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/notification/notify-users",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get product
export const GetNotification = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/notification/get-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/notification/delete-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const ReadAllNotification = async () => {
  try {
    const response = await axiosInstance.put(
      `/api/notification/read-all-notifications`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
