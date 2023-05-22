const fs = require("fs").promises;
const path = require("path");
const contactsData = require("./db/contacts.json");

const contactsPath = path.join("./db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      console.log(data.toString());
      return JSON.parse(data.toString());
    })
    .catch((err) => console.log(err.message));
}

// listContacts();

function getContactById(contactId) {
  fs.readFile(contactsPath)
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
          } else {
            console.log("File saved with updated contacts list");
            return "File saved with updated contacts list";
          }
        });
      } else {
        console.log(
          "Sorry. Contact you are trying to delete, doesn't exist in database"
        );
        return "Sorry. Contact you are trying to delete, doesn't exist in database";
      }
    })
    .catch((err) => console.log(err.message));
}

// removeContact();
removeContact("test");

function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone,
  };

  // console.log(contactsData);

  let contactsList = contactsData.push(newContact);

  console.log(contactsData);

  const contactsDataUpd = JSON.stringify(contactsData);

  fs.writeFile(contactsPath, contactsDataUpd, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Contact added to database");
    }
  });
}

// addContact("Zenek C", "zenek@com.pl", "698 999 999");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
