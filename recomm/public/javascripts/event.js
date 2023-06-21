let btns = document.querySelectorAll(".survey-btn");

btns.forEach(function (btn, index) {
  btn.addEventListener("click", function () {
    //console.log("클릭 : " + index);
    if (btn.style.backgroundColor === "rgb(255, 255, 255)") {
      btn.style.backgroundColor = "#BC2638";
      btn.style.color = "#fff";
    } else {
      btn.style.backgroundColor = "#fff";
      btn.style.color = "#777777";
    }
  });
});
