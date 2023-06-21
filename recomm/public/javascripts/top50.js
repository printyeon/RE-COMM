const KEY = "5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E";
const TYPE = "json";
const link = `http://book.interpark.com/api/bestSeller.api?key=${KEY}&categoryId=100&output=${TYPE}`;

let getBookAPI = (link) => {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
      //console.log("API 호출 완료");
      //console.log(link);
      apis = showBook(xhr.response);
    } else {
      // FAIL
    }
  };

  xhr.open("GET", link, true);
  xhr.send();
};

getBookAPI(link);

const showBook = (jsonString) => {
  //   //console.log(jsonString);

  let json = JSON.parse(jsonString);
  // //console.log(json);

  let title;
  let img; // imageUrl
  let pubDate; // pubDate
  let star; // coverLargeUrl

  // https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/JSON
  // let getJson = json["item"][0];

  for (let i = 0; i < 30; i++) {
    title = json["item"][i]["title"];
    autor = json["item"][i]["author"];
    img = json["item"][i]["coverLargeUrl"];
    pubDate = json["item"][i]["pubDate"].substr(0, 4); // 월ㄴ일 슬라이스

    // //console.log(title + "\n" + img + "\n" + pubDate);

    // let title_div = document.getElementsByClassName("title");
    // let img_div = document.getElementsByClassName("books-img");
    // let pubDate_div = document.getElementsByClassName("author-pubyear");

    let container = document.getElementsByClassName("grid-books")[0];
    // let container = document.getElementsByClassName('books-container')[0];
    let item = document.createElement("grid-books-item");

    item.innerHTML = `
    <div class="grid-books-items">
      <div class="books">
          <div class="books-img">
              <img src="${img}" alt="">
          </div>
      </div>
      <div class="books-title">
          <div class="title">${title}</div>
          <div class="author-pubyear">${autor} · ${pubDate}</div>
          <div class="stars">
              <p>평균 별점</p>
              <div class="stars-img">
                  <img src="/images/books-star-1.png" alt="">
                  <img src="/images/books-star-1.png" alt="">
                  <img src="/images/books-star-1.png" alt="">
                  <img src="/images/books-star-2.png" alt="">
                  <img src="/images/books-star-2.png" alt="">
              </div>
          </div>
      </div>
    </div>`;

    container.appendChild(item);
  }

  //console.log(totalResults);
  //console.log("책 15권 API 호출 완료");

  return json;
};

function chkHeart() {
  let heart = document.getElementsByClassName("heart");

  // 같은 클래스명을 공유하는 요소들의 개수
  let heartLength = heart.length;
  //console.log(heartLength);

  // 같은 클래스명을 공유하는 요소들에게 한 번에 이벤트 추가
  for (let i = 0; i < heartLength; i++) {
    heart[i].addEventListener("click", function () {
      // 꽉 찬 하트일 때
      if (heart[i].getAttribute("src") == "./img/books-heart-1.png") {
        // 경로 가져오기
        heart[i].setAttribute("src", "./img/books-heart-2.png");
        //console.log(heart[i].getAttribute("src"));
      }
      // 빈 하트일 때
      else if (heart[i].getAttribute("src") == "./img/books-heart-2.png") {
        heart[i].setAttribute("src", "./img/books-heart-1.png");
        //console.log(heart[i].getAttribute("src"));
      }
    });
  }
}
