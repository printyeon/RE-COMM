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

// fetch("http://book.interpark.com/api/bestSeller.api").then((response) => //console.log("response: ", response));

// 인터파크 API
const TYPE = "json";
const KEY = "5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E";
const link1 = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=100&output=json`;
////console.log(link1);

let interparkAPI = (link) => {
  fetch(link)
    .then((response) => {
      if (response.ok) {
        ////console.log("API 호출 완료");
        return response.json();
      } else {
        throw new Error("API 요청에 실패했습니다.");
      }
    })
    .then((data) => {
      showInterparkBook(data);
    })
    .catch((error) => {
      ////console.log(error);
    });
};

interparkAPI(link1);

function showInterparkBook(data) {
  let json = data;

  let title;
  let img; // imageUrl
  let pubDate; // pubDate
  let author;
  let review;

  for (let i = 0; i < 15; i++) {
    title = json["item"][i]["title"];
    author = json["item"][i]["author"];
    img = json["item"][i]["coverLargeUrl"];
    pubDate = json["item"][i]["pubDate"].substr(0, 4); // 월ㄴ일 슬라이스
    review = json["item"][i]["customerReviewRank"];
    id = json["item"][i]["itemId"];
    customerReviewRank = json["item"][i]["customerReviewRank"];

    let container = document.getElementsByClassName("books-container")[0];
    let item = document.createElement("div");
    item.className = "grid-books-items";
    item.innerHTML = `
      <div class="books">
        <img class="crown" src="/images/books-crown.png" alt="">
        <img class="heart" src="/images/books-heart-2.png" alt="">
        <div class="books-img">
          <img src="${img}" alt="">
        </div>
      </div>
      <div class="books-title">
        <div class="title">${title}</div>
        <div class="author-pubyear">${author} · ${pubDate}</div>
        <div class="stars">
          <p>평균 별점</p>
          <div class="stars-img">
            <div class="rating_box">
              <div class="rating">
                ☆☆☆☆☆
                <span class="rating_star">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    item.setAttribute("data-id", title);
    ////console.log(title);
    item.addEventListener("click", showBookDetail);
    container.appendChild(item);

    //별점
    const rating_star = document.getElementsByClassName("rating_star")[i];
    rating_star.style.width = `${customerReviewRank * 10}%`;

    let heart = document.getElementsByClassName("heart")[i];

    heart.addEventListener("click", function () {
      ////console.log("클릭------------------------------------");
      // 꽉 찬 하트일 때
      if (heart.getAttribute("src") == "/images/books-heart-1.png") {
        heart.setAttribute("src", "/images/books-heart-2.png");
      }
      // 빈 하트일 때
      else if (heart.getAttribute("src") == "/images/books-heart-2.png") {
        heart.setAttribute("src", "/images/books-heart-1.png");
      }
    });
  }

  ////console.log("인터파크 베스트셀러 15권 API 호출 완료");
}

// 버튼 세 개별로 각각 베스트셀러, 추천도서, 신간 도서 가져오기
// 네이버 api는 4개라서 수가 적으니 넘기기 버튼 안 보이게 하기
const bestSellerBtn = document.querySelector("#aladin");
const recommendBtn = document.querySelector("#naver");
const newBtn = document.querySelector("#daum");

bestSellerBtn.addEventListener("click", () => {
  let link = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=105&output=${TYPE}`;
  APIS(link);
  let btn = document.getElementsByClassName("next-btn")[1];
  btn.style.display = "block";
});

recommendBtn.addEventListener("click", () => {
  let link = `http://book.interpark.com/api/recommend.api?key=${KEY}&categoryId=100&output=${TYPE}`;
  APIS(link);
  let btn = document.getElementsByClassName("next-btn")[1];
  btn.style.display = "none";
});

newBtn.addEventListener("click", () => {
  let link = `http://book.interpark.com/api/newBook.api?key=${KEY}&categoryId=100&output=${TYPE}`;
  APIS(link);
  let btn = document.getElementsByClassName("next-btn")[1];
  btn.style.display = "block";
});

let APIS = (link) => {
  // 전체를 다시 로딩하지 않고 일부분만을 갱신
  let xhr = new XMLHttpRequest(); // XMLHttpRequest 객체는 서버로부터 XML 데이터를 전송받아서 처리

  //  XMLHttpRequest 객체의 readyState 프로퍼티 값이 변할 때마다 자동으로 호출되는 함수 설정
  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      // //console.log("버튼 세 개 API 호출 완료");
      apis = showBooks(xhr.response);
    } else {
      // FAIL
    }
  };

  xhr.open("GET", link, true);
  xhr.send();
};

