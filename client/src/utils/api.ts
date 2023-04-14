import axios from "axios"
const baseURL = "http://localhost:5000";
export class API {
    
    static config = {
        headers: {"Content-Type": "application/json"}
    }

    static async get (path:string) {
        return await axios.get(`${baseURL}/${path}`, this.config)
    }

    static async post (path:string, payload: any){
        return await axios.post(`${baseURL}/${path}`,payload,this.config)
    }

    static async delete (path: string){
        return await axios.delete(`${baseURL}/${path}`, this.config)
    }
}