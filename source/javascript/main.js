var container = document.getElementById("container");

var themeButton = document.getElementById("theme");
var themeImage = document.getElementById("themeImage");
var themeCard = document.getElementById("themeCard");
var themeCardTitle = document.getElementsByClassName("theme-card-title");
var themeCardItem = document.getElementsByClassName("theme-card-item");

var whiteTheme = document.getElementById("whiteTheme");
var blackTheme = document.getElementById("blackTheme");
var themeCheck = document.getElementsByClassName("theme-check");

var meButton = document.getElementById("me");
var meImage = document.getElementById("meImage");
var meCard = document.getElementById("meCard");
var meCardTitle = document.getElementsByClassName("me-card-title");
var meCardItem = document.getElementsByClassName("me-card-item");

var moreButton = document.getElementById("more");
var moreImage = document.getElementById("moreImage");
var moreCard = document.getElementById("moreCard");
var moreCardTitle = document.getElementsByClassName("more-card-title");
var moreCardItem = document.getElementsByClassName("more-card-item");

var title = document.getElementById("title");
var about = document.getElementById("about");
var icp = document.getElementById("icp");

var aboutBox = document.getElementById("aboutBox");
var aboutCard = document.getElementById("aboutCard");
var aboutCloseButton = document.getElementById("aboutCloseButton");

var autoNight = 0;
var blackFlag = 0; // 0 代表白天 1 代表晚上

var musicFlag = 0; // 0 未播放 1 播放
var rotateDeg = 0;
var reloadFlag = 0;
var musicTime;

var timeFlag = 0; //进度条增加
var timePlus = 0;

window.onload = function () {

    menu();

    if (autoNight) {
        var nowHours = new Date();
        if (nowHours.getHours() >= 22 || nowHours.getHours() <= 5) {
            blackMode();
        } else {
            whiteMode();
        }
    }

    if (blackFlag) {
        themeCheck[0].style.display = "none";
        themeCheck[1].style.display = "block";
    } else {
        themeCheck[1].style.display = "none";
        themeCheck[0].style.display = "block";
    }

    if (document.getElementById("errorText")) {
        var errorText = document.getElementById("errorText");

    } else if (document.getElementById("timeCard")) {

        var timeCard = document.getElementById("timeCard");
        time();
        setInterval(function () {
            time();
        }, 1000);

    } else if (document.getElementById("musicBox")) {

        var musicBox = document.getElementById("musicBox");
        var musicInBox = document.getElementById("musicInBox");
        var musicLeftBox = document.getElementById("musicLeftBox");
        var musicRightBox = document.getElementById("musicRightBox");
        var musicPlayer = document.getElementById("musicPlayer");
        var musicControl = document.getElementById("musicControl");

        music();

    } else if (document.getElementById("videoBox")) {

        var videoBox = document.getElementById("videoBox");
        var videoPlayer = document.getElementById("videoPlayer");
        movie();

    }
}

// --- About ---

about.onclick = function () {
    aboutBox.style.display = "flex";
    setTimeout(function () {
        aboutBox.style.opacity = "1";
        aboutCard.style.opacity = "1";
    }, 100);
    
}

aboutCloseButton.onclick = function () {
    aboutCard.style.opacity = "0";
    aboutBox.style.opacity = "0";
    setTimeout(function () {
        aboutBox.style.display = "none";
    }, 1200);
}

// --- Night Mode ---

function blackMode() {
    container.style.backgroundColor = "rgba(33,33,33 ,1)";
    title.style.color = "white";
    about.style.color = "white";
    icp.style.color = "white";

    themeImage.setAttribute("src", "/source/image/icon/themeW.png");
    meImage.setAttribute("src", "/source/image/icon/meW.png");
    moreImage.setAttribute("src", "/source/image/icon/moreW.png");

    blackFlag = 1;
    if (document.getElementById("errorText")) {
        errorText.style.color = "white";

    } else if (document.getElementById("timeCard")) {
        timeCard.style.boxShadow = "0 0 48px rgba(0,0,0 ,1)";

    } else if (document.getElementById("musicBox")) {
        musicBox.style.color = "white";
        musicLeftBox.style.color = "white";
        musicRightBox.style.color = "white";
        musicBox.style.boxShadow = "0 0 80px rgba(12,12,12 ,1)";

        if (musicFlag === 0) {
            musicControl.style.backgroundImage = "url('/source/image/icon/playW.png')";
        } else {
            musicControl.style.backgroundImage = "url('/source/image/icon/pauseW.png')";
        }

    } else if (document.getElementById("videoBox")) {
        videoBox.style.boxShadow = "0 0 80px rgba(12,12,12 ,1)";

    }
}

