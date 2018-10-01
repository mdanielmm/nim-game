var row = null;
var col = null;
var player = null;
var lvl = null;
var jogadas = [];
var turn = null;
var scoreA=0;
var scoreB=0;
var bolas;
var bolasG;
var turnG;
var lvlG;
var confirm = false;
var four   = document.getElementById("four");
var five   = document.getElementById("five");
var six    = document.getElementById("six");
var easy   = document.getElementById("easy");
var medium = document.getElementById("medium");
var hard   = document.getElementById("hard");
var comp   = document.getElementById("computer");
var hum    = document.getElementById("human");
var run    = document.getElementById("imgrungame");
var dot    = document.getElementById("dot");
var me     = document.getElementById("firsthuman");
var op     = document.getElementById("firstcomputer");
 
four.addEventListener("click", function() {
    var tam = four.getAttribute("value");
    if(tam === '4x4'){
        row = 4;
        col = 4;
        bolas = 4*4;
        bolasG = bolas;
    }
    four.style.backgroundColor = "#0EE9C1";
    five.style.backgroundColor = "#0F675B";
    six.style.backgroundColor  = "#0F675B";
}, false);
 
five.addEventListener("click", function() {
    var tam = five.getAttribute("value");
    if(tam === '5x5'){
        row = 5;
        col = 5;
        bolas = 5*5;
        bolasG = bolas;
    }
    four.style.backgroundColor = "#0F675B";
    five.style.backgroundColor = "#0EE9C1";
    six.style.backgroundColor  = "#0F675B";
}, false);
 
six.addEventListener("click", function() {
    var tam = six.getAttribute("value");
    if(tam === '6x6'){
        row = 6;
        col = 6;
        bolas = 6*6;
        bolasG = bolas;
    }
    four.style.backgroundColor = "#0F675B";
    five.style.backgroundColor = "#0F675B";
    six.style.backgroundColor  = "#0EE9C1";
}, false);
 
easy.addEventListener("click", function() {
    lvl = easy.getAttribute("value");
    lvlG = lvl;
    easy.style.backgroundColor   = "#b4dfb6";
    medium.style.backgroundColor = "#ff7e30";
    hard.style.backgroundColor   = "#F24D29";
}, false);
 
medium.addEventListener("click", function() {
    lvl = medium.getAttribute("value");
    lvlG = lvl;
    easy.style.backgroundColor   = "#69BF6D";
    medium.style.backgroundColor = "#b4dfb6";
    hard.style.backgroundColor   = "#F24D29";
}, false);
 
hard.addEventListener("click", function() {
    lvl = hard.getAttribute("value");
    lvlG = lvl;
    easy.style.backgroundColor   = "#69BF6D";
    medium.style.backgroundColor = "#ff7e30";
    hard.style.backgroundColor   = "#b4dfb6";
}, false);
 
hum.addEventListener("click", function( ) {
    player = hum.getAttribute("value");
    hum.style.backgroundColor = "#0EE9C1";
    comp.style.backgroundColor  = "#0F675B";
}, false);
 
comp.addEventListener("click", function() {
    player = comp.getAttribute("value");
    comp.style.backgroundColor  = "#0EE9C1";
    hum.style.backgroundColor = "#0F675B";
}, false);
 
me.addEventListener("click", function() {
    var choice = me.getAttribute("value");
    if(choice === 'Me') {
        turn = true;
        turnG = turn;
    }
    me.style.backgroundColor = "#0EE9C1";
    op.style.backgroundColor = "#0F675B";
}, false);
 
op.addEventListener("click", function() {
    var choice = op.getAttribute("value");
    if(choice === 'Opponent'){
        turn = false;
        turnG = turn;
    }
    op.style.backgroundColor = "#0EE9C1";
    me.style.backgroundColor = "#0F675B";
}, false);
 
