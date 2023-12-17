import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, orderBy} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

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
const temperatureRef = collection(db, 'sensor-data');
let oneHourAgo = Date.now() - 36000000;

const q = query(temperatureRef, where('__name__', '>=', String(oneHourAgo)), where("__name__", "!=", "latest"), orderBy('__name__', 'desc'));
const timeSeries = [];
const temperature = [];

getDocs(q).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // Process each document (timestamp and temperature)
    let data = doc.data();
    timeSeries.push(doc.id);
    temperature.push(data.temperature);
  });
})
.catch((error) => {
  console.error('Error getting documents: ', error);
});

// Create a line chart
const ctx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeSeries,
        datasets: [{
            label: 'Temperature',
            borderColor: 'rgb(75, 192, 192)',
            data: temperature,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
              type: 'timeseries',
              distribution: 'linear',
              time: {
                  unit: 'minute', // You can adjust the time unit as needed
              }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});
