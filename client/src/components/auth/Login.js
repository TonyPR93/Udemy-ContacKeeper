import React, { useState } from "react";

export const Login = () => {
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
    e.preventDefault();
    console.log("Login submit");
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      {/* On declare le onSubmit ici et pas sur le bouton */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
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
