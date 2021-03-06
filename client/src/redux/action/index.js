import * as types from '../constants/types';
import axios from 'axios'

export const register = (signUpData) => async(dispatch) => {
    try {
        dispatch({
            type: types.REGISTER_PROFILE_REQUEST
        })

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            crossdomain: true,
        };

        const res = await axios.post('/api/v1/auth/register', signUpData, config)

        let data;

        if(res.status === 200 || res.status === 201) {
            data  = res.data;
    
            dispatch({
                type: types.REGISTER_PROFILE_SUCCESS,
                payload: data
            })

            return data
        }
    } catch (error) {
        const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.REGISTER_PROFILE_FAIL,
            payload: err
        })
    }

}

export const login = (loginData) => async(dispatch) => {
    try {
        dispatch({
            type: types.LOGIN_PROFILE_REQUEST
        })

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            crossdomain: true,
        };

        const res = await axios.post('/api/v1/auth/login', loginData, config);

        let data;

        if(res.status === 200 || res.status === 201) {
            data  = res.data;
    
            dispatch({
                type: types.LOGIN_PROFILE_SUCCESS,
                payload: data
            })

            return data
        }

    } catch (error) {
        const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.LOGIN_PROFILE_FAIL,
            payload: err
        })
    }
}

export const activationEmail = (activation_token) => async(dispatch) => {
    try {
        dispatch({
            type: types.ACTIVATION_EMAIL_REQUEST
        })

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            crossdomain: true,
        };

        const res = await axios.post('/api/v1/auth/activation', {activation_token}, config);

        let data;

        if((res.status === 200 || res.status === 201 ) && res.data ) {
            data  = res.data;
    
            dispatch({
                type: types.ACTIVATION_EMAIL_SUCCESS,
                payload: data
            })

            return data
        }
        
    } catch (error) {
        const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.ACTIVATION_EMAIL_FAIL,
            payload: err
        })
    }
}

export const forgetPassword = (userdata) => async(dispatch) => {
    try {
        dispatch({
            type: types.FORGET_PASSWORD_REQUEST
        })

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            crossdomain: true,
        };

        const res = await axios.post('/api/v1/auth/forgot_password', userdata, config);

        let data;

        if(res.status === 200 || res.status === 201) {
            data  = res.data;
    
            dispatch({
                type: types.FORGET_PASSWORD_SUCCESS,
                payload: data
            })

            return data
        }

    } catch (error) {
        const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.FORGET_PASSWORD_FAIL,
            payload: err
        })
    }
}

export const resetPassword = (userdata) => async(dispatch) => {
    try {
        dispatch({
            type: types.RESET_PASSWORD_REQUEST
        })

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            crossdomain: true,
        };

        const res = await axios.post('/api/v1/auth/resetpassword', userdata, config);

        let data;

        if(res.status === 200 || res.status === 201) {
            data  = res.data;
    
            dispatch({
                type: types.RESET_PASSWORD_SUCCESS,
                payload: data
            })

            return data
        }

    } catch (error) {
        const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.RESET_PASSWORD_FAIL,
            payload: err
        })
    }
}

export const getProfile = () => async(dispatch) => {
    try {
        dispatch({
            type: types.GET_PROFILE_REQUEST
        })

        const res = await axios.get('/api/v1/auth/profile');

        let data;

        if((res.status === 200 || res.status === 201) && res.data) {
            data  = res.data;
    
            dispatch({
                type: types.GET_PROFILE_SUCCESS,
                payload: {...data, logged: true}
            })

            return data
        }
    } catch (error) {
       const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.GET_PROFILE_FAIL,
            payload: err
        })

    }
}

export const uploadAvatar = (formData) => async(dispatch) => {
    try {
        dispatch({
            type: types.UPLOAD_AVATAR_REQUEST
        })

        const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
            crossdomain: true,
        };

        const res = await axios.patch('/api/v1/auth/upload', formData, config);

        let data;

        if(res.status === 200 || res.status === 201) {
            data  = res.data;
            
            dispatch({
                type: types.UPLOAD_AVATAR_SUCCESS,
                payload: data
            })

            return data.user;
        }

    } catch (error) {
        const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.UPLOAD_AVATAR_FAIL,
            payload: err
        })
    }
}

export const updateUser = (editData) => async(dispatch) => {
    try {
        dispatch({
            type: types.EDIT_USER_REQUEST
        })

        const config = {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
            crossdomain: true,
        };

        const res = await axios.patch('/api/v1/auth/updateuser', editData, config);

        let data;

        if(res.status === 200 || res.status === 201) {
            data  = res.data;
            
            dispatch({
                type: types.EDIT_USER_SUCCESS,
                payload: data
            })

            return data.user;
        }

    } catch (error) {
        const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.EDIT_USER_FAIL,
            payload: err
        })
    }
}



export const logout = () => async(dispatch) => {
    try {
        dispatch({
            type: types.LOGOUT_PROFILE_REQUEST
        })

        const res = await axios.get('/api/v1/auth/logout');

        let data;

        if(res.status === 200 || res.status === 201 || res.status === 304) {
            data = res.data;

            dispatch({
                type: types.LOGOUT_PROFILE_SUCCESS,
                payload: data
            })

            document.location.href = '/login'

            return data;
        }
    } catch (error) {
       const err =  error.response && error.response.data.message ? error.response.data.message : error.message;

        dispatch({
            type: types.LOGOUT_PROFILE_FAIL,
            payload: err
        })

    }
}