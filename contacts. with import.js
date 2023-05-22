import { nanoid } from "nanoid/non-secure";
import path from "path";
import { readFile, writeFile } from "fs/promises";
import * as contactsData from "./db/contacts.json" assert { type: "json" };

//to use import place to package.json   "type": "module",

const contactsPath = path.join("./db", "contacts.json");

function listContacts() {
  readFile(contactsPath)
    .then((data) => {
      console.log(data.toString());
      return JSON.parse(data.toString());
    })
    .catch((err) => console.log(err.message));
}

// listContacts();

function getContactById(contactId) {
  readFile(contactsPath)
    .then((data) => {
      const contact = JSON.parse(data.toString());
      const contactData = contact.filter((contact) => contact.id === contactId);
      if (contactData.length > 0) {
        console.log(contactData);
        return contactData;
      } else {
        console.log("contact wasn't found in data");
        return "contact wasn't found in data";
      }
    })
    .catch((err) => console.log(err.message));
}

// getContactById();
// getContactById("drsAJ4SHPYqZeG-83QTVW");

function removeContact(contactId) {
  readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (contactIndex !== -1) {
        // console.log(contacts.splice(contactIndex,1));
        // console.log(contacts);
        return contacts.splice(contactIndex, 1);
      } else {
        // console.log(contacts);
        return "Sorry. Contact you are trying to delete, doesn't exist in database";
      }
    })
    .catch((err) => console.log(err.message));
}

// removeContact();
// removeContact("test");

function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  console.log(contactsData);

  // let contactsList = contactsData.push(newContact);

  // contactsList = JSON.stringify(contactsData);

  // writeFile(path.basename(contactsPath), contactsList, (err) => {
  //   if (err) {
  //     console.log(err.message);
  //   } else {
  //     console.log("Contact added to database");
  //   }
  // });
}

addContact("Zenek C", "zenek@com.pl", "698 999 999");

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };

export { listContacts, getContactById, removeContact, addContact };
