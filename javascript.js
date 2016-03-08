var Main = new function()
{


    this.btnRollDice = function () {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var dice3 = Math.floor(Math.random() * 6) + 1;
        var dice4 = Math.floor(Math.random() * 6) + 1;
        document.getElementById("dice1").innerHTML = dice1;
        document.getElementById("dice2").innerHTML = dice2;
        document.getElementById("dice3").innerHTML = dice3;
        document.getElementById("dice4").innerHTML = dice4;
        var guess = document.getElementById("inpGuess").value;
        var score = document.getElementById("score").value;
        var sum = dice1 + dice2 + dice3;
        //sum = 9;
        if (sum == guess) {
            score = parseInt(score) + (sum * dice4);
        }
        document.getElementById("score").value = score;

    };


    this.expandRules = function () {

    };
}