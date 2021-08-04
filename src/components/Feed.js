import React, { useState, useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../Context/SignMethod'
import { database, storage } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import Ioa from './Ioa';
import { v4 as uuidv4 } from 'uuid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Posts from './Posts';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
            overflow:"hidden",

        },
    },
    cont: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
    },
    button: {
        paddingTop: "2%",
        paddingLeft: "29%",
        marginBottom:"0.5%",
    },
    container:{
        height:"100vh",
        width:"100vw",
        overflow:"hidden",
    },

}));

function Feed() {
    const classes = useStyles();
    const inputFile = useRef();
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState();
    const [isUploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const types = ["video/mp4", "video/webm", "video/ogg"];
    const uploadFile = (e) => {
        let file = e?.target?.files[0];
        try {
            setUploading(true);
            if (!file) {
                setError("Please select a file");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            if (file.size / (1024 * 1024) > 100) {
                setError("Selected file is too big");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            if (types.indexOf(file.type) == -1) {
                setError("Please select a video file");
                setTimeout(() => {
                    setError("");
                }, 2000);
                return;
            }
            const id = uuidv4();
            const uploadTaskListener = storage.ref(`posts/${userData.uid}/${file.name}`).put(file);

            uploadTaskListener.on('state_change', fn1, fn2, fn3);
            function fn1(snapshot) {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }
            function fn2(error) {
                setError(error);
                console.log(error);
                setTimeout(() => {
                    setError("");
                }, 2000);
                setUploading(false);
            }
            async function fn3() {
                let downloadUrl = await uploadTaskListener.snapshot.ref.getDownloadURL();
                // console.log(downloadUrl);
                let obj = {
                    comments: [],
                    likes: [],
                    pId: id,
                    pUrl: downloadUrl,
                    uName: userData?.userName,
                    createdAt: database.getCurrentTimeStamp(),
                    profileUrl: userData.profileUrl,
                    uid: userData?.uid,
                }
                let ref = await database.posts.add(obj);
                await database.users.doc(userData.uid).update({
                    postIds: [...userData.postIds, ref.id],
                })
                setUploading(false);
            }
        }
        catch (e) {
            console.log(e);
            setError(e);
            setUploading(false);
            setTimeout(()=>{
                setError(null);
            },2000)
        }
    }
    useEffect(() => {
        console.log(currentUser.uid);
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
            console.log(doc.data());
        });
    }, [currentUser])
    return (
        <div>
            {
                userData == null ?
                    <><div className={classes.cont}>
                        <CircularProgress />
                    </div>
                    </> :
                    <div className={classes.container}>
                        <Navbar className={classes.navbar}></Navbar>
                        <input type="file" id="filee" onChange={uploadFile} ref={inputFile} style={{ display: "none" }} />

                        <div className={classes.button}>
                            <label htmlFor="filee">
                                <Button variant="outlined" color="secondary" onClick={() => { inputFile.current.click(); }}>
                                    Add Video
                                </Button></label>
                        </div>
                        {isUploading ? <LinearProgress color='secondary' style={{ marginBottom:"2%" ,width:"40%", marginLeft:"12%"}} /> : <></>}
                        <Posts/>
                    </div>
            }
        </div>
    )
}

export default Feed
