function init() {
    $('.menuDiv').hide();
    $("#mobileAlert").hide();
    $('#menu-list li').click(function() {
        $('.menuDiv').hide();
        var divId = $(this).data('id');
        $('#' + divId).show();
    });
    $("#testLink").click(function() {
        var width = screen.width;
        if (width < 700) {
            alert("Please use a desktop browser for the test.");
        } else {
            window.location.href = "http://www.theconventicle.club/test.html";
        }
    });
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
    span.onclick = function() {
        modal.style.display = "none";
    }
}