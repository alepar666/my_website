const SS_NAME = "name";
const SS_INIT_TOKEN = "initToken";
const SS_CUR_TOKEN = "currentToken";
const VIP_NAMES = ["hhhddd", "5dultramess"];
const NOISE = 666;

function startTest() {
    loggg("TEST START");
    $(".levels").hide();
    $("#vip").hide();
    if (isConsistentStatus()) {
        var currentLevel = getCurrentLevel();
        var levelId = "level" + currentLevel;
        var name = getName();
        loggg("current level:" + currentLevel + ", name: " + name);
        $("#cnvname").text("Welcome, " + name + ".");
        loadLevel(currentLevel);
        $("#" + levelId).show(() => {
            if (levelId == "level1" || levelId == "level3") {
                $("#submitLevel").show();
            }
            if (levelId == "level2") {
                $("#pixel").parent().css({
                    position: 'relative'
                });
                var newLeft = "" + Math.floor(Math.random() * 100) + 1;
                var newTop = 200;
                $("#pixel").css({
                    left: newLeft + 'px',
                    top: newTop + 'px',
                    position: 'absolute'
                });
                loggg("new position: top=" + newTop + ", left=" + newLeft);
                $("#pixel").unbind("click");
                $("#pixel").click(function() {
                    return levelSubmit();
                });
            }
            if (levelId == "level4") {
                $("#door").html("");
                var randomMinutesWait = Math.random() * (3 - 1) + 1;
                var requiredTime = new Date().getTime() + (60 * randomMinutesWait * 1000);
                var x = setInterval(function() {
                    var now = new Date().getTime();
                    var distance = requiredTime - now;
                    loggg("remaining: " + (Math.floor(distance / 1000)));
                    if (distance < 0) {
                        $("#door").html("<img style='width:20%' src='pics/artworks/B02.jpg' hspace='200' alt='door'>");
                        $("#door").click(function() {
                            clearInterval(x);
                            levelSubmit();
                        });
                        var doorDisappearance = new Date().getTime() + 500;
                        var y = setInterval(function() {
                            var doorNow = new Date().getTime();
                            var doorWindow = doorDisappearance - doorNow;
                            if (doorWindow < 0) {
                                clearInterval(x);
                                location.reload();
                            }
                        }, 1000);
                        clearInterval(x);
                    }
                }, 1000);
            }
            $("#levelDisplayer").show();
        });
        //console.log("not clean, removing it");
        //sessionStorage.removeItem('cnv');
    } else {
        clean();
        loggg("first visit");
        var input = window.prompt("Enter your name", "");
        var name = ("" + input).trim();
        if (name && name != 'null') {
            sessionStorage.setItem(SS_NAME, name);
            $("#cnvname").text("Welcome, " + name + ".");
            setNewLevelToken(1);
            location.reload();
        } else {
            location.reload();
        }
    }
}

function notifyTheMaster() {

    $.getScript("https://cdn.jsdelivr.net/npm/emailjs-com@2.3.2/dist/email.min.js", function() {
        emailjs.init("user_mHHIvvgn9ZaZ4LDqZ5SnJ");
        var name = getName();
        var startTime = "" +fromWordToNumber(getInitToken());
        var lastToken = "" +fromWordToNumber(getToken());
        var currentLevel = ""+getCurrentLevel();

        var params = {
            name: name,
            startTime: startTime,
            lastToken: lastToken,
            currentLevel: currentLevel
        };
        // Change to your service ID, or keep using the default service
        var service_id = "default_service";
        var template_id = "template_wls0oaVP";
        emailjs.send(service_id, template_id, params)
            .then(function() {
                loggg("Sent!");
            }, function(err) {
                loggg("Send email failed!\r\n Response:\n " + JSON.stringify(err));
            });
    });

}


