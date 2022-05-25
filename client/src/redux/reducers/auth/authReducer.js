import * as types from "../../constants/types";

const initialState = {
  loading: false,
  error: "",
  user: {},
  isLogged: false,
  message: "",
};

export const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROFILE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case types.GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        message: "",
        isLogged: action.payload.logged,
      };
    case types.GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

      case types.UPLOAD_AVATAR_REQUEST:
        return {
          ...state,
          loading: false,
        };
      case types.UPLOAD_AVATAR_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          message: "",
        };
      case types.UPLOAD_AVATAR_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    case types.REGISTER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.REGISTER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case types.REGISTER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.LOGIN_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        message: "",
        error: "",
      };
    case types.LOGIN_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        message: action.payload.message,
        isLogged: true,
      };
    case types.LOGIN_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.ACTIVATION_EMAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.ACTIVATION_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isLogged: false,
        error: "",
      };
    case types.ACTIVATION_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: "",
      };

    case types.FORGET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isLogged: false,
        error: "",
      };
    case types.FORGET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: "",
      };

    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        isLogged: false,
        error: "",
      };
    case types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: "",
      };
    
      case types.EDIT_USER_REQUEST:
        return {
          ...state,
          loading: false,
        };
      case types.EDIT_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          user: action.payload.user,
          message: "",
        };
      case types.EDIT_USER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

    case types.LOGOUT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        isLogged: false,
      };
    case types.LOGOUT_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};
