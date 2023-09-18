import React, { useContext, useEffect, useState } from "react";
import AlertContext from "../../context/alert/alertContext"; //On apporte le context pour les alertes
import AuthContext from "../../context/auth/authContext"; //Et pour auth

export const Register = () => {
  const alertContext = useContext(AlertContext); //declaration des context
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext; //destructuration des contexts
  const { register, error, clearErrors } = authContext;

  useEffect(() => {
    //Cycle component
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
  }, [error]);

  const [user, setUser] = useState({
    //la state et son setter
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user; //destructuration de user

  const onChange = (
    e, //On change
  ) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault(); //On retient le submit
    if (name === "" || email === "" || password === "") {
      //On lance les erreurs en cas de champs vides
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      // Et en cas de fail check password
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        //sinon on fait appel a la méthoderegister de authcontext
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
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
          // onSubmit={onSubmit} On ne met pas le onsubmit ici sinon ca ne catch pas le FORM !!!!
        />
      </form>
    </div>
  );
};
