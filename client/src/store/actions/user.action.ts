import { Dispatch, Store,  } from "redux"
import * as constant from "../constants/user.constant"
import { UserService, loginInputs } from "~/services/user.service"
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