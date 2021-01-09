function init() {
    initMenu();
}

function initMenu() {

    $('.menuDiv').hide();
    $("#userData").hide();
    $("#fetching").hide();
    $('#menu-list li').click(function () {
        $('.menuDiv').hide();
        var divId = $(this).data('id');
        $('#' + divId).show();
    });

    $("#getPublicInfoById").show();
    $("#getPublicInfoById").click(function () {
        var input = $("#profileIdinput").val();
        var profileId = ("" + input).trim();
        if (profileId !== '') {
            getPublicInfoById(profileId);
        } else {
            alert("profile id is empty.")
        }
    });

}


function getPublicInfoById(profileId) {
    $("#userData").hide();
    $("#fetching").show();
    $("#getPublicInfoById").hide();
    var queryString = "{\n  getPublicUserInfo(userId: \"" + profileId + "\") {\n username, firstName, picture, customPhoto, userNetworth {\n  networth, totalTiles, spent\n  }\n },\n }";
    var query = {
        "query": queryString
    };

    $.ajax({
        url: 'https://app.earth2.io/graphql',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'it-IT,it;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/json',
            'Referer': 'https://app.earth2.io/',
            'Origin': 'https://app.earth2.io',
            'Connection': 'keep-alive',
            'Origin': 'https://app.earth2.io'
        },
        method: 'POST',
        data: JSON.stringify(query),
        success: function (response) {
            var data = response.data.getPublicUserInfo;
            console.log(data);
            $("#username").html(JSON.stringify(data.username));
            $("#userEmail").html(JSON.stringify(data.firstName));
            $("#totalTiles").html(JSON.stringify(data.userNetworth.totalTiles));
            $("#spent").html(JSON.stringify(data.userNetworth.spent));
            $("#networth").html(JSON.stringify(data.userNetworth.networth));

            $("#fetching").hide();
            $("#userData").show();
            $("#getPublicInfoById").show();
            //$("#rawData").html(JSON.stringify(data));
        },
        error: function (data) {
            console.log('error ' + data);

            $("#fetching").hide();
            $("#userData").show();
            $("#getPublicInfoById").show();
        }
    });
}
