import React, { useState, useContext, useRef, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../Context/SignMethod';
import { database, storage } from './firebase';
import TextField from '@material-ui/core/TextField';
import logo from './personlogo.jpg'
import { display } from '@material-ui/system';
import { useHistory } from 'react-router-dom';
import Error from './Error';
const useStyles = makeStyles((theme) => ({
    container: {
        overflow: "hidden",
        // backgroundColor: "#C6FFDD",
        // backgroundColor: "#5c57a6",
        backgroundColor:"#253f52",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection:"row",
        // justifyContent: "center",
        // alignItems: "center",
        margin: "0px",
        padding: "0px"
    },

    left:{
        width:"60%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",

    },
    right:{
        width:"40%",
        height:"100%",
    },
    form: {
        position:"relative",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        // padding: "5%",
        // paddingLeft:"7%",
        borderRadius: "00px",
        backgroundColor: "#e2e7f4",
        // marginLeft: "60%"

    },

    TextField: {
        padding: "7%",
        display: 'flex',
        flexWrap: 'wrap',
        width: "100%",

    },
    signup: {
        backgroundColor: "#e85985",
        marginTop: "3%",
        marginLeft: "8%",
        height: "6%",
        width: "20%",
        borderRadius: "20px",
        border: "none",
        "&:hover":{
            cursor:"pointer",
            backgroundColor:"#E3366C"
        }
    },
    addDp: {
        borderRadius: "500px",
        // height: "50%",
        width: "25%",
        marginBottom:"8%",
        "&:hover":{
            cursor:"pointer"
        }
    },
    signin:{
        display:"flex",
        flexDirection:"row"
    }


}));



function SignUp() {
    const classes = useStyles();
    const history=useHistory();
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [name, setName] = useState("");
    const [dp, setDP] = useState();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { signUp, currentUser } = useContext(AuthContext);
    const inputFile = useRef(null);
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            let res = await signUp(email, pswd);
            let uid = res.user.uid;
            const uploadTaskListener = storage.ref(`/users/${uid}/profileImage`).put(dp);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion

            uploadTaskListener.on('state_change', fn1, fn2, fn3);
            function fn1(snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
            }
            function fn2(error) {
                setError(error.message);
                setTimeout(() => {
                    setError("");
                }, 3000);
                setLoading(false);
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                // console.log(downloadUrl);
                await database.users.doc(uid).set({
                    uid: uid,
                    email: email,
                    userName: name,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: downloadUrl,
                    postIds:[]
                });
                setLoading(false);
            }
        } catch (e) {
            setError(e.message)
            setTimeout(() => {
                setError("");
            }, 3000);
            setLoading(false);
        }
    }
    const handleProfileImage = (e) => {
        let file = e.target.files[0];
        if (file != null) {
            setDP(file);
        }
    }
    useEffect(() => {
        if(currentUser){
            history.push("/");
            setLoading(false);
        }
    }, [currentUser])
    return (
        <div className={classes.container} >
            <div className={classes.left}>
                <img src="https://cdn.dribbble.com/users/652746/screenshots/1773134/kino_01.gif" width="500px" height="500px" alt ="Height"></img>
            
            </div>
            <div className={classes.right}>
                <div className={classes.form}>
                <Error classN="signup" error={error}></Error>
                        <input type="file" id="file" accept="image/*" ref={inputFile} onChange={handleProfileImage} style={{ display: "none" }} />
                        {/* <input type="file"  onChange={handleProfileImage}></input> */}
                        <img className={classes.addDp} onClick={() => { inputFile.current.click(); }} src={dp == null ? logo : URL.createObjectURL(dp)} ></img>
                    
                    <form onSubmit={handleSignup}>

                        <div className={classes.TextField}>
                            <TextField size="small" id="outlined-basic" label="Username" variant="outlined" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className={classes.TextField}>
                            <TextField size="small" type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" />
                        </div>
                        <div className={classes.TextField}>
                            <TextField size="small" id="outlined-basic" label="Password" variant="outlined" type="password" value={pswd} onChange={(e) => setPswd(e.target.value)} />

                        </div>
                    </form>

                    <button className={classes.signup} type="submit" disabled={isLoading} onClick={handleSignup} >Signup</button>
                    
                    <div className={classes.signin}>
                        <h5>Don't have an account?</h5>
                        <h5 onClick={()=>{history.push('/signin')}} style={{color: "blue",paddingLeft:"5px",cursor:"pointer"}}>Sign In</h5>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default SignUp
