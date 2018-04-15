function moveToSelected( element ) {
  if ( element == "next" ) {
    var selected = $( ".selected" ).next();
  } else if (element == "prev") {
    var selected = $( ".selected" ).prev();
  } else {
    var selected = element;
  }

  var next = $( selected ).next();
  var prev = $( selected ).prev();
  var prevSecond = $( prev ).prev();
  var nextSecond = $( next ).next();

  $( selected )
    .removeClass()
    .addClass( "selected" );

  //Change Title
  if ( $( selected ).attr( "name" ) != null ) {
    $( "#title" ).fadeOut( function() {
      $( "#title" ).text( $( selected ).attr( "name" ) );
      if ( $("body").keydown() != true ) {
        $( "#title" ).stop();
        setTimeout(function() {
          $( "#title" ).fadeIn();
        }, 500);
      }
    });
  }

  console.log( $(selected).attr( "id" ) != "first" );

  $( prev )
    .removeClass()
    .addClass( "prev" );
  $( next )
    .removeClass()
    .addClass("next");

  $( nextSecond )
    .removeClass()
    .addClass( "nextRightSecond" );
  $( prevSecond )
    .removeClass()
    .addClass( "prevLeftSecond" );

  $( nextSecond )
    .nextAll()
    .removeClass()
    .addClass( "hideRight" );
  $( prevSecond )
    .prevAll()
    .removeClass()
    .addClass( "hideLeft" );
}

// Eventos teclado
$( document ).keydown( function(e) {
  switch ( e.which ) {
    case 37: // left
      moveToSelected( "prev" );
      break;

    case 39: // right
      moveToSelected( "next" );
      break;

    default:
      return;
  }
  e.preventDefault();
});

$( "#carousel app" ).click( function() {
  moveToSelected( $( this ) );
});

$( "#prev" ).click( function() {
  moveToSelected( "prev" );
});

$( "#next" ).click( function() {
  moveToSelected( "next" );
});

// Clock Time
function startTime() {
  document.getElementById( "clock" ).innerHTML = moment().format( "hh:mm" );
  var t = setTimeout( startTime, 500 );
}
function checkTime( i ) {
  if ( i < 10 ) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}


//setting
function showSetting() {
  $( ".scrollBox" ).show();
  $( "#setting-background" ).css("display", "block");
  $( "#setting-background" ).animate({
    opacity: "1",
  }, 10 );
  $( "#clock" ).animate({
    color: "white",
  }, 10 );
  $( "#clock" ).css('z-index', 1000);
  $( "#clock" ).css('color', "white");
  $( "#setting-close" ).fadeIn(150);
  $( "#titleSettings" ).fadeIn();
  $( "#main" ).delay(100).fadeIn();
  $( "#setting-background" ).delay(100).animate({
    width: "4000px",
    height: "4000px",
    right: "-1962px",
    top: "-1955px",
  }, 150 );
};

function hideSetting() {
  $( "#setting-background" ).animate({
    width: "15px",
    height: "15px",
    right: "38px",
    top: "45px",
  }, 150 );
  $( "#clock" ).css('z-index', -99);
  $( "#clock" ).css('color', "#95a5a6");
  $( "#setting-close" ).fadeOut(150);
  $( "#titleSettings" ).fadeOut(100, function() {
    $( "#titleSettings" ).text("Settings");
  });
  $( "#main" ).fadeOut(50);

  $( "#about-box" ).fadeOut(50);
  $( "#network-box" ).fadeOut(50);
  $( "#payment-box" ).fadeOut(50);

  setTimeout(function() {
    $( "#setting-background" ).css("display", "none");
    $( ".scrollBox" ).hide();
  }, 100);
};

$( "#about" ).click(function() {
  $( "#main" ).fadeOut(150);
  $( "#titleSettings" ).fadeOut(150, function() {
    $( this ).text("About this Device").fadeIn(150);
    $( "#about-box" ).fadeIn();
  })
});

$( "#network" ).click(function() {
  $( "#main" ).fadeOut(150);
  $( "#titleSettings" ).fadeOut(150, function() {
    $( this ).text("Network & Internet").fadeIn(150);
    $( "#network-box" ).fadeIn();
  })
});

$( "#payment" ).click(function() {
  $( "#main" ).fadeOut(150);
  $( "#titleSettings" ).fadeOut(150, function() {
    $( this ).text("Payment").fadeIn(150);
    $( "#payment-box" ).fadeIn();
  })
});

$( ".back" ).click(function() {
  $( "#about-box" ).fadeOut(150);
  $( "#payment-box" ).fadeOut(150);
  $( "#network-box" ).fadeOut(150);
  $( "#titleSettings" ).fadeOut(150, function() {
    $( this ).text("Settings").fadeIn(150);
    $( "#main" ).fadeIn() ;
  })
});
