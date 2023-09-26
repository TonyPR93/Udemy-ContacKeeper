import React, { useState, useEffect } from "react";
import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent,
  filterContacts,
} from "../../context/contact/ContactState";

const initialContact = {
  name: "",
  email: "",
  phone: "",
  type: "personal",
};

export const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();

  const { current, filteredState } = contactState;

  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(filteredState);
    if (current === null) {
      console.log("adding");
      console.log(filteredState);
      if (filteredState === null) {
        addContact(contactDispatch, contact);
      } else {
        addContact(contactDispatch, contact).then(() =>
          filterContacts(contactDispatch, filteredState),
        );
      }
      setContact(initialContact);
    } else {
      if (filteredState !== null) {
        updateContact(contactDispatch, contact).then(() =>
          filterContacts(contactDispatch, filteredState),
        );
      } else {
        updateContact(contactDispatch, contact);
      }
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional
      <div>
        <input
          type="submit"
          value={current ? "Update Contact" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};
