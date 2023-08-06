import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Page for login</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Enter login' />
                <MyInput type='current-password' placeholder='Enter password' />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;