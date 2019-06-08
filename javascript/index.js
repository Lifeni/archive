let container = document.getElementById("container");
let night = document.getElementById("night");

let nightImage = document.getElementById("nightImage");
let musicImage = document.getElementById("musicImage");
let meImage = document.getElementById("meImage");

let centerCard = document.getElementById("centerCard");
let centerText = document.getElementById("centerText");

let title = document.getElementById("title");
let icp = document.getElementById("icp");

let nightFlag = 0; // 0 代表白天 1 代表晚上
let musicFlag = 0; // 0 未播放 1 播放
let rotateDeg = 0;
let reloadFlag = 0;
let musicTime;

let timeFlag = 0; //进度条增加
let timePlus = 0;


window.onload = function () {

    let nowHours = new Date();
    if (nowHours.getHours() >= 22 || nowHours.getHours() <= 5) {
        nightMode();
    } else {
        dayMode();
    }

    if (document.getElementById("musicBox")) {
        let musicBox = document.getElementById("musicBox");
        let inBox = document.getElementById("inBox");
        let leftBox = document.getElementById("leftBox");
        let rightBox = document.getElementById("rightBox");
        let musicPlayer = document.getElementById("musicPlayer");
        let musicControl = document.getElementById("musicControl");
    } else if (document.getElementById("centerCard")) {
        showTime();
        setInterval(() => {
            showTime();
        }, 1000);
    }
}

function nightMode() {
    container.style.backgroundColor = "rgba(33,33,33 ,1)";
    title.style.color = "white";
    icp.style.color = "white";
    title.style.backgroundColor = "rgba(33,33,33,1)";
    icp.style.backgroundColor = "rgba(33,33,33,1)";

    nightImage.setAttribute("src", "image/icon/today.png");
    meImage.setAttribute("src", "image/icon/meW.png");

    if (document.getElementById("music"))
        musicImage.setAttribute("src", "image/icon/loveFW.png");
    else if (document.getElementById("home"))
        homeImage.setAttribute("src", "image/icon/xW.png");

    nightFlag = 1;

    if (document.getElementById("musicBox")) {
        musicBox.style.color = "white";
        leftBox.style.color = "white";
        rightBox.style.color = "white";
        musicBox.style.boxShadow = "0 0 80px rgba(12,12,12 ,1)";
        if (musicFlag === 0) {
            musicControl.style.backgroundImage = "url('image/icon/play1.png')";
        } else {
            musicControl.style.backgroundImage = "url('image/icon/pause1.png')";
        }
    } else if (document.getElementById("centerCard")) {
        centerCard.style.boxShadow = "0 0 48px rgba(0,0,0 ,1)";
    } else if (document.getElementById("centerText")) {
        centerText.style.color = "white";
    }
}

function dayMode() {
    container.style.backgroundColor = "rgba(250,250,250 ,1)";
    title.style.color = "black";
    icp.style.color = "black";
    title.style.backgroundColor = "rgba(250,250,250,1)";
    icp.style.backgroundColor = "rgba(250,250,250,1)";

    nightImage.setAttribute("src", "image/icon/tonight.png");
    meImage.setAttribute("src", "image/icon/meB.png");

    if (document.getElementById("music"))
        musicImage.setAttribute("src", "image/icon/loveFB.png");
    else if (document.getElementById("home"))
        homeImage.setAttribute("src", "image/icon/xB.png");

    nightFlag = 0;

    if (document.getElementById("musicBox")) {

        musicBox.style.color = "black";
        leftBox.style.color = "black";
        rightBox.style.color = "black";
        musicBox.style.boxShadow = "0 0 80px rgba(117,117,117 ,1)";
        if (musicFlag === 0) {
            musicControl.style.backgroundImage = "url('image/icon/play0.png')";
        } else {
            musicControl.style.backgroundImage = "url('image/icon/pause0.png')";
        }
    } else if (document.getElementById("centerCard")) {
        centerCard.style.boxShadow = "0 0 48px rgba(224,224,224 ,1)";
    } else if (document.getElementById("centerText")) {
        centerText.style.color = "black";
    }
}

night.onclick = function () {

    if (nightFlag === 0) {
        nightMode();
    } else {
        dayMode();
    }
}

if (document.getElementById("musicBox")) {

    musicBox.onmousemove = function () {
        let shadowX = (event.clientX - (document.body.clientWidth / 2)) / 20;
        let shadowY = -(event.clientY - (document.body.clientHeight / 2)) / 20;
        musicBox.style.transform = "rotateX(" + shadowY + "deg)" + "rotateY(" + shadowX + "deg)";
    }

    musicBox.onmouseleave = function () {
        musicBox.style.transform = "rotateX(0) rotateY(0)";
    }

    function toPlay() {
        if (reloadFlag === 0) {
            musicPlayer.play();
        } else {
            musicPlayer.load();
        }
        startRotate = setInterval(function () {
            if (musicPlayer.ended) {
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
        musicPlayer.pause();
        clearInterval(startRotate);
        musicTime = musicPlayer.currentTime;
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
}


function showTime() {
    let time = new Date();
    let timeText = document.getElementById("timeText");

    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    let fullmonth = month;
    let fullday = day;
    let fullhours = hours;
    let fullminutes = minutes;
    let fullseconds = seconds;

    if (month < 10) fullmonth = "0" + month;
    if (day < 10) fullday = "0" + day;
    if (hours < 10) fullhours = "0" + hours;
    if (minutes < 10) fullminutes = "0" + minutes;
    if (seconds < 10) fullseconds = "0" + seconds;

    timeText.innerText = year + "/" + fullmonth + "/" +
        fullday + " " + fullhours + ":" + fullminutes + ":" +
        fullseconds;

    let startDate = new Date(year + "/01/01 00:00:00");
    let nowDate = new Date(year + "/" + fullmonth + "/" + fullday + " " +
        fullhours + ":" + fullminutes + ":" + fullseconds)
    let endDate = new Date((year + 1) + "/01/01 00:00:00")
    let percent = ((nowDate - startDate) / (endDate - startDate)) * 100;

    let percentText = document.getElementById("percentText");
    let progressBar = document.getElementById("progressBar");
    percentText.innerHTML = percent.toFixed(5) + "%";
    if (document.body.clientWidth <= 600) {
        progressBar.style.height = percent.toFixed(2) + "%";
        progressBar.style.width = "100%";
    } else {
        progressBar.style.width = percent.toFixed(2) + "%";
        progressBar.style.height = "100%";
    }


    setTimeout(() => {
        timeText.style.opacity = "1";
        percentText.style.opacity = "1";
    }, 1000);

}