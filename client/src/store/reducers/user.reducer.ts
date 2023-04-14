import * as constant from "../constants/user.constant"
const loginReducer = (state={}, action:any) => {
    switch (action.type){
        case constant.USER_LOGIN_REQUEST: 
            return {
                loading: true,
                status: "pending"
            }
        case constant.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                status: "success",
                userInfo: action.payload
            }
        case constant.USER_LOGIN_FAIL: 
            return {
                loading: false,
                status: "fail",
            }
        default: 
            return state
    }
}

export {
    loginReducer
}