import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

const Notification = ({
  notifications = [],
  reloadNotification,
  showNotification,
  setShowNotification,
}) => {
  const navigate = useNavigate();

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
              onClick={() => {
                navigate(notification.onClick);
                setShowNotification(false);
              }}
            >
              <h1 className="text-gray-700">{notification.title}</h1>
              <span className="text-gray-500">{notification.message} </span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default Notification;
