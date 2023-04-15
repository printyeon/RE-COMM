let nextBtn = document.querySelectorAll(".next-btn");
// let prevBtn = document.getElementsByClassName("prev-btn")[0];
let container = document.querySelectorAll(".books-container")[0];
let i = 1;

nextBtn.forEach((nextBtns) => {
  nextBtns.addEventListener("click", nextSlide);
});

function nextSlide() {
  console.log("클릭");
  let current = i * -1200;
  container.style.transform = `translateX(${current}px)`;
  container.style.transition = "all ease 1s";
  i++;
  console.log(`현재 위치 ${current}, ${i}`);

  // 만약 마지막 슬라이드에 도달했다면 첫 슬라이드로 0.5초 빠르게 이동
  if (current == -3600) {
    container.style.transform = `translateX(0px)`;
    container.style.transition = "all ease 0.1s";
    // prevBtn.style.display = "none";
    i = 1;
    console.log("첫 슬라이드 이동");
  }
}
