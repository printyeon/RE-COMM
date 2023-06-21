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
    //console.log(user);
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      displayName = user.displayName;
      //console.log(displayName);
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;

      //console.log(user);
      //console.log(displayName);
      const surveyName = document.getElementById("surveyName");
      surveyName.innerHTML = `${displayName}님의 취향을 알려주세요!`;
      surveyName.style.fontSize = "48px";
      surveyName.style.color = "#BC2638";
      surveyName.style.fontWeight = "700";
    } else {
      //console.log("d이름 가져오기 오류");
    }

    // ...
  } else {
    //console.log("사용자 가져오기 오류");
  }
});
// if (user !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   const displayName = user.displayName;
//   //console.log(displayName);
//   const uid = user.uid;
// }
////////////////////////////////////////////////////

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

// // 버튼 클릭 이벤트 활/비활
let btn = document.getElementsByClassName("survey-btn");
//console.log(btn);

function handleClick(event) {
  if (event.target.classList[0] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    //console.log("클릭");
    for (var i = 0; i < btn.length; i++) {
      btn[i].classList.remove("clicked");
      if (btn[i].style.backgroundColor == "rgb(188, 38, 56)") {
        btn[i].style.backgroundColor = "#ffffff";
        btn[i].style.color = "#777777";
      } else if (btn[i].style.backgroundColor == "rgb(255, 255, 255)") {
        btn[i].style.backgroundColor = "#bc2638";
        btn[i].style.color = "#FBFBFB";
      }
    }

    event.target.classList.add("clicked");
  }
}

// function init() {
//   for (let i = 0; i < btn.length; i++) {
//     btn[i].addEventListener("click", handleClick);
//   }
// }

// init();
