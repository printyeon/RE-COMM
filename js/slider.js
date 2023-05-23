// https://blog.naver.com/PostView.naver?blogId=sujeedo&logNo=222104824984&categoryNo=204&parentCategoryNo=0
let prevBtn = document.getElementsByClassName("prev-btn")[0];
let container = document.querySelectorAll(".books-container")[0];
let nextBtn = document.querySelectorAll(".next-btn");
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
    // 복제용 슬라이드
    // let firstChild = container.firstElementChild;
    // let lastChild = container.lastElementChild;
    // console.log(firstChild + lastChild);
    // let clonedFirst = firstChild.cloneNode(true);
    // let clonedLast = lastChild.cloneNode(true);
    // container.appendChild(clonedFirst);
    // container.insertBefore(clonedLast, container.firstElementChild);
    container.style.transform = `translateX(0px)`;
    container.style.transition = "all ease 0.1s";
    i = 1;
    console.log("첫 슬라이드 이동");
  }
}

// 상단 배너 슬라이드
window.onload = bannerSlide;

function bannerSlide() {
  const slide = document.querySelector(".slide");
  const bannerItems = document.querySelectorAll(".banner-item");

  // 이전 버튼과 다음 버튼을 선택
  const prevButton = document.getElementsByClassName("prev")[0];
  const nextButton = document.getElementsByClassName("next")[0];
  // 현재 페이지 위치
  const currentpage = document.getElementsByClassName("paging")[0];

  // 현재 보여지는 슬라이드의 인덱스
  let currentIndex = 0;

  // 이전 버튼 클릭 시 이벤트 핸들러
  prevButton.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = bannerItems.length - 1;
      // 첫 번째 슬라이드에서 이전 버튼을 클릭하면 마지막 슬라이드로 이동하는 트랜지션 효과를 추가
      slide.style.transform = `translateX(-${(bannerItems.length - 1) * 100}%)`; // 마지막 슬라이드로 이동
    } else {
      slide.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    currentpage.innerHTML = `${currentIndex + 1} / 3`;
  });

  // 다음 버튼 클릭 시 이벤트 핸들러
  nextButton.addEventListener("click", () => {
    // 현재 인덱스에서 1++
    currentIndex++;
    console.log("클릭" + currentIndex);

    // 마지막 슬라이드에서 다음 버튼을 클릭하면 첫 번째 슬라이드로 이동
    if (currentIndex >= bannerItems.length) {
      currentIndex = 0;
    }

    // 슬라이드 요소를 이동합니다.
    slide.style.transform = `translateX(-${currentIndex * 1920}px)`;
    currentpage.innerHTML = `${currentIndex + 1} / 3`;
  });
}
