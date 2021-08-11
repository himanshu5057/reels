import React,{useContext} from 'react'
import {Route,Redirect} from "react-router-dom";
import { AuthContext } from '../Context/SignMethod';
function PrivateRoute({component:Component,...rest}) {
    const { currentUser } = useContext(AuthContext);
    // console.log(currentUser);
    return (
        <Route {...rest} render={props=>{
            return currentUser?<Component {...props} />:<Redirect to ="/signin"></Redirect>
        }}>
        </Route>
    )
}

export default PrivateRoute
