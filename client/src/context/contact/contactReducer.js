import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  GET_CONTACTS,
  CONTACT_ERROR,
  CLEAR_ERRORS_CONTACT,
} from "../types";

export default (state, action) => {
  console.log(action);
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact,
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload, //Avant le .id n'activait pas la transition ?
        ),
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        filteredState: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter((contact) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        filteredState: action.payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        filteredState: null,
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS_CONTACT:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
