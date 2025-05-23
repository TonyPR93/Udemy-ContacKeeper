import React from "react";
import PropTypes from "prop-types";
import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent,
  filterContacts,
} from "../../context/contact/ContactState";

export const ContactItem = ({ contact }) => {
  // we just need the contact dispatch without state.
  const [contactState, contactDispatch] = useContacts();

  const { filteredState } = contactState;

  const { _id, name, email, phone, type } = contact;

  const onDelete = () => {
    if (filteredState !== null) {
      deleteContact(contactDispatch, _id).then(() =>
        filterContacts(contactDispatch, filteredState),
      );
      clearCurrent(contactDispatch);
    } else {
      deleteContact(contactDispatch, _id);
      clearCurrent(contactDispatch);
    }
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contactDispatch, contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};