function levelSubmit() {
    var currentLevel = getCurrentLevel();
    if (isNaN(currentLevel) || !isConsistentStatus() || currentLevel == 5) {
        mock();
        alert("This doesn't work, dear.");
        reset();
    }

    if (currentLevel == 1) {
        var a1 = a2 = a3 = a4 = a5 = a6 = 0;
        if ($("#l1q1").val().trim().toLowerCase() == 'nigredo') {
            a1++;
        }
        if ($("#l1q2").val().trim().toLowerCase() == '1977') {
            a2++;
        }

        if ($("#l1q3").val().trim().toLowerCase() == 'ocruxave') {
            a3++;
        }

        if ($("#l1q4").val().trim().toLowerCase() == '9') {
            a4++;
        }

        if ($("#l1q5").val().trim().toLowerCase() == 'negypt') {
            a5++;
        }

        if ($("#l1q6").val().trim().toLowerCase() == 'solvoid') {
            a6++;
        }
        //console.log(a1 + "," + a2 + "," + a3 + "," + a4 + "," + a5);
        var a = a1 * a2 * a3 * a4 * a5 * a6;
        if (a > 0) {
            alert("You know.");
            setNewLevelToken(2);
        } else {
            wrongAnswer();
        }
    }

    if (currentLevel == 2) { // to be validated better
        alert("You can observe.");
        setNewLevelToken(3);
    }

    if (currentLevel == 3) {
        var a1 = a2 = a3 = a4 = a5 = a6 = 0;
        if ($("#l3q1").val().trim().toLowerCase() == 'oxygene 7') {
            a1++;
        }
        if ($("#l3q2").val().trim().toLowerCase() == 'the mysterious gift to mankind') {
            a2++;
        }
        if ($("#l3q3").val().trim().toLowerCase() == 'pax deorum') {
            a3++;
        }
        if ($("#l3q4").val().trim().toLowerCase() == 'mea culpa') {
            a4++;
        }
        if ($("#l3q5").val().trim().toLowerCase() == 'cathar rhythm') {
            a5++;
        }
        if ($("#l3q6").val().trim().toLowerCase() == 'deliverance') {
            a6++;
        }
        //console.log(a1 + "," + a2 + "," + a3 + "," + a4 + "," + a5);
        var a = a1 * a2 * a3 * a4 * a5 * a6;
        if (a > 0) {
            alert("You can listen.");
            setNewLevelToken(4);

        } else {
            wrongAnswer();
        }
    }

    if (currentLevel == 4) {
        alert("You are present.");
        setNewLevelToken(5);
    }
    $(".answers").val("");
    location.reload();

}

function getToken() {
    return sessionStorage.getItem(SS_CUR_TOKEN);
}

function getInitToken() {
    return sessionStorage.getItem(SS_INIT_TOKEN);
}

function getCurrentLevel() {
    var currentLevel = fetchTokensGet();
    //console.log("getCurrentLevel="+currentLevel);
    if (isNaN(currentLevel)) {
        reset();
    } else {
        return currentLevel;
    }
}

function setNewLevelToken(newLevel) {
    if (newLevel == 1) {
        var now = new Number(new Date().getTime());
        var initToken = fromNumberToWord(now);
        sessionStorage.setItem(SS_INIT_TOKEN, initToken);
        sessionStorage.setItem(SS_CUR_TOKEN, initToken);
    }
    var initTokenNumber = fromWordToNumber(getInitToken());
    var x = newLevel * initTokenNumber;
    var newLevelToken = fromNumberToWord(x);
    sessionStorage.setItem(SS_CUR_TOKEN, newLevelToken);
}

function fetchTokensGet() {
    var currentTokenNumber = fromWordToNumber(getToken());
    var initTokenNumber = fromWordToNumber(getInitToken());
    //console.log("performing "+currentTokenNumber+" / "+initTokenNumber);
    var x = new Number(currentTokenNumber / initTokenNumber);
    return x;
}

