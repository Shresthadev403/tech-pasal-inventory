import "./login.css";
import { useContext, useState } from "react";

import techLogo from "../../demo/techlogo.png";
import { Button, useAutocomplete } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../controllers/authController";
import { useSnackbar } from "notistack";
import { UserContext } from "../../userContext";

function Login() {
  const value=useContext(UserContext);
  const {checkLogin}=value;
  const {checkLoginStatus,setCheckLoginStatus}=checkLogin;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    login({ email: email, password: password }).then((data) => {
      console.log(data);
      if (data.sucess == true) {
        enqueueSnackbar("login  sucessfull", {
          variant: "success",
          autoHideDuration: 2000,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("tech_role",data.role);
        localStorage.setItem("tech_user_email",data.email);
        if (data.role === "user") {
          setCheckLoginStatus(!checkLoginStatus);
          navigate("/store");
      
        }else if(data.role==='admin'){
          setCheckLoginStatus(!checkLoginStatus);
          navigate("/home");
          
          
         
        }
      } else {
        enqueueSnackbar(data.error, {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    });
  };
  return (
    <div className="login">
      <div className="login-box">
        <div className="logo">
          <img src={techLogo} alt="techlogo" />
        </div>
        <form
          className="login-form"
          action="submit"
          onSubmit={handleSubmitLogin}
        >
          <div className="email">
            <input
              type="text"
              placeholder="email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="submit-btns">
            <Link to={`/signup`}>
              {" "}
              <Button
                sx={{
                  backgroundColor: "rgb(113, 118, 113)",
                  color: "white",
                  borderRadius: "20px",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                  ":hover": {
                    bgcolor: "primary.main", // theme.palette.primary.main
                    color: "black",
                  },
                }}
              >
                Sign Up
              </Button>{" "}
            </Link>
            <Button
              sx={{
                backgroundColor: "rgb(113, 118, 113)",
                color: "white",
                borderRadius: "20px",
                paddingLeft: "15px",
                paddingRight: "15px",
                ":hover": {
                  bgcolor: "primary.main", // theme.palette.primary.main
                  color: "black",
                },
              }}
              type="submit"
            >
              Login
            </Button>
          </div>
          <div className="forgot-password">Forgot Passowrd?</div>
        </form>
      </div>
    </div>
  );
}

export default Login;
