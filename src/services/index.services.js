import axios from "axios"

//service will be an object with all initial configurations for the request made into the backend.

const service = axios.create ({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api` // to not have this in all the requests

})

// send the token in the way that axios recommend in their documentation 
//configuring all outgoing reuest to include the token in a secure way

service.interceptors.request.use((config)=>{

    const authToken = localStorage.getItem("authToken")

    if (authToken){
        config.headers.authorization = `Bearer ${authToken}` // for all the request we need to pass the token 
    }

    return config 

})

export default service