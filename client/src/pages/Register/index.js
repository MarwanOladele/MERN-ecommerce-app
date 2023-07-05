import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/DIvider";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Register = () => {
  const onFinish = (values) => {
    console.log("Sucess", values);
  };
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[350px]">
        <h1 className="text-primary text-2xl">
          MMP - <span className="text-gray-400">Register</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?
              <Link to="/login" className="text-primary ml-1">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
