let header = document.getElementById("header");
let main = document.getElementById("main");
let footer = document.getElementById("footer");

let card = document.getElementsByClassName("card");

let background = document.getElementById("background");
let backgroundSource = document.getElementById("backgroundSource");
let displayFlag = 0;

window.onresize = function () {
    let width = document.documentElement.clientWidth;
    if (width < 480) {
        hideBackground();
    }
}

background.onclick = function () {
    displayFlag === 0 ? showBackground() : hideBackground();
}

document.body.onload = function () {
    if (document.documentElement.clientWidth > 480) {
        background.style.opacity = "1";
    }
}

function showBackground() {
    header.style.opacity = "0";
    footer.style.opacity = "0";
    backgroundSource.style.opacity = "1";
    for (let i = 0; i < card.length; i++) {
        card[i].style.opacity = "0";
    }
    setTimeout(() => {
        main.style.zIndex = "20";
        background.style.zIndex = "20";
    }, 300);

    background.style.filter = "blur(0)";
    displayFlag = 1;
}

function hideBackground() {
    main.style.zIndex = "2";
    background.style.zIndex = "2";
    header.style.opacity = "1";
    footer.style.opacity = "1";
    backgroundSource.style.opacity = "0";
    for (let i = 0; i < card.length; i++) {
        card[i].style.opacity = 1;
    }
    background.style.filter = "blur(15px)";
    displayFlag = 0;
}

document.addEventListener("mousewheel", scrollPage);
document.addEventListener("DOMMouseScroll", scrollPage);

// 横向滚动
function scrollPage() { 
    if (event.wheelDelta) {
        if (event.wheelDelta > 0) {
            document.documentElement.scrollLeft -= 540;
        } else {
            document.documentElement.scrollLeft += 540;
        }
    }
    if (event.detail) {
        if (event.detail > 0) {
            document.documentElement.scrollLeft += 360;
        } else {
            document.documentElement.scrollLeft -= 360;
        }
    }
}


/*
// div 随鼠标移动代码
if (document.getElementById("card")) {
    main.onmousemove = function () {
        var card = document.getElementById("card");
        var moveX = (event.clientX - (document.body.clientWidth / 2)) / 200;
        var moveY = (event.clientY - (document.body.clientHeight / 2)) / 200;

        card.style.transform = "translate(" + moveX + "px," + moveY + "px)";
        // console.log(moveX + " " + moveY);
        // console.log(card.style.transform);
    }
}
*/