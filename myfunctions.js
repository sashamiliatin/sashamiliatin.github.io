var startTimer;
var stopTimer;
var resetTimer;
var score = 0;
var errores = 0;
var attempts = 0;
var wordList = [];


var S = {
    ans:"ans"
};
function myFunction() {
    var x, text;
    x = document.getElementById("ans").value;
    if (x == null || x == "") {
        text = "please enter an answer";
        document.getElementById("ans").focus();
    } else if (x == "hamburger" || x=="pizza" || x=="sushi" || x=="salad" || x=="strawberry") {
        if(S.ans!=x)
        {
            score+=40;
        }
        text = "great job!";
    }
    else {
        document.getElementById("ans").focus();
        text = "please try again";
    }
    document.getElementById("check").innerHTML = text;
    document.getElementById("qty").value = score;
    S.ans=x;
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

    if (targetId.replace("_img", "") === data.replace("_word", "")){
        var imageParent = document.getElementById(ev.target.id).parentElement;
        var word = document.getElementById(data);
        var badge = word.children[0];
        score += parseInt(badge.innerText);
        addCounter();
        word.draggable = false;
        attempts +=1;

        var wordClone = word.cloneNode(false);
        var cl = wordClone.getAttribute("class").replace("word_", "done_");
        wordClone.setAttribute("class", cl);
        wordClone.innerText = data.replace("_word", "");
        wordList.pop();
        imageParent.appendChild(wordClone);

        if (wordList.length === 0){
            nextRound();
        }
    }
    else{
        $("#myModal").modal();
        attempts += 1;
        errores +=1;
    }
}

function nextRound() {
    var stage = document.getElementById("stage");
    console.log(stage.innerText.toLowerCase());
    switch (stage.innerText.toLowerCase()){
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
            window.open('step_two.html','_self',false);
            break;
    }
}
function nextRoundPractice() {
    var stage = document.getElementById("stage");
    console.log(stage.innerText.toLowerCase());
    switch (stage.innerText.toLowerCase()){
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
    $.getJSON("images/images.json", function (json) {
        var arr = [];
        for (var i = 0; i < 6; i++)
        {
            var x = Math.floor((Math.random() * json.easy.length));
            arr.push(json.easy.splice(x, 1).toString());
        }

        var indexes = [0, 1, 2, 3 ,4 ,5];

        arr.forEach(function (t, index) {
            var name = t.replace(".jpg", "");
            var img = document.createElement("img");
            img.setAttribute("src", "images/easy/" + t);
            img.setAttribute("class", "food");
            var images = document.getElementsByClassName("img_" + index)[0];
            var x = Math.floor((Math.random() * indexes.length));
            var ind = indexes.splice(x, 1).toString();

            var word = document.getElementsByClassName("word_" + ind)[0];
            wordList.push(name);
            img.setAttribute("id", name + "_img");
            word.setAttribute("id", name + "_word");
            word.draggable = true;
            word.innerHTML = name + "<span class=\"badge\">10</span>";
            images.innerHTML = "";
            images.appendChild(img);
        });
    })
    }
    
function randomImageMedium() {
    wordList = [];
    $.getJSON("images/images.json", function (json) {
        var arr = [];
        for (var i = 0; i < 6; i++)
        {
            var x = Math.floor((Math.random() * json.medium.length));
            arr.push(json.medium.splice(x, 1).toString());
        }

        var indexes = [0, 1, 2, 3, 4, 5];

        arr.forEach(function (t, index) {
            var name = t.replace(".jpg", "");
            var img = document.createElement("img");
            img.setAttribute("src", "images/medium/" + t);
            img.setAttribute("class", "food");
            var images = document.getElementsByClassName("img_" + index)[0];
            var x = Math.floor((Math.random() * indexes.length));
            var ind = indexes.splice(x, 1).toString();
            wordList.push(name);
            var word = document.getElementsByClassName("word_" + ind)[0];
            img.setAttribute("id", name + "_img");
            word.setAttribute("id", name + "_word");
            word.draggable = true;
            word.innerHTML = name + "<span class=\"badge\">20</span>";
            images.innerHTML = "";
            images.appendChild(img);
        });
    })
}

function randomImageHard() {
    wordList = [];
    $.getJSON("images/images.json", function (json) {
        var arr = [];
        for (var i = 0; i < 6; i++)
        {
            var x = Math.floor((Math.random() * json.hard.length));
            arr.push(json.hard.splice(x, 1).toString());
        }

        var indexes = [0, 1, 2, 3, 4, 5];

        arr.forEach(function (t, index) {
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
    })
}

window.onload = function() {
    setTimer(1 , 0);
    resetTimer();
    startTimer();
    $('#myModal').on('show.bs.modal', stopTimer);
    $('#myModal').on('hide.bs.modal', startTimer);
};

function setTimer(mins, secs) {
    var h1 = document.getElementById('timer'),
        seconds = secs,
        minutes = mins,
        t;

    function timer() {
        console.log("start");
        t = setTimeout(substract,1000)
    }

    function substract() {

        if (seconds <= 0 && minutes >= 1) {
            seconds = 59;
            minutes--;
        }
        else if (seconds <= 0 && minutes === 0){
            stopTimer();
            nextRound();
        }
        else {
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
