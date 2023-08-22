import { useEffect, useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/user";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import { Avatar, Badge, Space } from "antd";
import Notification from "./Notification";
import { GetNotification } from "../apicalls/notification";

const ProtectedPage = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.sucess) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetNotification();
      dispatch(SetLoader(false));
      if (response.sucess) {
        setNotifications(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotifications();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div className="">
        {/* header */}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl  text-white cursor-pointer"
            onClick={() => navigate("/")}
          >
            MARWAN MP
          </h1>
          <div className="bg-white py-2 px-5 rounded flex gap-3 items-center">
            <i className="ri-shield-user-line"></i>

            <Space size="middle">
              <Badge
                count={
                  notifications?.filter((notification) => !notification.read)
                    .length
                }
                onClick={() => setShowNotification(true)}
              >
                <Avatar
                  shape="circle"
                  size="medium"
                  icon={<i className="ri-notification-line"></i>}
                />
              </Badge>
            </Space>

            <span
              className="underline cursor-pointer uppercase "
              onClick={() => {
                if (user.role === "user") {
                  navigate("/profile");
                } else {
                  navigate("/admin");
                }
              }}
            >
              {user.name}
            </span>
            <i
              className="ri-logout-box-r-line ml-10 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        {/* content */}
        <div className="p-5">{children}</div>

        {showNotification && (
          <Notification
            notifications={notifications}
            reloadNotification={setNotifications}
            showNotification={showNotification}
            setShowNotification={setShowNotification}
          />
        )}
      </div>
    )
  );
};

export default ProtectedPage;
