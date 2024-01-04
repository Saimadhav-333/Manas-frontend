import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import axios from "axios";



const Navbar = () => {
  
  const [visible, setVisible] = useState(false);
  const [menu_visible, setmenu_Visible] = useState(false);

  // const [user, setUser] = useState(null);

  var p;
  const [userdata,setuserdata]=useState({
    name:"",
    rollno:"",
    phoneno:"",
  })


  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        console.log("AC===",accessToken)
        if (!accessToken) {
          setError('Access token not found'); // Handle missing token
          return;
        }
        const response = await axios.get('http://localhost:2000/api/users/student-profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });
        console.log("res===",response)

        if (response && response.data) {
          p=response.data
          setuserdata({
            name:p.name,
            rollno:p.rollno,
            phoneno:p.phoneno,

          })
          console.log("v==",v)
          console.log(response.data)
          console.log("p==",p)
          console.log("p==",p.name)
        }
      } catch (error) {
        console.log(error);
        setError(error.message || 'An error occurred while fetching user data.');
      }
    };

    fetchData();
  }, []);


  return (
    <nav className="Navbar">
      <div className="left-menu">
        <li onClick={() => setmenu_Visible(true)}><GiHamburgerMenu style={{fontSize:"30px"}}/></li>
        {/* <GiHamburgerMenu /> */}
        <div className="Nav-left">
          <h1>Dashboard</h1>
          <p>Here's the information about your activity and mental condition</p>
        </div>
      </div>
      <Modal
        isOpen={menu_visible}
        onRequestClose={() => setmenu_Visible(false)} 
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            overflow: "hidden",
            top: "0%",
            left: "0%",
            padding:"0px",
          },
        }}
      >
        <div className="modal-side">
          <h1>Manas Health</h1>
          <h2>General</h2>
          <ul>
            <li>
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/calendar">Calendar</Link>
            </li>
            <li>Psychologist</li>
            <li>Education</li>
          </ul>
          <h2>Tools</h2>
          <ul>
            <li>Contact us</li>
            <li><Link to="/"><CiLogout style={{fontSize:"17px",margin:"0px 5px -4px -3px"}}/>Logout</Link></li>
          </ul>
        </div>
      </Modal>
      <div className="Nav-right">
        <h3>{userdata.name}</h3>
        <div className="stu-img" onClick={() => setVisible(true)}></div>
      </div>
      <Modal
        isOpen={visible}
        onRequestClose={() => setVisible(false)}
        style={{
          content: {
            width: "fit-content",
            height: "fit-content",
            overflow: "hidden",
            top: "10%",
            left:"",
            borderRadius: "20px",
            border: "2px solid black",
          },
        }}
      >
        {
          <div className="stu-details">
            Name: {userdata.name}
            <br />
            Rollno: {userdata.rollno}
            <br />
            Phone:{userdata.phoneno}
          </div>
        }
      </Modal>
    </nav>
    // </div>
  );
};

export default Navbar;
