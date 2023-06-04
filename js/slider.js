// https://blog.naver.com/PostView.naver?blogId=sujeedo&logNo=222104824984&categoryNo=204&parentCategoryNo=0
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
let prevBtn = document.getElementsByClassName("prev-btn")[0];
let container = document.querySelectorAll(".books-container")[0];
let nextBtn = document.querySelectorAll(".next-btn");
let i = 1;

nextBtn.forEach((nextBtns) => {
  nextBtns.addEventListener("click", nextSlide);
});

function nextSlide() {
  console.log("클릭");
  let current = i * -1650;
  container.style.transform = `translateX(${current}px)`;
  container.style.transition = "all ease 1s";
  i++;
  console.log(`현재 위치 ${current}, ${i}`);

  // 만약 마지막 슬라이드에 도달했다면 첫 슬라이드로 0.5초 빠르게 이동
  if (current == -4950) {
    container.style.transform = `translateX(0px)`;
    container.style.transition = "all ease 0.1s";
    i = 1;
    console.log("첫 슬라이드 이동");
  }
}

window.onload = bannerslide;

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

  let next = document.querySelector(".next");
  let prev = document.querySelector(".prev");
  let current = 0;

  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);

  function nextSlide() {
    if (current < slide.length - 1) {
      current++;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
    } else {
      current++;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
      current = 0;
      setTimeout(function () {
        slideWrap.style.transition = "0ms";
        slideWrap.style.left = `-${100 * (current + 1)}%`;
      }, 550);
    }
    paging.innerHTML = `${current + 1} / 3`;
  }

  function prevSlide() {
    if (current > 0) {
      current--;
      slideWrap.style.transition = "ease 0.5s";
      slideWrap.style.left = `-${100 * (current + 1)}%`;
    } else {
      slide.style.transition = "ease 0.5s";
      slideWrap.style.left = "0%";
      current = slide.length - 1;
      setTimeout(function () {
        slide.style.transition = "ease 0s";
        slideWrap.style.left = `-${100 * (current + 1)}%`;
      });
    }
    paging.innerHTML = `${current + 1} / 3`;
  }
}
