var startTimer;
var stopTimer;
var resetTimer;
var score = 0;
var errores = 0;
var attempts = 0;
var wordList = [];

var videos = {
    "pizza.webm": "z , a , z , p , i",
    "salad.webm": "a , s , a , d , l",
    "strawberry.webm": "s , t , a , r , b , e , w , r , r , y",
    "sushi.webm": "i, s, u, h, s"
};

var S = {
    ans: "ans"
};

function whatIsIt(ev) {
    ev.preventDefault();
    var x, text;
    var videoSrc = document.getElementById("video").getAttribute("src").replace("video/", "").replace(".webm", "");
    var answer = document.getElementById("what_is_it").value;

    if (answer === videoSrc) {
        var m = document.createElement("AUDIO");
        m.setAttribute("src", "audio/claps.mp3");
        document.body.appendChild(m);
        m.play();
        score += 40;
        addCounter();

        if (Object.keys(videos).length === 0) {
            renderTestBody("video_2");
            return false;
        }

        var v = Object.keys(videos)[0];
        var l = Object.values(videos)[0];
        delete videos[v];
        var video = document.getElementById("video");
        var letters = document.getElementById("tip");
        video.setAttribute("src", "video/" + v);
        letters.innerHTML = '<u>the letters:</u>' + " " + l + " ";
        var v_tag = document.getElementById("video_tag");
        v_tag.load();
    } else {
        $("#myModal").modal();
    }

    document.getElementById("what_is_it").value = "";

    return false;
}

function nextVideo(ev) {
    ev.preventDefault();
    var videoSrc = document.getElementById("video").getAttribute("src").replace("video/", "").replace(".webm", "");

    if (videoSrc === "video1") {
        renderTestBody("video_3");
    } else {
        if (Object.keys(videos).length === 0) {
            renderTestBody("video_2");
            return false;
        }

        var v = Object.keys(videos)[0];
        var l = Object.values(videos)[0];
        delete videos[v];
        var video = document.getElementById("video");
        var letters = document.getElementById("tip");
        video.setAttribute("src", "video/" + v);
        letters.innerHTML = '<u>the letters:</u>' + " " + l + " ";
        var v_tag = document.getElementById("video_tag");
        v_tag.load();
        document.getElementById("what_is_it").value = "";
    }


    return false;
}

function whatIsNotInVideo(ev) {
    ev.preventDefault();
    var chk = document.querySelector('input[name="optradio"]:checked').value;
    var videoSrc = document.getElementById("video").getAttribute("src").replace("video/", "").replace(".webm", "");

    if (videoSrc === "video1" && chk === "eggs") {
        var m = document.createElement("AUDIO");
        m.setAttribute("src", "audio/claps.mp3");
        document.body.appendChild(m);
        m.play();
        score += 40;
        addCounter();
        renderTestBody("video_3");

    } else if (videoSrc === "video2" && chk === "cut") {
        var m = document.createElement("AUDIO");
        m.setAttribute("src", "audio/claps.mp3");
        document.body.appendChild(m);
        m.play();
        score += 40;
        addCounter();
        var h = document.getElementById('modal_text');
        h.innerText = "Game Over!\nYour score: " + score;
        $('#myModal').on('hide.bs.modal', function() {
            window.open("Home.html", "_self");
        });
        $("#myModal").modal();
    } else {
        $("#myModal").modal();
    }

    return false;
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
        badge.style.backgroundColor = "#00cc00";
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
            startTimer();
            break;
        case "first stage: medium":
            stage.innerText = "First stage: Hard";
            randomImageHard();
            resetTimer();
            startTimer();
            break;
        case "first stage: hard":
            stopTimer();
            renderTestBody("video_1");
            break;
    }
}

function nextRoundPractice() {
    var stage = document.getElementById("practice_stage");
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
            window.open("step_two.html","_self");
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
};

function setTimer(mins, secs) {
    var h1 = document.getElementById('timer'),
        seconds = secs,
        minutes = mins,
        t;

    function timer() {
        console.log("start");
        t = setTimeout(substract, 1000);
    }

    function substract() {

        if (seconds <= 0 && minutes >= 1) {
            seconds = 59;
            minutes--;
        } else if (seconds <= 0 && minutes === 0) {
            stopTimer();
            nextRound();
            return;
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
        case "video_3":
            changeTitles(test);
            writeVideoHtml("test_video3");
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
            var stage = document.getElementById("stage");
            var panelTitle = document.getElementById("panel_title");
            var actionTitle = document.getElementById("action_title");
            var timer = document.getElementById("timer");
            timer.innerHTML = "";
            timer.innerHTML = '<button onclick="nextVideo(event);" class="btn btn-default">NEXT</button>';
            stage.innerText = "Second stage";
            panelTitle.innerText = "Video";
            actionTitle.innerText = "Watch the video and write the food you saw!";
            break;
        case "video_2":
            stopTimer();
            var stage = document.getElementById("stage");
            var panelTitle = document.getElementById("panel_title");
            var actionTitle = document.getElementById("action_title");
            var timer = document.getElementById("timer");
            timer.innerHTML = '<button onclick="nextVideo(event);" class="btn btn-default">NEXT</button>';
            stage.innerText = "Second stage";
            panelTitle.innerText = "Video";
            actionTitle.innerText = "Watch the video and choose the correct answer!";
            break;
        case "video_3":
            var timer = document.getElementById("timer");
            timer.innerHTML = "";
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
            body.innerHTML = text;
        },
        error: function() {
            // An error occurred
        }
    });
}
