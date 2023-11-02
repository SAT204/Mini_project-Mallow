import React from "react";
import { Link } from "react-router-dom";
import teaming from "../images/teamimg.jpg";
import blog from "../images/Bloglogo.png";
import { Form, Input, Button, Space } from "antd";
import { useDispatch } from "react-redux";
import { auth_login } from "../Actions/Saga_action";
import { useNavigate } from "react-router-dom";
const FormItem = Form.Item;
function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(auth_login(values, navigate));
    //console.log("Received values of form: ", values);
  };
  const handleForgotPassword = () => {
    // handle forgot password action
    //console.log("Forget the password");
  };

  return (
    <div className="container">
      <div className="box">
        <div className="lside_box">
          <div className="blog">
            <img src={blog} alt="blog_logo" />
          </div>
          <div className="forms">
            <Space>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <label className="label">Email</label>
                <FormItem
                  colon={false}
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not a valid email!",
                    },
                    {
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    style={{
                      width: "400px",
                      height: "40px",
                      borderRadius: "4px",
                    }}
                  />
                </FormItem>
                <label className="label">
                  Password
                  <span
                    className="pass_forgtpass"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </span>
                </label>
                <FormItem
                  colon={false}
                  name="password"
                  rules={[
                    {
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    style={{
                      width: "400px",
                      height: "40px",
                      borderRadius: "4px",
                    }}
                  />
                </FormItem>
                <FormItem className="button">
                  <Button type="primary" htmlType="submit">
                    Signin
                  </Button>
                </FormItem>
              </Form>
            </Space>
          </div>
          <div className="create_account">
            <nav>
              <p>
                Don't have an account? <Link to="/Signup">Signup</Link>
              </p>
            </nav>
          </div>
        </div>
        <div className="rside_box">
          <img className="image" src={teaming} alt="group_pic" sizes="100" />
        </div>
      </div>
    </div>
  );
}
export default Signin;
