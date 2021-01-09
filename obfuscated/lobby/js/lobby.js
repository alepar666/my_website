const PLAYLIST_URL = "http://www.theconventicle.club/lobby/audio/playlist/";

function startLobby() {
    initLobby();
    loadPlaylist();
};

function initLobby() {
    $('.menuDiv').hide();
    $("#tags").hide();
    $('#menu-list li').click(function () {
        $('.menuDiv').hide();
        var divId = $(this).data('id');
        $('#' + divId).show();
    });
}

function loadPlaylist() {
    $.ajax({
        url: PLAYLIST_URL,
        success: function (data) {
            var fileNames = new Array();
            $(data).find("a:contains(.mp3)").each(function () {
                // will loop through 
                var fileName = $(this).attr("href");
                fileNames.push(fileName);
            });
            // shuffle order
            fileNames = shuffle(fileNames);

            var i = 0;
            // Get the audio element
            var music_player = document.querySelector("#radioPlayer");
            // function for moving to next audio file
            function next() {
                // Check for last audio file in the playlist
                if (i === fileNames.length - 1) {
                    i = 0;
                } else {
                    i++;
                }
                // Change the audio element source
                var fileName = fileNames[i];
                music_player.src = fileName;
                loadMetaData(fileName);
            }

            // Start the player
            var fileName = fileNames[i];

            music_player.src = fileName;
            loadMetaData(fileName);

            // Listen for the music ended event, to play the next audio file
            music_player.addEventListener('ended', next, false);
            music_player.onplaying = function () {
                $("#tags").show();
            }
            music_player.onpause = function () {
                $("#tags").hide();
            }

        }
    });
}

function loadMetaData(fileName) {
    ID3.loadTags(fileName, function () {
        var tags = ID3.getAllTags(fileName);
        var tagsTetx = tags.artist + " - " + tags.title;
        $("#tags").html("now playing: " + tagsTetx);
    });
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function initChat() {
    $(".header-chat-logo").html("");
    console.log("MONA : " + $(".header-chat-logo").html());
}
