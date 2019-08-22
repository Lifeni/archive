'use strict';

let color = ["rgba(244,67,54,1)", "rgba(233,30,99,1)", "rgba(156,39,176,1)",
    "rgba(103,58,183,1)", "rgba(63,81,181,1)", "rgba(33,150,243,1)",
    "rgba(3,169,244,1)", "rgba(0,188,212,1)", "rgba(0,150,136,1)",
    "rgba(76,175,80,1)", "rgba(139,195,74,1)", "rgba(205,220,57,1)",
    "rgba(255,235,59,1)", "rgba(255,193,7,1)", "rgba(255,152,0,1)",
    "rgba(255,87,34,1)", "rgba(96,125,139,1)"
]

document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.endsWith("/notes/")) {
        // 笔记
        let getJson = new XMLHttpRequest();
        getJson.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                document.querySelector(".tips").style.display = "none";

                let notebookJson = JSON.parse(this.responseText);
                for (let i = 0; i < notebookJson.length; i++) {

                    createCard("notes");
                    let card = document.querySelectorAll(".card");

                    let newTitle = document.createElement("div");
                    newTitle.className = "card-notes-title";
                    card[i].appendChild(newTitle);
                    newTitle.innerText = notebookJson[i].name;

                    let newList = document.createElement("ul");
                    newList.className = "card-notes-list";
                    card[i].appendChild(newList);

                    let getJson2 = new XMLHttpRequest();
                    getJson2.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            let noteJson = JSON.parse(this.responseText);
                            for (let j = 0; j < noteJson.length; j++) {

                                let newItem = document.createElement("li");
                                newItem.className = "card-notes-item";
                                newItem.innerText = noteJson[j].name.slice(0, -3);

                                let newLink = document.createElement("a");
                                newLink.className = "card-notes-link";
                                newLink.appendChild(newItem);
                                newLink.setAttribute("href", noteJson[j].html_url);

                                let list = document.querySelectorAll(".card-notes-list");
                                list[i].appendChild(newLink);
                            }
                        }
                    }
                    getJson2.open("GET", notebookJson[i].url + "&access_token=3f6ee78250ea0bec1e8cad17900f5b0ef2caba32", true);
                    getJson2.send();
                }
                initAllCard();
            }
        }
        getJson.open("GET", "https://api.github.com/repos/Lifeni/lifeni-notes/contents?access_token=3f6ee78250ea0bec1e8cad17900f5b0ef2caba32", true);
        getJson.send();

    } else if (window.location.href.endsWith("/works/")) {
        // 作品
        initAllCard();
    } else if (window.location.href.endsWith("/love/")) {
        // 喜欢
        initAllCard();
    } else {
        // 首页
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


// 横向滚动
function scrollPage() {
    let scrollValue = 0;
    if (document.documentElement.clientWidth < 480) {
        return;
    } else if (event.wheelDelta) {
        event.wheelDelta > 0 ? scrollValue -= 540 : scrollValue += 540
    } else if (event.detail) {
        event.detail > 0 ? scrollValue += 360 : scrollValue -= 360
    }
    document.documentElement.scrollLeft += scrollValue;
}

document.addEventListener("mousewheel", scrollPage);
document.addEventListener("DOMMouseScroll", scrollPage);