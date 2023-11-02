export const log_out = (payload) => {
  return {
    type: "LOG_OUT",
    payload,
  };
};

export const clear_view = (payload) => {
  return {
    type: "CLEAR_VIEW",
    payload,
  };
};

export const push_offset = (payload) => {
  if (payload != 1) {
    payload = payload + 1;
  }
  return {
    type: "PUSH_OFFSET",
    payload,
  };
};

export const show_published_post_user = (payload) => {
  return {
    type: "GET_IND_USER_PUBLISHED_SUCCESS",
    payload,
  };
};
