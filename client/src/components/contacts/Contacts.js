import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";
import { ContactItem } from "./ContactItem";
import {
  useContacts,
  getContacts,
  clearErrorsContact,
} from "../../context/contact/ContactState";
import AlertContext from "../../context/alert/alertContext";

export const Contacts = () => {
  const [contactState, contactDispatch] = useContacts();
  const { contacts, filtered, error } = contactState;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    console.log(error);
    if (error) {
      console.log("erreur add contact");
      setAlert(error, "danger"); //On envoit l'erreur (txt) avec le style
      clearErrorsContact(contactDispatch); //On clears les erreurs de l'utilisateur, comme ca elle ne s'affiche qu'une fois
    }
    getContacts(contactDispatch);
  }, [contactDispatch, setAlert, contactDispatch, error]);
  console.log(error);
  console.log("contact" + contacts);
  if (contacts !== null && contacts.length === 0) {
    return (
      <TransitionGroup>
        <CSSTransition key="0" timeout={750} classNames="item">
          <h4 className="text-center">Please add contacts</h4>
        </CSSTransition>
      </TransitionGroup>
    );
  }
  console.log("filtered " + filtered);
  return (
    <Fragment>
      {contacts !== null ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))
            : contacts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames="item"
                >
                  <ContactItem contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};
