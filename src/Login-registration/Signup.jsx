import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import axios from "axios";

const Signup = () => {
  const [formdata, setFormData] = useState({
    name: "",
    section: "",
    phoneno: "",
    email: "",
    rollno: "",
    password: "",
  });

  const [nameValid, setNameValid] = useState(true);
  const [secValid, setsecValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameValid(true);
    setsecValid(true);
    setEmailValid(true);
    setPasswordValid(true);
    setPhoneValid(true);
    setUsernameValid(true);

    if (
      formdata.name.length <= 0 ||
      formdata.section.length <= 0 ||
      formdata.phoneno.length <= 0 ||
      formdata.email.length <= 0 ||
      formdata.rollno.length <= 0 ||
      formdata.password.length <= 0
    ) {
      alert("please complete filling the form before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:2000/api/users/student-signup",
        formdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Form submitted successfully!");

      setFormData({
        name: '',
        section: '',
        phoneno: '',
        email: '',
        rollno: '',
        password: ''
      });
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const { data } = error.response;
        console.log(data);

        const p = data.errors;
        for (let i = 0; i < p.length; i++) {
          if (p[i] == "Invalid name") {
            // alert(p[i])
            setNameValid(false);
          } else if (p[i] == "Invalid section") {
            // alert(p[i])
            setsecValid(false);
          } else if (p[i] == "Invalid phone number") {
            // alert(p[i])
            setPhoneValid(false);
          } else if (p[i] == "Invalid email") {
            // alert(p[i])
            setEmailValid(false);
          } else if (p[i] == "Invalid roll number") {
            // alert(p[i])
            setUsernameValid(false);
          } else if (p[i] == "Invalid password") {
            // alert(p[i])
            setPasswordValid(false);
          }
        }

        // if (data.errors && Array.isArray(data.errors)) {
        //   data.errors.forEach((error) => {
        //   });
        // }
        //  else {
        //   alert("Details already exist!");
        // }
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    }
  };

  return (
    <>
      <Nav />
      <div className="Lgn-body">
        <form
          className="signupbox"
          id="stu-signup"
          name="stu-form"
          onSubmit={handleSubmit}
        >
          <h2>Student Registration</h2>
          <div className="inputs">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="signupint"
              value={formdata.name}
              onChange={(e) =>
                setFormData({ ...formdata, name: e.target.value })
              }
              required
            />
            {!nameValid && (
              <b className="error">*Please specify your name coorectly</b>
            )}
          </div>

          <div className="inputs">
            <input
              type="text"
              name="section"
              placeholder="Enter your section"
              className="signupint"
              value={formdata.section}
              onChange={(e) =>
                setFormData({ ...formdata, section: e.target.value })
              }
              required
            />
            {!secValid && <b className="error">*Invalid mobile number</b>}
          </div>

          <div className="inputs">
            <input
              type="text"
              name="phoneno"
              placeholder="Enter your mobile number"
              className="signupint"
              value={formdata.phoneno}
              onChange={(e) =>
                setFormData({ ...formdata, phoneno: e.target.value })
              }
              required
            />
            {!phoneValid && <b className="error">*Invalid mobile number</b>}
          </div>

          <div className="inputs">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="signupint"
              value={formdata.email}
              onChange={(e) =>
                setFormData({ ...formdata, email: e.target.value })
              }
              required
            />
            {!emailValid && <b className="error">*Invalid email</b>}
          </div>

          <div className="inputs">
            <input
              type="text"
              name="rollno"
              placeholder="Enter your roll no."
              className="signupint"
              value={formdata.rollno}
              onChange={(e) =>
                setFormData({ ...formdata, rollno: e.target.value })
              }
              required
            />
            {!usernameValid && <b className="error">*Invalid username</b>}
          </div>

          <div className="inputs">
            <input
              type="password"
              name="password"
              placeholder="Enter a password"
              className="signupint"
              value={formdata.password}
              onChange={(e) =>
                setFormData({ ...formdata, password: e.target.value })
              }
              required
            />
            {!passwordValid && <b className="error">*Pick a strong password</b>}
          </div>

          <div className="endbtns">
            <button type="reset" id="stu-reset" className="endbtn">
              Reset
            </button>
            <button type="submit" id="stu-submit" className="endbtn">
              Submit
            </button>
          </div>

          <p>
            Have an account?
            <Link to="/student-login" className="su-anc" id="stu-signbtn">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
