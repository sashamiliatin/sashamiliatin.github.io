var S = {
   score:0,ans:"ans"
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
              S.score=S.score+20;
         }
        text = "great job!";
    }
    else {
        document.getElementById("ans").focus();
        text = "please try again";
    }
    document.getElementById("check").innerHTML = text;
    document.getElementById("qty").value = S.score;
S.ans=x;
}
