import React, { useContext, useState } from 'react';
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
                const signedInUser = { name: displayName, email }
                // console.log(signedInUser);
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;
                // ...
            });
    }
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 5;
            const isPasswordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (event) => {

        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    setNewUser(newUserInfo)
                    updateUserName(user.name)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
        }
        if (!newUser && user.email & user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    setNewUser(newUserInfo)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }
        event.preventDefault();
    }
    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
          displayName: name,
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
    }
    return (
        <div>

            <form onsubmit={handleSubmit} action="">
                <input onChange={() => { setNewUser(!newUser) }} type="checkbox" name="newUser" id="" />
                <label style={{ color: 'white' }} htmlFor="newUser">Click the checkbox For New User SignUp</label>
                {newUser && <input onBlur={handleBlur} type="text" name="name" id="" placeholder='Name' />}<br />
                <input onBlur={handleBlur} type="email" name="email" id="" placeholder='Email' /><br />
                <input onBlur={handleBlur} type="password" name="password" id="" placeholder='PassWord' /><br />
                <input style={{ backgroundColor: 'orange' }} type="submit" value={newUser? 'Create an account':'Sign In'} />
            </form>

            <button onClick={handleGoogleSignIn} style={{ backgroundColor: 'orange', marginLeft: '30%', padding: '1% 15% 2% 15%', fontSize: '20px' }}>Google Sign In</button>
        </div>
    );
};

export default Login;