function game() {
    run.addEventListener("click", start, false);
 
    function start(){
        if(player != null && row != null && col != null && turn != null && lvl != null) {
            drawBoard(row,col);
        }      
    }
 
    function drawBoard(row, col) {
        if(!(document.getElementById("Board") === null)) {
            document.getElementById("Board").remove();
        }
        var div = document.createElement('div');
        var table = document.createElement('table');
        div.className = "board";
        div.id = "Board";
        div.appendChild(table);
        table.className = "table";
        table.id = "game";
        for(var i=1; i<=row; i++) {
            var tr = document.createElement('tr');
            for(var j=1; j<=col; j++) {
                var td = document.createElement('td');
                td.id = "dot"+i+j;
                jogadas.push("dot"+i+j);
                td.className="dot";
                tr.appendChild(td);
                td.addEventListener("click", aux, false);
            }
            table.appendChild(tr);
        }
        document.body.appendChild(div);
        var div2 = document.createElement('div');
        var btn = document.createElement('INPUT');
        btn.setAttribute("type", "button");
        btn.value = "forfeit";
        btn.id = "quit";
        div.appendChild(btn);
        document.body.appendChild(div2);
        run.removeEventListener("click", start, false);
        document.getElementById("quit").addEventListener("click", giveUp, false);
        decideFirst();
    }
 
    function decideFirst() {
        if(turn == false) {
            compPlay();
        }
        else{
            Play();
        }
    }
 
    function aux() {
        remove(this.id);
    }
 
    function remove(id) {
        var removed = document.getElementById(id);
        removed.style.visibility = "hidden";
        removed.removeEventListener("click", aux, false);
        var index = jogadas.indexOf(id);
        jogadas.splice(index, 1);
        var n = id.replace('dot','');
        bolas--;
        while((n-10)>=11) {
            var newid = 'dot'+(n-10);
            if(!(document.getElementById(newid).style.visibility == 'hidden')) {
                document.getElementById(newid).style.visibility = "hidden";
                document.getElementById(newid).removeEventListener("click", aux, false);
                var index = jogadas.indexOf(newid);
                jogadas.splice(index, 1);
                bolas--;
            }
            n=n-10;
        }
        gameOver(turn)
        if(confirm === false){
            turn = !turn;
            Play();
        }
        confirm = false;
    }
 
    function gameOver(turn) {
        if(bolas === 0){
            confirm = true;
            if(turn === true){
                alert('Ganhou o jogador1');
                scoreA+=10;
                document.getElementById("player1score").innerHTML = scoreA;
            }
            else {
                alert('Ganhou o jogador2');
                scoreB+=10;
                document.getElementById("computerscore").innerHTML = scoreB;
            }
            run.addEventListener("click", start, false);
            resetBoard();
        }
    }
 
    function Play() {
        if(bolas !== 0) {
            if(turn === false){
                compPlay();
            }
        }
    }
 
    function compPlay() {
        if(lvl === "Easy"){
            var random = Math.floor(Math.random()*jogadas.length);
            remove(jogadas[random]);
        }
    }
 
    function resetBoard() {
        if(!(document.getElementById("Board") === null)){
            document.getElementById("Board").remove();
        }
        lvl = lvlG;
        jogadas = [];
        turn = turnG;    
        bolas = bolasG;
        run.removeEventListener("click", start, false);
        game();
    }
 
    function giveUp() {
        alert("O jogador1 desistiu, ganha o jogador2");
        scoreB+=10;
        document.getElementById("computerscore").innerHTML = scoreB;
        resetBoard();
    }
}
 
function showSettings() {
    document.getElementById('settings').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}
 
function shownimtxt() {
    document.getElementById('nim_txt').style.display = 'block';
    document.getElementById('howtoplay_txt').style.display = 'none';
    document.getElementById('ranking_info').style.display = 'none';
   
}
 
function showhowtoplaytxt() {
    document.getElementById('nim_txt').style.display = 'none';
    document.getElementById('howtoplay_txt').style.display = 'block';
    document.getElementById('ranking_info').style.display = 'none';
}
 
function showranking() {
    document.getElementById('nim_txt').style.display = 'none';
    document.getElementById('howtoplay_txt').style.display = 'none';
    document.getElementById('ranking_info').style.display = 'block';
}
 
function closeimage() {
     document.getElementById('nim_txt').style.display = 'none';
     document.getElementById('howtoplay_txt').style.display = 'none';
     document.getElementById('ranking_info').style.display = 'none';
}
 
game();