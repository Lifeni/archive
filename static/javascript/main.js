'use strict';

window.onload = function () {
    showArticle();
    showMusic();
}

function showMusic() {
    let logo = Q(".logo");
    logo.addEventListener("click", () => {
        let music = Q(".music"),
            header = Q(".header"),
            main = Q(".main");
        header.style.height = "100vh";
        main.style.minHeight = "0";
        logo.style.opacity = "0";
        music.style.display = "flex";
        setTimeout(() => {
            music.style.opacity = "1";
        }, 200);
    })

    let audio = Q("#audio"),
        play = Q(".play"),
        progress = Q(".progress");

    play.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });
    audio.addEventListener("timeupdate", () => {
        progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
        if (audio.readyState < 4) {
            play.innerText = "LOADING";
        } else {
            play.innerText = "PAUSE";
        }
    });
    audio.addEventListener("play", () => {
        if (audio.readyState < 4) {
            play.innerText = "LOADING";
        } else {
            play.innerText = "PAUSE";
        }
    });
    audio.addEventListener("pause", () => {
        play.innerText = "PLAY";
    });
    audio.addEventListener("ended", () => {
        play.innerText = "REPLAY";
        audio.currentTime = 0;
    });
}

function showArticle() {
    let data;
    let getJSON = new XMLHttpRequest();
    getJSON.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            data = JSON.parse(this.responseText);
            let list = Q(".list"),
                loading = Q(".loading");
            for (let i in data) {
                let template = Q("#article");
                tQ(".link").href = data[i].Link;;
                tQ(".title").innerText = data[i].Title;
                tQ(".description").innerText = data[i].Description;
                tQ(".date").innerText = data[i].Modified.slice(5);
                tQ(".keyword").innerText = data[i].Keyword;
                let clone = document.importNode(template.content, true);
                list.appendChild(clone);
            }
            loading.style.opacity = "0";
            list.style.display = "inline-block";
            setTimeout(() => {
                list.style.opacity = "1";
            }, 200);
        }
    }
    getJSON.open("GET", "https://api.lifeni.top/article", true);
    getJSON.send();
}

function Q(t) {
    return document.querySelector(t);
}

function tQ(t) {
    let template = Q("#article");
    return template.content.querySelector(t);
}