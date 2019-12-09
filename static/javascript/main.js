'use strict';

let logo = document.querySelector(".logo"),
    navLink = document.querySelectorAll(".nav-link"),
    statistics = document.querySelector(".statistics"),
    background = document.querySelector(".background");

let logoClickCount = 0,
    accessToken;

let articleData,
    worksData;

window.onload = async function () {
    function getAccessToken() {
        return new Promise((resolve, reject) => {
            let getToken = new XMLHttpRequest();
            getToken.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    accessToken = this.responseText;
                    resolve("ok");
                }
            }
            getToken.open("GET", "https://api.lifeni.top/token", true);
            getToken.send();
        });
    }
    await getAccessToken();
    getArticleList();
    getWorksList()
    changeWallpaper();

}

logo.addEventListener("click", function () {
    logoClickCount++;
    if (logoClickCount % 4 == 0) {
        background.style.opacity = "0";
    } else if (logoClickCount % 2 == 0) {
        background.style.opacity = "1";
    }
});

for (let i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener("click", function () {
        for (let j = 0; j < navLink.length; j++) {
            navLink[j].classList.remove("nav-link-current");
        }
        navLink[i].classList.add("nav-link-current");
        getStart()
        if (i === 0) {
            setArticleList();
        } else if (i === 1) {
            setWorksList();
        } else if (i === 2) {

        }
    })
}

function getArticleList() {
    let getJson = new XMLHttpRequest();
    getJson.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            articleData = JSON.parse(this.responseText);
            setArticleList();
        }
    }
    getJson.open("GET", "https://api.github.com/repos/Lifeni/lifeni-notebook/contents" + accessToken, true);
    getJson.send();
}

function setArticleList() {
    let articleCount = 0;
    for (let i in articleData) {
        if (articleData[i].type === "file" && articleData[i].name !== "LICENSE" && articleData[i].name !== "README.md") {
            let template = document.querySelector("#article-list"),
                link = template.content.querySelector(".article-link"),
                title = template.content.querySelector(".article-title"),
                date = template.content.querySelector(".article-date");

            link.href = articleData[i].html_url;
            title.innerText = articleData[i].name.slice(0, -3);
            date.innerText = "很久以前";

            let list = document.querySelector("#list"),
                clone = document.importNode(template.content, true);
            list.appendChild(clone);
            articleCount++;
        }
    }
    statistics.innerText = articleCount + " 篇文章";
    getSuccess();
}

function getWorksList() {
    let getJson = new XMLHttpRequest();
    getJson.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            worksData = JSON.parse(this.responseText);
        }
    }
    getJson.open("GET", "https://api.github.com/users/Lifeni/repos" + accessToken, true);
    getJson.send();
}
function setWorksList() {
    for (let i in worksData) {
        let template = document.querySelector("#works-list");
        let link = template.content.querySelector(".works-link"),
            title = template.content.querySelector(".works-title"),
            description = template.content.querySelector(".works-description"),
            language = template.content.querySelector(".repo-language"),
            date = template.content.querySelector(".repo-updated-date");

        link.href = worksData[i].html_url;
        title.innerText = worksData[i].name;
        description.innerText = worksData[i].description;
        language.innerText = worksData[i].language;
        date.innerText = worksData[i].updated_at.slice(0, 4) + " 年 " + worksData[i].updated_at.slice(5, 7) + " 月";

        let list = document.querySelector("#list"),
            clone = document.importNode(template.content, true);
        list.appendChild(clone);
    }
    statistics.innerText = worksData.length + " 个作品";
    getSuccess();
}

function changeWallpaper() {
    if (window.innerWidth < window.innerHeight) {
        background.style.backgroundImage = "url('./static/image/wallpaper-phone.jpg')";
    }
}

function getStart() {
    let list = document.querySelector("#list"),
        loading = document.querySelector(".loading");
    loading.style.display = "flex";
    list.innerHTML = "";
    statistics.innerText = "";
}

function getSuccess() {
    let loading = document.querySelector(".loading");
    loading.style.display = "none";
}
