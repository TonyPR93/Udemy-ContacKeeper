import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
import {
  useAuth, //State and dispatcher
  clearErrors,
  login,
} from "../../context/auth/AuthState"; //Destructuration des methodes AuthState

export const Login = () => {
  const alertContext = useContext(AlertContext);
  const [authState, authDispatch] = useAuth();
  const { error, isAuthenticated } = authState;

  const { setAlert } = alertContext;

  useEffect(() => {
    //A chaque refresh on regarde s'il
    if (error) {
      setAlert(error, "danger"); //On envoit l'erreur (txt) avec le style
      clearErrors(authDispatch); //On clears les erreurs de l'utilisateur, comme ca elle ne s'affiche qu'une fois
    }
  }, [error, isAuthenticated, setAlert, authDispatch]);

  const [user, setUser] = useState({
    //On cree un state user et un setUser pour la modifier ( pour les valeurs contenues dans le formulaire, ce n'est pas la "véritable state")
    email: "",
    password: "",
  });

  const { email, password } = user; //Destructuration, evite de faire user.email, user.password.

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value, //On change uniquement la valeur qui est modifié via son "name"
    });

  const onSubmit = (e) => {
    e.preventDefault(); //On stop le submit
    if (email === "" || password === "") {
      //On check si les input sont remplis (ajouter du regex)
      setAlert("Please enter all fields", "danger");
    } else {
      login(authDispatch, {
        //On lance la fonction register, avec le dispatch de auth
        email,
        password,
      });
    }
  };

  if (isAuthenticated) return <Navigate to="/" />; //redirection vers la homepage

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      {/* On declare le onSubmit ici et pas sur le bouton */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
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
