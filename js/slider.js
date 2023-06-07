// https://blog.naver.com/PostView.naver?blogId=sujeedo&logNo=222104824984&categoryNo=204&parentCategoryNo=0
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";

let containers = document.querySelectorAll(".books-container");
let nextBtns = document.querySelectorAll(".next-btn");

nextBtns.forEach(function (nextBtn, index) {
  nextBtn.addEventListener("click", function () {
    let container = containers[index];
    let current = container.dataset.current
      ? parseInt(container.dataset.current)
      : 0;
    let slideWidth = -1650;
    let maxSlides = container.childElementCount;
    console.log(maxSlides);
    let nextSlide = current + 1;

    let maxWidth = (slideWidth * maxSlides) / 5;

    // 현재 위치 계산
    let transformX = nextSlide * slideWidth;

    // 슬라이드 이동
    container.style.transform = `translateX(${transformX}px)`;
    container.style.transition = "all ease 1s";

    // 현재 위치 갱신
    container.dataset.current = nextSlide;

    console.log(`현재 위치: ${transformX}, ${nextSlide}`);

    // 마지막 슬라이드에 도달했을 때
    if (maxWidth == transformX) {
      // 첫 슬라이드로 빠르게 이동
      container.style.transform = "translateX(0px)";
      container.style.transition = "all ease 0.5s";
      container.dataset.current = 0;
      console.log("첫 슬라이드로 이동");
    }
  });
});

bannerslide();
function bannerslide() {
  let slideWrap = document.querySelector(".slide");
  let slide = slideWrap.querySelectorAll(".banner-item");
  let paging = document.getElementsByClassName("paging")[0];

  // 처음, 마지막 슬라이드 복제
  const firstEl = slideWrap.firstElementChild;
  const lastEl = slideWrap.lastElementChild;
  let clone1 = firstEl.cloneNode(true);
  let cloneLast = lastEl.cloneNode(true);

  // 끝 슬라읻느느 앞에 추가, 처음 슬라이드는 뒤에 추가 시키기
  slideWrap.appendChild(clone1);
  slideWrap.insertBefore(cloneLast, slideWrap.firstElementChild);

  // (슬라이드 개수 + 복제된 슬라이드 2개) X 슬라이드 1개의 넓이
  slideWrap.style.width = `${100 * (slide.length + 2)}%`;
  slideWrap.style.left = `-${1903}px`;

  let next = document.querySelectorAll(".next")[0];
  let prev = document.querySelectorAll(".prev")[0];
  let current = 0;

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  function nextSlide() {
    console.log("클릭");
    if (current < slide.length - 1) {
      current++;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      console.log("현재 페이지 : ", current);
    } else {
      current++;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      current = 0;
      console.log("현재 페이지 : ", current);
      setTimeout(function () {
        slideWrap.style.transition = "0s";
        slideWrap.style.left = `-${100 * (current + 1)}%`;
        console.log("현재 페이지 : ", current);
      }, 550);
    }
    paging.innerHTML = `${current + 1} / 3`;
  }

  function prevSlide() {
    console.log("클릭");
    if (current > 0) {
      current--;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      console.log("현재 페이지 : ", current);
    } else {
      slide.style.transition = "ease 0.5s";
      slideWrap.style.left = "0%";
      current = slide.length - 1;
      console.log("현재 페이지 : ", current);
      setTimeout(function () {
        slide.style.transition = "ease 0s";
        slideWrap.style.left = `-${100 * (current + 1)}%`;
        console.log("현재 페이지 : ", current);
      });
    }
    paging.innerHTML = `${current + 1} / 3`;
  }
}

window.onload = bannerslide1;

function bannerslide1() {
  let slideWrap = document.querySelector(".slide2");
  let slide = slideWrap.querySelectorAll(".banner-item");
  let paging = slideWrap.getElementsByClassName("middle-paging");

  // 처음, 마지막 슬라이드 복제
  const firstEl = slideWrap.firstElementChild;
  const lastEl = slideWrap.lastElementChild;
  let clone1 = firstEl.cloneNode(true);
  let cloneLast = lastEl.cloneNode(true);

  // 끝 슬라이드는 앞에 추가, 처음 슬라이드는 뒤에 추가
  slideWrap.appendChild(clone1);
  slideWrap.insertBefore(cloneLast, slideWrap.firstElementChild);

  // (슬라이드 개수 + 복제된 슬라이드 2개) X 슬라이드 1개의 넓이
  slideWrap.style.width = `${100 * (slide.length + 2)}%`;
  slideWrap.style.left = `-${slideWrap.offsetWidth}px`;

  let next = document.querySelectorAll(".next")[1];
  let prev = document.querySelectorAll(".prev")[1];
  let current = 0;

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  function nextSlide() {
    console.log("클릭");
    if (current < slide.length - 1) {
      current++;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      console.log("현재 페이지 : ", current);
    } else {
      current++;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      current = 0;
      console.log("현재 페이지 : ", current);
      setTimeout(function () {
        slideWrap.style.transition = "0s";
        slideWrap.style.left = `-${100 * (current + 1)}%`;
        console.log("현재 페이지 : ", current);
      }, 550);
    }
    paging.innerHTML = `${current + 1} / ${slide.length}`;
  }

  function prevSlide() {
    console.log("클릭");
    if (current > 0) {
      current--;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      console.log("현재 페이지 : ", current);
    } else {
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = "0%";
      current = slide.length - 1;
      console.log("현재 페이지 : ", current);
      setTimeout(function () {
        slideWrap.style.transition = "ease 0s";
        slideWrap.style.left = `-${100 * (current + 1)}%`;
        console.log("현재 페이지 : ", current);
      });
    }
    paging.innerHTML = `${current + 1} / ${slide.length}`;
  }
}
