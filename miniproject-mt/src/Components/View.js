import React from "react";
import { useState } from "react";
import {
  delete_row,
  unpublish_data,
  publish_data,
  edit_row,
} from "../Actions/Saga_action";
import { clear_view } from "../Actions/Reducer_action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { Input, Button, Drawer, Form, Upload, message } from "antd";
const { Dragger } = Upload;

const FormItem = Form.Item;
function View() {
  const data = useSelector((state) => state.push_data_view_redu);
  //console.log(data);
  const image_data = data.image_url;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth_data = useSelector((state) => state.aunthentication_res_redu);

  const HandleBack = () => {
    const empty = "";
    dispatch(clear_view(empty));
    navigate("/Posts");
  };

  const handleDelete = () => {
    //console.log(data);
    const response_data_del = auth_data;
    dispatch(delete_row(data, response_data_del, dispatch));
    navigate("/Posts");
  };

  const handleUnpublish = () => {
    const response_unpublish_id = auth_data;
    const update_data_unpublish = { ...data, is_published: false };
    dispatch(
      unpublish_data(update_data_unpublish, response_unpublish_id, dispatch)
    );
  };

  const handlePublish = () => {
    //console.log(data);
    const response_publish_id = auth_data;
    const update_data_publish = { ...data, is_published: true };
    dispatch(publish_data(update_data_publish, response_publish_id, dispatch));
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

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    //console.log("in edit button", data);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    //console.log(values, "from the drawer");
    const title = values.blogtitle;
    const content = values.content;
    const image = values.image;
    const id = data.id;
    const edited_data = {
      id: id,
      name: title,
      content: content,
      image: image.file.originFileObj,
    };
    dispatch(edit_row(edited_data, auth_data, dispatch));
    onClose();
  };

  const initialvalues = {
    blogtitle: data.name,
    image: data.image_url,
    content: data.content,
  };

  return (
    <div>
      <div className="header_view">
        <div className="back_view">
          <Button onClick={HandleBack} style={{ border: "none" }}>
            Back
          </Button>
        </div>
        <div className="del_edit_publish_view">
          <DeleteOutlined
            onClick={handleDelete}
            style={{ color: "red", paddingRight: "16px" }}
          />
          <span className="del_pad_unpub">
            <Button onClick={showDrawer} type="primary">
              Edit
            </Button>
          </span>

          {data.is_published ? (
            <Button onClick={handleUnpublish} type="primary" danger>
              Unpublish
            </Button>
          ) : (
            <Button type="primary" onClick={handlePublish}>
              Publish
            </Button>
          )}
        </div>
      </div>
      <div className="drawer_edit">
        <Drawer title="Create" placement="right" onClose={onClose} open={open}>
          <Form
            name="basic"
            form={form}
            initialValues={initialvalues}
            onFinish={onFinish}
          >
            <label className="label">
              <span className="Blog-title">
                Blog title<span className="text-style-1">*</span>
              </span>
            </label>
            <FormItem
              name="blogtitle"
              rules={[
                {
                  required: true,
                  message: "Please enter Blog title!",
                },
              ]}
            >
              <Input
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
              <Dragger
                {...props}
                maxCount={1}
                defaultFileList={[
                  {
                    name: "image",
                  },
                ]}
              >
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
              name="content"
              rules={[
                {
                  required: true,
                  message: "Please enter Blog content!",
                },
              ]}
            >
              <Input.TextArea style={{ height: "189px" }} />
            </FormItem>
            <FormItem className="button_drawer">
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </FormItem>
          </Form>
        </Drawer>
      </div>

      <div className="image_container">
        <img className="_image_" src={image_data} alt="pics" />
      </div>
      <h1 className="post_title">{data.name}</h1>
      <div className="post_content">
        <p>{data.content}</p>
      </div>
    </div>
  );
}

export default View;
