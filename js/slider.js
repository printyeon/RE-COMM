let slideBtn = document.getElementById('next-btn');
let container = document.getElementsByClassName('books-container')[0];
let i = 1;

slideBtn.addEventListener("click", function() {
    let current = i * -1200;
    container.style.transform = `translateX(${current}px)`;
    container.style.transition = "all ease 1s";
    i++;
    console.log(`${current}px 이동`);

    // 만약 마지막 슬라이드에 도달했다면 첫 슬라이드로 0.5초 빠르게 이동
    if(current == -3600) {
        container.style.transform = `translateX(0px)`;
        container.style.transition = "all ease 0.5s";
        i = 1;
        console.log("첫 슬라이드 이동")
    }
    
});