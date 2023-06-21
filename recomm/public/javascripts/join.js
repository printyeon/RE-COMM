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
var link = document.location.href;
// const auth = getAuth();
// const user = auth.currentUser;
document.getElementById("signUpButton").addEventListener("click", (event) => {
  event.preventDefault();
  //console.log(link);
  if (link == "http://localhost:3000/detail") {
    location.href = "/";
    alert("다시 회원가입을 진행해 주세요.");
  }
  const signUpname = document.getElementById("signUpName").value;
  const signUpEmail = document.getElementById("signUpEmail").value;
  const signUpPassword = document.getElementById("signUpPassword").value;
  const reSignUpPassword = document.getElementById("reSignUpPassword").value;

  if (signUpPassword !== reSignUpPassword) {
    alert("비번이 다릅니다.");
    location.href = "/";
  }

  if (signUpEmail.indexOf("@") == -1) {
    alert("이메일 형식이 아닙니다.");
    location.href = "/";
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
    .then((userCredential) => {
      var user = userCredential.user;
      //console.log("회원가입 성공");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use") {
        alert("사용하고 있는 이메일입니다.");
      } else if (errorCode == "auth/weak-password") {
        alert("비밀번호는 6자 이상이여야 합니다.");
      } else {
        alert("잘못된 접근입니다");
      }
      location.href = "/";
    })
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(signUpEmail, signUpPassword)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          //console.log("로그인 성공");

          user
            .updateProfile({
              displayName: signUpname,
            })
            .then(() => {
              //console.log("프로필 업뎃");
              //console.log(user);
            })
            .catch((error) => {
              //console.log("프로필 업뎃안됨");
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    })
    .then(() => {
      //console.log("sdfsdfdsfds");
      // const user = firebase.auth().currentUser;
      // if (user !== null) {
      //   user.providerData.forEach((profile) => {
      //     //console.log("Sign-in provider: " + profile.providerId);
      //     //console.log("  Provider-specific UID: " + profile.uid);
      //     //console.log("  Name: " + profile.displayName);
      //     //console.log("  Email: " + profile.email);
      //   });
      // }
    })
    .then(() => {
      //console.log("false");
      setTimeout(function () {
        location.href = "/survey";
      }, 2000);
    });
});

document.getElementById("signInButton").addEventListener("click", (event) => {
  event.preventDefault();
  const signInEmail = document.getElementById("signInEmail").value;
  const signInPassword = document.getElementById("signInPassword").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(signInEmail, signInPassword)
    .then((userCredential) => {
      // Signed in
      //console.log(userCredential);
      const user = userCredential.user;

      location.href = "/";
    })
    .catch((error) => {
      //console.log("error");
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    .then(() => {
      location.href = "/";
    });
});

document.getElementById("logout").addEventListener("click", (event) => {
  event.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      //console.log("로그아웃 됨");
      location.href = "/";
      // Sign-out successful.
    })
    .catch((error) => {});
});

//이름 넣기
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    let uname = document.getElementById("uname");

    //console.log(uname.innerHTML);
    uname.innerHTML = user.displayName;
  } else {
    //console.log("로그인안함");
  }
});

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
