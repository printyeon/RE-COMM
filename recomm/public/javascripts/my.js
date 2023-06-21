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

/*
//최근 읽은 책 가져오기
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var recentbookRef = database.ref("user/" + user.uid + "/recentbook/");
    recentbookRef.on("value", function (snapshot) {
      let data = snapshot.val();
      //console.log(data);
      for (const i in data) {
        //console.log(i); //책 id 담겨이씀

        //let id = i;
        //console.log(data[i]); //책 obj 담겨이씀

        let bookobj = data[i];
        for (const element in bookobj) {
          //console.log(bookobj[element]); //진짜 책 타이틀(제목 나옴)
          let id = bookobj[element];

          id = encodeURIComponent(id);
          //console.log(id);
          var api_url =
            "https://book.interpark.com/api/search.api?key=5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E&query=" +
            id +
            "&output=json";
          //console.log(api_url);
          fetch(api_url)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("API 요청에 실패했습니다.");
              }
            })
            .then((data) => {
              let book = data.item[0];
              //console.log(book);
              let booksContainer =
                document.getElementsByClassName("books-container")[0];
              let img = book.coverLargeUrl;
              let title = book.title;

              let item = document.createElement("div");
              item.className = "grid-books-items";
              item.innerHTML = `
            <div class="books">
            <div class="books-img">
                <img src="${img}" alt="">
            </div>
        </div>`;
              item.setAttribute("data-id", title);
              item.addEventListener("click", showrecentBookDetail);
              booksContainer.appendChild(item);
            })
            .catch((error) => {
              //console.log(error);
            });
        }
      }
    });
  }
});
const showrecentBookDetail = (event) => {
  let id = event.currentTarget.getAttribute("data-id");
  id = encodeURIComponent(id);
  //console.log(id);

  let bookDetailURL = "/detail";
  let url = bookDetailURL + "?id=" + id;
  // window.document.write(bookDetailHtml);
  window.location.href = url;
};
*/

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const user = firebase.auth().currentUser;
    //console.log(user);
    if (user !== null) {
      //맨위 이름 설정
      let myname = document.getElementsByClassName("myname")[0];
      myname.innerHTML = user.displayName;
      let myid = document.getElementsByClassName("myid")[0];
      myid.innerHTML = user.email;
    }

    //최근 읽은 책 가져오기
    var recentbookRef = database.ref("user/" + user.uid + "/recentbook/");
    recentbookRef.on("value", function (snapshot) {
      let data = snapshot.val();
      //console.log(data);
      for (const i in data) {
        //console.log(i); //책 id 담겨이씀

        //let id = i;
        //console.log(data[i]); //책 obj 담겨이씀

        let bookobj = data[i];

        let title = bookobj.booktit;
        let img = bookobj.bookimg;
        //console.log(title);
        //console.log(img);
        //let url = bookobj[2];

        let booksContainer =
          document.getElementsByClassName("books-container")[0];

        let item = document.createElement("div");
        item.className = "grid-books-items";
        item.innerHTML = `
            <div class="books">
            <div class="books-img">
                <img src="${img}" alt="">
            </div>
        </div>`;
        item.setAttribute("data-id", title);
        item.addEventListener("click", showBookDetail);
        booksContainer.appendChild(item);
      }
    });

    //자기가 쓴 리뷰 가져오기
    // let index;
    // var messageRef = database.ref("index/index");
    // messageRef.on("value", function (snapshot) {
    //   index = snapshot.val();
    // });

    var revbookRef = database.ref("user/" + user.uid + "/message");
    revbookRef.on("value", function (snapshot) {
      let data = snapshot.val();
      //console.log(data);
      for (const i in data) {
        //console.log(data[i]);

        let revobj = data[i];

        let title = revobj.booktit;
        let img = revobj.bookimg;
        let txt = revobj.text;
        //console.log(title);
        //console.log(img);
        //console.log(txt);

        let booksContainer =
          document.getElementsByClassName("rev-container")[0];

        let item = document.createElement("div");
        item.className = "grid-books-items";
        item.innerHTML = `
        <div class="books">
        <div class="books-img">
            <img src="${img}" alt="">
        </div>
    </div>
    <div class="review">
        <div class="review-title">
            <div class="title">${title}</div>
        </div>
        <!-- 리뷰 들어갈 곳 -->
        <div class="review-content">
          ${txt}
        </div>
    </div>`;
        item.setAttribute("data-id", title);
        item.addEventListener("click", showBookDetail);
        booksContainer.appendChild(item);
      }
    });
  } else {
    location.href = "/my";
    alert("내 책장은 로그인 후 사용 가능 합니다.");
    location.href = "/";
  }
});
const showBookDetail = (event) => {
  let id = event.currentTarget.getAttribute("data-id");
  id = encodeURIComponent(id);
  //console.log(id);

  let bookDetailURL = "/detail";
  let url = bookDetailURL + "?id=" + id;
  // window.document.write(bookDetailHtml);
  window.location.href = url;
};
