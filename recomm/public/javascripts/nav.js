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
var link = document.location.pathname;
firebase.auth().onAuthStateChanged((user) => {
  if (user && link != "/detail") {
    document.getElementsByClassName("log-in")[0].style.display = "none";
    document.getElementsByClassName("join")[0].style.display = "none";
    document.getElementsByClassName("user")[0].style.display = "block";
    document.getElementsByClassName("books")[0].style.display = "block";
  } else if (user && link == "/detail") {
    document.getElementsByClassName("log-in")[0].style.display = "none";
    document.getElementsByClassName("join")[0].style.display = "none";
    document.getElementsByClassName("user")[0].style.display = "block";
    document.getElementsByClassName("books")[0].style.display = "block";
  } else if (user == null && link == "/detail") {
    document.getElementsByClassName("log-in")[0].style.display = "none";
    document.getElementsByClassName("join")[0].style.display = "none";
    document.getElementsByClassName("user")[0].style.display = "none";
    document.getElementsByClassName("books")[0].style.display = "none";
  } else {
    document.getElementsByClassName("log-in")[0].style.display = "block";
    document.getElementsByClassName("join")[0].style.display = "block";
    document.getElementsByClassName("user")[0].style.display = "none";
    document.getElementsByClassName("books")[0].style.display = "none";
  }
});

// //console.log(link);
// if (link == "/detail") {
//   //console.log("tes");
//   document.getElementsByClassName("log-in")[0].style.display = "block";
//   document.getElementsByClassName("join")[0].style.display = "block";
// } else {
//   document.getElementsByClassName("log-in")[0].style.display = "none";
//   document.getElementsByClassName("join")[0].style.display = "none";
// }
