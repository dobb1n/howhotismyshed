import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, query, orderBy, limit, onSnapshot, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCP-jqyZk3ImKeYCFmwAxhLqDLGhen2_ZA",
    authDomain: "the-tinkering-shed.firebaseapp.com",
    projectId: "the-tinkering-shed",
    storageBucket: "the-tinkering-shed.appspot.com",
    messagingSenderId: "335831825547",
    appId: "1:335831825547:web:c6d4a55bc7d91b7a06a88e",
    measurementId: "G-V7HRTPYQHK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tempData = document.getElementById("latest-temp");
const humidityData = document.getElementById("latest-humidity");
const updatedTime = document.getElementById("update time");

const unsub = onSnapshot(doc(db, "sensor-data", "latest"), (doc) => {
    var date = new Date(doc.data().time * 1000);
    tempData.innerHTML = `<h1>${doc.data().temperature}&deg;C</h1>`;
    humidityData.innerHTML = `<h1>${doc.data().humidity}</h1>`;
    updatedTime.innerHTML = `Last updated: ${date}`;
});


/* const docRef = doc(db, "sensor-data", "raspi-00000000975ad027");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
} */
