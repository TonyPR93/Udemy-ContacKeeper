import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import {
  useAuth, //State and dispatcher
  clearErrors,
  register,
} from "../../context/auth/AuthState"; //Destructuration des methodes AuthState

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    //A chaque refresh on regarde s'il
    if (error === "User already exists") {
      setAlert(error, "danger"); //On envoit l'erreur (txt) avec le style
      clearErrors(authDispatch); //On clears les erreurs de l'utilisateur, comme ca elle ne s'affiche qu'une fois
    }
  }, [error, isAuthenticated, props.history, setAlert, authDispatch]); //les dépendances

  const [user, setUser] = useState({
    //la tstae de Register, qui sera envoyé en submit
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user; //destructuration

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value }); //onChnage

  const onSubmit = (e) => {
    e.preventDefault(); //On stop le submit
    if (name === "" || email === "" || password === "") {
      //On check si les input sont remplis (ajouter du regex)
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      //On check la verification du pwd
      setAlert("Passwords do not match", "danger");
    } else {
      register(authDispatch, {
        //On lance la fonction register, avec le dispatch de auth
        name,
        email,
        password,
      });
    }
  };

  if (isAuthenticated) return <Navigate to="/" />; //redirection vers la homepage

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            id="password2"
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
