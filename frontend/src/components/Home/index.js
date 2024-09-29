import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import Navbar from "../Navbar";
import "./index.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    if (userName === "" || address === "") {
      setShowErrMsg(true);
    } else {
      const userDetails = {
        userId: uuidv4(),
        name: userName,
        address: address,
      };
      setUserName("");
      setAddress("");
      setShowErrMsg(false);
      const apiUrl = "http://localhost:5000/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };
      const response = await fetch(apiUrl, options);
      //eslint-disable-next-line
      const data = await response.json();
      if (response.ok) {
        console.log("User Registered Successfully");
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/users");
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      transition: "all 0.3s ease-in-out",
      animation: "slideInUp 0.5s",
      backgroundColor: "#f7f0f5",
      borderRadius: "15px",
    },
  };

  return (
    <div className="new-bg-container">
      <Navbar />
      <div className="body-container">
        <div className="left-section">
          <h1 className="heading slide-in-left">
            Crafting <br />
            <span className="heading-span">Unique Solutions</span>
          </h1>
          <p className="description">Turn your ideas into reality</p>
        </div>
        <div className="right-section">
          <h1 className="form-heading">Register Here</h1>
          <form onSubmit={submitForm} className="my-form fade-in">
            <label className="input-label" htmlFor="username">
              Name
            </label>
            <input
              type="text"
              className="input-box"
              value={userName}
              placeholder="Your name"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <label className="input-label" htmlFor="useraddress">
              Address
            </label>
            <input
              type="text"
              className="input-box"
              value={address}
              placeholder="Your address"
              id="useraddress"
              onChange={(e) => setAddress(e.target.value)}
            />
            {showErrMsg && <p className="error-msg">*Fields cannot be empty.</p>}
            <button type="submit" className="register-button btn-animate">
              Sign Up
            </button>
          </form>
          <Modal
            isOpen={showModal}
            onRequestClose={closeModal}
            contentLabel="Success Modal"
            className="registration-modal"
            ariaHideApp={false}
            style={customStyles}
          >
            <div className="modal-container">
              <button onClick={closeModal} className="close-btn">
                <CgClose size={15} />
              </button>
              <h2 className="success-text">Registration Successful!</h2>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Home;
