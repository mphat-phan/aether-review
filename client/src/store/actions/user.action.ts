import { Dispatch } from "redux"
import * as constant from "../constants/user.constant"
import { UserService } from "~/services/user.service"
export type LoginInputs = {
    username: string,
    email: string,
    password: string,
}
export const loginAction = (payload: LoginInputs) => async (dispatch: Dispatch) => {
    dispatch({
        type: constant.USER_LOGIN_REQUEST
    })
    
    const {data}: any = await UserService.test();

    console.log(data);

}