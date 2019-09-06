'use strict';

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.endsWith("/notes/")) { // 笔记
        let getJson = new XMLHttpRequest();
        getJson.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                document.querySelector(".tips").style.display = "none";

                // 从 Github 获取笔记本的 JSON
                let notebookJson = JSON.parse(this.responseText);
                for (let i = 0; i < notebookJson.length; i++) {
                    createCard("notes");

                    // 为新加的卡片添加标题和列表
                    let card = document.querySelectorAll(".card");
                    let newTitle = document.createElement("div");
                    newTitle.className = "card-notes-title";
                    newTitle.innerText = notebookJson[i].name;
                    card[i].appendChild(newTitle);

                    let newTitleCount = document.createElement("div");
                    newTitleCount.className = "card-notes-title-count";
                    newTitle.appendChild(newTitleCount);

                    let newTitleBackground = document.createElement("div");
                    newTitleBackground.className = "card-notes-title-background";
                    newTitle.appendChild(newTitleBackground);


                    let newList = document.createElement("ul");
                    newList.className = "card-notes-list";
                    card[i].appendChild(newList);

                    // 从 Github 获取笔记的 JSON
                    let getJson2 = new XMLHttpRequest();
                    getJson2.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            let noteJson = JSON.parse(this.responseText);
                            for (let j = 0; j < noteJson.length; j++) {

                                // 在列表中添加项目和相应的链接
                                let newItem = document.createElement("li");
                                newItem.className = "card-notes-item";
                                newItem.title = noteJson[j].name.slice(0, -3);
                                newItem.innerText = noteJson[j].name.slice(0, -3);

                                let newLink = document.createElement("a");
                                newLink.className = "card-notes-link";
                                newLink.appendChild(newItem);
                                newLink.setAttribute("href", noteJson[j].html_url);

                                let list = document.querySelectorAll(".card-notes-list");
                                list[i].appendChild(newLink);

                                newTitleCount.innerText = noteJson.length;
                                changeColor(notebookJson[i].name, i);
                            }
                        }
                    }
                    getJson2.open("GET", notebookJson[i].url, true);
                    getJson2.send();

                    // 屏蔽 README.md
                    if (notebookJson[i].type == "file") {
                        card[i].style.display = "none";
                    }
                }
                initAllCard();
            }
        }

        getJson.open("GET", "https://api.github.com/repos/Lifeni/lifeni-notes/contents", true);
        getJson.send();

    } else if (window.location.href.endsWith("/works/")) { // 作品
        let card = document.querySelectorAll(".card-works");
        for (let i = 0; i < card.length; i++) {
            if (document.documentElement.clientWidth > 480) {
                card[i].style.position = "absolute";
                card[i].style.zIndex = i;
                card[i].style.marginLeft = i * (-12) + "px";
                card[i].style.marginTop = i * (-12) + "px";
            }
        }
        initAllCard();
    } else if (window.location.href.endsWith("/love/")) { // 喜欢
        let header = document.querySelector("header"),
            address = document.querySelector("address"),
            main = document.querySelector("main"),
            nav = document.querySelector("nav"),
            footer = document.querySelector("footer"),
            tips = document.querySelector(".tips");
        header.style.filter = "invert(100%)";
        address.style.filter = "invert(100%)";
        main.style.padding = "0";
        main.style.backgroundColor = "rgba(33,33,33 ,1)";
        nav.style.filter = "invert(100%)";
        footer.style.filter = "invert(100%)";
        tips.style.color = "white";
    } else { // 首页
        let card = document.querySelectorAll(".card");
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener("click", function () {
                let id = this.getAttribute("id");
                window.location.href = "/" + id.slice(5) + "/";
            });
        }
        initAllCard();
    }
})

function createCard(cardName) {
    let main = document.querySelector("main");
    let newCard = document.createElement("div");
    newCard.className = "card card-" + cardName;
    main.appendChild(newCard);
}

function initAllCard() {
    let card = document.querySelectorAll(".card");
    for (let i = 0; i < card.length; i++) {
        card[i].style.animation = "show-card " + (.25 + i * .15) + "s cubic-bezier(0, 0, 0, 1)";
        card[i].style.opacity = "1";
    }
}

function changeColor(noteName, i) {
    let color = "rgba(33,150,243,1)";
    let titleLine = document.querySelectorAll(".card-notes-title-background");
    let noteCount = document.querySelectorAll(".card-notes-title-count");
    switch (noteName) {
        case "HTML & CSS":
            color = "rgba(229, 76, 33,1)";
            break;
        case "JavaScript":
            color = "rgba(240, 219, 79,1)";
            break;
        case "Node.js":
            color = "rgba(86, 158, 74,1)";
            break;
        case "算法 & 题解":
            color = "rgba(0, 121, 169,1)";
            break;
        default:
            break;
    }
    titleLine[i].style.backgroundColor = color;
    noteCount[i].style.backgroundColor = color;
}

// 横向滚动
function scrollPage() {
    let scrollValue = 0;
    if (document.documentElement.clientWidth < 480) {
        return;
    } else if (event.wheelDelta) {
        event.wheelDelta > 0 ? scrollValue -= 540 : scrollValue += 540;
    } else if (event.detail) {
        event.detail > 0 ? scrollValue += 360 : scrollValue -= 360;
    }
    document.documentElement.scrollLeft += scrollValue;
}

document.addEventListener("mousewheel", scrollPage);
document.addEventListener("DOMMouseScroll", scrollPage);