var container = document.getElementById("container");
var night = document.getElementById("night");
var apps = document.getElementById("apps");
var me = document.getElementById("me");

var nightImage = document.getElementById("nightImage");
var appsImage = document.getElementById("appsImage");
var meImage = document.getElementById("meImage");

var appsCard = document.getElementById("appsCard");
var meCard = document.getElementById("meCard");
var meCardTitle = document.getElementsByClassName("me-card-title");
var meCardItem = document.getElementsByClassName("me-card-item");
var appsCardTitle = document.getElementsByClassName("apps-card-title");
var appsCardItem = document.getElementsByClassName("apps-card-item");


var centerCard = document.getElementById("centerCard");
var centerText = document.getElementById("centerText");

var title = document.getElementById("title");
var icp = document.getElementById("icp");
var bottomBar = document.getElementById("bottomBar");

var nightFlag = 0; // 0 代表白天 1 代表晚上
var musicFlag = 0; // 0 未播放 1 播放
var rotateDeg = 0;
var reloadFlag = 0;
var musicTime;

var timeFlag = 0; //进度条增加
var timePlus = 0;


window.onload = function () {
    var nowHours = new Date();
    if (nowHours.getHours() >= 22 || nowHours.getHours() <= 5) {
        nightMode();
    } else {
        dayMode();
    }

    if (document.getElementById("musicBox")) {
        var musicBox = document.getElementById("musicBox");
        var inBox = document.getElementById("inBox");
        var leftBox = document.getElementById("leftBox");
        var rightBox = document.getElementById("rightBox");
        var musicPlayer = document.getElementById("musicPlayer");
        var musicControl = document.getElementById("musicControl");
    } else if (document.getElementById("centerCard")) {
        showTime();
        setInterval(function () {
            showTime();
        }, 1000);
    } else if (document.getElementById("videoBox")) {
        var videoBox = document.getElementById("videoBox");
    }
}


function nightMode() {
    container.style.backgroundColor = "rgba(33,33,33 ,1)";
    title.style.color = "white";
    icp.style.color = "white";

    nightImage.setAttribute("src", "image/icon/today.png");
    meImage.setAttribute("src", "image/icon/meW.png");
    appsImage.setAttribute("src", "image/icon/appsW.png");

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
    } else if (document.getElementById("videoBox")) {
        videoBox.style.boxShadow = "0 0 80px rgba(12,12,12 ,1)";
    }
}

function dayMode() {
    container.style.backgroundColor = "rgba(250,250,250 ,1)";

    title.style.color = "black";
    icp.style.color = "black";

    nightImage.setAttribute("src", "image/icon/tonight.png");
    meImage.setAttribute("src", "image/icon/meB.png");
    appsImage.setAttribute("src", "image/icon/appsB.png");

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
    } else if (document.getElementById("videoBox")) {
        videoBox.style.boxShadow = "0 0 80px rgba(117,117,117 ,1)";
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
        var shadowX = (event.clientX - (document.body.clientWidth / 2)) / 20;
        var shadowY = -(event.clientY - (document.body.clientHeight / 2)) / 20;
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
    var time = new Date();
    var timeText = document.getElementById("timeText");

    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    var fullmonth = month;
    var fullday = day;
    var fullhours = hours;
    var fullminutes = minutes;
    var fullseconds = seconds;

    if (month < 10) fullmonth = "0" + month;
    if (day < 10) fullday = "0" + day;
    if (hours < 10) fullhours = "0" + hours;
    if (minutes < 10) fullminutes = "0" + minutes;
    if (seconds < 10) fullseconds = "0" + seconds;

    timeText.innerText = year + "/" + fullmonth + "/" +
        fullday + " " + fullhours + ":" + fullminutes + ":" +
        fullseconds;

    var startDate = new Date(year + "/01/01 00:00:00");
    var nowDate = new Date(year + "/" + fullmonth + "/" + fullday + " " +
        fullhours + ":" + fullminutes + ":" + fullseconds)
    var endDate = new Date((year + 1) + "/01/01 00:00:00")
    var percent = ((nowDate - startDate) / (endDate - startDate)) * 100;

    var percentText = document.getElementById("percentText");
    var progressBar = document.getElementById("progressBar");
    percentText.innerHTML = percent.toFixed(5) + "%";
    if (document.body.clientWidth <= 800) {
        progressBar.style.height = percent.toFixed(2) + "%";
        progressBar.style.width = "100%";
    } else {
        progressBar.style.width = percent.toFixed(2) + "%";
        progressBar.style.height = "100%";
    }


    setTimeout(function () {
        timeText.style.opacity = "1";
        percentText.style.opacity = "1";
    }, 1000);

}

showCard();

function showCard() {

    me.onclick = function () {
        meCard.style.height = "144px";
        meCard.style.width = "108px";
        meCard.style.opacity = "1";
        meImage.setAttribute("src", "image/icon/meB.png");
        meCard.style.borderRadius = "8px";
        meCardTitle[0].style.display = "flex";
        meCardItem[0].style.display = "flex";
        meCardItem[1].style.display = "flex";


        if (nightFlag) {
            meCard.style.boxShadow = "0 0 32px rgba(24,24,24, 1)";
        } else {
            meCard.style.boxShadow = "0 0 16px rgba(224, 224, 224, 1)";
        }
    }

    me.onblur = function () {
        setTimeout(function () {
            meCard.style.height = "40px";
            meCard.style.width = "40px";
            meCard.style.boxShadow = "none";
            meCard.style.opacity = "0";
            meCard.style.borderRadius = "24px";
            meCardTitle[0].style.display = "none";
            meCardItem[0].style.display = "none";
            meCardItem[1].style.display = "none";

            if (nightFlag)
                meImage.setAttribute("src", "image/icon/meW.png");
        }, 200);

    }

    apps.onclick = function () {
        appsCard.style.height = "192px";
        appsCard.style.width = "108px";
        appsCard.style.opacity = "1";
        appsImage.setAttribute("src", "image/icon/appsB.png");
        appsCard.style.borderRadius = "8px";
        appsCardTitle[0].style.display = "flex";
        appsCardItem[0].style.display = "flex";
        appsCardItem[1].style.display = "flex";
        appsCardItem[2].style.display = "flex";

        if (nightFlag) {
            appsCard.style.boxShadow = "0 0 32px rgba(24,24,24, 1)";
        } else {
            appsCard.style.boxShadow = "0 0 16px rgba(224, 224, 224, 1)";
        }
    }


    apps.onblur = function () {

        setTimeout(function () {
            appsCard.style.height = "40px";
            appsCard.style.width = "40px";
            appsCard.style.boxShadow = "none";
            appsCard.style.opacity = "0";
            appsCard.style.borderRadius = "24px";
            appsCardTitle[0].style.display = "none";
            appsCardItem[0].style.display = "none";
            appsCardItem[1].style.display = "none";
            appsCardItem[2].style.display = "none";

            if (nightFlag)
                appsImage.setAttribute("src", "image/icon/appsW.png");
        }, 200)

    }


}