function whiteMode() {
    container.style.backgroundColor = "rgba(250,250,250 ,1)";

    title.style.color = "black";
    about.style.color = "black";
    icp.style.color = "black";

    themeImage.setAttribute("src", "/source/image/icon/themeB.png");
    meImage.setAttribute("src", "/source/image/icon/meB.png");
    moreImage.setAttribute("src", "/source/image/icon/moreB.png");

    blackFlag = 0;
    if (document.getElementById("errorText")) {
        errorText.style.color = "black";

    } else if (document.getElementById("timeCard")) {
        timeCard.style.boxShadow = "0 0 48px rgba(224,224,224 ,1)";

    } else if (document.getElementById("musicBox")) {

        musicBox.style.color = "black";
        musicLeftBox.style.color = "black";
        musicRightBox.style.color = "black";

        musicBox.style.boxShadow = "0 0 80px rgba(117,117,117 ,1)";
        if (musicFlag === 0) {
            musicControl.style.backgroundImage = "url('/source/image/icon/playB.png')";
        } else {
            musicControl.style.backgroundImage = "url('/source/image/icon/pauseB.png')";
        }

    } else if (document.getElementById("videoBox")) {
        videoBox.style.boxShadow = "0 0 80px rgba(117,117,117 ,1)";
    }
}



// --- Menu ---

whiteTheme.onclick = function () {
    themeCheck[1].style.display = "none";
    themeCheck[0].style.display = "block";
    whiteMode();
}

blackTheme.onclick = function () {
    themeCheck[0].style.display = "none";
    themeCheck[1].style.display = "block";
    blackMode();
}

