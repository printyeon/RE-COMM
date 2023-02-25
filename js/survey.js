const surveyBtn = document.getElementById("surveyBtn");
surveyBtn.style.backgroundColor = "#ffffff";
surveyBtn.style.color = "#777777";

surveyBtn.addEventListener("click", surveyBtnClick);

function surveyBtnClick() {
  if (surveyBtn.style.backgroundColor == "rgb(188, 38, 56)") {
    surveyBtn.style.backgroundColor = "#ffffff";
    surveyBtn.style.color = "#777777";
  } else if (surveyBtn.style.backgroundColor == "rgb(255, 255, 255)") {
    surveyBtn.style.backgroundColor = "#bc2638";
    surveyBtn.style.color = "#FBFBFB";
  }
}

// const surveyBtn2 = document.getElementById("surveyBtn2");
// surveyBtn2.style.backgroundColor = "#ffffff";
// surveyBtn2.style.color = "#777777";

// surveyBtn2.onclick = function () {
//   if (surveyBtn2.style.backgroundColor == "rgb(188, 38, 56)") {
//     surveyBtn2.style.backgroundColor = "#ffffff";
//     surveyBtn2.style.color = "#777777";
//   } else if (surveyBtn2.style.backgroundColor == "rgb(255, 255, 255)") {
//     surveyBtn2.style.backgroundColor = "#bc2638";
//     surveyBtn2.style.color = "#FBFBFB";
//   }
// };
