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
        var roll = radToDeg(hand.roll())
        var pitch = 180-radToDeg(hand.pitch())
        var yaw = 180-radToDeg(hand.yaw())

        circ.setAttribute('rotation', {x: pitch, y: yaw, z: roll});
        circ.setAttribute('position', {x: mappedHand[0], y: mappedHand[1], z: mappedHand[2]});

        // console.log('amp: ', amp)

        // osc.amp(amp);
      } else {
        var rightHandX = hand.palmPosition[0]

        // console.log('right: ', hand)
        var mappedHand = mapHandToScene(hand.palmPosition)

    // console.log('rightX: ', rightHandX)
        // var pitch = map(rightHandX, -300, 300, 0, 1800)

        var roll = radToDeg(hand.roll())
        var pitch = 180-radToDeg(hand.pitch())
        var yaw = 180-radToDeg(hand.yaw())

        console.log(radToDeg(hand.roll()));

        var circ = document.querySelector('#right');


        circ.setAttribute('rotation', {x: pitch, y: yaw, z: roll});
        circ.setAttribute('position', {x: mappedHand[0], y: mappedHand[1], z: mappedHand[2]});

        hand.fingers.forEach(function(finger){
          console.log('finger', finger);
        });
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

function radToDeg(radians) {
  return Math.round(radians * (180 / Math.PI));
}

var sceneEl = document.querySelector('a-scene');
var left = document.createElement('a-box');
left.setAttribute("id", "left");
left.setAttribute("color", "#EF2D5E");
left.setAttribute("width", "4");
left.setAttribute("depth", "5");

sceneEl.appendChild(left);

var right = document.createElement('a-box');
right.setAttribute("id", "right");
right.setAttribute("color", "#EF2D5E");
right.setAttribute("width", "4");
right.setAttribute("depth", "5");
// el.setAttribute('radius', '5');

sceneEl.appendChild(right);
