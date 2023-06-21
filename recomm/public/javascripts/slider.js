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

    // 만약 index가 (슬라이드 index) 3, 4면 maxWidth = (slideWidth * maxSlides) / 4로
    // 왜냐하면 한 번 슬라이드 하는 요소의 개수가 슬라이드 3, 4번째는 4개이기 때문에 배너 수정 완
    if (index == 3 || index == 4) {
      maxWidth = (slideWidth * maxSlides) / 4;
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

// 상단 배너 슬라이드
window.onload = bannerSlide;

function bannerSlide() {
  const slide = document.querySelector(".slide");
  const bannerItems = slide.querySelectorAll(".banner-item");

  // 이전 버튼과 다음 버튼을 선택
  const prevButton = document.getElementsByClassName("prev")[0];
  const nextButton = document.getElementsByClassName("next")[0];
  // 현재 페이지 위치
  const currentpage = document.getElementsByClassName("paging")[0];

  // 현재 보여지는 슬라이드의 인덱스
  let currentIndex = 0;

  // 다음 슬라이드 이동
  const prevSlide = () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = bannerItems.length - 1;
      // 첫 번째 슬라이드에서 이전 버튼을 클릭하면 마지막 슬라이드로 이동
      slide.style.transform = `translateX(-${
        (bannerItems.length - 1) * 1920
      }px)`; // 마지막 슬라이드로 이동
    } else {
      slide.style.transform = `translateX(-${currentIndex * 1920}px)`;
    }
    currentpage.innerHTML = `${currentIndex + 1} / 3`;
  };

  // 이전 슬라이드로 이동하는 함수
  const nextSlide = () => {
    // 현재 인덱스에서 1++
    currentIndex++;
    //console.log("클릭" + currentIndex);

    // 마지막 슬라이드에서 다음 버튼을 클릭하면 첫 번째 슬라이드로 이동
    if (currentIndex >= bannerItems.length) {
      currentIndex = 0;
    }

    // 슬라이드 요소를 이동
    slide.style.transform = `translateX(-${currentIndex * 1920}px)`;
    currentpage.innerHTML = `${currentIndex + 1} / 3`;
  };

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  let slideInterval = setInterval(nextSlide, 3000);

  // 마우스 올리면 슬라이드 멈추기
  slide.addEventListener("mouseover", () => {
    clearInterval(slideInterval);
  });

  // 마우스 나가면 슬라이드 재생
  slide.addEventListener("mouseout", () => {
    setInterval(slideInterval);
  });
}
bannerSlide1();

// 중간 슬라이드
function bannerSlide1() {
  const slide = document.querySelector(".slide2");
  const bannerItems = slide.querySelectorAll(".banner-item");

  // 이전 버튼과 다음 버튼을 선택
  const prevButton = document.getElementsByClassName("prev")[1];
  const nextButton = document.getElementsByClassName("next")[1];
  // 현재 페이지 위치
  const currentpage = document.getElementsByClassName("paging")[1];

  // 현재 보여지는 슬라이드의 인덱스
  let currentIndex = 0;

  // 다음 슬라이드 이동
  const prevSlide = () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = bannerItems.length - 1;
      // 첫 번째 슬라이드에서 이전 버튼을 클릭하면 마지막 슬라이드로 이동
      slide.style.transform = `translateX(-${
        (bannerItems.length - 1) * 1920
      }px)`; // 마지막 슬라이드로 이동
    } else {
      slide.style.transform = `translateX(-${currentIndex * 1920}px)`;
    }
    currentpage.innerHTML = `${currentIndex + 1} / 3`;
  };

  // 이전 슬라이드로 이동하는 함수
  const nextSlide = () => {
    // 현재 인덱스에서 1++
    currentIndex++;
    //console.log("클릭" + currentIndex);

    // 마지막 슬라이드에서 다음 버튼을 클릭하면 첫 번째 슬라이드로 이동
    if (currentIndex >= bannerItems.length) {
      currentIndex = 0;
    }

    // 슬라이드 요소를 이동
    slide.style.transform = `translateX(-${currentIndex * 1920}px)`;
    currentpage.innerHTML = `${currentIndex + 1} / 3`;
  };

  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);

  let slideInterval = setInterval(nextSlide, 3000);

  // 마우스 올리면 슬라이드 멈추기
  slide.addEventListener("mouseover", () => {
    clearInterval(slideInterval);
  });

  // 마우스 나가면 슬라이드 재생
  slide.addEventListener("mouseout", () => {
    setInterval(slideInterval);
  });
}
