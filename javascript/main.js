$(function () {

    $(".card-info").hide();
    $(".card-content").hide();
    // 卡片反转动画
    var i = 0;
    $(".card").each(function () {
        $(this).css({
            "opacity": "1",
            "animation": "show-card " + (0.3 + i * 0.2) + "s",
        });
        i++;
    });

    // 获取 Github 上的数据
/*
    $.getJSON("https://api.github.com/repos/Lifeni/lifeni-notes/contents", function (notebook) {
        var notebookNum = notebook.length;
        var noteNum = 0;
        for (var i = 0; i < notebookNum; i++) {
            $.getJSON(notebook[i].url, function (note) {
                noteNum += note.length;
                $("#info-notes").text(notebookNum + " 个笔记本和 " + noteNum + " 个笔记");
            })
        }
    })*/

    if($(".card-content").text() == ""){
        $(".card-content").css("background-image","url('/image/null.png')")
    }
})

var opened = 0;
// 展开和折叠卡片
$(".card-image").click(function () {
    // 打开当前
    $(this).parents(".card").removeClass("card-less").addClass("card-more");
    $(this).parents(".card").find(".card-image").hide();
    $(this).parents(".card").find(".card-info,.card-content").show();
    $(this).parents(".card").find(".card-button").removeClass("card-button-less").addClass("card-button-more");
    $(".main-mask").css("z-index", "3");
    opened = 1;
});
$(".card-bar").click(function () {
    if (opened) {
        // 关闭当前
        $(this).parents(".card").removeClass("card-more").addClass("card-less");
        $(this).parents(".card").find(".card-image").show();
        $(this).parents(".card").find(".card-info,.card-content").hide();
        $(this).parents(".card").find(".card-button").removeClass("card-button-more").addClass("card-button-less");
        $(".main-mask").css("z-index", "0");
        opened = 0;
    } else {
        // 打开当前
        $(this).parents(".card").removeClass("card-less").addClass("card-more");
        $(this).parents(".card").find(".card-image").hide();
        $(this).parents(".card").find(".card-info,.card-content").show();
        $(this).parents(".card").find(".card-button").removeClass("card-button-less").addClass("card-button-more");
        $(".main-mask").css("z-index", "3");
        opened = 1;
    }
});
$(".main-mask").click(function () {
    $(".card").removeClass("card-more").addClass("card-less");
    $(".card").find(".card-image").show();
    $(".card").find(".card-info,.card-content").hide();
    $(".card").find(".card-button").removeClass("card-button-more").addClass("card-button-less");
    $(".main-mask").css("z-index", "0");
    opened = 0;
})

// 横向滚动
document.addEventListener("mousewheel", scrollPage);
document.addEventListener("DOMMouseScroll", scrollPage);

function scrollPage() {
    if ($("windows").width < 480) {
        return;
    }
    if (event.wheelDelta) {
        if (event.wheelDelta > 0) {
            document.documentElement.scrollLeft -= 540;
        } else {
            document.documentElement.scrollLeft += 540;
        }
    }
    if (event.detail) {
        if (event.detail > 0) {
            document.documentElement.scrollLeft += 360;
        } else {
            document.documentElement.scrollLeft -= 360;
        }
    }
}