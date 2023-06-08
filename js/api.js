// fetch("http://book.interpark.com/api/bestSeller.api").then((response) => console.log("response: ", response));

// 인터파크 API
const TYPE = "json";
const KEY = "5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E";
const link1 = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=100&output=json`;
console.log(link1);

let interparkAPI = (link) => {
  fetch(link)
    .then((response) => {
      if (response.ok) {
        console.log("API 호출 완료");
        return response.json();
      } else {
        throw new Error("API 요청에 실패했습니다.");
      }
    })
    .then((data) => {
      showInterparkBook(data);
    })
    .catch((error) => {
      console.log(error);
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

    let container = document.getElementsByClassName("books-container")[0];
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
        <div class="isbn">${id}, ${review}</div>
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

    item.setAttribute("data-id", title);
    console.log(title);
    item.addEventListener("click", showBookDetail);
    container.appendChild(item);
  }

  console.log("인터파크 베스트셀러 15권 API 호출 완료");
}

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

    item.setAttribute("data-id", title);
    console.log(title);
    item.addEventListener("click", showBookDetail);
    container.appendChild(item);
    container.appendChild(item);
  }

  return json;
};

const showBookDetail = (event) => {
  let id = event.currentTarget.getAttribute("data-id");
  id = encodeURIComponent(id);
  console.log(id);
  var api_url =
    "https://book.interpark.com/api/search.api?key=5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E&query=" +
    id +
    "&output=json";
  console.log(api_url);

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
      console.log(book);

      // let bookDetailHtml = `<h2>${book.title}</h2>`;
      // bookDetailHtml += `<p>저자: ${book.author}</p>`;
      // bookDetailHtml += `<p>출판사: ${book.publisher}</p>`;
      // bookDetailHtml += `<img src=${book.coverLargeUrl} />`;
      // 원하는 형식에 맞게 필요한 책 정보들을 추가

      let bookDetailURL = "detail.html";
      let url = bookDetailURL + "?id=" + id;
      // window.document.write(bookDetailHtml);
      window.location.href = url;
    })
    .catch((error) => {
      console.log(error);
    });
};
