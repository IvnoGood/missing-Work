// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA-p71gjjXpSEZdOezXX-fxGP-jWqtekE",
  authDomain: "workmissingpronote.firebaseapp.com",
  databaseURL:
    "https://workmissingpronote-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "workmissingpronote",
  storageBucket: "workmissingpronote.firebasestorage.app",
  messagingSenderId: "377010182640",
  appId: "1:377010182640:web:5080d000472adaa79fe535",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

document.getElementById("date-selector").valueAsDate = new Date();

function uuidv4() {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function writeUserData(matiere, date, contenu, uuid) {
  set(ref(db, uuid + "/"), {
    matiere: matiere,
    date: date,
    contenu: contenu,
  });
}

document.getElementById("submit-button").addEventListener("click", () => {
  const matiere = document.getElementById("matiere-selector").value;
  const date = document.getElementById("date-selector").value;
  const contenu = document.getElementById("contenu").value;
  const uuid = uuidv4();
  if (matiere != "" && date != "" && contenu != "") {
    writeUserData(matiere, date, contenu, uuid);
    console.log("ok");
    document.getElementById("matiere-selector").value = "🧬 SVT";
    document.getElementById("contenu").value = "";
    document.getElementById("date-selector").valueAsDate = new Date();
  } else {
    console.log("not ok");
    alert("All fields should be filled");
  }
});
