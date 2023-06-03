import { clearLocalStorage, getLocalStorageItem, setLocalStorageItem } from "../../utils/localStorage";
import * as types from "./actionType";

const initData = {
  isLoading: false,
  isError: false,
  errorMessage: "",
  signupStatus: false,
  accountBalance: 0,
  auth: getLocalStorageItem("accessToken") || "",
  token: getLocalStorageItem("accessToken") || "",
};

export const authReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case types.ACCOUNT_LOADING:
      return { ...state, isLoading: true };
    case types.ACCOUNT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        signupStatus: false,
        errorMessage: payload,
      };
    case types.LOGIN_SUCCESS:
      setLocalStorageItem("accessToken", payload);
      return { ...state, isLoading: false, token: payload };
    case types.ACCOUNT_LOGOUT:
      clearLocalStorage();
      return { ...state, isLoading: false, token: "", auth: "" };
    default:
      return state;
  }
};
