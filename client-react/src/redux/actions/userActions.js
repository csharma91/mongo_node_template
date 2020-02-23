import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  SET_UNAUTHENTICATED
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("api/auth", userData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err.response.data);
      console.log(typeof err.response.data);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.errors[0]
      });
    });
};

export const getUserData = () => dispatch => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/api/userprofile/test")
    .then(res => {
      console.log(res.data[0])
      dispatch({
        type: SET_USER,
        payload: res.data[0]
      });
    })
    .catch(err => console.log(err));
   
};

export const signupUser = (newUserData, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/api/users", newUserData)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch(err => {
      console.log(err.response.data.errors[0])
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data.errors[0]
      });
    });
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("AuthToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = token => {
  const AuthToken = token;
  localStorage.setItem("AuthToken", AuthToken);
  axios.defaults.headers.common["Authorization"] = AuthToken;
};
