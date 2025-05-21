import axios from 'axios';
import Cookies from "js-cookie";
const token = Cookies.get("token");
const ApiLink=axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
      
        Authorization:`Bearer ${token}`, 

    }     
})

export default ApiLink;
