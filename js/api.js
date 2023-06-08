// fetch("http://book.interpark.com/api/bestSeller.api").then((response) => console.log("response: ", response));

// 인터파크 API
const TYPE = "json";
const KEY = "5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E";
const link1 = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=100&output=${TYPE}`;
console.log(link1);
// 알라딘 API
// yes24 API
// const YES24_KEY = ``;
// const YES24_link = ``;
// 교보문교 API
// const GYOBO_KEY = ``;
// const GYOBO_link = ``;

let interparkAPI = (link) => {
  // 전체를 다시 로딩하지 않고 일부분만을 갱신
  let xhr = new XMLHttpRequest(); // XMLHttpRequest 객체는 서버로부터 XML 데이터를 전송받아서 처리

  //  XMLHttpRequest 객체의 readyState 프로퍼티 값이 변할 때마다 자동으로 호출되는 함수 설정
  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      console.log("API 호출 완료");
      apis = showInterparkBook(xhr.response);
    } else {
      // FAIL
    }
  };

  xhr.open("GET", link, true);
  xhr.send();
};

interparkAPI(link1);

const showInterparkBook = (jsonString) => {
  // console.log(jsonString);

  let json = JSON.parse(jsonString);

  let title;
  let img; // imageUrl
  let pubDate; // pubDate
  let author;
  let star; // coverLargeUrl

  // https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/JSON
  // let getJson = json["item"][0];

  for (let i = 0; i < 15; i++) {
    title = json["item"][i]["title"];
    author = json["item"][i]["author"];
    img = json["item"][i]["coverLargeUrl"];
    pubDate = json["item"][i]["pubDate"].substr(0, 4); // 월ㄴ일 슬라이스
    id = json["item"][i]["itemId"];

    // console.log(title + "\n" + img + "\n" + pubDate);

    // let title_div = document.getElementsByClassName("title");
    // let img_div = document.getElementsByClassName("books-img");
    // let pubDate_div = document.getElementsByClassName("author-pubyear");

    // let container = document.getElementsByClassName("grid-books")[0];
    let container = document.getElementsByClassName("books-container")[0];
    let item = document.createElement("grid-books-item");
    item.innerHTML = `
    <div class="grid-books-items" onclick="showBookDetail(event)">
      <div class="books">
      <img class="crown" src="./img/books-crown.png" alt="">
          <img class="heart" src="./img/books-heart-2.png" alt="">
          <div class="books-img">
          <img src="${img}" alt="">
          </div>
      </div>
      <div class="books-title">
      <div class="isbn">${id}</div>
      <div class="title">${title}</div>
          <div class="author-pubyear">${author} · ${pubDate}</div>
          <div class="stars">
          <p>평균 별점</p>
          <div class="stars-img">
            <img src="./img/books-star-1.png" alt="">
            <img src="./img/books-star-1.png" alt="">
            <img src="./img/books-star-1.png" alt="">
            <img src="./img/books-star-2.png" alt="">
            <img src="./img/books-star-2.png" alt="">
          </div>
          </div>
          </div>
          </div>`;

      let book = document.getElementsByClassName('grid-books-items')[i];
      book.setAttribute('data-id', id);
      // book.addEventListener('click', showBookDetail);
      container.appendChild(item);
  }

  console.log("인터파크 베스트셀러 15권 API 호출 완료");

  return json; 
};

// 버튼 세 개별로 각각 베스트셀러, 추천도서, 신간 도서 가져오기
// 네이버 api는 4개라서 수가 적으니 넘기기 버튼 안 보이게 하기
const bestSellerBtn = document.querySelector("#aladin");
const recommendBtn = document.querySelector("#naver");
const newBtn = document.querySelector("#daum");

bestSellerBtn.addEventListener("click", () => {
  let link = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=200&output=${TYPE}`;
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
      console.log("버튼 세 개 API 호출 완료");
      apis = showBooks(xhr.response);
    } else {
      // FAIL
    }
  };

  xhr.open("GET", link, true);
  xhr.send();
};

// 기본 호출
let link2 = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=200&output=${TYPE}`;
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

    let item = document.createElement("div");
    item.className = "grid-books-items";
    item.innerHTML = `
      <div class="books">
        <img class="crown" src="./img/books-crown.png" alt="">
        <img class="heart" src="./img/books-heart-2.png" alt="">
        <div class="books-img">
          <img src="${img}" alt="">
        </div>
      </div>
      <div class="books-title">
        <div class="isbn">${id}</div>
        <div class="title">${title}</div>
        <div class="author-pubyear">${author} · ${pubDate}</div>
        <div class="stars">
          <p>평균 별점</p>
          <div class="stars-img">
            <img src="./img/books-star-1.png" alt="">
            <img src="./img/books-star-1.png" alt="">
            <img src="./img/books-star-1.png" alt="">
            <img src="./img/books-star-2.png" alt="">
            <img src="./img/books-star-2.png" alt="">
          </div>
        </div>
      </div>`;

    container.appendChild(item);
  }

  return json;
};

// 책 상세 페이지
function showBookDetail(event) {


  //   let id = event.target.getAttribute("data-id");
  //   let detail_url = `https://book.interpark.com/api/search?key=${KEY}&query=${id}`
  //   console.log(detail_url);

  // fetch(detail_url)
  //   .then(function(res) {
  //     return res.json();
  //   })
  //   .then(function(data) {
  //     let book = data.item[0];
  //     let bookDetail = document.getElementsByClassName('book-profile');
  //     console.log(book);
  //     console.log(bookDetail);
  //     // pubYear = json["item"][i]["pubDate"].substr(0, 4);
  //     // pubMonth = json["item"][i]["pubDate"].substr(5, 1);
  //     // pubDay = json["item"][i]["pubDate"].substr(7, 8);
  //     console.log(pubYear, pubMonth, pubDay);
  //     // <div class="pubyear">${pubYear}년 ${pubMonth}월 ${pubDay}일</div>
  //     bookDetail.innerHTML = `
  //     <div class="book-profile">
  //     <img src="../img/banner/test-banner-book-profile.png" alt="">
  //     <div class="profile">
  //         <div class="title">${book.title}}다</div>
  //         <div class="info1"> 
  //             <div class="author">${book.author}</div>
  //             <div class="pub">${book.publisher}</div>
  //         </div>
  //         <div class="info2">
  //             <div class="star">
  //                 <div class="star-title">읽을만 했어요!</div>
  //                 <div class="star-img">
  //                     <img src="../img/books-star-1.png" alt="">
  //                     <img src="../img/books-star-1.png" alt="">
  //                     <img src="../img/books-star-1.png" alt="">
  //                     <img src="../img/books-star-2.png" alt="">
  //                     <img src="../img/books-star-2.png" alt="">
  //                 </div>
  //             </div>
  //             <div class="tag">
  //                 <div class="grid-tag">
  //                     <div class="tag-item">1</div>
  //                     <div class="tag-item">2</div>
  //                     <div class="tag-item">3</div>
  //                     <div class="tag-item">4</div>
  //                     <div class="tag-item">5</div>
  //                     <div class="tag-item">6</div>
  //                     <div class="tag-item">7</div>
  //                     <div class="tag-item">8</div>
  //                 </div>
  //             </div>
  //         </div>
  //         <div class="summary">
  //             <div class="summary-title">이 책의 줄거리</div>
  //             <div class="summary-content">${book.description}</div>
  //         </div>
  //     </div>
  //     `
  //   }) 
  //   .catch(function(err) {
  //     console.log("API 요청 실패", err);
  //   });

}