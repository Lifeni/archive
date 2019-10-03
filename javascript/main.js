'use strict';

let
    navButton = document.querySelectorAll(".nav-button"),
    content = document.querySelectorAll(".content"),
    notesDirectory = document.querySelector("#notes-directory"),
    worksDirectory = document.querySelector("#works-directory");

let
    getNotesFlag = 0,
    getWorksFlag = 0,
    getLoveFlag = 0;

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

navButton[2].onclick = function () {
    if (!getLoveFlag) {
        getMusicInfo();
        getPicture();
        getLoveFlag = 1;
    }
    showContent(2);
};

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
                    newStar = document.createElement("span"),
                    newUpdate = document.createElement("span");

                newData.className = "repo-data";
                newTitle.appendChild(newData);

                newStar.className = "repo-star";
                newStar.innerText = "Star: " + worksJson[i].stargazers_count;
                newData.appendChild(newStar);

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
            newTitle.innerText = "还有什么?";
            newLink.appendChild(newTitle);

            newDescription.className = "showcase-description";
            newDescription.innerText = "去 Github 看看";
            newLink.appendChild(newDescription);
        }
    }
    getJson.open("GET", "https://api.github.com/users/Lifeni/repos" + jsonToken("?"), true);
    getJson.send();
}

function jsonToken(sign) {
    return sign + "access_token=4d3b18c13754839f063259e955a85ce3b23a1688";

    return "";
}