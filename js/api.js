// fetch("http://book.interpark.com/api/bestSeller.api").then((response) => console.log("response: ", response));

// 인터파크 API
const KEY = "5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E";
const TYPE = "json";
const link = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=100&output=${TYPE}`;
// 알라딘 API
const ALADIN_KEY = "ttbcyyy20051901001";
const ALADIN_link = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ALADIN_KEY}&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`;
// yes24 API
// const YES24_KEY = ``;
// const YES24_link = ``;
// 교보문교 API
// const GYOBO_KEY = ``;
// const GYOBO_link = ``;

let interparkAPI = (link) => {
  let xhr = new XMLHttpRequest();

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

interparkAPI(link);

const showInterparkBook = (jsonString) => {
  // console.log(jsonString);

  let json = JSON.parse(jsonString);
  // console.log(json);

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

    // console.log(title + "\n" + img + "\n" + pubDate);

    // let title_div = document.getElementsByClassName("title");
    // let img_div = document.getElementsByClassName("books-img");
    // let pubDate_div = document.getElementsByClassName("author-pubyear");

    // let container = document.getElementsByClassName("grid-books")[0];
    let container = document.getElementsByClassName("books-container")[0];
    let item = document.createElement("grid-books-item");
    item.innerHTML = `
    <div class="grid-books-items">
      <div class="books">
          <img class="crown" src="./img/books-crown.png" alt="">
          <img class="heart" src="./img/books-heart-2.png" alt="">
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
                  <img src="./img/books-star-1.png" alt="">
                  <img src="./img/books-star-1.png" alt="">
                  <img src="./img/books-star-1.png" alt="">
                  <img src="./img/books-star-2.png" alt="">
                  <img src="./img/books-star-2.png" alt="">
              </div>
          </div>
      </div>
    </div>`;

    container.appendChild(item);
  }

  console.log("인터파크 베스트셀러 15권 API 호출 완료");

  return json;
};

// function prevSlide() {
//   console.log("클릭");
//   current = i * 1200;
//   container.style.transform = `trslateX(${current}px)`;
//   container.style.transition = "all ease 1s";
//   i--;
//   console.log(`현재 위치 ${current}, ${i}`);
// }

// 알라딘 API

let aladinAPI = (link) => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      apis = showAladinBook(xhr.response);
    } else {
      // FAIL
    }
  };

  xhr.open("GET", link, true);
  xhr.send();
};

aladinAPI(ALADIN_link);

const showAladinBook = (jsonString) => {
  // console.log(jsonString);

  let json = JSON.parse(jsonString);
  // console.log(json);

  let title;
  let img; // imageUrl
  let pubDate; // pubDate
  let author;
  let star; // coverLargeUrl

  // https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/JSON
  // let getJson = json["item"][0];

  // 알라딘은 10개만 제공하나봄
  for (let i = 0; i < 10; i++) {
    title = json["item"][i]["title"];
    author = json["item"][i]["author"];
    img = json["item"][i]["cover"];
    pubDate = json["item"][i]["pubDate"].substr(0, 4); // 월ㄴ일 슬라이스

    // console.log(title + "\n" + img + "\n" + pubDate);

    // let title_div = document.getElementsByClassName("title");
    // let img_div = document.getElementsByClassName("books-img");
    // let pubDate_div = document.getElementsByClassName("author-pubyear");

    // let container = document.getElementsByClassName("grid-books")[0];
    let container = document.getElementsByClassName("books-container")[1];
    let item = document.createElement("grid-books-item");
    item.innerHTML = `
    <div class="grid-books-items">
      <div class="books">
          <img class="crown" src="./img/books-crown.png" alt="">
          <img class="heart" src="./img/books-heart-2.png" alt="">
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
                  <img src="./img/books-star-1.png" alt="">
                  <img src="./img/books-star-1.png" alt="">
                  <img src="./img/books-star-1.png" alt="">
                  <img src="./img/books-star-2.png" alt="">
                  <img src="./img/books-star-2.png" alt="">
              </div>
          </div>
      </div>
    </div>`;

    container.appendChild(item);
  }

  console.log("알라딘 베스트 셀러 API 10권 호출 완료");

  return json;
};

// CORS 해결 해야 함... 일단 크롬 확장 모드 깔아둠
// 조언 받은 거 : json 말고 jsonp 사용해보기
// jsonp 조사하고 어떻게 적용할지 알아오자~~..
// https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbcyyy20051901001&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=xml&Version=20131101

// const xhr = new XMLHttpRequest();

// xhr.open('GET', link);
// xhr.onreadystatechange = someHandler;
// xhr.send();

// const handler = async (event) => {
//     const response = {
//         statusCode: 200,
//         headers: {
//             "Access-Control-Allow-Headers" : "Content-Type",
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
//         },
//         body: JSON.stringify('Hello from Lambda!'),
//     };
//     return response;
// };

// https://kimyhcj.tistory.com/263
// CORS 정책

// const request = new XMLHttpRequest();
// // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
// // console.log(location.origin); https://inpa.tistory.com/entry/WEB-%F0%9F%93%9A-CORS-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95-%F0%9F%91%8F
// request.open('GET', 'http://book.interpark.com/api/bestSeller.api?key=interpark&categoryId=100');
// // request.setRequestHeader('Access-Control-Allow-Origin', '*');
// request.setRequestHeader = handler();
// console.log('STATE:', request.readyState); // if opend -> 1
// request.send();
// request.onload = function() {
//     console.log(JSON.parse(request, this.response));
// }
// // origin = PROTOCOL + HOST + PORT

// function handler(event)  {
//     let response  = request.response;
//     let headers  = response.headers;

//     // If Access-Control-Allow-Origin CORS header is missing, add it.
//     // Since JavaScript doesn't allow for hyphens in variable names, we use the dict["key"] notation.
//         headers['access-control-allow-origin'] = {value: "*"}; // 허용 사이트 // https://kk-programming.tistory.com/63
//         console.log("Access-Control-Allow-Origin was missing, adding it now.");

//     return response;
// }

// https://coding-groot.tistory.com/91
// const http_req = new XMLHttpRequest()
// http_req.headers['access-control-allow-origin'] = {value: "*"};
// http_req.open("GET", "http://book.interpark.com/api/bestSeller.api")
// http_req.onload = () => console.log("Flask 서버로 부터의 응답은: " + http_req.responseText)
// http_req.send();



// 찜 클릭 시 하트 채워지는 기능 (빈 하트 -> 찬 하트 이미지 변경)
function chkHeart() {
  let heart = document.getElementsByClassName("heart");

  // 같은 클래스명을 공유하는 요소들의 개수
  let heartLength = heart.length;
  console.log(heartLength);

  // 같은 클래스명을 공유하는 요소들에게 한 번에 이벤트 추가
  for (let i = 0; i < heartLength; i++) {
    heart[i].addEventListener("click", function () {
      console.log("클릭");
      // 꽉 찬 하트일 때
      if (heart[i].getAttribute("src") == "./img/books-heart-1.png") {
        // 경로 가져오기
        heart[i].setAttribute("src", "./img/books-heart-2.png");
        console.log(heart[i].getAttribute("src"));
      }
      // 빈 하트일 때
      else if (heart[i].getAttribute("src") == "./img/books-heart-2.png") {
        heart[i].setAttribute("src", "./img/books-heart-1.png");
        console.log(heart[i].getAttribute("src"));
      }
    });
  }
}
