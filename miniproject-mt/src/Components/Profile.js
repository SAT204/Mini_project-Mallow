import blog from "../images/PlainBlogLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { log_out } from "../Actions/Reducer_action";
import { Link, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const details = useSelector((state) => state.auth_redu);
  //console.log("useSelector", details[0]);
  const detail = details[0];
  const first_name = detail.first_name;
  const last_name = detail.last_name;
  const email = detail.email;
  //console.log("Profile_page");
  const first_name_array = first_name.split("");
  const first_letter = first_name_array.at(0);

  const handleLogout = () => {
    const empty = "";
    dispatch(log_out(empty));
    navigate("/");
  };

  return (
    <>
      <div className="container_home">
        <div className="header">
          <div className="blog_img">
            <img src={blog} alt="blog_image" />
          </div>
          <div className="in_header">
            <p>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/Profile"
              >
                Profile
              </Link>
            </p>
            <p>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/Dashboard"
              >
                Dashboard
              </Link>
            </p>
            <p>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/Posts"
              >
                Posts
              </Link>
            </p>
          </div>
          <div className="user_guide">
            <h4>
              {first_name}
              <span className="letter_logo">{first_letter}</span>
            </h4>
          </div>
        </div>
        <h2 className="profile_aud">Profile_Info</h2>
        <br />
        <div className="profile_page">
          <Row>
            <Col>
              <Card title="First_name" bordered={false}>
                {first_name}
              </Card>
            </Col>

            <Col>
              <Card title="Last_name" bordered={false}>
                {last_name}
              </Card>
            </Col>

            <Col>
              <Card title="Email" bordered={false}>
                {email}
              </Card>
            </Col>
          </Row>
        </div>
        <div className="button_logout">
          <Button type="primary" danger onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
export default Profile;
