'use strict';

let navButton = document.querySelectorAll(".nav-button"),
    content = document.querySelectorAll(".content"),
    directory = document.querySelector(".directory");

let getNotesFlag = 0,
    getWorksFlag = 0;

document.addEventListener("DOMContentLoaded", function () {
    navButton[0].click();
})

navButton[0].onclick = function () {
    if (!getNotesFlag) {
        getNotes();
        getNotesFlag = 1;
    }
    showContent(0);
};

navButton[1].onclick = function () {
    if (!getWorksFlag) {
        getWorks();
        getWorksFlag = 1;
    }
    showContent(1);
};

function showContent(x) {
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "none";
        navButton[i].classList.remove("current-button");
        directory.style.display = "none";
    }
    navButton[x].classList.add("current-button");
    content[x].style.display = "flex";
    if (x == 0) {
        directory.style.display = "block"
    }
}

function getNotes() {
    let getJson = new XMLHttpRequest();
    getJson.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let notebookJson = JSON.parse(this.responseText);

            for (let i = 0; i < notebookJson.length; i++) {
                if (notebookJson[i].type == "file") {
                    continue;
                }

                let newNotebook = document.createElement("div");
                newNotebook.className = "notebook";
                newNotebook.setAttribute("id", notebookJson[i].name);
                content[0].appendChild(newNotebook);

                let newLink = document.createElement("a");
                newLink.className = "directory-link";
                newLink.innerText = notebookJson[i].name;
                newLink.setAttribute("href", "#" + notebookJson[i].name);
                directory.appendChild(newLink);

                let newTitle = document.createElement("div");
                newTitle.className = "notebook-title";
                newTitle.innerText = notebookJson[i].name;
                newNotebook.appendChild(newTitle);

                let newList = document.createElement("ul");
                newList.className = "notebook-list";
                newNotebook.appendChild(newList);

                let getJson2 = new XMLHttpRequest();
                getJson2.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let noteJson = JSON.parse(this.responseText);

                        for (let j = 0; j < noteJson.length; j++) {
                            let newItem = document.createElement("li");
                            newItem.className = "note-item";
                            newItem.title = noteJson[j].name.slice(0, -3);
                            newItem.innerText = noteJson[j].name.slice(0, -3);

                            let newLink = document.createElement("a");
                            newLink.className = "note-link";
                            newLink.href = noteJson[j].html_url;
                            newLink.appendChild(newItem);

                            newList.appendChild(newLink);
                        }
                    }
                }

                getJson2.open("GET", notebookJson[i].url + jsonToken("&"), true);
                getJson2.send();
            }
        }
    }

    getJson.open("GET", "https://api.github.com/repos/Lifeni/lifeni-notes/contents" + jsonToken("?"), true);
    getJson.send();
}

function getWorks() {
    let getJson = new XMLHttpRequest();
    getJson.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let worksJson = JSON.parse(this.responseText);

            for (let i = 0; i < worksJson.length; i++) {
                if (worksJson[i].name.startsWith("lifeni")) {
                    continue;
                }

                let newShowcase = document.createElement("div");
                newShowcase.className = "showcase";
                newShowcase.setAttribute("id", worksJson[i].name);
                content[1].appendChild(newShowcase);

                let newLink = document.createElement("a");
                newLink.className = "showcase-link";
                newLink.href = worksJson[i].html_url;
                newShowcase.appendChild(newLink);

                let newTitle = document.createElement("div");
                newTitle.className = "showcase-title";
                newTitle.innerText = worksJson[i].name;
                newLink.appendChild(newTitle);

                let newDescription = document.createElement("div");
                newDescription.className = "showcase-description";
                newDescription.innerText = worksJson[i].description;
                newLink.appendChild(newDescription);
            }

            let newShowcase = document.createElement("div");
            newShowcase.className = "showcase";
            content[1].appendChild(newShowcase);

            let newLink = document.createElement("a");
            newLink.className = "showcase-link";
            newLink.href = "https://github.com/Lifeni";
            newShowcase.appendChild(newLink);

            let newTitle = document.createElement("div");
            newTitle.className = "showcase-title";
            newTitle.innerText = "还有什么?";
            newLink.appendChild(newTitle);

            let newDescription = document.createElement("div");
            newDescription.className = "showcase-description";
            newDescription.innerText = "去 Github 看看";
            newLink.appendChild(newDescription);
        }
    }

    getJson.open("GET", "https://api.github.com/users/Lifeni/repos" + jsonToken("?"), true);
    getJson.send();
}

function jsonToken(sign) {
    return "";
}