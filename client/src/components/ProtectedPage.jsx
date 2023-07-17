import { useEffect, useState } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/user";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.sucess) {
        setUser(response.data);
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      {user && (
        <div className="p-5">
          {user.name} {children}
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
