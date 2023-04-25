// // // let prevBtn = document.getElementsByClassName("prev-btn")[0];
// // let container = document.querySelectorAll(".books-container")[0];
// // let nextBtn = document.querySelectorAll(".next-btn");
// // // 모든 books-container 요소에 같은 이벤트 추가하기 연구
// // let i = 1;

// // nextBtn.forEach((nextBtns) => {
// //   nextBtns.addEventListener("click", nextSlide);
// // });

// // function nextSlide() {
// //   console.log("클릭");
// //   let current = i * -1200;
// //   container.style.transform = `translateX(${current}px)`;
// //   container.style.transition = "all ease 1s";
// //   i++;
// //   console.log(`현재 위치 ${current}, ${i}`);

// //   // 만약 마지막 슬라이드에 도달했다면 첫 슬라이드로 0.5초 빠르게 이동
// //   if (current == -3600) {
// //     container.style.transform = `translateX(0px)`;
// //     container.style.transition = "all ease 0.1s";
// //     // prevBtn.style.display = "none";
// //     i = 1;
// //     console.log("첫 슬라이드 이동");
// //   }
// // }

// function slide() {
//   // A
//   const itemWrapperEl = document.querySelector(".books-container"),
//     leftBtnEl = document.getElementById("next-btn"),
//     rightBtnEl = document.getElementById("right-btn");

//   function moveSlides(direction) {
//     // B
//     const item = itemWrapperEl.querySelector(".item"),
//       itemMargin = parseFloat(getComputedStyle(item).marginRight);
//     itemWidth = itemMargin + item.offsetWidth + 2;

//     let itemCount = Math.round(itemWrapperEl.scrollLeft / itemWidth);

//     if (direction === "left") {
//       itemCount = itemCount - 1;
//     } else {
//       itemCount = itemCount + 1;
//     }
//     itemWrapperEl.scrollLeft = itemWidth * itemCount;
//   }

//   leftBtnEl.addEventListener("click", (e) => moveSlides("left")); // C
//   rightBtnEl.addEventListener("click", (e) => moveSlides("right"));
// }

// slide();
