import React, { useContext, useEffect } from "react";
import { Contacts } from "../contacts/Contacts";
import { ContactForm } from "../contacts/ContactForm";
import { ContactFilter } from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/authContext";

export const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};
