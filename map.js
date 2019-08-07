var playerPosition = [1, 1];

// 12 * 6 grid
function chartPosition(playerPosition) {
  var $currenttile = $('.row.tile');
  
  for (var i=0; i < tiles.length; i++){
    var $currenttile = $('tile')[i];
    if (($currenttile.attr('xValue') == playerPosition[0]) && ($currenttile[i].attr('yValue') == playerPosition[1])){
      $currenttile.html('<img src="playericon.png">');
    }
  }
}

function movePlayer(key){

  // key up
  if (key == "up"){
    if (playerPosition[1] == 6) {
      alert("That position is off the map!");
    }
    else {
      playerPosition[1]++;
    }
  }
  if (key == "right"){
    if(playerPosition[0] == 12){
      alert("That position is off the map!");
    }
    else {
      playerPosition[0]++;

    }
  }
  if (key == "left"){
    if (playerPosition[0] == 0) {
      alert("That position is off the map!");
    }
    else {
      playerPosition[0]--;

    }
  }
  if (key == "down"){
    if (playerPosition[1] == 0) {
      alert("That position is off the map!");
    }
    else {
      playerPosition[0]++;
    }
  }
  // key left
  // key right
  // key down
}

function plotPlayer() {
  $()
}

