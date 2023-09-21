import React, { useReducer, useEffect, useContext } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_ERRORS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
} from "../types";
export const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);
  return [state, dispatch];
};
//Load User
export const loadUser = async (dispatch) => {
  const tokenAuth = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": tokenAuth,
    },
  };

  try {
    const res = await axios.get("/api/auth", config);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login User
export const login = async (dispatch, formData) => {
  loadUser(dispatch);
  try {
    const res = await axios.post("/api/auth", formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//Register User
export const register = async (dispatch, formData) => {
  loadUser(dispatch);

  try {
    const res = await axios.post("/api/users", formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.msg,
    });
  }
};

//Logout
export const logout = (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
//Clear Errors
export const clearErrors = (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { token, loading } = state;
  setAuthToken(token);
  if (loading) {
    loadUser(dispatch);
  }
  useEffect(() => {
    setAuthToken(token);
  }, [token]);
  return (
    <AuthContext.Provider value={{ state: state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthState;
