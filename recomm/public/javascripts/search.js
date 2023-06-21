const TYPE = "json";
const KEY = "5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const container = document.getElementsByClassName("grid-books")[0];
const resultText = document.getElementsByClassName("title1")[0];

let i = 0;
window.onload = function () {
  // 검색 상황 1. 검색 버튼 클릭해서 검색했을 때
  searchBtn.addEventListener("click", () => {
    let keyword = searchInput.value.trim();
    let country = document.getElementById("whole-country").value;
    if (keyword !== "") {
      resultText.innerHTML = `"${keyword}"의 검색 결과`;
      let link = `http://book.interpark.com/api/search.api?key=${KEY}&query=${encodeURIComponent(
        keyword
      )}&output=${TYPE}&country=${country}`;
      //console.log(link);
      searchBooks(link);
    }
  });

  // 검색 상황 2. 엔터 키를 눌러서 검색했을 때
  searchInput.addEventListener("keypress", function (e) {
    let keyword = searchInput.value.trim();
    let country = document.getElementById("whole-country").value;
    if (keyword !== "") {
      if (e.keyCode === 13) {
        e.preventDefault(); // 기본 동작 중지 - form 태그는 제출되면 페이지가 새로고침되기 떄문에 preventDefault 주면 됨
        //console.log("엔터 클릭");
        resultText.innerHTML = `"${keyword}"의 검색 결과`;
      }
      let link = `http://book.interpark.com/api/search.api?key=${KEY}&query=${encodeURIComponent(
        keyword
      )}&output=${TYPE}&country=${country}`;
      searchBooks(link);
    }
  });

  const searchBooks = (link) => {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        //console.log("검색 API 호출 완료");
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
      let customerReviewRank = item["customerReviewRank"];
      i++;
      let bookItem = document.createElement("div");
      bookItem.className = "grid-books-items";
      bookItem.innerHTML = `
          <div class="books">
            <div class="books-img">
              <img src="${img}" alt="">
            </div>
          </div>
          <div class="books-title">
            <div class="title">${title}</div>
            <div class="author-pubyear">${author} · ${pubDate}</div>
           
          </div>`;

      bookItem.setAttribute("data-id", title);
      //console.log(title);
      bookItem.addEventListener("click", showBookDetail);
      container.appendChild(bookItem);
    });
  };
};

const showBookDetail = (event) => {
  let id = event.currentTarget.getAttribute("data-id");
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
      //console.log(book.title);
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
            //console.log(data);

            for (const i in data) {
              //console.log(i);
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
