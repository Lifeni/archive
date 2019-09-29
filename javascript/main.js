'use strict';

let navButton = document.querySelectorAll(".nav-button"),
    content = document.querySelectorAll(".content"),
    directory = document.querySelector(".directory");
let getFlag = 0;

document.addEventListener("DOMContentLoaded", function () {
    navButton[0].click();
})

navButton[0].onclick = function () {
    if (!getFlag) {
        getNotes();
        getFlag = 1;
    }
    showContent(0);
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
                let newNotebook = document.createElement("div");
                newNotebook.className = "notebook";
                newNotebook.setAttribute("id", notebookJson[i].name);

                if (notebookJson[i].type == "file") {
                    newNotebook.style.display = "none";
                    continue;
                }

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
                            newLink.appendChild(newItem);
                            newLink.setAttribute("href", noteJson[j].html_url);
                            newList.appendChild(newLink);
                        }
                    }
                }
                getJson2.open("GET", notebookJson[i].url, true);
                getJson2.send();

                content[0].appendChild(newNotebook);
                if (i != notebookJson.length - 1) {
                    let newHr = document.createElement("hr");
                    content[0].appendChild(newHr);
                }
            }
        }
    }
    getJson.open("GET", "https://api.github.com/repos/Lifeni/lifeni-notes/contents", true);
    getJson.send();
}