// 기본 호출
let link2 = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=105&output=${TYPE}`;
APIS(link2);

const showBooks = (jsonString) => {
  let container = document.getElementsByClassName("books-container")[1];
  container.innerHTML = ""; // 기존의 아이템 제거

  let json = JSON.parse(jsonString);

  let title;
  let img;
  let pubDate;
  let author;

  for (let i = 0; i < 15; i++) {
    title = json["item"][i]["title"];
    author = json["item"][i]["author"];
    img = json["item"][i]["coverLargeUrl"];
    pubDate = json["item"][i]["pubDate"].substr(0, 4);
    id = json["item"][i]["itemId"];
    pubYear = json["item"][i]["pubDate"].substr(0, 4);
    pubMonth = json["item"][i]["pubDate"].substr(5, 1);
    pubDay = json["item"][i]["pubDate"].substr(7, 8);
    customerReviewRank = json["item"][i]["customerReviewRank"];

    let item = document.createElement("div");
    item.className = "grid-books-items";
    item.innerHTML = `
      <div class="books">
        <img class="crown" src="/images/books-crown.png" alt="">
        <img class="heart" src="/images/books-heart-2.png" alt="">
        <div class="books-img">
          <img src="${img}" alt="">
        </div>
      </div>
      <div class="books-title">
        <div class="title">${title}</div>
        <div class="author-pubyear">${author} · ${pubDate}</div>
        <div class="stars">
          <p>평균 별점</p>
          <div class="stars-img">
          <div class="rating_box">
            <div class="rating">
              ☆☆☆☆☆
               <span class="rating_star">★★★★★</span>
              </div>
            </div>
        </div>
      </div>
    </div>`;

    item.setAttribute("data-id", title);
    ////console.log(title);
    item.addEventListener("click", showBookDetail);
    container.appendChild(item);
    container.appendChild(item);

    //별점
    const rating_star = document.getElementsByClassName("rating_star")[i];
    rating_star.style.width = `${customerReviewRank * 10}%`;

    let heart = document.getElementsByClassName("heart")[i];

    heart.addEventListener("click", function () {
      ////console.log("클릭------------------------------------");
      // 꽉 찬 하트일 때
      if (heart.getAttribute("src") == "/images/books-heart-1.png") {
        heart.setAttribute("src", "/images/books-heart-2.png");
      }
      // 빈 하트일 때
      else if (heart.getAttribute("src") == "/images/books-heart-2.png") {
        heart.setAttribute("src", "/images/books-heart-1.png");
      }
    });
  }

  return json;
};

const showBookDetail = (event) => {
  let id = event.currentTarget.getAttribute("data-id");
  id = encodeURIComponent(id);
  ////console.log(id);
  var api_url =
    "https://book.interpark.com/api/search.api?key=5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E&query=" +
    id +
    "&output=json";
  ////console.log(api_url);

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
      ////console.log(book);
      var data = 0;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          database.ref("user/" + user.uid + "/recentbook/" + id).set({
            booktit: book.title,
            bookimg: book.coverLargeUrl,
          });
          /*
          var likebookIsbnRef = database.ref(
            "user/" + user.uid + "/recentbook/"
          );
          
          likebookIsbnRef.on("value", function (snapshot) {
            let data = snapshot.val();
            ////console.log(data);

            for (const i in data) {
              ////console.log(i);
            }
          });*/
        }
      });

      // let bookDetailHtml = `<h2>${book.title}</h2>`;
      // bookDetailHtml += `<p>저자: ${book.author}</p>`;
      // bookDetailHtml += `<p>출판사: ${book.publisher}</p>`;
      // bookDetailHtml += `<img src=${book.coverLargeUrl} />`;
      // 원하는 형식에 맞게 필요한 책 정보들을 추가

      let bookDetailURL = "/detail";
      let url = bookDetailURL + "?id=" + id;
      // window.document.write(bookDetailHtml);
      window.location.href = url;
    })
    .catch((error) => {
      //console.log(error);
    });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    //최근에 읽은 책 가져오기
    var likebookIsbnRef = database.ref("user/" + user.uid + "/recentbook/");
    likebookIsbnRef.on("value", function (snapshot) {
      let recentbook = snapshot.val();
      //console.log(recentbook);

      for (const id in recentbook) {
        //console.log(id);

        let api_url =
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
            //console.log(book); ///이거다 이거!!!!!!!!!!!!!!!!!
            //console.log(book.title);
            //console.log(book.author);
            //console.log(book.publisher);
            //console.log(book.coverLargeUrl);

            let bookDetailURL = "/detail";
            let url = bookDetailURL + "?id=" + id;
            //console.log(url);
          });
      }
    });
  }
});
