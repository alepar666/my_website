function init() {
    $('.menuDiv').hide();
    $("#mobileAlert").hide();
    $('#menu-list li').click(function () {
        $('.menuDiv').hide();
        var divId = $(this).data('id');
        $('#' + divId).show();
    });
    $('#welcome').show();
}

function showPic(img) {
    var modal = document.getElementById("myModal");
    console.log(img);
    var modalImg = document.getElementById("imgToShow");
    var captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
}
