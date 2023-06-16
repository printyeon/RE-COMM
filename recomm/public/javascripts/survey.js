import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyD-KvwhezfpQVtFejdhj1by372iON-nnJc",
  authDomain: "recomm-test.firebaseapp.com",
  projectId: "recomm-test",
  storageBucket: "recomm-test.appspot.com",
  messagingSenderId: "1024841789555",
  appId: "1:1024841789555:web:5a33493976125f3e00fa06",
  measurementId: "G-N63J4R732X",
};

let displayName;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const user = auth.currentUser;
    console.log(user);
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      displayName = user.displayName;
      console.log(displayName);
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;

      console.log(user);
      console.log(displayName);
      const surveyName = document.getElementById("surveyName");
      surveyName.innerHTML = displayName;
    } else {
      console.log("d이름 가져오기 오류");
    }

    // ...
  } else {
    console.log("사용자 가져오기 오류");
  }
});

////////////////////////////////////////////////////
const surveyBtn = document.getElementById("surveyBtn");
surveyBtn.style.backgroundColor = "#ffffff";
surveyBtn.style.color = "#777777";

// import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyD-KvwhezfpQVtFejdhj1by372iON-nnJc",
//   authDomain: "recomm-test.firebaseapp.com",
//   projectId: "recomm-test",
//   storageBucket: "recomm-test.appspot.com",
//   messagingSenderId: "1024841789555",
//   appId: "1:1024841789555:web:5a33493976125f3e00fa06",
//   measurementId: "G-N63J4R732X",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth();
// const user = auth.currentUser;

// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   console.log(displayName);
//   const uid = user.uid;
// }

// surveyBtn.addEventListener("click", surveyBtnClick);

// function surveyBtnClick() {
//   if (surveyBtn.style.backgroundColor == "rgb(188, 38, 56)") {
//     surveyBtn.style.backgroundColor = "#ffffff";
//     surveyBtn.style.color = "#777777";
//   } else if (surveyBtn.style.backgroundColor == "rgb(255, 255, 255)") {
//     surveyBtn.style.backgroundColor = "#bc2638";
//     surveyBtn.style.color = "#FBFBFB";
//   }
// }

// surveyBtn.addEventListener("click", () => {
//   if (surveyBtn.style.backgroundColor == "rgb(188, 38, 56)") {
//     surveyBtn.style.backgroundColor = "#ffffff";
//     surveyBtn.style.color = "#777777";
//   } else if (surveyBtn.style.backgroundColor == "rgb(255, 255, 255)") {
//     surveyBtn.style.backgroundColor = "#bc2638";
//     surveyBtn.style.color = "#FBFBFB";
//   }
// });

// const surveyBtn2 = document.getElementById("surveyBtn2");
// surveyBtn2.style.backgroundColor = "#ffffff";
// surveyBtn2.style.color = "#777777";

// surveyBtn2.onclick = function () {
//   if (surveyBtn2.style.backgroundColor == "rgb(188, 38, 56)") {
//     surveyBtn2.style.backgroundColor = "#ffffff";
//     surveyBtn2.style.color = "#777777";
//   } else if (surveyBtn2.style.backgroundColor == "rgb(255, 255, 255)") {
//     surveyBtn2.style.backgroundColor = "#bc2638";
//     surveyBtn2.style.color = "#FBFBFB";
//   }
// };
