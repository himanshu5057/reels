import React,{useState,useEffect} from 'react'
import { auth } from '../components/firebase'
export const AuthContext = React.createContext();
function SignMethod({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [isLoading, setLoader] = useState(true);
    function signUp(email, pswd) {
        return auth.createUserWithEmailAndPassword(email, pswd);
    }

    function signin(email, pswd) {
        return auth.signInWithEmailAndPassword(email, pswd);
    }

    function signout() {
        return auth.signOut();
    }
    try{
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            console.log(user);
            setLoader(false);
        });
        return()=>{
            unsubscribe();
        }
    },[] )}
    catch(e){
        console.log(e);
    }
    const value={
        currentUser,
        signUp,
        signin,
        signout
    }
    
    return (
        <div>
            <AuthContext.Provider value={value}>
                {!isLoading && children}
            </AuthContext.Provider>
        </div>
    )
}

export default SignMethod;
