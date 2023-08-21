import { Modal, notification } from "antd";

const Notification = ({
  notifications = [],
  reloadNotification,
  showNotification,
  setShowNotification,
}) => {
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
            <div className="flex items-center gap-2 border border-solid p-2 flex-col">
              <h1 className="">{notification.title}</h1>
              <hr />
              <span>{notification.message}</span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default Notification;
