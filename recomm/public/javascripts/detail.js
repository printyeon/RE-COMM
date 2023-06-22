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
var type;
// 위로 이동하고 모달창이 열려야 하기 때문에 함수 선언
function moveToNavAndReview(comtype) {
  type = comtype;
  let nav = document.getElementById("nav");
  if (nav) {
    nav.scrollIntoView({ behavior: "smooth" });
    setTimeout(onReview, 200); // 스크롤 후에 모달창을 열기 위해 setTimeout 사용
  }
}

function cancle(){
  const modal1 = document.getElementById("modal1");
  modal1.style.display = "none";
}

const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("id");
//console.log(bookId);

let api_url =
  "https://book.interpark.com/api/search.api?key=5DC0043F3B12F1DEA20EE1F13E31A6BF9EDA50043079B11214F1261975344B9E&query=" +
  bookId +
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
    const book = data.item[0];
    //console.log(book);

    if (book) {
      // 날짜 포맷팅
      let pub = book.pubDate;
      let pubYear = pub.substr(0, 4);
      let pubMonth = pub.substr(5, 1);
      let pubDay = pub.substr(7, 1);

      // 배경 이미지 변경
      document.body.style.backgroundImage = `url(${book.coverLargeUrl})`;

      const bookDetailDiv = document.getElementById("book-detail");
      bookDetailDiv.innerHTML = `
    <div class="book-profile">
        <img class="cover" src="${book.coverLargeUrl}" alt="">
        <div class="profile">
            <div class="title">${book.title}</div>
            <div class="info1"> 
                <div class="author">${book.author} </div>
                <div class="pub">${book.publisher} </div>
                <div class="pubyear">${pubYear}년 ${pubMonth}월 ${pubDay}일</div>
            </div>
            <div class="info2">
                <div class="star">
                    <div class="star-title">!!</div>
                    <div class="rating_box">
                        <div class="rating">
                            ★★★★★
                            <span class="rating_star">★★★★★</span>
                        </div>
                        </div>
                </div>
                <div class="tag">
                    <div class="grid-tag">
                        
                    </div>
                </div>
            </div>
            <div class="summary">
                <div class="summary-title">이 책의 줄거리</div>
                <div class="summary-content">${book.description}</div>
            </div>
        </div>
    </div>
  `;
      //별점
      const rating_star = document.querySelector(".rating_star");
      rating_star.style.width = `${book.customerReviewRank * 10}%`;

      //별점 위 텍스트
      const starTitle = document.getElementsByClassName("star-title")[0];
      //console.log(starTitle.innerHTML);
      if (book.customerReviewRank >= 8.9) {
        starTitle.innerHTML = "완전 추천해요!";
      } else if (book.customerReviewRank >= 6.9) {
        starTitle.innerHTML = "좋은 책이에요!";
      } else if (book.customerReviewRank >= 4.9) {
        starTitle.innerHTML = "나쁘지 않은 책이에요!";
      } else if (book.customerReviewRank >= 2.9) {
        starTitle.innerHTML = "보통인것 같아요.";
      } else {
        starTitle.innerHTML = "이 책에 대해 아직 잘 모르겠어요.";
      }

      let gridTag = document.getElementsByClassName("grid-tag")[0];

      //태그
      if (book.categoryId != null) {
        let Bicla = transBCI(book.categoryId);
        let Biclat = document.createElement("Biclat");
        Biclat.innerHTML = `
          <div class="tag-item">
          <div class="Biclat">
          #${Bicla}
          </div>
          </div>
          `;
        gridTag.appendChild(Biclat);

        if (book.categoryId != 200 && book.categoryId != 100) {
          let cla = transCI(book.categoryId);
          //console.log("cla : " + cla);
          let clat = document.createElement("clat");
          clat.innerHTML = `
            <div class="tag-item">
            <div class="clat">
              #${cla}
            </div>
            </div>`;
          gridTag.appendChild(clat);
        }
      } else {
        let non = document.createElement("non");
        non.innerHTML = `
  <div class="tag-item">
  <div class="Biclat">
  #없음
  </div>
  </div>
  `;
        gridTag.appendChild(non);
      }
      //console.log(book.isbn);

      // 이제 컨테이너가 세개네요.. 이 세 개 처리를 어케학ㄱㅈ
      let gridContent = document.getElementsByClassName("grid-content")[0];
      let gridContent1 = document.getElementsByClassName("grid-content")[1];
      let gridContent2 = document.getElementsByClassName("grid-content")[2];
      let index = 0;

      var messageRef = database.ref("index/index");
      messageRef.on("value", function (snapshot) {
        index = snapshot.val();
        setTimeout(() => index++, 1);
      });

      var messageRef = database.ref("message/" + book.isbn + "/imphra");
      messageRef.on("child_added", function (snapshot) {
        var data = snapshot.val();
        //console.log("추가됨");

        // data.forEach((data, index) => {
        //   //console.log(data);
        let testcontent = document.createElement("testcontent");
        testcontent.innerHTML = `
      <div class="content">
                  <div class="top">
                      <div class="id">${data.id}</div>
                      <div class="comment">${data.text}</div>
                  </div>
                  <div class="bottom">
                      <div class="member">
                          <div class="icon">
                              <img src="/images/memeber-icon.png" alt="">
                          </div>
                          <div class="member-name"><p class="name">${data.name}</p>님의 리뷰</div>
                      </div>
                      <div class="heart">
                          <img class="heart" onclick="heartonoff(this)" src="/images/books-heart-1.png" alt="">
                      </div>
                  </div>
              </div> 
             
        `;
        gridContent.appendChild(testcontent);
      });

      var messageRef = database.ref("message/" + book.isbn + "/felt");
      messageRef.on("child_added", function (snapshot) {
        var data = snapshot.val();
        //console.log("추가됨");

        // data.forEach((data, index) => {
        //   //console.log(data);
        let testcontent = document.createElement("testcontent");
        testcontent.innerHTML = `
      <div class="content">
                  <div class="top">
                      <div class="id">${data.id}</div>
                      <div class="comment">${data.text}</div>
                  </div>
                  <div class="bottom">
                      <div class="member">
                          <div class="icon">
                              <img src="/images/memeber-icon.png" alt="">
                          </div>
                          <div class="member-name"><p class="name">${data.name}</p>님의 리뷰</div>
                      </div>
                      <div class="heart">
                          <img class="heart" onclick="heartonoff(this)" src="/images/books-heart-1.png" alt="">
                      </div>
                  </div>
              </div> 
             
        `;
        gridContent1.appendChild(testcontent);
        // });
      });

      var messageRef = database.ref("message/" + book.isbn + "/free");
      messageRef.on("child_added", function (snapshot) {
        var data = snapshot.val();
        //console.log("추가됨");

        // data.forEach((data, index) => {
        //   //console.log(data);
        let testcontent = document.createElement("testcontent");
        testcontent.innerHTML = `
      <div class="content">
                  <div class="top">
                      <div class="id">${data.id}</div>
                      <div class="comment">${data.text}</div>
                  </div>
                  <div class="bottom">
                      <div class="member">
                          <div class="icon">
                              <img src="/images/memeber-icon.png" alt="">
                          </div>
                          <div class="member-name"><p class="name">${data.name}</p>님의 리뷰</div>
                      </div>
                      <div class="heart">
                          <img class="heart" onclick="heartonoff(this)" src="/images/books-heart-1.png" alt="">
                      </div>
                  </div>
              </div> 
             
        `;
        gridContent2.appendChild(testcontent);
        // });
      });

      // 리뷰 없을 때 처리
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     let grids = document.querySelectorAll(".grid-content");
      //     grids.forEach(function(grid) {
      //     let childCount = 0;
      //     for (let i = 0; i < grid.children.length; i++) {
      //       if (grid.children[i].classList.contains("content")) {
      //         childCount++;
      //       }
      //     }
      //     //console.log(childCount);
      //     let noReview = document.createElement("div");
      //     if (childCount === 0) {
      //       noReview.style.fontSize = "24px";
      //       noReview.style.color = "#777777";
      //       noReview.innerHTML = `리뷰가 없네요. <b>${user.displayName}</b>님께서 첫 리뷰를 달아주시는 건 어때요?`;
      //       grid.appendChild(noReview);
      //     } else {
      //       grid.removeChild(noReview);
      //     }
      //     });
      //   } else {
      //     let grids = document.querySelectorAll(".grid-content");
      //     grids.forEach(function (grid) {
      //       let childCount = grid.childElementCount;
      //       let noReview = document.createElement("div");
      //       if (childCount === 0) {
      //         noReview.style.fontSize = "24px";
      //         noReview.style.color = "#777777";
      //         noReview.innerHTML = `리뷰가 없네요. 로그인 하시고 첫 리뷰를 달아주시는 건 어때요?`;
      //         grid.appendChild(noReview);
      //       } else {
      //         grid.removeChild(noReview);
      //       }
      //     });
      //   }
      // });

      var post = document.getElementsByClassName("post")[0];
      var messageField = document.getElementsByClassName("row")[0];
      // var cancle = document.getElementsByClassName("cancle")[0];

      // cancle.addEventListener("click", () => {
      //   console.log("Asdf");
      //   const modal1 = document.getElementById("modal1");
      //   modal1.style.display = "none";
      // });

      post.addEventListener("click", () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            var message = messageField.value;
            //console.log("message : " + message);
            //console.log("type : " + type);
            if (message == "") {
              alert("메시지를 입력하세요");
            }
            else{
              let uid = user.uid;
              database
                .ref("message/" + book.isbn + "/" + type + "/" + index)
                .set({
                  id: user.email,
                  name: user.displayName,
                  text: message,
                });
              database.ref("user/" + uid + "/message/" + index).set({
                booktit: book.title,
                bookimg: book.coverLargeUrl,
                id: user.email,
                name: user.displayName,
                text: message,
              }, (error) => {
                if (error) {
                  // The write failed...
                } else {
                  const modal1 = document.getElementById("modal1");
                  modal1.style.display = "none";
                }
              });
              
              messageField.value = "";
              //console.log("222222");
              index++;
              database.ref("index").update({ index: index++ });
            }
            
          } else {
            alert("로그인 후 사용하실 수 있습니다.");
            location.href = "/index";
          }
        });
      });
    } else {
      //console.log("책 정보가 없습니다.");
    }
  })
  .catch((error) => {
    //console.log(error);
  })
  .then(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        var messageRef = database.ref("user/" + uid + "/message");
        messageRef.on("value", function (snapshot) {
          var data = snapshot.val();
          //console.log(data);
          for (const i in data) {
            //console.log(data[i].text);
          }
        });
      }
    });
  });

