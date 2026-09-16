import axios from "axios";
import { createContext, useEffect, useState } from "react";
import service from "../services/index.services";


// context component => shares the context with the app 
const AuthContext = createContext()


// Wrapper component => holds the states and functions to be shared 
function AuthWrapper({children}){ // destructure the children form props 

    // to do: add states and functions here 

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [loggedUserId, setLoggedUserId] = useState(null)
    const [user, setUser] = useState(null)
    const [isVerifyingUser, setIsVerifyingUser] = useState(true)

    const verifyUser = async () =>{
        //.. this function will send the token to the backend so he backend can veryfy it 

        const authToken = localStorage.getItem("authToken") // extracting the element form local storage
        
        try {
            //    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}api/auth/verify`, {
            //     headers:{
            //         authorization:`Bearer ${authToken}` // this is the syntax (Bearer token) space is imporrtant 
            //     }
            //    })


            const response = await service.get("/auth/verify")
           console.log(response) // test (how does the fornt conect to the backend)

           // the token is valid 

           setIsLoggedin(true)
           setLoggedUserId(response.data.payload._id)
           setUser(response.data.payload)
           setIsVerifyingUser(false)

        } catch (error) {
            // the token is not valid
            setIsLoggedin(false)
            setLoggedUserId(null)
            setUser(null)
            setIsVerifyingUser(false)
        }
        
    }

    useEffect(() =>{
        verifyUser() // we call this when the app loads for the first time to check if the user already has a valid token
    }, [])

    const passedContext = {
        isLoggedin,
        setIsLoggedin,
        loggedUserId,
        setLoggedUserId,
        user,
        setUser,
        isLoading: isVerifyingUser,
        verifyUser
    }

    if (isVerifyingUser){

        //!invest some time into a cool animation for the user to see on their first visit to the app.
        return <h3>Verifying user credentials...</h3> // here is where the best animation must be 
    }

    return (

        // passing props 
        <AuthContext.Provider value={passedContext}> 
            {children}
        </AuthContext.Provider>
    )

}

//remeber that we use only export because we are passing more than one thing 

export{
    AuthContext,
    AuthWrapper
}