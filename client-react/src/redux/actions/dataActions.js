import {
  SET_STOCKFEEDS,
  LOADING_DATA,
  LIKE_STOCKFEED,
  UNLIKE_STOCKFEED,
  DELETE_STOCKFEED,
  SET_ERRORS,
  POST_STOCKFEED,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_STOCKFEED,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all Stockfeeds by User
export const getStockfeeds = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  const AuthToken = localStorage.getItem("AuthToken");
  axios.defaults.headers.common["x-auth-token"] = AuthToken;
  axios
    .get("/api/stockfeed")
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_STOCKFEEDS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_STOCKFEEDS,
        payload: []
      });
    });
};

//Like a Stockfeed
export const likeStockfeed = stockfeedId => dispatch => {
  axios.get(`/api/stockfeed/${stockfeedId}/like`).then(res => {
    console.log(res.data);
    dispatch({
      type: LIKE_STOCKFEED,
      payload: res.data
    }).catch(err => console.log(err));
  });
};

//Unlike a Stockfeed
export const unlikeStockfeed = stockfeedId => dispatch => {
  axios.get(`/api/stockfeed/${stockfeedId}/unlike`).then(res => {
    dispatch({
      type: UNLIKE_STOCKFEED,
      payload: res.data
    }).catch(err => console.log(err));
  });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
