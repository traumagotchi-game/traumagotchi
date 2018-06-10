// bug for some reason picked color won't change, even though it is already spliced out of array

$(document).ready(function() {
  let colorArray = [];
  $('#gameArea').hide();
  $('#start').click(startGame);

  //click event: instead of doing click event (which you can't do bc divs aren't generated yet), you can do ON click event, which gives you more options (to select class from parent, since #output does exist).
  $('#output').on('click', '.cell', checkCell);

  // css styling in jquery uses commas instead of semicolon
  // and quotes! and some don't have hyphens
  // ...i moved this to css

  // $('#start').css({
  //   border: '1px solid black',
  //   textAlign:'center',
  //   padding:'50px',
  //   color:'white'
  // })



  function startGame() {
    makeBoard();
    pickMyColor();
    $('#start').hide();
    $('#gameArea').show();
    console.log('game started');
  }

  function addNewColor() {
    let trackColor = (randomColor());
    colorArray.push(trackColor);
    return trackColor;
  }

  function makeBoard() {
    let x = 4;
    var html = '';
    for (let row = 0; row < x; row++) {
      html += '<div class="row">';
      for (let col = 0; col < x; col++) {

        html += '<div class="cell"   style="background-color:' + addNewColor() + '">0</div>';
      }
      html += '</div>';
    }
    $('#output').html(html);
    // if you wanted to add style in JQuery you would need to do it here, after it is declared
  }

  function pickMyColor() {
    let index = Math.floor(Math.random() * colorArray.length);
    // let pickedColor = colorArray[index];
    // actually have to splice it out so does't recur
    let pickedColor = colorArray.splice(index, 1);
    // both of these work
    $('#findMe').css({
      backgroundColor: pickedColor
    });

    // $('#findMe').css('background-color', color);
  }

  function randomColor() {
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let rgb = 'rgb('+r+','+g+','+b+')';
    return rgb;
    // return random hexcode
    // return '#' + ((1 << 24) * Math.random() | 0).toString(16);
  }

  function checkCell() {
    // console.log(pickedColor);
    let currentColor = $(this).css('backgroundColor');
    if (currentColor == $('#findMe').css('backgroundColor')) {
      // don't really need the 'number statement bc javascript converts it to numver on its own'
      $(this).css('backgroundColor', addNewColor());
      let countValue = Number($(this).text());
      countValue++;
      $(this).text(countValue);
      $('#message').html('Correct!!!');
      pickMyColor();
    } else {
      $('#message').html('Sorry wrong color');

    }
  }

})
