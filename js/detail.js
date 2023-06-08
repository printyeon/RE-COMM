// function getBookList() {
//   var api_url =
//     "http://book.interpark.com/api/bestSeller.api?key=5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E&categoryId=100&&output=json";
//   // 위의 URL에서 API_KEY를 발급받은 키로 변경해주세요. 여기서는 "판타지" 검색어로 도서 목록을 가져옵니다.

//   fetch(api_url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       var bookList = data.item;

//       var bookListContainer = document.getElementById("book-list");

//       for (var i = 0; i < bookList.length; i++) {
//         var bookItem = document.createElement("div");
//         bookItem.className = "book-item";
//         bookItem.textContent = bookList[i].title;
//         bookItem.setAttribute("data-isbn", bookList[i].title);
//         bookItem.addEventListener("click", showBookDetail);
//         bookListContainer.appendChild(bookItem);
//       }
//     })
//     .catch(function (error) {
//       console.log("API 요청에 실패했습니다.", error);
//     });
// }

function showBookDetail(event) {
  console.log("클릭");
  var isbn = event.target.getAttribute("data-isbn");
  isbn = encodeURIComponent(isbn);
  var api_url =
    "https://book.interpark.com/api/search.api?key=5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E&query=" +
    isbn +
    "&output=json";
  console.log(api_url);

  fetch(api_url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var book = data.item[0];
      console.log(book);

      let bookDeatail = document.getElementsByClassName("book-profile");
      bookDeatail.innerHTML = `
      <div class="book-profile">
      <img src="../img/banner/test-banner-book-profile.png" alt="">
      <div class="profile">
          <div class="title">${book.title}</div>
          <div class="info1"> 
              <div class="author">${book.author}</div>
              <div class="pub">${book.publisher}</div>
              <div class="pubyear">2019년 5월 25일</div>
          </div>
          <div class="info2">
              <div class="star">
                  <div class="star-title">읽을만 했어요!</div>
                  <div class="star-img">
                      <img src="../img/books-star-1.png" alt="">
                      <img src="../img/books-star-1.png" alt="">
                      <img src="../img/books-star-1.png" alt="">
                      <img src="../img/books-star-2.png" alt="">
                      <img src="../img/books-star-2.png" alt="">
                  </div>
              </div>
              <div class="tag">
                  <div class="grid-tag">
                      <div class="tag-item">1</div>
                      <div class="tag-item">2</div>
                      <div class="tag-item">3</div>
                      <div class="tag-item">4</div>
                      <div class="tag-item">5</div>
                      <div class="tag-item">6</div>
                      <div class="tag-item">7</div>
                      <div class="tag-item">8</div>
                  </div>
              </div>
          </div>
          <div class="summary">
              <div class="summary-title">이 책의 줄거리</div>
              <div class="summary-content">어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕어쩌구저쩌구왕왕</div>
              </div>
              </div>
              </div>
              `;

      let bookDetailHTML = window.open("", "_blank");
      bookDetailHTML.document.write(bookDeatail);
      bookDetailHTML.document.close();
    })
    .catch(function (error) {
      console.log("API 요청에 실패했습니다.", error);
    });
}

getBookList();
