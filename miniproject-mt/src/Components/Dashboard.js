import blog from "../images/PlainBlogLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, List, Skeleton, Avatar, Card } from "antd";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  dashboard_side_bar,
  show_published_post,
} from "../Actions/Saga_action";
import {
  push_offset,
  show_published_post_user,
} from "../Actions/Reducer_action";

const { Meta } = Card;
const { Sider, Content } = Layout;

function Dashboard() {
  const details = useSelector((state) => state.auth_redu);

  const offset = useSelector((state) => state.offset_data_redu);

  const public_data = useSelector((state) => state.dashboard_sidedata_redu);
  //console.log(public_data);

  const ind_public_data = useSelector((state) => state.dashboard_ind_data_redu);

  const user_details = useSelector(
    (state) => state.dashboard_ind_data_user_redu
  );
  //console.log(user_details);

  const auth_data = useSelector((state) => state.aunthentication_res_redu);
  const dispatch = useDispatch();

  const detail = details[0];
  const first_name = detail.first_name;
  const first_name_array = first_name.split("");
  const first_letter = first_name_array.at(0);

  useEffect(() => {
    dispatch(dashboard_side_bar(auth_data, offset));
  }, [offset]);

  useEffect(() => {
    var num = 1;
    dispatch(push_offset(num));
  }, []);

  function loadMoreData() {
    var num = 2;
    dispatch(push_offset(num));
  }

  function ShowPublishedPosts(item) {
    const id = item.id;
    dispatch(show_published_post(item, id, auth_data));
    dispatch(show_published_post_user(item));
    makeview();
  }

  const [view, setView] = useState(false);

  const makeview = () => {
    setView(true);
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
        <div className="layout_dash">
          <Layout>
            <Sider id="sider" width={"300px"} backgroundColor="white">
              <h2 className="recent_blogs">Recent Blogs</h2>
              <div
                style={{
                  height: "83vh",
                  overflow: "scroll",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                  color: "white",
                }}
              >
                <InfiniteScroll
                  dataLength={public_data}
                  next={loadMoreData}
                  loader={
                    <Skeleton
                      avatar
                      paragraph={{
                        rows: 1,
                      }}
                      active
                    />
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <List
                    itemLayout="horizontal"
                    dataSource={public_data}
                    renderItem={(item) => (
                      <List.Item
                        onClick={() => ShowPublishedPosts(item)}
                        style={{
                          cursor: "pointer",
                          padding: 10,
                          height: 100,
                          backgroungColor: "white",
                        }}
                      >
                        <List.Item.Meta
                          avatar={
                            item.user.profile_url ? (
                              <Avatar
                                src={item.user.profile_url}
                                shape="square"
                                size="large"
                              />
                            ) : (
                              <Avatar
                                icon={<UserOutlined />}
                                shape="square"
                                size="large"
                              />
                            )
                          }
                          title={item.name}
                          description={`- ${item.user.first_name}, ${moment(
                            item.updated_at
                          ).format("DD-MMM-YYYY")}`}
                        />
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Sider>
            <Content>
              {view ? (
                <div>
                  <div>
                    <h1
                      style={{
                        color: "black",
                        paddingLeft: "80px",
                        paddingTop: "50px",
                        paddingRight: "40px",
                      }}
                    >
                      {ind_public_data.name}
                    </h1>
                  </div>
                  <div
                    style={{
                      paddingLeft: "80px",
                      paddingTop: "50px",
                      paddingRight: "40px",
                    }}
                  >
                    <Card
                      size="small"
                      style={{
                        width: 300,
                      }}
                    >
                      <Meta
                        avatar={
                          user_details.user.profile_url ? (
                            <Avatar
                              src={user_details.user.profile_url}
                              size={50}
                            />
                          ) : (
                            <Avatar icon={<UserOutlined />} size={50} />
                          )
                        }
                        title={user_details.user.first_name}
                        description={`${moment(
                          ind_public_data.updated_at
                        ).format("DD-MMM-YYYY")}`}
                      />
                    </Card>
                  </div>
                  <div
                    style={{
                      color: "black",
                      paddingLeft: "80px",
                      paddingTop: "50px",
                      paddingRight: "40px",
                    }}
                  >
                    {ind_public_data.content}
                  </div>
                  <div
                    style={{
                      paddingLeft: "80px",
                      paddingTop: "50px",
                      paddingRight: "40px",
                    }}
                  >
                    {ind_public_data?.image_url ? (
                      <img
                        src={ind_public_data?.image_url}
                        alt="Cannot Be Displayed"
                        style={{ height: "300px", width: "100%" }}
                      ></img>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
