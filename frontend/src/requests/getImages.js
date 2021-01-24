import {axiosApiInstance} from "../axiosTokenHandle"
import {API_URL} from "../constants"


export async function getImages(){
    try {
        const result = await axiosApiInstance.get(`${API_URL}/api/images/`)
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