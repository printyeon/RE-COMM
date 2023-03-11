// 찜 클릭 시 하트 채워지는 기능 (빈 하트 -> 찬 하트 이미지 변경)

// 하트 변수
let heart = document.querySelector(".heart");

function toggleImg() {
    // console.log(heart.getAttribute("sr/c"));

    // 꽉 찬 하트일 때
    if(heart.getAttribute("src") == "./img/books-heart-1.png") { // 경로 가져오기
        heart.setAttribute("src", "./img/books-heart-2.png");
    }
    // 빈 하트일 때
    else {
        heart.setAttribute("src", "./img/books-heart-1.png");
    }
}