var ImgArray = Array();
var Difficulty;
var CardBack;
var NewGameCounter = false;

new_game.addEventListener("click", NewGame);
function NewGame(button) {
    if (Difficulty == undefined) {
        alert('Choose difficulty');
        return 0;
    }
    else if (CardBack == undefined) {
        alert("Choose card's back");
        return 0;
    }

    if (NewGameCounter == false) {
    var rules = document.getElementById("rules");
    var content = document.getElementById("content");
    var body = document.getElementById("body");
    content.removeChild(rules);
    }
    DeleteTable();
    NewGameCounter = true;
   

    
    var table = document.createElement("table");
    table.id = "table";
    document.body.appendChild(table);
    var ImgNumber = 0;
    var IdCounter = 0;
    var Iarray = Array (5, 6, 8);
    var Jarray = Array (2, 3, 3);
    var ImgNumberArray = Array (4, 8, 11);
    for (var j = 0; j < Jarray[Difficulty]; j++) {
        var tr = document.createElement("tr");
        table.appendChild(tr);
        for(i = 0; i < Iarray[Difficulty]; i++) {
            var td = document.createElement("td");
            tr.className = "line";
            tr.appendChild(td);
            if (ImgNumber == 0)     {
                RandomImgNumber();
            }
            var ul = document.createElement("ul");
            ul.className = "flipper " + ImgArray[ImgNumber];
            ul.id = IdCounter;
            var li_front = document.createElement("li");
            var li_back = document.createElement("li");
            li_back.className = "front";
            li_back.innerHTML = "<img src = 'src/images/CardBack" + CardBack + ".png'>";
            td.appendChild(ul);
            ul.appendChild(li_back);
            li_front.className = "back";
            li_front.innerHTML = "<img src = 'src/images/" + ImgArray[ImgNumber] + ".png'>";
            ul.appendChild(li_front);
            if (ImgNumber == ImgNumberArray[Difficulty]) ImgNumber = -1;
            ImgNumber++;
            IdCounter++;
        }  
    }
    if (NewGameCounter) {
        var card = document.getElementsByClassName('flipper');
        for(var i = 0; i < card.length; i++) {
            card[i].addEventListener("click", Rotate);
        }
    }
};
        
function DeleteTable() {
    if (NewGameCounter) {
        table.remove();
    }
}

function RandomImgNumber() {
    var WasAlready = false;
    Iarray = Array(5, 9, 12);
    for (var i = 0; i < Iarray[Difficulty]; i++) {
        ImgArray[i] = Math.floor(Math.random() * (Iarray[Difficulty] - 0));
     WasAlready = false;
        for (var j = 0; j < i; j++) {
            if (ImgArray[i] == ImgArray[j]) {
                WasAlready = true;
                break;
            }
        }

        if (WasAlready == true) {
            i--;
        }
    }
    return ImgArray;
}

difficulty.addEventListener("click", OpenGameDifficulty);
function OpenGameDifficulty(button) {
    var x = document.getElementById("game_difficulty");
    var y = document.getElementById("difficulty");
    x.classList.toggle('open');
};
difficulty_easy.addEventListener("click", EasyDifficulty);
function EasyDifficulty() {
    Difficulty = 0;
}
difficulty_medium.addEventListener("click", MediumDifficulty);
function MediumDifficulty() {
    Difficulty = 1;
}
difficulty_hard.addEventListener("click", HardDifficulty);
function HardDifficulty() {
    Difficulty = 2;
}

back.addEventListener("click", OpenCardsBack);
function OpenCardsBack(button) {
    var cards_back = document.getElementById("cards_back");
    var back = document.getElementById("back");
    cards_back.classList.toggle('open');
};
card_back0.addEventListener("click", CardBack0);
function CardBack0() {
    CardBack = 0;
}
card_back1.addEventListener("click", CardBack1);
function CardBack1() {
    CardBack = 1;
}
card_back2.addEventListener("click", CardBack2);
function CardBack2() {
    CardBack = 2;
}

var id1, id2, className1, className2;
var open = 0;

function Rotate() {
    if (open == 0) {
        className1 = this.className;
        same_cards = document.getElementsByClassName(className1);
        id1 = this.id;
    }
    if (open == 1) {
        className2 = this.className;
        id2 = this.id;
    }

    if (open > 1) {
        setTimeout(function() {
            Close();
        }, 2000);
        return 0;
    }
    if (id1 != id2) {
        open++;

        this.style.cssText=
        "transform: rotateY(180deg); \ ";	

        if (open == 2) {
            if (className1 == className2) {
                if (className1 == 'flipper 4' && className2 == 'flipper 4') {console.log('- Антоха, ну пиздец')};
                for(var i = 0; i < 2; i++) {
                    setTimeout(function() {
                        same_cards[0].remove();
                    }, 1000);
                }
                return 0;
            }
        }
        setTimeout(function() {
            Close();
        }, 2000);
    }
}

function Close() {
    if (open > 1) {
        var card = document.getElementsByClassName('flipper');
        for (var i = 0; i < card.length; i++) {
            card[i].style.cssText=
                "transform: rotateY(0deg); \ ";
        }
        open = 0;
    };
}