// // 찜 클릭 시 하트 채워지는 기능 (빈 하트 -> 찬 하트 이미지 변경)

// // 하트 변수

// function chkHeart() {
//   let heart = document.getElementsByClassName("heart");

//   // 같은 클래스명을 공유하는 요소들의 개수
//   let heartLength = heart.length;
//   console.log(heartLength);

//   // 같은 클래스명을 공유하는 요소들에게 한 번에 이벤트 추가
//   for (let i = 0; i < heartLength; i++) {
//     heart[i].addEventListener("click", function () {
//         console.log("클릭");
//       // 꽉 찬 하트일 때
//       if (heart[i].getAttribute("src") == "./img/books-heart-1.png") {
//         // 경로 가져오기
//         heart[i].setAttribute("src", "./img/books-heart-2.png");
//         console.log(heart[i].getAttribute("src"));
//       }
//       // 빈 하트일 때
//       else if (heart[i].getAttribute("src") == "./img/books-heart-2.png") {
//         heart[i].setAttribute("src", "./img/books-heart-1.png");
//         console.log(heart[i].getAttribute("src"));
//       }
//     });
//   }
// }

// 서점별 베스트 셀러 버튼
let btn = document.getElementsByClassName("store-btn");

function handleClick(event) {
  if (event.target.classList[0] === "clicked") {
    event.target.classList.remove("clicked");
  } else {
    for (var i = 0; i < btn.length; i++) {
      btn[i].classList.remove("clicked");
    }

    event.target.classList.add("clicked");
  }
}

function init() {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", handleClick);
  }
}

init();

// 배너 페이징 버튼
// let bannerBtn = document.getElementsByClassName("paging-banner");

// function bannerSlide() {
//   let item = document.createElement("paging");
//   let current = i;
//   let remain = 3;
//   item.innerHTML = `<div>
//     <div class="prev"> < </div>
//     <p>${current} / ${remain}</p>
//     <div class="next"> > </div>
//   </div>`;

//   document.appendChild(item);
// }

// bannerSlide();

// 로그인 모달창 켜지기
function openLogin() {
  const modal = document.getElementById("modal1");
  const modalBtn = document.getElementsByClassName("log-in")[0];
  modalBtn.addEventListener("click", (e) => {
    modal.style.display = "flex";
    // document.body.style.backgroundColor = "rgba(28, 28, 28, 0.45)";
    document.body.style.fliter = "blur(5px);";
  });

  modal.addEventListener("click", (e) => {
    const evTarget = e.target;
    if (evTarget.classList.contains("modal-overlay1")) {
      modal.style.display = "none";
    }
  });

  // 로그인 모달창 -> 회원가입 모달창
  const toJoin = document.getElementsByClassName("toJoin")[0];
  toJoin.addEventListener("click", (e) => {
    // modal.style.display = "none";
    const modal1 = document.getElementById("modal2");
    modal1.style.display = "flex";
    modal.style.display = "none";
  });
}

// 회원가입 모달창 켜지기
function openJoin() {
  const modal1 = document.getElementById("modal2");
  const modalBtn1 = document.getElementsByClassName("join")[0];
  modalBtn1.addEventListener("click", (e) => {
    modal1.style.display = "flex";
    // document.body.style.backgroundColor = "rgba(28, 28, 28, 0.45)";
    document.body.style.fliter = "blur(5px);";
  });

  modal1.addEventListener("click", (e) => {
    const evTarget = e.target;
    if (evTarget.classList.contains("modal-overlay2")) {
      modal1.style.display = "none";
    }
  });

  // 회원가입 모달창 -> 로그인 모달창
  const toLogin = document.getElementsByClassName("toLogin")[0];
  toLogin.addEventListener("click", (e) => {
    // modal.style.display = "none";
    const modal = document.getElementById("modal1");
    modal.style.display = "flex";
    modal1.style.display = "none";
  });
}

// 로그인/회원가입 모달창에서 입력값이 있으면 check 활성화 else 비활성화
// let val = document.getElementsByClassName('row').value;
// let check = document.getElementsByClassName('check');

// console.log(val);

// function inputisInit() {
//   // 값이 없을 때
//   if(val === '') {
//     check.setAttribute("src") == "./login/img/login-no-check.png";
//     console.log("값 안 들어옴")
//   }
//   else {
//     check.setAttribute("src") == "./login/img/login-check.png";
//     console.log("값 들어옴")
//   }
// }

// inputisInit();

window.onload = inputisEmpty;

function inputisEmpty() {
  let inputStr = document.getElementsByClassName("row");
  let check = document.getElementsByClassName("check");
  for (let i = 0; i < inputStr.length; i++) {
    inputStr[i].addEventListener("change", function (e) {
      // 텍스트가 비었을 경우
      if (inputStr[i] == "") {
        console.log("비엇음");
        check[i].setAttribute("src", "./login/img/login-no-check.png");
      } else {
        check[i].setAttribute("src", "./login/img/login-check.png");
      }
    });
  }
}
