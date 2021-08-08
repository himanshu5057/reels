import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIconFilled from '@material-ui/icons/Favorite';
import { database } from './firebase';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    like:{
        color:'#e74c3c',
        cursor:'pointer'
    },
    unlike:{
        color:'black',
        cursor:'pointer'
    }
})
function Likes({ userData = null, postData = null }) {
    const [like, setLike] = useState();
    const classes = useStyles();
    useEffect(() => {
        let check = postData.likes.includes(userData?.uid) ? true : false;
        setLike(check);

    }, [postData])
    const handleLike= async()=>{
        if (like) {
            let uarr = postData.likes.filter(e => {
                return e != userData.uid
            })
            database.posts.doc(postData.postId).update({
                likes: uarr
            })
        }
        else {
            let uarr = [...postData.likes, userData.uid];
            database.posts.doc(postData.postId).update({
                likes: uarr
            })
        }
    }
    return (
        <div>
            {
                like != null ? <>
                    {!like ? <FavoriteIcon className={`${classes.unlike} `} onClick={handleLike} /> :
                        <FavoriteIconFilled className={`${classes.like} `} onClick={handleLike} />}
                </>
                    : <></>
            }
        </div>
    )
}

export default Likes