function menu() {
    if (blackFlag) {
        themeCheck[0].style.display = "none";
        themeCheck[1].style.display = "block";
    } else {
        themeCheck[1].style.display = "none";
        themeCheck[0].style.display = "block";
    }

    themeButton.onclick = function () {
        themeCard.style.height = "144px";
        themeCard.style.width = "108px";
        themeCard.style.opacity = "1";
        themeImage.setAttribute("src", "/source/image/icon/themeB.png");
        themeCard.style.borderRadius = "8px";

        themeCardTitle[0].style.display = "block";
        themeCardItem[0].style.display = "block";
        themeCardItem[1].style.display = "block";

        setTimeout(function () {
            themeCardTitle[0].style.opacity = "1";
            themeCardItem[0].style.opacity = "1";
        }, 150);
        setTimeout(function () {
            themeCardItem[1].style.opacity = "1";
        }, 300);

        if (blackFlag) {
            themeCard.style.boxShadow = "0 0 32px rgba(24,24,24, 1)";
        } else {
            themeCard.style.boxShadow = "0 0 16px rgba(224, 224, 224, 1)";
        }
    }

    themeButton.onblur = function () {

        setTimeout(function () {
            themeCard.style.height = "40px";
            themeCard.style.width = "40px";
            themeCard.style.boxShadow = "none";
            themeCard.style.opacity = "0";
            themeCard.style.borderRadius = "24px";

            themeCardTitle[0].style.display = "none";
            themeCardItem[0].style.display = "none";
            themeCardItem[1].style.display = "none";

            themeCardTitle[0].style.opacity = "0";
            themeCardItem[0].style.opacity = "0";
            themeCardItem[1].style.opacity = "0";

            if (blackFlag)
                themeImage.setAttribute("src", "/source/image/icon/themeW.png");
        }, 200)
    }

    meButton.onclick = function () {
        meCard.style.height = "144px";
        meCard.style.width = "108px";
        meCard.style.opacity = "1";
        meImage.setAttribute("src", "/source/image/icon/meB.png");
        meCard.style.borderRadius = "8px";

        meCardTitle[0].style.display = "flex";
        meCardItem[0].style.display = "flex";
        meCardItem[1].style.display = "flex";

        setTimeout(function () {
            meCardTitle[0].style.opacity = "1";
            meCardItem[0].style.opacity = "1";
        }, 150);
        setTimeout(function () {
            meCardItem[1].style.opacity = "1";
        }, 300);

        if (blackFlag) {
            meCard.style.boxShadow = "0 0 32px rgba(24,24,24, 1)";
        } else {
            meCard.style.boxShadow = "0 0 16px rgba(224, 224, 224, 1)";
        }
    }

    meButton.onblur = function () {
        setTimeout(function () {
            meCard.style.height = "40px";
            meCard.style.width = "40px";
            meCard.style.boxShadow = "none";
            meCard.style.opacity = "0";
            meCard.style.borderRadius = "24px";

            meCardTitle[0].style.display = "none";
            meCardItem[0].style.display = "none";
            meCardItem[1].style.display = "none";

            meCardItem[0].style.opacity = "0";
            meCardItem[1].style.opacity = "0";
            meCardTitle[0].style.opacity = "0";

            if (blackFlag)
                meImage.setAttribute("src", "/source/image/icon/meW.png");
        }, 200);

    }

    moreButton.onclick = function () {
        moreCard.style.height = "192px";
        moreCard.style.width = "108px";
        moreCard.style.opacity = "1";
        moreImage.setAttribute("src", "/source/image/icon/moreB.png");
        moreCard.style.borderRadius = "8px";

        moreCardTitle[0].style.display = "flex";
        moreCardItem[0].style.display = "flex";
        moreCardItem[1].style.display = "flex";
        moreCardItem[2].style.display = "flex";

        setTimeout(function () {
            moreCardTitle[0].style.opacity = "1";
            moreCardItem[0].style.opacity = "1";
        }, 150);
        setTimeout(function () {
            moreCardItem[1].style.opacity = "1";
        }, 300);
        setTimeout(function () {
            moreCardItem[2].style.opacity = "1";
        }, 450);


        if (blackFlag) {
            moreCard.style.boxShadow = "0 0 32px rgba(24,24,24, 1)";
        } else {
            moreCard.style.boxShadow = "0 0 16px rgba(224, 224, 224, 1)";
        }
    }

    moreButton.onblur = function () {

        setTimeout(function () {
            moreCard.style.height = "40px";
            moreCard.style.width = "40px";
            moreCard.style.boxShadow = "none";
            moreCard.style.opacity = "0";
            moreCard.style.borderRadius = "24px";

            moreCardTitle[0].style.display = "none";
            moreCardItem[0].style.display = "none";
            moreCardItem[1].style.display = "none";
            moreCardItem[2].style.display = "none";

            moreCardTitle[0].style.opacity = "0";
            moreCardItem[0].style.opacity = "0";
            moreCardItem[1].style.opacity = "0";
            moreCardItem[2].style.opacity = "0";

            if (blackFlag)
                moreImage.setAttribute("src", "/source/image/icon/moreW.png");
        }, 200)
    }
}

// --- Home ---

function time() {
    var nowTime = new Date();
    var timeText = document.getElementById("timeText");
    var yearText = document.getElementById("yearText");

    var year = nowTime.getFullYear();
    var month = nowTime.getMonth() + 1;
    var day = nowTime.getDate();
    var hours = nowTime.getHours();
    var minutes = nowTime.getMinutes();
    var seconds = nowTime.getSeconds();

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

    yearText.innerHTML = year;

    percentText.innerHTML = percent.toFixed(5) + "%";
    progressBar.style.height = "100%";
    progressBar.style.width = percent.toFixed(2) + "%";


    setTimeout(function () {
        timeText.style.opacity = "1";
        percentText.style.opacity = "1";
    }, 1000);

}


// --- Music ---

function music() {

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
            musicInBox.style.transform = "rotate(" + rotateDeg + "deg)";
            rotateDeg++;
        }, 50);

        if (blackFlag) {
            musicControl.style.backgroundImage = "url('/source/image/icon/pauseW.png')";
        } else {
            musicControl.style.backgroundImage = "url('/source/image/icon/pauseB.png')";
        }

        musicFlag = 1;

    }

    function toPause() {
        musicPlayer.pause();
        clearInterval(startRotate);
        musicTime = musicPlayer.currentTime;

        if (blackFlag) {
            musicControl.style.backgroundImage = "url('/source/image/icon/playW.png')";
        } else {
            musicControl.style.backgroundImage = "url('/source/image/icon/playB.png')";
        }

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

// --- Movie ---

function movie() {
    setInterval(function () {
        if (videoPlayer.ended) {
            videoPlayer.currentTime = 0;
        }
    }, 1000);
}