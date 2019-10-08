'use strict';

let
    headerTitle = document.querySelector(".header-title"),
    navButton = document.querySelectorAll(".nav-button"),
    content = document.querySelectorAll(".content"),
    notesDirectory = document.querySelector("#notes-directory"),
    worksDirectory = document.querySelector("#works-directory"),
    loading = document.querySelector(".loading");

let
    darkFlag = 0,
    getNotesFlag = 0,
    getWorksFlag = 0;

document.addEventListener("DOMContentLoaded", function () {
    navButton[0].click();
})

headerTitle.addEventListener("click", function () {
    let html = document.querySelector("html");
    if (darkFlag === 0) {
        html.style.filter = "invert(96%)";
        darkFlag = 1;
    } else if (darkFlag === 1) {
        html.style.filter = "invert(0)";
        darkFlag = 0;
    }
})

navButton[0].addEventListener("click", function () {
    if (!getNotesFlag) {
        loading.style.opacity = "1";
        getNotes();
        getNotesFlag = 1;
    }
    showContent(0);
})

navButton[1].addEventListener("click", function () {
    if (!getWorksFlag) {
        loading.style.opacity = "1";
        getWorks();
        getWorksFlag = 1;
    }
    showContent(1);
})

function showContent(x) {
    for (let i = 0; i < content.length; i++) {
        content[i].style.display = "none";
        navButton[i].classList.remove("current-button");
        notesDirectory.style.display = "none";
        worksDirectory.style.display = "none";
    }
    navButton[x].classList.add("current-button");
    content[x].style.display = "flex";

    if (x === 0) {
        notesDirectory.style.display = "block"
    } else if (x === 1) {
        worksDirectory.style.display = "block"
    }

    document.body.scrollTop = 0;
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

                let
                    newNotebook = document.createElement("div"),
                    newDirectory = document.createElement("a"),
                    newTitle = document.createElement("div"),
                    newList = document.createElement("ul");

                newNotebook.className = "notebook";
                newNotebook.setAttribute("id", notebookJson[i].name);
                content[0].appendChild(newNotebook);

                newDirectory.className = "directory-link";
                newDirectory.innerText = notebookJson[i].name;
                newDirectory.setAttribute("href", "#" + notebookJson[i].name);
                notesDirectory.appendChild(newDirectory);

                newTitle.className = "notebook-title";
                newTitle.innerText = notebookJson[i].name;
                newNotebook.appendChild(newTitle);

                newList.className = "notebook-list";
                newNotebook.appendChild(newList);

                let getJson2 = new XMLHttpRequest();
                getJson2.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let noteJson = JSON.parse(this.responseText);
                        for (let j = 0; j < noteJson.length; j++) {
                            let
                                newItem = document.createElement("li"),
                                newLink = document.createElement("a");

                            newItem.className = "note-item";
                            newItem.title = noteJson[j].name.slice(0, -3);
                            newItem.innerText = noteJson[j].name.slice(0, -3);

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
            loading.style.opacity = "0";
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

                let
                    newShowcase = document.createElement("div"),
                    newLink = document.createElement("a"),
                    newTitle = document.createElement("div"),
                    newDescription = document.createElement("div"),
                    newDirectory = document.createElement("a");

                newShowcase.className = "showcase";
                newShowcase.setAttribute("id", worksJson[i].name);
                content[1].appendChild(newShowcase);

                newLink.className = "showcase-link";
                newLink.href = worksJson[i].html_url;
                newShowcase.appendChild(newLink);

                newTitle.className = "showcase-title";
                newTitle.innerText = worksJson[i].name;
                newLink.appendChild(newTitle);

                newDescription.className = "showcase-description";
                newDescription.innerText = worksJson[i].description;
                newLink.appendChild(newDescription);

                newDirectory.className = "directory-link";
                newDirectory.innerText = worksJson[i].name;
                newDirectory.setAttribute("href", "#" + worksJson[i].name);
                worksDirectory.appendChild(newDirectory);

                let
                    newData = document.createElement("div"),
                    newUpdate = document.createElement("span");

                newData.className = "repo-data";
                newTitle.appendChild(newData);

                newUpdate.className = "repo-update";
                newUpdate.innerText = "Last Update: " + worksJson[i].updated_at.slice(0, 10);
                newData.appendChild(newUpdate);
            }

            let
                newShowcase = document.createElement("div"),
                newLink = document.createElement("a"),
                newDescription = document.createElement("div"),
                newTitle = document.createElement("div");

            newShowcase.className = "showcase";
            content[1].appendChild(newShowcase);

            newLink.className = "showcase-link";
            newLink.href = "https://github.com/Lifeni";
            newShowcase.appendChild(newLink);

            newTitle.className = "showcase-title";
            newTitle.innerText = "还有啥";
            newLink.appendChild(newTitle);

            loading.style.opacity = "0";
        }
    }
    getJson.open("GET", "https://api.github.com/users/Lifeni/repos" + jsonToken("?"), true);
    getJson.send();
}

function jsonToken(sign) {
    return "";
}