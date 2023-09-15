import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/contactContext";

export const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };
  console.log(filtered);
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter contacts"
        onChange={onChange}
      />
    </form>
  );
};
