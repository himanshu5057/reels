import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../Context/SignMethod';
import { database, storage } from './firebase';
import TextField from '@material-ui/core/TextField';
import logo from './personlogo.jpg'
import { display } from '@material-ui/system';
const useStyles = makeStyles((theme) => ({
    container: {
        overflow: "hidden",
        // backgroundColor: "#C6FFDD",
        backgroundColor: "#5c57a6",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0px",
        padding: "0px"

    },
    form: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "40%",
        height: "100%",
        // padding: "5%",
        // paddingLeft:"7%",
        borderRadius: "00px",
        backgroundColor: "#e2e7f4",
        marginLeft: "60%"

    },

    TextField: {
        padding: "7%",
        display: 'flex',
        flexWrap: 'wrap',
        width: "100%",

    },
    login: {
        backgroundColor: "#e85985",
        marginTop: "3%",
        marginLeft: "8%",
        height: "6%",
        width: "20%",
        borderRadius: "20px",
        border: "none",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#E3366C"
        }
    },
    signup:{
        display:"flex",
        flexDirection:"row"
    }


}));
function Signin() {
    const history=useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [uid, setUid] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { signin, currentUser } = useContext(AuthContext);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signin(email, pswd);
            setUid(res.user.uid);
            setLoading(false);
            history.push("/");
        }
        catch (err) {
            setError(err.message);
            console.log(err);
            setTimeout(() => {
                setError("");
            }, 2000);
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(currentUser)
        {
          history.push('/')
        }
      },[])
    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <form onSubmit={onSubmit}>
                    <div className={classes.TextField}>
                        <TextField size="small" type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                    </div>
                    <div className={classes.TextField}>
                        <TextField size="small" id="outlined-basic" label="Password" variant="outlined" type="password" value={pswd} onChange={(e) => setPswd(e.target.value)} />
                    </div>
                </form>
                <button className={classes.login} type="submit" disabled={isLoading} onClick={onSubmit} >Sign in</button>
                <div className={classes.signup}>
                    <h5>Don't have an account?</h5>
                    
                    <h5 style={{color: "blue",paddingLeft:"5px"}}>Signup</h5>
                </div>
                
            </div>
        </div>
    )
}

export default Signin
