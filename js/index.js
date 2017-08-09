var controller = new Leap.Controller({enableGestures: true})

this.controller.on('connect', function(){
  console.log('connected');
  // setInterval(function(){
  //   var frame = controller.frame();
  //   // console.log(frame)
  //   console.log(frame.hands[0])
  // }, 3000)

})

controller.connect();

var osc;
var playing = false;

function setup() {
  createCanvas(Window.width, Window.height);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();
}

function draw() {

  var frame = controller.frame();

  // console.log(frame)

  if (frame.hands.length > 0) {

    frame.hands.forEach((hand) => {

      if (hand.type == "left") {
        var leftHandY = hand.palmPosition[1]

        console.log('left: ', hand.palmPosition)

        var amp = map(leftHandY, 50, 500, 0, 1)

        var circ = document.querySelector('#left');

        var mappedHand = mapHandToScene(hand.palmPosition)

        circ.setAttribute('position', {x: mappedHand[0], y: mappedHand[1], z: mappedHand[2]});

        // console.log('amp: ', amp)

        // osc.amp(amp);
      } else {
        var rightHandX = hand.palmPosition[0]

        console.log('right: ', hand.palmPosition)
        var mappedHand = mapHandToScene(hand.palmPosition)

    // console.log('rightX: ', rightHandX)
        var pitch = map(rightHandX, -300, 300, 0, 1800)

        var circ = document.querySelector('#right');

        circ.setAttribute('position', {x: mappedHand[0], y: mappedHand[1], z: mappedHand[2]});

        // osc.freq(pitch)
      }
    })
  }
}

function mapHandToScene(handPos) {
  var x = map(handPos[0], -400, 400, -100, 100)
  var y = map(handPos[1], 30, 700, -10, 50)
  var z = map(handPos[2], -150, 150, -100, 0)
  // var z = handPos[2]

  return [x, y, z]
}

var sceneEl = document.querySelector('a-scene');
var left = document.createElement('a-box');
left.setAttribute("id", "left");
left.setAttribute("color", "#EF2D5E");
// el.setAttribute('radius', '5');

sceneEl.appendChild(left);

var right = document.createElement('a-box');
right.setAttribute("id", "right");
right.setAttribute("color", "#EF2D5E");
// el.setAttribute('radius', '5');

sceneEl.appendChild(right);
