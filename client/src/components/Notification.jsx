import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteNotification } from "../apicalls/notification";
import { SetLoader } from "../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const Notification = ({
  notifications = [],
  reloadNotification,
  showNotification,
  setShowNotification,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));
      if (response.sucess) {
        message.success(response.message);
        reloadNotification();
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="Notifications"
      open={showNotification}
      onCancel={() => setShowNotification(false)}
      footer={null}
      centered
      width={1000}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => {
          return (
            <div
              className="flex border border-solid p-2 flex-col border-gray-300 rounded cursor-pointer"
              key={notification._id}
            >
              <div
                className="flex justify-between items-center"
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotification(false);
                }}
              >
                <div className="">
                  <h1 className="text-gray-700">{notification.title}</h1>
                  <span className="text-gray-500">{notification.message} </span>
                  <h1 className="text-gray-400 text-sm">
                    {moment(notification.createdAt).fromNow()}
                  </h1>
                </div>
                <i
                  className="ri-delete-bin-line"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification._id);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default Notification;
