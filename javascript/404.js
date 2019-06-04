let container = document.getElementById("container");

let night = document.getElementById("night");
let nightImage = document.getElementById("nightImage");

let text = document.getElementById("centerText");
let title = document.getElementById("title");
let icp = document.getElementById("icp");

let nightFlag = 0; // 0 代表白天 1 代表晚上

window.onload = function () {
    let nowHours = new Date();
    if (nowHours.getHours() >= 22 || nowHours.getHours() <= 5) {
        nightMode();
    } else {
        dayMode();
    }
}

function nightMode() {
    container.style.backgroundColor = "rgba(33,33,33 ,1)";
    text.style.color = "white";
    title.style.color = "white";
    icp.style.color = "white";
    nightImage.setAttribute("src", "image/icon/today.png");
    nightFlag = 1;
}

function dayMode() {
    container.style.backgroundColor = "rgba(250,250,250 ,1)";
    text.style.color = "black";
    title.style.color = "black";
    icp.style.color = "black";
    nightImage.setAttribute("src", "image/icon/tonight.png");
    nightFlag = 0;
}

night.onclick = function () {

    if (nightFlag === 0) {
        nightMode();
    } else {
        dayMode();
    }
}