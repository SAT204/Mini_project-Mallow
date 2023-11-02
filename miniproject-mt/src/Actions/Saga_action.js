export const auth_login = (payload, navigate) => {
  return {
    type: "AUTH_LOGIN",
    payload,
    navigate,
  };
};

export const auth_signup = (payload, navigate) => {
  return {
    type: "AUTH_SIGNUP",
    payload,
    navigate,
  };
};

export const get_data_table = (payload, is_edit_id, dispatch) => {
  return {
    type: "GET_DATA_TABLE",
    payload,
    is_edit_id,
    dispatch,
  };
};

export const create_data = (payload, auth_data, dispatch) => {
  return {
    type: "CREATE_DATA",
    payload,
    auth_data,
    dispatch,
  };
};

export const edit_row = (payload, auth_data, dispatch) => {
  return {
    type: "EDIT_DATA",
    payload,
    auth_data,
    dispatch,
  };
};

export const delete_row = (payload, response_data_del, dispatch) => {
  return {
    type: "DELETE_DATA",
    payload,
    response_data_del,
    dispatch,
  };
};

export const publish_data = (payload, response_publish_id, dispatch) => {
  return {
    type: "PUBLISH_DATA",
    payload,
    response_publish_id,
    dispatch,
  };
};

export const unpublish_data = (payload, response_unpublish_id, dispatch) => {
  return {
    type: "UNPUBLISH_DATA",
    payload,
    response_unpublish_id,
    dispatch,
  };
};

export const push_data_view = (payload, auth_data) => {
  //console.log(payload);
  return {
    type: "PUSH_DATA_VIEW",
    payload,
    auth_data,
  };
};

export const dashboard_side_bar = (payload, offset) => {
  //console.log(payload);
  return {
    type: "GET_DASHBOARD_SIDE_BAR_DATA",
    payload,
    offset,
  };
};

export const show_published_post = (payload, id, auth_data) => {
  return {
    type: "SHOW_PUBLISHED_POST",
    payload,
    id,
    auth_data,
  };
};
