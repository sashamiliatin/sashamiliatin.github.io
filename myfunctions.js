var startTimer;
var stopTimer;
var resetTimer;
var score = 0;
var errores = 0;
var attempts = 0;
var wordList = [];




var S = {
    ans: "ans"
};

function myFunction() {
    var x, text;
    x = document.getElementById("ans").value;
    if (x == null || x == "") {
        text = "please enter an answer";
        document.getElementById("ans").focus();
    } else if (x == "hamburger" || x == "pizza" || x == "sushi" || x == "salad" || x == "strawberry" || x == "eggs" || x == "cut") {
        if (S.ans != x) {
            var m = document.createElement("AUDIO");
            m.setAttribute("src", "audio/claps.mp3");
            document.body.appendChild(m);
            m.play();
            score += 40;
        }
        text = "great job!";
    } else {
        document.getElementById("ans").focus();
        text = "please try again";
    }
    document.getElementById("check").innerHTML = text;
    document.getElementById("qty").value = score;
    S.ans = x;
}

function addCounter() {
    document.getElementById('score').innerText = score;
}

function placeholder(element) {
    var li = document.createElement("li");
    li.setAttribute("class", "list_item");
    li.setAttribute("id", "placeholder");
    li.innerHTML = "Drop Here!";
    element.add(li);
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var targetId = ev.target.id;

    if (targetId.replace("_img", "") === data.replace("_word", "")) {
        var imageParent = document.getElementById(ev.target.id).parentElement;
        var word = document.getElementById(data);
        var badge = word.children[0];
        score += parseInt(badge.innerText);
        addCounter();
        word.draggable = false;
        attempts += 1;

        var wordClone = word.cloneNode(false);
        var cl = wordClone.getAttribute("class").replace("word_", "done_");
        wordClone.setAttribute("class", cl);
        wordClone.innerText = data.replace("_word", "");
        word.style.textDecoration = "line-through";
        badge.style.backgroundColor = "#00cc00"
        wordList.pop();
        imageParent.appendChild(wordClone);

        if (wordList.length === 0) {
            nextRound();
        }
    } else {
        $("#myModal").modal();
        attempts += 1;
        errores += 1;
    }
}

function nextRound() {
    var stage = document.getElementById("stage");
    console.log(stage.innerText.toLowerCase());
    switch (stage.innerText.toLowerCase()) {
        case "first stage: easy":
            stage.innerText = "First stage: Medium";
            randomImageMedium();
            resetTimer();
            break;
        case "first stage: medium":
            stage.innerText = "First stage: Hard";
            randomImageHard();
            resetTimer();
            break;
        case "first stage: hard":
            window.open('step_two.html', '_self', false);
            break;
    }
}

function nextRoundPractice() {
    var stage = document.getElementById("stage");
    console.log(stage.innerText.toLowerCase());
    switch (stage.innerText.toLowerCase()) {
        case "first stage: easy":
            stage.innerText = "First stage: Medium";
            randomImageMedium();
            resetTimer();
            break;
        case "first stage: medium":
            stage.innerText = "First stage: Hard";
            randomImageHard();
            resetTimer();
            break;
        case "first stage: hard":

            break;
    }
}

function randomImageEasy() {
    wordList = [];
    $.getJSON("images/images.json", function(json) {
        var arr = [];
        for (var i = 0; i < 6; i++) {
            var x = Math.floor((Math.random() * json.easy.length));
            arr.push(json.easy.splice(x, 1).toString());
        }

        var indexes = [0, 1, 2, 3, 4, 5];

        arr.forEach(function(t, index) {
            var name = t.replace(".jpg", "");
            var img = document.createElement("img");
            img.setAttribute("src", "images/easy/" + t);
            img.setAttribute("class", "food");
            var images = document.getElementsByClassName("img_" + index)[0];
            var x = Math.floor((Math.random() * indexes.length));
            var ind = indexes.splice(x, 1).toString();

            wordList.push(name);
            img.setAttribute("id", name + "_img");

            images.innerHTML = "";
            images.appendChild(img);
        });

        renderWordList(shuffleArray(wordList), 10);
    });
}

function renderWordList(wordList, score) {

    var listDiv = document.getElementById("word_list");
    listDiv.innerHTML = "";

    wordList.forEach(function(value, index) {
        var element = document.createElement("a");
        element.setAttribute("class", "list-group-item list-item word_" + index);
        element.setAttribute("id", value + "_word");
        element.draggable = true;
        element.ondragstart = drag;
        element.innerHTML = value + '<span class="badge">' + score + '</span>';
        listDiv.appendChild(element);
    });
    // var a = <a class="list-group-item list-item word_0" draggable="true" ondragstart="drag(event)"><span class="badge">30</span></a>;
}


