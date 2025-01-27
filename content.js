// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";
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
const database = getDatabase(app);

const starCountRef = ref(database);
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

const observer = new MutationObserver((mutations) => {
  const y = document.getElementsByClassName("liste-imbriquee")[0];
  if (y) {
    const matiere = "SVT";
    const date = "06/01";
    const contenu = "Casser les burnes";
    const widget = document.createElement("div");
    widget.classList.add("widget-extension");
    widget.textContent = `Devoir de ${matiere} pour le ${date}: ${contenu}`;

    y.appendChild(widget);
    observer.disconnect(); // Stop observing once the element is found
  }
});

observer.observe(document.body, { childList: true, subtree: true });
