import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("Update the database");

  // create connection
  const contactDb = await openDB("jate", 1);

  //create new transaction
  const tx = contactDb.transaction("jate", "readwrite");

  //open up object store
  const store = tx.objectStore("jate");

  // use .add() method to pass in content
  const request = store.add({ content: content });
  //get confirmation
  const result = await request;
  console.log("Data saved to database!", result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // create connection to DB
  const contactDb = await openDB("jate", 1);

  // create new transaction
  const tx = contactDb.transaction("jate", "readonly");

  // open up object store
  const store = tx.objectStore("jate");

  // use getAll()method to get all data in DB
  const request = store.getAll();

  // get confirmation
  const result = await request;
  console.log("result.value", result);
  return result;
};

// start the DB
initdb();