function fromNumberToWord(number) {
    var numberString = "" + number;
    var word = "";
    for (var i = 0; i < numberString.length; i++) {
        var digit = numberString.charAt(i);
        switch (digit) {
            case "0":
                word += "k";
                break;
            case "1":
                word += "F";
                break;
            case "2":
                word += "Q";
                break;
            case "3":
                word += "w";
                break;
            case "4":
                word += "Z";
                break;
            case "5":
                word += "1";
                break;
            case "6":
                word += "3";
                break;
            case "7":
                word += "5";
                break;
            case "8":
                word += "7";
                break;
            case "9":
                word += "9";
                break;
            default:
                mock();
                reset();
        }
    }
    return word;
}

function fromWordToNumber(word) {
    if (word == null) {
        return 0;
    }
    var numberString = "";
    for (var i = 0; i < word.length; i++) {
        var digit = word.charAt(i);
        switch (digit) {
            case "k":
                numberString += "0";
                break;
            case "F":
                numberString += "1";
                break;
            case "Q":
                numberString += "2";
                break;
            case "w":
                numberString += "3";
                break;
            case "Z":
                numberString += "4";
                break;
            case "1":
                numberString += "5";
                break;
            case "3":
                numberString += "6";
                break;
            case "5":
                numberString += "7";
                break;
            case "7":
                numberString += "8";
                break;
            case "9":
                numberString += "9";
                break;
            default:
                mock();
                reset();
        }
    }
    return new Number(numberString);
}

function wrongAnswer() {
    mock();
    alert("Incorrect.");
}

function clean() {
    sessionStorage.removeItem(SS_CUR_TOKEN);
    sessionStorage.removeItem(SS_INIT_TOKEN);
    sessionStorage.removeItem(SS_NAME);
}

function reset() {
    clean();
    location.reload();
}

function getName() {
    return sessionStorage.getItem(SS_NAME);
}

function cheatConditions() {
    if (isVip()) {
        console.log("VIP priviledges activated.");
        $("#cheat").show();
        $("#reset").show();
        $("#vip").show();
    }
}

function isVip() {
    var name1 = getName();
    var name = (name1+"").toLowerCase();
    var isVip = VIP_NAMES.includes(name);
    return isVip;
}

function mock() {
    var mockSound = new Audio("data:audio/mpeg;base64,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");
    mockSound.play();
}

function isConsistentStatus() {
    var sessionToken = fromWordToNumber(getToken());
    if (sessionToken == 0 || isNaN(sessionToken)) {
        return false;
    }
    var sessionTokenInit = fromWordToNumber(getInitToken());
    if (sessionTokenInit == 0 || isNaN(sessionTokenInit)) {
        return false;
    }
    var initPresent = sessionToken * sessionTokenInit > 0;
    var name = getName();
    var nameNotPresent = name == null || name === "null" || name == '';
    var initIsConsistent = sessionToken % sessionTokenInit == 0;
    var isConsistent = initIsConsistent && !nameNotPresent;
    if (!isConsistent) {
        mock();
    }
    return isConsistent;
}

