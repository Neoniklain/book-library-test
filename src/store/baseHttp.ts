import axios, {AxiosInstance} from "axios"

class BaseHttpSingleton {
    private static _instance: AxiosInstance;

    public static get Instance() {
        return this._instance || (this._instance = axios.create({baseURL: process.env.VUE_APP_LIBRARY_API_URL}))
    }
}

const BaseHttp = BaseHttpSingleton.Instance
export default BaseHttp