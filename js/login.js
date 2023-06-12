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

document.getElementById("signInButton").addEventListener("click", (event) => {
  event.preventDefault();
  const signInEmail = document.getElementById("signInEmail").value;
  const signInPassword = document.getElementById("signInPassword").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(signInEmail, signInPassword)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential);
      const user = userCredential.user;

      location.href = "../index.html";
    })
    .catch((error) => {
      console.log("error");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