function transBCI(categoryId) {
  let Bicla = "";
  if (categoryId >= 100 && categoryId < 200) return (Bicla = "국내도서");
  else if (categoryId >= 200 && categoryId < 300) return (Bicla = "외국도서");
}

function transCI(categoryId) {
  let cla = "";
  if (categoryId == 101) return (cla = "소설");
  else if (categoryId == 102) return (cla = "시/에세이");
  else if (categoryId == 103) return (cla = "예술/대중문화");
  else if (categoryId == 104) return (cla = "사회과학");
  else if (categoryId == 105) return (cla = "역사");
  else if (categoryId == 107) return (cla = "잡지");
  else if (categoryId == 108) return (cla = "만화");
  else if (categoryId == 109) return (cla = "유아");
  else if (categoryId == 110) return (cla = "어린이");
  else if (categoryId == 111) return (cla = "가정 살림");
  else if (categoryId == 112) return (cla = "청소년");
  else if (categoryId == 113 || categoryId == 114 || categoryId == 129)
    return (cla = "학습서");
  //else if (categoryId == 114) return (cla = "고등학습서");
  else if (categoryId == 115) return (cla = "국어/외국어/사전");
  else if (categoryId == 116) return (cla = "자연과학");
  else if (categoryId == 117) return (cla = "경제 경영");
  else if (categoryId == 118) return (cla = "자기계발");
  else if (categoryId == 119) return (cla = "인문");
  else if (categoryId == 120) return (cla = "종교");
  else if (categoryId == 122) return (cla = "IT 모바일");
  else if (categoryId == 123) return (cla = "자격서/수험서");
  else if (categoryId == 124) return (cla = "취미");
  else if (categoryId == 125) return (cla = "전공도서/대학교재");
  else if (categoryId == 126) return (cla = "건강/뷰티");
  else if (categoryId == 128) return (cla = "여행");
  //else if (categoryId == 129) return (cla = "중등학습서");
  else if (categoryId == 201) return (cla = "유아/어린이");
  else if (categoryId == 203) return (cla = "ELT/사전");
  else if (categoryId == 205) return (cla = "문학");
  else if (categoryId == 206) return (cla = "경영/인문");
  else if (categoryId == 207) return (cla = "예술/디자인");
  else if (categoryId == 208) return (cla = "실용");
  else if (categoryId == 209) return (cla = "해외잡지");
  else if (categoryId == 210) return (cla = "대학교재/전문서적");
  else if (categoryId == 211) return (cla = "컴퓨터");
  else if (categoryId == 214) return (cla = "일본도서");
  else if (categoryId == 215) return (cla = "프랑스도서");
  else if (categoryId == 216) return (cla = "중국도서");
  else if (categoryId == 217) return (cla = "해외주문원서");
}

function heartonoff(heart) {
  if (heart.getAttribute("src") == "/images/books-heart-1.png") {
    heart.setAttribute("src", "/images/books-heart-2.png");
  }
  // 빈 하트일 때
  else if (heart.getAttribute("src") == "/images/books-heart-2.png") {
    heart.setAttribute("src", "/images/books-heart-1.png");
  }
}
