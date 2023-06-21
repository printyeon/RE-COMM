// 찜 클릭 시 하트 채워지는 기능 (빈 하트 -> 찬 하트 이미지 변경)

// 하트 변수

// function chkHeart() {
//   let heart = document.getElementsByClassName("heart");

//   // 같은 클래스명을 공유하는 요소들의 개수
//   let heartLength = heart.length;
//   //console.log(heartLength);

//   // 같은 클래스명을 공유하는 요소들에게 한 번에 이벤트 추가
//   for (let i = 0; i < heartLength; i++) {
//     heart[i].addEventListener("click", function () {
//       //console.log("클릭");
//       // 꽉 찬 하트일 때
//       if (heart[i].getAttribute("src") == "/images/books-heart-1.png") {
//         // 경로 가져오기
//         heart[i].setAttribute("src", "/images/books-heart-2.png");
//         //console.log(heart[i].getAttribute("src"));
//       }
//       // 빈 하트일 때
//       else if (heart[i].getAttribute("src") == "/images/books-heart-2.png") {
//         heart[i].setAttribute("src", "/images/books-heart-1.png");
//         //console.log(heart[i].getAttribute("src"));
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

// // 위로 이동하고 모달창이 열려야 하기 때문에 함수 선언
// function moveToNavAndReview() {
//   let nav = document.getElementById("nav");
//   if (nav) {
//     nav.scrollIntoView({ behavior: "smooth" });
//     setTimeout(onReview, 200); // 스크롤 후에 모달창을 열기 위해 setTimeout 사용
//   }
// }

function onReview() {
  const modal1 = document.getElementById("modal1");
  modal1.style.display = "flex";
  // document.body.style.filter = "blur(5px)";

  modal1.addEventListener("click", (e) => {
    const evTarget = e.target;
    if (evTarget.classList.contains("modal-overlay1")) {
      modal1.style.display = "none";
      document.body.style.filter = "blur(0px)";
    }
  });
  // modal1.addEventListener('keydown', function(e) {
  //   if(e.keyCode === 13) {
  //     e.preventDefault();
  //   };
  // })
}

// 로그인/회원가입 모달창에서 입력값이 있으면 check 활성화 else 비활성화
let inputs = document.querySelectorAll(".row");

function inputIsInit() {
  let check = this.parentElement.querySelector(".check img");

  if (this.value === "") {
    check.setAttribute("src", "/images/login/login-no-check.png");
    //console.log("값 안 들어옴");
  } else {
    check.setAttribute("src", "/images/login/login-check.png");
    //console.log("값 들어옴");
  }
}

inputs.forEach(function (input) {
  input.addEventListener("input", inputIsInit);
});

let hearts = document.getElementsByClassName("heart");
for (var i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener("click", function () {
    //console.log("클릭------------------------------------");
    // 꽉 찬 하트일 때
    if (this.getAttribute("src") == "/images/books-heart-1.png") {
      this.setAttribute("src", "/images/books-heart-2.png");
    }
    // 빈 하트일 때
    else if (this.getAttribute("src") == "/images/books-heart-2.png") {
      this.setAttribute("src", "/images/books-heart-1.png");
    }
  });
}
