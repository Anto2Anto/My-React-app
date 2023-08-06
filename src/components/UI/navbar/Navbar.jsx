import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import about from "../../../pages/About";
import posts from "../../../pages/Posts";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            <MyButton onClick={logout}>
                Log out
            </MyButton>
            <MyButton>
                <Link className="navbar__links" to='/about'>About</Link>
            </MyButton>
            <MyButton>
                <Link className="navbar__links" to='/posts'>Posts</Link>
            </MyButton>
        </div>
    );
};

export default Navbar;