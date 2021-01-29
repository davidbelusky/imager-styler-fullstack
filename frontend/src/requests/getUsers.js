
import {axiosApiInstance} from "../axiosTokenHandle"
import {API_URL} from "../constants"


export async function getUsers(){
    try {
        const result = await axiosApiInstance.get(`${API_URL}/api/active_users/`)
            if (!result){
                return false
                }
            else {
                return result.data
            }
        }
        catch (e) {
            console.log(e)
            return false
        }}


