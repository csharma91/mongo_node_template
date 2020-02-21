import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, LOADING_USER } from "../types";
import axios from 'axios'

export const loginUser = (userData, history) => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post("api/auth", userData)
    .then(res => {
      const AuthToken = res.data.token;
      localStorage.setItem('AuthToken', AuthToken)
      axios.defaults.headers.common["Authorization"] = AuthToken;
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
    .get("/api/stockfeed/all")
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
