var result = document.getElementById("result");
var next1 = document.getElementById("next");
var next100 = document.getElementById("next100");
var next10000 = document.getElementById("next10000");

var hydra = "8";
var turn = 1;

var tsuika = [];

function next(h,n){
  var kubi = h.indexOf(")");

  if(kubi == 1){
    return h.substr(2);
  }else{
    var oya = h.substring(kubi+1,find_oya_kubi(h,kubi)+1);
    oya = "(" + oya;
    var a = "";
    if(kubi != 2){
      a = h.substring(0,kubi-2);
    }

    var b = "";
    if(find_oya_kubi(h,kubi) != h.length-1){
      var b = h.substring(find_oya_kubi(h,kubi)+1);
    }
    for (let index = 0; index < n; index++) {
      a = a+oya;
    }
    a = a+b;
    return a;
  }
}

function find_oya_kubi(h,kubi){
  var fukasa = 0;
  var koko = kubi;

  while(fukasa >= 0){
    koko++;
    if(h[koko] == "("){
      fukasa++;
    }else{
      fukasa--;
    }
  }
  return koko;
}

next1.onclick = function(){
  if (hydra == "8") {
    turn = document.getElementById("kaisi").value;
    document.getElementById("kaisi").disabled = true;
    hydra = document.getElementById("hydra").value;
    document.getElementById("hydra").disabled = true;
  }

  tsuika = [];
  var i = 0;
  while (hydra.length > 1 && i < 1) {
    
    hydra = next(hydra,turn);

    tsuika.push('<p>' + turn + hydra + '</p>');
    turn++;
    i++;
  }
  
  result.insertAdjacentHTML('beforeend', tsuika.join(''));
}


next100.onclick = function(){
  if (hydra == "8") {
    turn = document.getElementById("kaisi").value;
    document.getElementById("kaisi").disabled = true;
    hydra = document.getElementById("hydra").value;
    document.getElementById("hydra").disabled = true;
  }

  tsuika = [];
  var i = 0;
  while (hydra.length > 1 && i < 100) {
    
    hydra = next(hydra,turn);

    tsuika.push('<p>' + turn + hydra + '</p>');
    turn++;
    i++;
  }
  
  result.insertAdjacentHTML('beforeend', tsuika.join(''));
}

next10000.onclick = function () {
    if (hydra == "8") {
      turn = document.getElementById("kaisi").value;
      document.getElementById("kaisi").disabled = true;
      hydra = document.getElementById("hydra").value;
      document.getElementById("hydra").disabled = true;
  }

  tsuika = [];
  var i = 0;
  while (hydra.length > 1 && i < 10000) {
    
    hydra = next(hydra,turn);

    tsuika.push('<p>' + turn + hydra + '</p>');
    turn++;
    i++;
  }
  
  result.insertAdjacentHTML('beforeend', tsuika.join(''));
}

clear.onclick = function () {
  result.innerHTML = '';
  tsuika = [];
  tsuika.push('<p>' + (turn-0-1) + hydra + '</p>');
  result.insertAdjacentHTML('beforeend', tsuika.join(''));
}