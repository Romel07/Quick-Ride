import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.login';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css'


const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const { displayName, email } = result.user;
                const signedInUser = {name: displayName, email}
                // console.log(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }
    return (
        <div>
            <form action="">
                <input type="text" name="" id="" placeholder='Name' /><br/>
                <input type="email" name="" id="" placeholder='Email'/><br/>
                <input type="password" name="" id="" placeholder='PassWord'/><br/>
                <input type="password" name="" id="" placeholder='Confirm Password'/><br/>
                <input style={{backgroundColor:'orange'}} type="submit" value="Create an account"/>
            </form>           

            <button onClick={handleGoogleSignIn} style={{backgroundColor:'orange', marginLeft:'30%', padding: '1% 15% 2% 15%', fontSize:'20px'}}>Google Sign In</button>
        </div>
    );
};

export default Login;