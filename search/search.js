const TYPE = "json";
const KEY = "5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const container = document.getElementsByClassName("grid-books")[0];
const resultText = document.getElementsByClassName("title")[1];

window.onload = function () {
  // 검색 상황 1. 검색 버튼 클릭해서 검색했을 때
  searchBtn.addEventListener("click", () => {
    let keyword = searchInput.value.trim();
    if (keyword !== "") {
      resultText.innerHTML = `"${keyword}"의 검색 결과`;
      let link = `http://book.interpark.com/api/search.api?key=${KEY}&query=${encodeURIComponent(
        keyword
      )}&output=${TYPE}`;
      console.log(link);
      searchBooks(link);
    }
  });

  // 검색 상황 2. 엔터 키를 눌러서 검색했을 때
  // searchInput.addEventListener("keyup", function (e) {
  //   let keyword = searchInput.value.trim();
  //   if (keyword !== "") {
  //     if (e.keyCode === 13) {
  //       console.log("엔터 클릭");
  //       resultText.innerHTML = `"${keyword}"의 검색 결과`;
  //     }
  //     let link = `http://book.interpark.com/api/search.api?key=${KEY}&query=${encodeURIComponent(
  //       keyword
  //     )}&output=${TYPE}`;
  //     searchBooks(link);
  //   }
  // });

  const searchBooks = (link) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        console.log("검색 API 호출 완료");
        showBooks(xhr.response);
      } else {
        // FAIL
      }
    };

    xhr.open("GET", link, true);
    xhr.send();
  };

  const showBooks = (jsonString) => {
    container.innerHTML = "";

    let json = JSON.parse(jsonString);

    if (json["totalResults"] === 0) {
      container.innerHTML = "검색 결과가 없습니다.";
      return;
    }

    let items = json["item"];

    items.forEach((item) => {
      let title = item["title"];
      let author = item["author"];
      let img = item["coverLargeUrl"];
      let pubDate = item["pubDate"].substr(0, 4);

      let bookItem = document.createElement("div");
      bookItem.className = "grid-books-items";
      bookItem.innerHTML = `
          <div class="books">
            <img class="heart" src="../img/books-heart-2.png" alt="">
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
                <img src="../img/books-star-1.png" alt="">
                <img src="../img/books-star-1.png" alt="">
                <img src="../img/books-star-1.png" alt="">
                <img src="../img/books-star-2.png" alt="">
                <img src="../img/books-star-2.png" alt="">
              </div>
            </div>
          </div>`;

      container.appendChild(bookItem);
    });
  };
};
