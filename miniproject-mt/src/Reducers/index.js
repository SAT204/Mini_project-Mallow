import auth_redu from "../Reducers/auth_redu";
import data_table_redu from "../Reducers/data_table_redu";
import aunthentication_res_redu from "./aunthentication_res_redu";
import push_data_view_redu from "./push_data_view_redu";
import dashboard_sidedata_redu from "./dashboard_sidedata_redu";
import offset_data_redu from "./offset_data_redu";
import dashboard_ind_data_redu from "./dashboard_ind_data_redu";
import dashboard_ind_data_user_redu from "./dashboard_ind_data_user_redu";
import { combineReducers } from "redux";

const Allreducer = combineReducers({
  auth_redu: auth_redu,
  data_table_redu: data_table_redu,
  aunthentication_res_redu: aunthentication_res_redu,
  push_data_view_redu: push_data_view_redu,
  dashboard_sidedata_redu: dashboard_sidedata_redu,
  offset_data_redu: offset_data_redu,
  dashboard_ind_data_redu: dashboard_ind_data_redu,
  dashboard_ind_data_user_redu: dashboard_ind_data_user_redu,
});

export default Allreducer;
