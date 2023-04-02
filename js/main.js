// // 찜 클릭 시 하트 채워지는 기능 (빈 하트 -> 찬 하트 이미지 변경)

// // 하트 변수

// function chkHeart() {
//   let heart = document.getElementsByClassName("heart");

//   // 같은 클래스명을 공유하는 요소들의 개수
//   let heartLength = heart.length;
//   console.log(heartLength);

//   // 같은 클래스명을 공유하는 요소들에게 한 번에 이벤트 추가
//   for (let i = 0; i < heartLength; i++) {
//     heart[i].addEventListener("click", function () {
//         console.log("클릭");
//       // 꽉 찬 하트일 때
//       if (heart[i].getAttribute("src") == "./img/books-heart-1.png") {
//         // 경로 가져오기
//         heart[i].setAttribute("src", "./img/books-heart-2.png");
//         console.log(heart[i].getAttribute("src"));
//       }
//       // 빈 하트일 때
//       else if (heart[i].getAttribute("src") == "./img/books-heart-2.png") {
//         heart[i].setAttribute("src", "./img/books-heart-1.png");
//         console.log(heart[i].getAttribute("src"));
//       }
//     });
//   }
// }
