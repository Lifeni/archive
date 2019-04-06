window.onload = function () {
    getLink();
}

function getLink() {
    let links = document.getElementsByClassName("link");
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            // creatDiv();
            showBlock(this);
            // changButton(this);
            return false;
        }
    }
}

// function creatDiv() {
//     let creatWebDiv = document.createElement("iframe");
//     creatWebDiv.setAttribute("id", "displayBlock");
//     creatWebDiv.setAttribute("class", "displayBlock");
//     creatWebDiv.setAttribute("height", "400px");
//     creatWebDiv.setAttribute("width", "100%");
//     let webDiv = document.getElementById("webDiv");
//     webDiv.appendChild(creatWebDiv);
// }

function showBlock(whichLink) {
    let source = whichLink.getAttribute("href");
    let displayBlock = document.getElementById("displayBlock");
    // let displayHr = document.getElementById("displayHr");
    displayBlock.setAttribute("src", source + "index.html");
    displayBlock.setAttribute("min-height","400px");
    displayBlock.setAttribute("height","400px");
    displayBlock.setAttribute("width","100%");
    // displayHr.setAttribute("width","480px");
}

// function changButton(whichButton)
// {
//     whichButton.setAttribute("font-weight","bold");
// }