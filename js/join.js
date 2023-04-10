// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-KvwhezfpQVtFejdhj1by372iON-nnJc",
  authDomain: "recomm-test.firebaseapp.com",
  projectId: "recomm-test",
  storageBucket: "recomm-test.appspot.com",
  messagingSenderId: "1024841789555",
  appId: "1:1024841789555:web:5a33493976125f3e00fa06",
  measurementId: "G-N63J4R732X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const auth = getAuth();

document.getElementById("signUpButton").addEventListener("click", (event) => {
  event.preventDefault();
  const signUpEmail = document.getElementById("signUpEmail").value;
  const signUpPassword = document.getElementById("signUpPassword").value;
  const reSignUpPassword = document.getElementById("reSignUpPassword").value;

  if (signUpPassword !== reSignUpPassword) {
    alert("비번이 다릅니다");
  }

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
      console.log("111");
      let user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    .then((user) => {
      console.log("222");
      const name = document.getElementById("signUpName").value;
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "https://example.com/jane-q-user/profile.jpg",
      });
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    .then((user) => {
      console.log("333-1");
      //user = user.currentUser;
      if (user !== null) {
        console.log("333");
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
        const uid = user.uid;
      } else {
        console.log("dsajlfdkghfsdkfjfhlk");
      }
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    .then(() => {
      console.log("444");
      location.href = "./login.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

// firebase
//   .auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then((result) => {
//     result.user.updateProfile({
//       displayName: name,
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
//   .then((userCredential) => {
//     console.log(userCredential);
//     // Signed in
//     const user = userCredential.user;
//   })
//   .then((result) => {
//     result.user.updateProfile({
//       displayName: name,
//     });
//   })
//   // .catch((err) => {
//   //   console.error(err);
//   // })
//   .then(() => {
//     console.log(name);
//   })
//   .catch((error) => {
//     // An error occurred
//     // ...
//   });

// //location.href = "./survey.html";
// .catch((error) => {
//   console.log("error");
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // ..
// });
