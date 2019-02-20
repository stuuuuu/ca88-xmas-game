$(document).ready(function(){

  function isIE() {
      var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
      var msie = ua.indexOf('MSIE '); // IE 10 or older
      var trident = ua.indexOf('Trident/'); //IE 11

      return (msie > 0 || trident > 0);
  }


  $("iframe").hide();
  var assets = $(".upDown");
  function runIt() {
         assets.animate({top:'+=10'}, 1000);
         assets.animate({top:'-=10'}, 1000, runIt);
     }

     runIt();


  // backgound
  function resize(){
    if ($(window).width() < 1700) {
      $('body').css('background-position-x','-110px')
    }
    else {
      $('body').css('background-position-x','')
    }
  }
  $(window).resize(function() {
    resize();
  });
  // end background

  // sounds
  if (!isIE()){
    var disableSound = false;
    var sound = document.getElementById('jumping')
    var dice = document.getElementById('dice')
    sound.pause();
    sound.currentTime = 0;
    dice.pause();
    dice.currentTime = 0;
  }
  //end sounds

// popup
  $('.content').on('click','.click-example', function(){
    $('.popup-main').show();
    $('.pop2').fadeIn();
  })

$('.content').on('click','.click-rule', function(){
    $('.popup-main').show();
    $('.pop3').fadeIn();
  })

$('.content').on('click','.click-prize-table', function(){
    $('.popup-main').show();
    $('.pop1').fadeIn();
  })

  $('[class*="click-close"]').on('click',function(){
    $('.popup-main,.pop1,.pop2,.pop3').hide();
  })
// end of popup

// santa moves
  $('.santa').addClass('face-left');
  var timeToMove = 1500,
  timeToRemove=1400,
  ctr =0,
  numStopped =0,
  numToMultiply = 1,
  isPaused = false,
  level = 0,
  flag = false,
  lastNum,
  diceNumber,
  i,
  ableToClick = true,
  diceFinalCount=0,
  intervalHolder;

  $('.content').on('click','.click-play',function(){
    if(ableToClick){
      ableToClick = false;
      onceClick = true;
      roll();
      if(isIE()){
        setTimeout(function(){
          clearInterval(intervalHolder)
          $('.front').removeClass('ra1 ra2 ra3 ra4 ra5 ra6');
          $('.front').addClass("ra" + diceNumber);
        },2500)
      }
      if(!isIE()){
            disableSound?dice.pause():dice.play();
      }
      $( ".dice-wrapper" ).animate({ "right": "+=700px","top": "-=200px" }, 1500);
      $( ".dice-wrapper" ).animate({ "right": "-=700px","top": "+=200px" }, 1200,function() {

        $('.dice-wrapper').removeAttr('style');} );
        numStopped = 0;
        ctr = 0;
        setTimeout(function(){
          lastNum = (level + diceNumber);
          incrementLevel();
          diceFinalCount += ctr;
          popPrize(diceFinalCount, ctr);
        },3000);

      }




    })

    function incrementLevel(){
      for(i=0;i<diceNumber;i++)
      {
        checkIf();
      }
    }

    function checkIf(){
      if(!isPaused){
        level += 1;
        moveAnimation();
      }
      else{
        setTimeout(checkIf,100);
      }
    };



    function move(){
      var x = numToMultiply - 1;
      setTimeout(function(){
        $('.santa').addClass('move')
      },timeToRemove * x)
      setTimeout(function(){
        $('.santa').removeClass('move')
      }, timeToRemove * numToMultiply);
    }





    function moveAnimation(){
      ctr++;

      numToMultiply = ctr - numStopped;
      move()
      //make sure only one click during transition
      if(onceClick){
        onceClick = false;
        setTimeout(function(){
          ableToClick = true;
        }, timeToRemove * diceNumber);
      }
      //
      switch (level) {
        case 1:
        $('.santa').animate({"left": "1150px","top":"564px"},timeToMove);

        setTimeout(function(){
          $('.santa').removeClass('face-left');

        }, timeToRemove * numToMultiply);

        break;
        case 2:
        $('.santa').animate({"left": "1375px","top":"470px"},timeToMove);
        setTimeout(function(){
          $('.box-2').hide();
          $('.santa').addClass('face-left');
          $('.stand,.circle-c3').css('z-index','5')
          disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);

        break;
        case 3:
        $('.santa').animate({"left": "1102px","top":"399px"},timeToMove);
        setTimeout(function(){
          $('.gift-3').hide();
          $('.santa').addClass('face-left');
          disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);

        break;
        case 4:
        $('.santa').animate({"left": "887px","top":"370px"},timeToMove);
        setTimeout(function(){
          $('.gift-4').hide();
          disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);
        break;
        case 5:
        $('.santa').animate({"left": "701px","top":"306px"},timeToMove);

        break;
        case 6:
        $('.santa').animate({"left": "434px","top":"291px"},timeToMove);
        setTimeout(function(){
          $('.gift-6').hide();
          disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);
        break;
        case 7:
        $('.santa').animate({"left": "288px","top":"316px"},timeToMove);
        break;
        case 8:
        $('.santa').animate({"left": "158px","top":"373px"},timeToMove);
        setTimeout(function(){
          $('.gift-8').hide();
          $('.santa').removeClass('face-left');
          disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);
        break;
        case 9:
        $('.santa').animate({"left": "507px","top":"377px"},timeToMove);
        setTimeout(function(){
          $('.bg-gt-9').hide();

        disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);
        break;
        case 10:
        $('.santa').animate({"left": "517px","top":"490px"},timeToMove);

        break;
        case 11:
        $('.santa').animate({"left": "423px","top":"609px"},timeToMove);
        setTimeout(function(){
          $('.box-11').hide();
          $('.santa').addClass('face-left');
          disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);
        break;
        case 12:
        $('.santa').animate({"left": "-25px","top":"575px"},timeToMove);
        setTimeout(function(){
          $('.bg-gt-12').hide();

          disableSound?sound.pause():sound.play();
        }, timeToRemove * numToMultiply);
        break;

        default:

      }
    }

// popping of prizes
    function popPrize(diceFinalCount, ctr) {
        var waitTimeForPrize = ctr * timeToMove;

        switch (diceFinalCount) {
            case 1:
                $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
                $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();

                  setTimeout(function(){
                            $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/vip-1.png");
                    }, waitTimeForPrize);

                $(".popup-g-wrapper").on("click",".click-close-pop",function(){
                  $(".pg-prize-overlay").fadeOut();
                  $(".popup-g-wrapper").fadeOut();
                  $(".pop-g-img").attr("src"," ");
                });
                // alert('1');
                break;
            case 2:
            $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
            $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();

              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/vip-2.png");
                }, waitTimeForPrize);

            $(".popup-g-wrapper").on("click",".click-close-pop",function(){
              $(".pg-prize-overlay").fadeOut();
              $(".popup-g-wrapper").fadeOut();
              $(".pop-g-img").attr("src","");
            });
                // alert('2');
                break;
            case 3:
            $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
            $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();

              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/vip-3.png");
                }, waitTimeForPrize);

            $(".popup-g-wrapper").on("click",".click-close-pop",function(){
              $(".pg-prize-overlay").fadeOut();
              $(".popup-g-wrapper").fadeOut();
              $(".pop-g-img").attr("src","");
            });
                // alert('3');
                break;
            case 4:
            $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
            $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();

              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/vip-4.png");
                }, waitTimeForPrize);

            $(".popup-g-wrapper").on("click",".click-close-pop",function(){
              $(".pg-prize-overlay").fadeOut();
              $(".popup-g-wrapper").fadeOut();
              $(".pop-g-img").attr("src","");
            });
                // alert('4');
                break;
            case 5:
            $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
            $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();

              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/vip-5.png");
                }, waitTimeForPrize);

            $(".popup-g-wrapper").on("click",".click-close-pop",function(){
              $(".pg-prize-overlay").fadeOut();
              $(".popup-g-wrapper").fadeOut();
                $(".pop-g-img").attr("src","");
            });
                // alert('5');
                break;
            case 6:
            // alert(accountType);
            $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
            $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();

              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/vip-6.png");
                }, waitTimeForPrize);

            $(".popup-g-wrapper").on("click",".click-close-pop",function(){
              $(".pg-prize-overlay").fadeOut();
              $(".popup-g-wrapper").fadeOut();
              $(".pop-g-img").attr("src","");
            });
  // alert('6');
                break;
            case 7:


              $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
              $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();
              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/svip-1.png");
                }, waitTimeForPrize);
                $(".popup-g-wrapper").on("click",".click-close-pop",function(){
                  $(".pg-prize-overlay").fadeOut();
                  $(".popup-g-wrapper").fadeOut();
                  $(".pop-g-img").attr("src","");
                });


                // alert('7');
                break;
            case 8:


              $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
              $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();
              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/svip-2.png");
                }, waitTimeForPrize);
                $(".popup-g-wrapper").on("click",".click-close-pop",function(){
                  $(".pg-prize-overlay").fadeOut();
                  $(".popup-g-wrapper").fadeOut();
                  $(".pop-g-img").attr("src","");
                });


                // alert('8');
                break;
            case 9:


              $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
              $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();
              setTimeout(function(){

                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/svip-3.png");
                }, waitTimeForPrize);
                $(".popup-g-wrapper").on("click",".click-close-pop",function(){
                  $(".pg-prize-overlay").fadeOut();
                  $(".popup-g-wrapper").fadeOut();
                  $(".pop-g-img").attr("src","");
                });


                // alert('9');
                break;
            case 10:


              $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
              $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();
              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/svip-4.png");
                }, waitTimeForPrize);
                $(".popup-g-wrapper").on("click",".click-close-pop",function(){
                  $(".pg-prize-overlay").fadeOut();
                  $(".popup-g-wrapper").fadeOut();
                  $(".pop-g-img").attr("src","");
                });


                // alert('10');
                break;
            case 11:


              $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
              $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();
              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/svip-5.png");
                }, waitTimeForPrize);
                $(".popup-g-wrapper").on("click",".click-close-pop",function(){
                  $(".pg-prize-overlay").fadeOut();
                  $(".popup-g-wrapper").fadeOut();
                  $(".pop-g-img").attr("src","");
                });


                // alert('11');
                break;
            case 12:


              $(".pg-prize-overlay").delay(waitTimeForPrize).fadeIn();
              $(".popup-g-wrapper").delay(waitTimeForPrize).fadeIn();
              setTimeout(function(){
                        $(".pop-g-img").delay(waitTimeForPrize).attr("src","images/popup-prizes/svip-6.png");
                }, waitTimeForPrize);
                $(".popup-g-wrapper").on("click",".click-close-pop",function(){
                  $(".pg-prize-overlay").fadeOut();
                  $(".popup-g-wrapper").fadeOut();
                  $(".pop-g-img").attr("src","");
                });


                // alert('12');
                break;

            default:

        }
    }





    //dice function

    var ANGLE = {
      1: {
        x: -10,
        y: -10,
        z: 0
      },
      2: {
        x: -10,
        y: 260,
        z: 0
      },
      3: {
        x: 80,
        y: 0,
        z: 10
      },
      4: {
        x: 260,
        y: 0,
        z: -10
      },
      5: {
        x: 260,
        y: 0,
        z: 80
      },
      6: {
        x: -10,
        y: 170,
        z: 90
      }
    };
    var dices = Array.prototype.slice.call(document.querySelectorAll('.cubic'));
    var speed = 2500;
    var angleGenerator = function angleGenerator() {
      var factor = Math.floor(1 + Math.random() * 6);
      diceNumber = factor;
      var _ANGLE$factor = ANGLE[factor];
      var x = _ANGLE$factor.x;
      var y = _ANGLE$factor.y;
      var z = _ANGLE$factor.z;
      return {
        x: x + 3600,
        y: y + 3600,
        z: z + 3600
      };
    };
    var roll = function roll() {
      dices.forEach(function (dice) {
        var _angleGenerator = angleGenerator();
        var x = _angleGenerator.x;
        var y = _angleGenerator.y;
        var z = _angleGenerator.z;
        if(!isIE()){
          dice.style.cssText = '\n -ms-transform: none;\n -webkit-transform: none;\n transform: none;\n ';
          setTimeout(function () {
          dice.style.cssText = '\n -ms-transition-duration: '+ speed + 'ms;\n' + '-webkit-transition-duration: ' + speed + 'ms;\n transition-duration: ' + speed + 'ms;\n -ms-transform: rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg);\n -webkit-transform: rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg);\n transform: rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg);\n            ';
          }, 10);
        }
        else{
           intervalHolder = setInterval(function(){
            var random1 = Math.floor(Math.random() * 6) + 1;
            $('.front').removeClass('ra1 ra2 ra3 ra4 ra5 ra6');
            $('.front').addClass("ra" + random1);
          },10)
        }
      });
    };
    // end dice function

    // snow effects
    // snow
    var c = document.getElementById('canv');
    var  y = c.getContext("2d");
    var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight;

    Snowy();
    function Snowy() {
      var snow, arr = [];
      var num = 150, tsc = 1, sp = 1;
      var sc = .9, t = 0, mv = 20, min = 1;
      for (var i = 0; i < num; ++i) {
        snow = new Flake();
        snow.y = Math.random() * (h + 50);
        snow.x = Math.random() * w;
        snow.t = Math.random() * (Math.PI * 2);
        snow.sz = (100 / (10 + (Math.random() * 100))) * sc;
        snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;
        snow.sp = snow.sp < min ? min : snow.sp;
        arr.push(snow);
      }
      go();
      function go(){
        window.requestAnimationFrame(go);
        y.clearRect(0, 0, w, h);
        y.fillRect(0, 0, w, h);
        y.fill();
        for (var i = 0; i < arr.length; ++i) {
          f = arr[i];
          f.t += .05;
          f.t = f.t >= Math.PI * 2 ? 0 : f.t;
          f.y += f.sp;
          f.x += Math.sin(f.t * tsc) * (f.sz * .3);
          if (f.y > h + 50) f.y = -10 - Math.random() * mv;
          if (f.x > w + mv) f.x = - mv;
          if (f.x < - mv) f.x = w + mv;
          f.draw();}
        }
        function Flake() {
          this.draw = function() {
            this.g = y.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
            this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
            this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
            y.moveTo(this.x, this.y);
            y.fillStyle = this.g;
            y.beginPath();
            y.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
            y.fill();}
          }
        }
        // end snow effects

        // sound
        var soundX = document.getElementById('player');
        $('.click-sound').on('click',function(){
          $(this).toggleClass('disable')
          if($(this).hasClass('disable')){
            disableSound = true;
            soundX.pause();
          }
          else{
            disableSound = false;
            soundX.play();
          }
        })
        // end sound

        //preload
        var imagesToLoad = []
        function preload() {
            for (var i = 0; i < arguments.length; i++) {
                imagesToLoad[i] = new Image();
                imagesToLoad[i].src = preload.arguments[i];
            }
        }

        setTimeout(function(){
          preload(
              "images/sprite.png",
              "images/audio-disabled.png"
          )
        }, 500);
        //end preload
      })
