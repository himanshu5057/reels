import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
    signup: {
        // width: '100%',
    position:"absolute",
    bottom:"61%",
    },
    signin:{
        position:"absolute",
        bottom:"72%",
    }

}))
function Error({ error = "",classN="signin" }) {
    const classes = useStyles();
    console.log(classN);
    return (
        error != "" ?
        
            (<div className={classN=="signin"?classes.signin:classes.signup}>
                <Alert variant="filled" severity="error">{error}</Alert>
                </div>
            ) :
            <></>
    )
}

export default Error
