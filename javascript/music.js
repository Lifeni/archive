let container = document.getElementById("container");

let night = document.getElementById("night");
let nightImage = document.getElementById("nightImage");

let title = document.getElementById("title");
let icp = document.getElementById("icp");

let centerBox = document.getElementById("centerBox");
let inBox = document.getElementById("inBox");
let leftBox = document.getElementById("leftBox");
let rightBox = document.getElementById("rightBox");

let image = document.getElementById("image");
let nightFlag = 0; // 0 代表白天 1 代表晚上

let music = document.getElementById("music");
let musicControl = document.getElementById("musicControl");
let musicFlag = 0; // 0 未播放 1 播放
let rotateDeg = 0;
let reloadFlag = 0;
let time;

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
    title.style.color = "white";
    icp.style.color = "white";

    centerBox.style.color = "white";
    leftBox.style.color = "white";
    rightBox.style.color = "white";
    centerBox.style.boxShadow = "0 0 80px rgba(12,12,12 ,1)";

    nightImage.setAttribute("src", "image/icon/today.png");
    nightFlag = 1;

    if (musicFlag === 0) {
        musicControl.style.backgroundImage = "url('image/icon/play1.png')";
    } else {
        musicControl.style.backgroundImage = "url('image/icon/pause1.png')";
    }
}

function dayMode() {
    container.style.backgroundColor = "rgba(250,250,250 ,1)";
    title.style.color = "black";
    icp.style.color = "black";

    centerBox.style.color = "black";
    leftBox.style.color = "black";
    rightBox.style.color = "black";
    centerBox.style.boxShadow = "0 0 80px rgba(117,117,117 ,1)";

    nightImage.setAttribute("src", "image/icon/tonight.png");
    nightFlag = 0;

    if (musicFlag === 0) {
        musicControl.style.backgroundImage = "url('image/icon/play0.png')";
    } else {
        musicControl.style.backgroundImage = "url('image/icon/pause0.png')";
    }
}

night.onclick = function () {

    if (nightFlag === 0) {
        nightMode();
    } else {
        dayMode();
    }
}

centerBox.onmousemove = function () {
    let shadowX = (event.clientX - (document.body.clientWidth / 2)) / 20;
    let shadowY = -(event.clientY - (document.body.clientHeight / 2)) / 20;

    //alert(shadowX+" "+shadowY);
    //alert((document.body.clientWidth/2)+" "+(document.body.clientHeight/2))
    //alert(event.clientX+" "+event.clientY);

    //console.log(shadowX + " " + shadowY);

    centerBox.style.transform = "rotateX(" + shadowY + "deg)" + "rotateY(" + shadowX + "deg)";
}

centerBox.onmouseleave = function () {
    centerBox.style.transform = "rotateX(0) rotateY(0)";
}

function toPlay() {
    if (reloadFlag === 0) {
        music.play();
    } else {
        music.load();
    }
    startRotate = setInterval(function () {
        if (music.ended) {
            toPause();
            rotateDeg = 0;
            reloadFlag = 1;
        }
        inBox.style.transform = "rotate(" + rotateDeg + "deg)";
        rotateDeg++;
    }, 50);
    musicControl.style.backgroundImage = "url('image/icon/pause" + nightFlag + ".png')";
    musicFlag = 1;

}

function toPause() {
    music.pause();
    clearInterval(startRotate);
    time = music.currentTime;
    musicControl.style.backgroundImage = "url('image/icon/play" + nightFlag + ".png')";
    musicFlag = 0;
}

musicControl.onclick = function () {
    if (musicFlag === 0) { //未播放
        toPlay();
    } else { //播放
        toPause();
    }
}