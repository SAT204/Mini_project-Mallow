import blog from "../images/PlainBlogLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Button,
  Table,
  Drawer,
  Form,
  Upload,
  message,
  Badge,
} from "antd";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import {
  create_data,
  publish_data,
  get_data_table,
  delete_row,
  unpublish_data,
  push_data_view,
} from "../Actions/Saga_action";

const { Dragger } = Upload;
const { Search } = Input;
const FormItem = Form.Item;
function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const datas = useSelector((state) => state.data_table_redu);

  const auth_data = useSelector((state) => state.aunthentication_res_redu);
  useEffect(() => {
    //console.log("dispatch is invokeing");
    dispatch(get_data_table(auth_data));
  }, []);

  const details = useSelector((state) => state.auth_redu);
  const detail = details[0];
  const first_name = detail.first_name;
  const first_name_array = first_name.split("");
  const first_letter = first_name_array.at(0);

  const columns = [
    {
      key: "1",
      title: "Post name",
      dataIndex: "name",
      render: (value, record) => {
        return (
          <span
            onClick={() => {
              //console.log(record);
              dispatch(push_data_view(record.id, auth_data));
            }}
          >
            <Link to="/View">{value}</Link>
          </span>
        );
      },
    },
    {
      key: "2",
      title: "Created at",
      dataIndex: "created_at",
      sorter: (a, b) => a.created_at - b.created_at,
      render: (value, record) => {
        const date = value.substring(0, 10);
        const time = value.substring(12, 19);
        let final = date + "    " + time;
        const status = record.is_published ? "success" : "error";
        return <Badge status={status} text={final} />;
      },
    },
    {
      key: "3",
      title: "Updated at",
      dataIndex: "updated_at",
      sorter: (a, b) => a.updated_at - b.updated_at,
      render: (value, record) => {
        const date = value.substring(0, 10);
        const time = value.substring(12, 19);
        let final = date + "    " + time;
        return <> {final} </>;
      },
    },
    {
      width: 200,
      render: (text, record, index) => {
        return (
          <div className="table-actions">
            {hoveredRowIndex === index && (
              <>
                <DeleteOutlined
                  onClick={() => {
                    handleDelete(record);
                  }}
                  style={{ color: "red", paddingRight: "16px" }}
                />
                {record.is_published ? (
                  <Button
                    onClick={() => {
                      handleUnpublish(record);
                    }}
                    type="primary"
                    danger
                  >
                    Unpublish
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => {
                      handlePublish(record);
                    }}
                  >
                    Publish
                  </Button>
                )}
              </>
            )}
          </div>
        );
      },
    },
  ];

  const handleUnpublish = (record) => {
    //console.log(record);
    const response_unpublish_id = auth_data;
    dispatch(unpublish_data(record, response_unpublish_id, dispatch));
  };
  const handlePublish = (record) => {
    //console.log(record);
    const response_publish_id = auth_data;
    dispatch(publish_data(record, response_publish_id, dispatch));
  };

  const searchData = (data, value) => {
    if (!value) {
      return data;
    } else {
      return data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const filteredData = searchData(datas, searchValue);

  const handleDelete = (record) => {
    //console.log(record);
    const response_data_del = auth_data;
    dispatch(delete_row(record, response_data_del, dispatch));
  };

  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const handleRowHover = (record, index) => {
    setHoveredRowIndex(index);
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    //console.log(values, "from the drawer");
    const title = values.Blogtitle;
    const Content = values.Content;
    const image = values.image;
    const response_data = auth_data;
    const data = {
      name: title,
      content: Content,
      image: image.file.originFileObj,
      auth_key: response_data,
    };
    dispatch(create_data(data, auth_data, dispatch));
    //console.log(data);
    form.resetFields();
    onClose();
  };

  const props = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        //console.log(info.file);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      //console.log("Dropped files", e.dataTransfer.files);
    },
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
        <div className="post_second_bar">
          <div className="in_h1_post_second_bar">
            <h1>Posts</h1>
          </div>
          <div className="in_search_button_post_second_bar">
            <Search
              placeholder="Search"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              style={{
                width: 286,
                height: 32,
              }}
            />
            <span className="create_button">
              <Button type="primary" onClick={showDrawer}>
                Create
              </Button>
              <Drawer
                title="Create"
                placement="right"
                onClose={onClose}
                open={open}
              >
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  form={form}
                >
                  <label className="label">
                    <span className="Blog-title">
                      Blog title<span className="text-style-1">*</span>
                    </span>
                  </label>
                  <FormItem
                    colon={false}
                    name="Blogtitle"
                    rules={[
                      {
                        required: true,
                        type: "text",
                      },
                    ]}
                  >
                    <Input
                      id="in_blogtitle"
                      placeholder="Title"
                      style={{
                        width: "323px",
                        height: "40px",
                        borderRadius: "4px",
                      }}
                    />
                  </FormItem>

                  <label className="label">
                    <span className="Blog-title">
                      Cover image<span className="text-style-1">*</span>
                    </span>
                  </label>
                  <Form.Item
                    name="image"
                    rules={[
                      {
                        required: true,
                        message: "Please upload cover image!",
                      },
                    ]}
                  >
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Cover image</p>
                      <p className="ant-upload-hint">image format: .jpg .png</p>
                    </Dragger>
                  </Form.Item>

                  <label className="label">
                    <span className="Blog-title">
                      Content<span className="text-style-1">*</span>
                    </span>
                  </label>
                  <FormItem
                    colon={false}
                    name="Content"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.TextArea
                      id="in_content"
                      style={{ height: "189px" }}
                      placeholder="Blog content"
                    />
                  </FormItem>
                  <FormItem className="button_drawer">
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                      Cancel
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </FormItem>
                </Form>
              </Drawer>
            </span>
          </div>
        </div>
      </div>
      <div className="table">
        <Table
          columns={columns}
          dataSource={filteredData}
          onRow={(record, index) => ({
            height: "66",
            onMouseEnter: () => handleRowHover(record, index),
            onMouseLeave: () => setHoveredRowIndex(null),
          })}
        ></Table>
      </div>
    </>
  );
}
export default Posts;