function renderWideoList() {


}

function randomImageMedium() {
    wordList = [];
    $.getJSON("images/images.json", function(json) {
        var arr = [];
        for (var i = 0; i < 6; i++) {
            var x = Math.floor((Math.random() * json.medium.length));
            arr.push(json.medium.splice(x, 1).toString());
        }

        var indexes = [0, 1, 2, 3, 4, 5];

        arr.forEach(function(t, index) {
            var name = t.replace(".jpg", "");
            var img = document.createElement("img");
            img.setAttribute("src", "images/medium/" + t);
            img.setAttribute("class", "food");
            var images = document.getElementsByClassName("img_" + index)[0];
            var x = Math.floor((Math.random() * indexes.length));
            var ind = indexes.splice(x, 1).toString();
            wordList.push(name);
            img.setAttribute("id", name + "_img");

            images.innerHTML = "";
            images.appendChild(img);
        });

        renderWordList(shuffleArray(wordList), 20);
    });
}

function randomImageHard() {
    wordList = [];
    $.getJSON("images/images.json", function(json) {
        var arr = [];
        for (var i = 0; i < 6; i++) {
            var x = Math.floor((Math.random() * json.hard.length));
            arr.push(json.hard.splice(x, 1).toString());
        }

        var indexes = [0, 1, 2, 3, 4, 5];

        arr.forEach(function(t, index) {
            var name = t.replace(".jpg", "");
            var img = document.createElement("img");
            img.setAttribute("src", "images/hard/" + t);
            img.setAttribute("class", "food");
            var images = document.getElementsByClassName("img_" + index)[0];
            var x = Math.floor((Math.random() * indexes.length));
            var ind = indexes.splice(x, 1).toString();
            wordList.push(name);
            var word = document.getElementsByClassName("word_" + ind)[0];
            img.setAttribute("id", name + "_img");
            word.setAttribute("id", name + "_word");
            word.draggable = true;
            word.innerHTML = name + "<span class=\"badge\">30</span>";
            images.innerHTML = "";
            images.appendChild(img);
        });

        renderWordList(shuffleArray(wordList), 30);
    });
}

function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d;
}

window.onload = function() {
    setTimer(0, 45);
    resetTimer();
    renderTestBody("words");
    randomImageEasy();
};

function setTimer(mins, secs) {
    var h1 = document.getElementById('timer'),
        seconds = secs,
        minutes = mins,
        t;

    function timer() {
        console.log("start");
        t = setTimeout(substract, 1000)
    }

    function substract() {

        if (seconds <= 0 && minutes >= 1) {
            seconds = 59;
            minutes--;
        } else if (seconds <= 0 && minutes === 0) {
            stopTimer();
            nextRound();
        } else {
            seconds--;
        }
        h1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        timer();

    }

    /* Start button */
    startTimer = timer;

    /* Stop button */
    stopTimer = function() {
        console.log("stop");
        clearTimeout(t);
    };

    /* Clear button */
    resetTimer = function() {
        seconds = secs;
        minutes = mins;
        var minutesHtml = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00");
        var secondsHtml = (seconds > 9 ? seconds : "0" + seconds);
        h1.textContent = minutesHtml + ":" + secondsHtml;
    };
}

function WriteUsers(user) {
    localStorage.setItem("Username", user)
}

function renderTestBody(test) {
    switch (test) {
        case "words":
            changeTitles(test);
            writeVideoHtml("test_word");
            break;
        case "video_1":
            writeVideoHtml("test_video2");
            changeTitles(test);
            break;
        case "video_2":
            writeVideoHtml("test_video");
            changeTitles(test);
            break;
        default:
            break;
    }
}

function changeTitles(test) {
    switch (test) {
        case "words":
            var stage = document.getElementById("stage");
            var panelTitle = document.getElementById("panel_title");
            var actionTitle = document.getElementById("action_title");
            var timer = document.getElementById("timer");
            timer.innerHTML = "";
            stage.innerText = "First stage: Easy";
            panelTitle.innerText = "Drag and Drop";
            actionTitle.innerText = "Drag the words to the pictures.";
            startTimer();
            $('#myModal').on('show.bs.modal', stopTimer);
            $('#myModal').on('hide.bs.modal', startTimer);
            break;
        case "video_1":
            writeVideoHtml("test_video2");
            changeTitles(test);
            break;
        case "video_2":
            writeVideoHtml("test_video");
            changeTitles(test);
            break;
        default:
            break;
    }
}

function writeVideoHtml(file) {
    var body = document.getElementById("body_row");
    body.innerHTML = "";

    $.ajax({
        type: "GET",
        url: file,
        success: function(text) {
            body.innerHTML = test;
        },
        error: function() {
            // An error occurred
        }
    });
}
