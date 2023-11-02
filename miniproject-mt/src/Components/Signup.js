import React from "react";
import { Link, useNavigate } from "react-router-dom";
import teaming from "../images/teamimg.jpg";
import blog from "../images/Bloglogo.png";
import { Form, Input, Button, Space, Row, Col } from "antd";
import { auth_signup } from "../Actions/Saga_action";
import { useDispatch } from "react-redux";
const FormItem = Form.Item;
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(auth_signup(values, navigate));
    //console.log("Received values of form: ", values);
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
                <Row>
                  <Col>
                    <label className="label">First name</label>
                    <FormItem
                      colon={false}
                      name="first_name"
                      rules={[
                        {
                          type: "First name",
                        },
                        {
                          message: "Please input your First name!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="First name"
                        style={{
                          width: "195px",
                          height: "40px",
                          borderRadius: "4px",
                        }}
                      />
                    </FormItem>
                  </Col>
                  <Col>
                    <label className="label">Last name</label>
                    <FormItem
                      colon={false}
                      name="last_name"
                      rules={[
                        {
                          type: "Last name",
                        },
                        {
                          message: "Please input your Last name!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Last name"
                        style={{
                          width: "195px",
                          height: "40px",
                          borderRadius: "4px",
                        }}
                      />
                    </FormItem>
                  </Col>
                </Row>
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
                    placeholder="Enter email"
                    style={{
                      width: "400px",
                      height: "40px",
                      borderRadius: "4px",
                    }}
                  />
                </FormItem>
                <label className="label">Password</label>
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
                <label className="label">Confirm password</label>
                <FormItem
                  colon={false}
                  dependencies={["password"]}
                  name="password_confirmation"
                  hasFeedback
                  rules={[
                    {
                      message: "Please input your Confirm password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    placeholder="Confirm password"
                    style={{
                      width: "400px",
                      height: "40px",
                      borderRadius: "4px",
                    }}
                  />
                </FormItem>
                <FormItem className="button">
                  <Button type="primary" htmlType="submit">
                    Signup
                  </Button>
                </FormItem>
              </Form>
            </Space>
          </div>
          <div className="create_account">
            <nav>
              <p>
                Already have a account?<Link to="/">Signin</Link>
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
export default Signup;