function loadLevel(levelNumber) {
    loggg("loading level " + levelNumber);
    if (isNaN(levelNumber)) {
        reset();
    }
    if(levelNumber > 1){
    	notifyTheMaster();
    }
    var value = "";
    if (levelNumber == 1) {
        value = `
		<div id="level1">
                    <h1>Level 1: Knowledge about <a href="http://www.paolodanese.it/discotecaclandestina/discotecaclandestina_v1_2.pdf" target="_blank">Discoteca Clandestina</a></h1>
                    <table>
                        <tr>
                            <td>The alchemical phase of Esoteric Disco</td>
                            <td>
                                <input type="text" id="l1q1" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td>The year Ascension Disco first appeared in linear time</td>
                            <td>
                                <input type="text" id="l1q2" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td>The DJ with the Cross</td>
                            <td>
                                <input type="text" id="l1q3" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td>The number of the Megatron Man</td>
                            <td>
                                <input type="text" id="l1q4" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td>The style before the New Age</td>
                            <td>
                                <input type="text" id="l1q5" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td>The Spatiality of Time</td>
                            <td>
                                <input type="text" id="l1q6" class="answers" />
                            </td>
                        </tr>
                    </table>
                    <p></p>
                </div>	
			`;
    } else if (levelNumber == 2) {
        value = `
		<div id="pixel"></div>	
		<div id="level2">
		<h1>Level 2: Observation</h1>
        <p>It's not all black and white...</p>
        </div>
			`;
    } else if (levelNumber == 3) {
        value = `
		<div id="level3">
		<h1>Level 3: Aural Skills</h1>
                    <p>Input the title fore each song you recognize.</p>
                    <table class="audioTable">
                        <tr>
                            <td class="audioTd">
                                <audio id="mwe_player_0" controls="" preload="none" data-disablecontrols="options,timedText">
                                    <source src="audio/1.mp3" type="audio/mpeg" />
                                </audio>
                            </td>
                            <td>
                                <input type="text" id="l3q1" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td class="audioTd">
                                <audio id="mwe_player_0" controls="" preload="none" class="kskin" data-disablecontrols="options,timedText">
                                    <source src="audio/2.mp3" type="audio/mpeg" />
                                </audio>
                            </td>
                            <td>
                                <input type="text" id="l3q2" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td class="audioTd">
                                <audio id="mwe_player_0" controls="" preload="none" class="kskin" data-disablecontrols="options,timedText">
                                    <source src="audio/3.mp3" type="audio/mpeg" />
                                </audio>
                            </td>
                            <td>
                                <input type="text" id="l3q3" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td class="audioTd">
                                <audio id="mwe_player_0" controls="" preload="none" class="kskin" data-disablecontrols="options,timedText">
                                    <source src="audio/4.mp3" type="audio/mpeg" />
                                </audio>
                            </td>
                            <td>
                                <input type="text" id="l3q4" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td class="audioTd">
                                <audio id="mwe_player_0" controls="" preload="none" class="kskin" data-disablecontrols="options,timedText">
                                    <source src="audio/5.mp3" type="audio/mpeg" />
                                </audio>
                            </td>
                            <td>
                                <input type="text" id="l3q5" class="answers" />
                            </td>
                        </tr>
                        <tr>
                            <td class="audioTd">
                                <audio id="mwe_player_0" controls="" preload="none"  class="kskin" data-disablecontrols="options,timedText">
                                    <source src="audio/6.mp3" type="audio/mpeg" />
                                </audio>
                            </td>
                            <td>
                                <input type="text" id="l3q6" class="answers" />
                            </td>
                        </tr>
                    </table>
                    </div>		
			`;
    } else if (levelNumber == 4) {
        value = `
		<div id="level4" class="levels">
		<h1>Level 4: Presence</h1>
		<p>Empty your mind and the passage to the next level will open.</p>	
		<div id="door"></div>
		</div>	
			`;
    } else if (levelNumber == 5) {
        value = `
			<div id="level5" class="levels">
			<h1>Level 5: FINAL</h1>
			<p>Congratulations, you reached the final level.</p>
			<p>We are fully aware about which path you took to arrive here.</p>
			<p>The last step of the selection requires you to submit something personal to our headquartier:</p>
			<p>
				<ul>
					<li>a written explaination about your motivations in joining us</li>
					<li>an original music composition (no limits, no requirements, express yourself)</li>
					<li>the name you want to be represented with, in case your submission will be accepted</li>
					<li>this token: <span id="currentTokenSpan"></span></li>
				</ul>
			</p>
			<p>send all to hesperius.draco[at]theconventicle[dot]club and wait for the response.</p>
	
			</div>	
			`;
    }
    $("#levelDisplayer").html(value);
    $("#currentTokenSpan").text(getToken());
}

function loggg(text){
	if(isVip()){
		console.log(text);
	}
}