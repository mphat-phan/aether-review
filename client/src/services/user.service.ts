import { API } from "~/utils/api";
export class UserService {
    static async test () {
        return await API.get("api")
    }
}