import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Modal from "react-modal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ name }) => {
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    rollno: '',
    password: '',
  });

  const [p,setp]=useState("")

  const click = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2000/api/users/student-login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          }
        }
      )
      console.log(response)
      if (response && response.data && response.data.token) {
        const accessToken = await response.data.token;
        localStorage.setItem('accessToken', accessToken);
        console.log("login successful");
        console.log("Access Token:",accessToken);
        navigate("/dashboard");
      }
      else{
        alert("no token recieved");
        console.log(response.data)
      }
    } catch (error) {
      setp("Invalid credentials!")
      console.error(error);
    }
  };

  

  return (
    <>
    <Nav />

      <div className="Lgn-body">
        <form id="student" className="login-box" onSubmit={click}>
          <h2>{name}'s Login</h2>
          <label className="details" htmlFor="S-Username">
            Username
          </label>
          <input
            className="input"
            type="text"
            id="S-Username"
            placeholder={
              name == "Student" ? "Enter your rollno." : "Enter your username"
            }
            value={data.rollno}
            onChange={(e)=>setData({...data,rollno:e.target.value})}
            required
          />
          <label className="details" htmlFor="S-Password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="S-Password"
            placeholder="Enter your Password"
            value={data.password}
            onChange={(e)=>setData({...data,password:e.target.value})}
            required
          />
          <a href="" target="_blank" className="forget">
            Forget Password ?
          </a>
          <p className="error">{p}</p>
          <button type="submit" className="lg-btn">
            Log in
          </button>

          {name == "Student" ? (
            <p>
              don't have an account?
              <Link to="/student-signup" className="su-anc" id="stu-signbtn">
                Sign up
              </Link>
            </p>
          ) : (
            ""
          )}
        </form>

        {name == "Student" ? (
          <div className="lgn-btns">
            <Link to="/teacher-login">Teacher Login</Link>
          </div>
        ) : (
          <div className="lgn-btns">
            <Link to="/student-login">Student Login</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
