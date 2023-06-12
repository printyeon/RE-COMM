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

// const auth = getAuth();
// const user = auth.currentUser;
document.getElementById("signUpButton").addEventListener("click", (event) => {
  event.preventDefault();
  const signUpEmail = document.getElementById("signUpEmail").value;
  const signUpPassword = document.getElementById("signUpPassword").value;
  const reSignUpPassword = document.getElementById("reSignUpPassword").value;

  if (signUpPassword !== reSignUpPassword) {
    alert("비번이 다릅니다");
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(signUpEmail, signUpPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("111");
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(signUpEmail, signUpPassword)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log("222");
          const name = document.getElementById("signUpName").value;
          user.updateProfile({
            displayName: name,
          });
          console.log(user);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    .then(() => {
      console.log("333-1");
      const user = firebase.auth().currentUser;

      if (user !== null) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
      } else {
        console.log("dsajlfdkghfsdkfjfhlk");
      }
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    // .then((user) => {
    //   // console.log("444");
    //   // const db = getDatabase();
    //   // set(ref(db, "users/" + userId), {
    //   //   email: user,
    //   // });
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
    .then(() => {
      console.log("555");
      //location.href = "../login/survey.html";
      location.href = "../index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});
