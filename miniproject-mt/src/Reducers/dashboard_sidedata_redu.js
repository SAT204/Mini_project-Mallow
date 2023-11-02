const data = [];

const dashboard_sidedata_redu = (state = data, action) => {
  switch (action.type) {
    case "GET_DASHBOARD_SIDEBAR_SUCCESS":
      //console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default dashboard_sidedata_redu;
