$(document).ready(function () {
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
    visualizeMapOnly(mapData);
})
  
});

function visualizeMapOnly(map) {
  $(".map").html("<div class='botDisplay'><div class='castle'></div></div>");
  
  this.map = map;
  this.MAP_WIDTH = this.map[0].length;
  this.MAP_HEIGHT = this.map.length;
  
  
  console.log('MAP_WIDTH: ' + this.map[0].length)
  console.log('MAP_Height: ' + this.map.length)
  
  $("#mapSize").text(this.MAP_WIDTH + "x" + this.MAP_HEIGHT);
  var BLANK = '#393939',
      OBSTACLE = '#e8efe8',
      START = '#8ce96a',
      END = '#e2e96a';
  var RED = 'red',
      PATH = 'blue';
  var PATH = '#a1d1ec';
  /*devs? the online replayer on battlecode.org flips x and y around*/
  
  //initialize map without bots
  for (let y = 0; y < this.MAP_HEIGHT; y++) for (let x = 0; x < this.MAP_WIDTH; x++) {
    $(".map").append("<div class='tile' id='" + x + "_" + y + "'></div>")
    let tileElement = $("#" + x + "_" + y);
    switch (this.map[y][x]) {
      case 0:
        color = BLANK;
        break;
      case 1:
        color = OBSTACLE;
        break;
      case 2:
        color = START;
        break;
      case 3: color = END; break;
      case 4: 
        //color = BLANK;
        //tileElement.addClass('path');
        color = PATH;
        break;
    }
    //console.log(color);
    
    tileElement.css('background-color', color);
    //data-toggle='tooltip' data-trigger='hover' data-title='test'
    tileElement.attr('data-toggle','tooltip');
    tileElement.attr('data-trigger','hover');
    let desc = '';
    if (color === START) {
      desc = 'Start Point: ';
    }
    else if (color === END) {
      desc = 'Target Point: ';
    }
    tileElement.attr('data-title',desc + '(' + x + ', ' + y + ')');
    //this.mapGraphics.drawRect(x*draw_width, y*draw_height, draw_width, draw_height);
    //this.mapGraphics.endFill();
  }
  var draw_width = 940 / this.MAP_WIDTH;
  var draw_height = 940 / this.MAP_HEIGHT;
  $(".tile").css('width', draw_width + "px");
  $(".tile").css('height', draw_height + "px");
  /*
  $(".path::after").css('width', draw_width/2.5 + 'px');
  $(".path::after").css('height', draw_height/2.5 + 'px');
  $(".path::after").css('margin-left', -draw_width/5 + 'px');
  $(".path::after").css('margin-top', draw_width/5 + 'px');
  */
  $(".tile").on('click', function(){
    let xy = this.id.split("_")
    let py = xy[0];
    let px = xy[1];
    console.log(px,py);
  });
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
  
  
}
