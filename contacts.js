const fs = require("fs").promises;
const path = require("path");
const crypto = require('crypto');
// const { performance } = require("perf_hooks");

const contactsPath = path.join("./db", "contacts.json");

const contactsData = require("./db/contacts.json");

// const startTime = performance.now();
// const endTime = performance.now();
// const executionTime = endTime - startTime;
// console.log(`Czas wykonania1: ${executionTime} ms`);

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      console.log(data.toString());
      return JSON.parse(data.toString());
    })
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contact = JSON.parse(data.toString());
      const contactData = contact.filter((contact) => contact.id === contactId);
      if (contactData.length > 0) {
        console.log(contactData);
        return contactData;
      }
      console.log("contact wasn't found in data");
    })
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data.toString());
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);

        fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
          if (err) {
            console.log(err.message);
            return;
          }
        });
        console.log("Contact removed. File saved with updated contacts list");
      } else {
        console.log(
          "Sorry. Contact you are trying to delete, doesn't exist in database"
        );
      }
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  if (name === undefined || email === undefined || phone === undefined) {
    console.log("Please set all arguments (name,email,phone) to add contact");
    return;
  }

  contactsData.push(newContact);

  const contactsDataUpd = JSON.stringify(contactsData);

  fs.writeFile(contactsPath, contactsDataUpd, (err) => {
    if (err) {
      console.log("Data can't be written in file:", err.message);
      return;
    }
  });
  console.log("Contact added to database");
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
