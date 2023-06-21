// https://blog.naver.com/PostView.naver?blogId=sujeedo&logNo=222104824984&categoryNo=204&parentCategoryNo=0
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";

let containers = document.querySelectorAll(".books-container");
let nextBtns = document.querySelectorAll(".next-btn");

// 모든 nextBtn에 같은 이벤트 함수 부여
nextBtns.forEach(function (nextBtn, index) {
  nextBtn.addEventListener("click", function () {
    let container = containers[index];
    let current = container.dataset.current
      ? parseInt(container.dataset.current)
      : 0;
    let slideWidth = -1650;
    let maxSlides = container.childElementCount;
    //console.log(maxSlides);
    let nextSlide = current + 1;

    let maxWidth = (slideWidth * maxSlides) / 5;

    //console.log(maxWidth);
    // 만약 index가 (슬라이드 index) 3, 4면 maxWidth = (slideWidth * maxSlides) / 4로
    // 왜냐하면 한 번 슬라이드 하는 요소의 개수가 슬라이드 3, 4번째는 4개이기 때문에 배너 수정 완
    if (index == 1 || index == 3) {
      maxWidth = (slideWidth * maxSlides) / 2;
    }

    if (index % 5 != 0) {
      maxWidth = (slideWidth * maxSlides) / 5;
    }

    // 현재 위치 계산
    let transformX = nextSlide * slideWidth;

    // 슬라이드 이동
    container.style.transform = `translateX(${transformX}px)`;
    container.style.transition = "all ease 1s";

    // 현재 위치 갱신
    container.dataset.current = nextSlide;

    //console.log(`현재 위치: ${transformX}, ${nextSlide}`);

    // 마지막 슬라이드에 도달했을 때
    if (maxWidth == transformX) {
      // 첫 슬라이드로 빠르게 이동
      container.style.transform = "translateX(0px)";
      container.style.transition = "all ease 0.5s";
      container.dataset.current = 0;
      //console.log("첫 슬라이드로 이동");
    }
  });
});
