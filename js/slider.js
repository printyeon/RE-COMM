let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementsByClassName("prev-btn")[0];
let container = document.getElementsByClassName("books-container")[0];
let i = 1;

// 다음 슬라이드
nextBtn.addEventListener("click", function () {
  let current = i * -1200;
  container.style.transform = `translateX(${current}px)`;
  container.style.transition = "all ease 1s";
  console.log(`${current}px 다음 슬라이드 이동`);
  i++;
  console.log(`현재 위치 ${current}, ${i}`);

  prevBtnSlide(current, i);

  // 만약 마지막 슬라이드에 도달했다면 첫 슬라이드로 0.5초 빠르게 이동
  if (current == -3600) {
    container.style.transform = `translateX(0px)`;
    container.style.transition = "all ease 0.5s";
    prevBtn.style.display = "none";
    i = 1;
    console.log("첫 슬라이드 이동");
    console.log(`현재 i ${i}`);
  }
});

function prevBtnSlide(current, i) {
  prevBtn.style.display = "block";
  let thisCurrent = 0;
  prevBtn.addEventListener("click", function () {
    if (i == 2) {
      container.style.transform = `translateX(0px)`;
      thisCurrent = -1200;
      console.log(i, current, thisCurrent);
    }
    if (i == 3) {
      container.style.transform = `translateX(${thisCurrent}px)`;
      console.log(i, current, thisCurrent);
    }
  });
}
