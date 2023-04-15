import { Dispatch, Store,  } from "redux"
import * as constant from "../constants/user.constant"
import { UserService, loginInputs, registerInputs } from "~/services/user.service"
import { RootState } from ".."

export const loginAction = (payload: loginInputs) => async (dispatch: Dispatch, getState : () => RootState) => {
    try {
        
        dispatch({
            type: constant.USER_LOGIN_REQUEST
        })

        const {data}: any = await UserService.login(payload);
        localStorage.setItem("userInfo", JSON.stringify(data.user))
        localStorage.setItem("token", data.token)

        dispatch({
            type: constant.USER_LOGIN_SUCCESS,
            payload: data.user
        })
        
    } catch (error:any ) {
        dispatch({
            type: constant.USER_LOGIN_FAIL,
            payload: error?.response?.data?.message || "Something wrongs!!"
        })
    }
}

export const registerAction = (payload: registerInputs) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        dispatch({
            type: constant.USER_REGISTER_REQUEST
        })

        const {data}: any = await UserService.register(payload);
        
        dispatch({
            type: constant.USER_REGISTER_SUCCESS
        })
    } catch (error: any) {
        dispatch({
            type: constant.USER_REGISTER_FAIL,
            payload: error?.response?.data?.message || "Something wrongs!!"
        })
    }
}