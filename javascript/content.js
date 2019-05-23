let container = document.getElementById("container");

let night = document.getElementById("night");
let nightImage = document.getElementById("nightImage");

let title = document.getElementById("title");
let icp = document.getElementById("icp");

let box = document.getElementById("box");

let nightFlag = 0; // 0 代表白天 1 代表晚上

night.onclick = function () {

    if (nightFlag === 0) {
        container.style.backgroundColor = "rgba(33,33,33 ,1)";
        title.style.color = "rgba(255,255,255 ,1)";
        icp.style.color = "rgba(255,255,255 ,1)";
        box.style.boxShadow = "0 0 40px rgba(24,24,24 ,1)";
        nightImage.setAttribute("src", "image/today.png");

        nightFlag = 1;
    } else {
        container.style.backgroundColor = "rgba(255,255,255 ,1)";
        title.style.color = "rgba(0,0,0 ,1)";
        icp.style.color = "rgba(0,0,0 ,1)";
        box.style.boxShadow = "0 0 40px rgba(189,189,189 ,1)";
        nightImage.setAttribute("src", "image/tonight.png");

        nightFlag = 0;
    }

}

container.onmousemove = function () {
    let shadowX = (event.clientX - (document.body.clientWidth / 2)) / 50;
    let shadowY = -(event.clientY - (document.body.clientHeight / 2)) / 50;
    //alert(shadowX+" "+shadowY);
    //alert((document.body.clientWidth/2)+" "+(document.body.clientHeight/2))
    //alert(event.clientX+" "+event.clientY);
    //console.log(shadowX+" "+shadowY);
    box.style.transform = "rotateX(" + shadowY + "deg)" + "rotateY(" + shadowX + "deg)";
}

box.onmouseleave = function () {
    box.style.transform = "";
}