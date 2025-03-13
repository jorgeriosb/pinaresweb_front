"use client";
import useAuth from '../app/hooks/useAuth';

const AuthCheck = () => {
    console.log("aqui jeje")
    useAuth(); // This will handle redirection logic when component is mounted

  return <div>Loading...</div>; // Show loading while redirecting
};

export default AuthCheck;