// Initialize Firebase
var config = {
  apiKey: "AIzaSyD-KvwhezfpQVtFejdhj1by372iON-nnJc",
  authDomain: "recomm-test.firebaseapp.com",
  projectId: "recomm-test",
  storageBucket: "recomm-test.appspot.com",
  messagingSenderId: "1024841789555",
  appId: "1:1024841789555:web:5a33493976125f3e00fa06",
  measurementId: "G-N63J4R732X",
};
firebase.initializeApp(config);
var database = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementsByClassName("log-in")[0].style.display = "none";
    document.getElementsByClassName("join")[0].style.display = "none";
    document.getElementsByClassName("user")[0].style.display = "block";
  } else {
    document.getElementsByClassName("log-in")[0].style.display = "block";
    document.getElementsByClassName("join")[0].style.display = "block";
    document.getElementsByClassName("user")[0].style.display = "none";
  }
});
