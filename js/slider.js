function slider() {
  let nextBtn = document.getElementById("next-btn");
  let prevBtn = document.getElementsByClassName("prev-btn")[0];
  let container = document.getElementsByClassName("books-container")[0];
  let i = 1;

  // 다음 슬라이드
  nextBtn.addEventListener("click", function () {
    console.log("클릭");
    let current = i * -1200;
    container.style.transform = `translateX(${current}px)`;
    container.style.transition = "all ease 1s";
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
    }
  });

  function prevBtnSlide(current, i) {
    prevBtn.style.display = "block";
    let thisCurrent = 0;
    prevBtn.addEventListener("click", function () {
      if(thisCurrent == 0) {

      }
      else if(thisCurrent == 1) {
        
      }
      else if(thisCurrent == 2) {

      }

      thisCurrent++;
    });
  }
}