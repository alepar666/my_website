function init() {
    initMenu();
}

function initMenu() {

    $('.menuDiv').hide();
    $("#tags").hide();
    $('#menu-list li').click(function () {
        alert("CLICK");
        $('.menuDiv').hide();
        var divId = $(this).data('id');
        $('#' + divId).show();
    });

}

const MOCKED_RESPONSE = '{"data":{"getPublicUserInfo":{"username":"Mamt","firstName":"mamt@gmail.com","picture":"https://s.gravatar.com/avatar/9b794d5e7f41a3ee2b98537793fbfe62?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fja.png","customPhoto":"https://s3-ap-southeast-2.amazonaws.com/prod-app-media.earth2.io/thumbnails/26d9ce53-9230-45ac-a98f-bf609db97e19_avatar_3b8440e2-7601-428e-b855-f3e1f69d23cc.jpeg","userNetworth":{"networth":1231.92,"totalTiles":380,"spent":376.84}}}}';

function getPublicInfoById() {
    /* prendi parametri:
    - profilo id (ovviamente)
    - cookie (necessario essere loggati? forse no)
    */

    var url = 'https://app.earth2.io/graphql';
    var headers = [];
    var header1 = 'Accept: application/json';
    var header2 = 'Referer: https://app.earth2.io/';
    var header3 = 'Content-Type: application/json';
    // dubbio se serva
    var header4 = 'X-CSRFToken: I9yHeLatPizmnZcbOlhmFRiDLEETM9Q2IynVS4xjp8kN4X0NgVVreYzsWjyoJQt9';
    var header5 = 'Origin: https://app.earth2.io';
    var header6 = 'Connection: keep-alive';
    // dubbio se serva
    var header7 = 'Cookie: sessionid=617lc3gxyvz8l5j53ge62p2iv2noswx9; __stripe_mid=a4ad54d6-9004-4fee-93dd-e35d759ea5ca; csrftoken=I9yHeLatPizmnZcbOlhmFRiDLEETM9Q2IynVS4xjp8kN4X0NgVVreYzsWjyoJQt9';
    var header8 = 'Pragma: no-cache';
    var header9 = 'Cache-Control: no-cache';
    var header10 = 'TE: Trailers';

    var query = '{"query":"{getPublicUserInfo(userId:\"35bcdaa4-2951-4f4a-b5c4-67041fd66c35\"){username, firstName, userNetworth {   networth, totalTiles, spent}\n                },\n            }"}'
    /* esempio richiesta curl 
    curl 'https://app.earth2.io/graphql' -H 'Accept: application/json' --compressed -H 'Referer: https://app.earth2.io/' -H 'Content-Type: application/json' -H 'X-CSRFToken: I9yHeLatPizmnZcbOlhmFRiDLEETM9Q2IynVS4xjp8kN4X0NgVVreYzsWjyoJQt9' -H 'Origin: https://app.earth2.io' -H 'Connection: keep-alive' -H 'Cookie: sessionid=617lc3gxyvz8l5j53ge62p2iv2noswx9; __stripe_mid=a4ad54d6-9004-4fee-93dd-e35d759ea5ca; csrftoken=I9yHeLatPizmnZcbOlhmFRiDLEETM9Q2IynVS4xjp8kN4X0NgVVreYzsWjyoJQt9' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' -H 'TE: Trailers' --data-raw '{"query":"{\n                getPublicUserInfo(userId: \"35bcdaa4-2951-4f4a-b5c4-67041fd66c35\") {\n                    username, firstName, userNetworth {\n                        networth, totalTiles, spent\n                    }\n                },\n            }"}'
    */


}
