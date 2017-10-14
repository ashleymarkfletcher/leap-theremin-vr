const controller = new Leap.Controller({enableGestures: true})

this.controller.on('connect', function(){
  console.log('leap motion connected');
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
  // grab the current frame of data from the controller
  var frame = controller.frame();
  // console.log(frame)

  if (frame.hands.length > 0) {

    frame.hands.forEach((hand) => {

      if (hand.type == "left") {
        // take the Y coordinate
        var leftHandY = hand.palmPosition[1]
        // console.log('left: ', hand.palmPosition)

        // scale the coordinate to the amplitude of the wave
        var amp = map(leftHandY, 50, 500, 0, 1)
        // console.log('amp: ', amp)

        osc.amp(amp);

      } else {
        // take the X coordinate
        var rightHandX = hand.palmPosition[0]
        // console.log('right: ', rightHandX)

        // scale the coordinate to the pitch of the wave
        var pitch = map(rightHandX, -300, 300, 0, 1800)

        osc.freq(pitch)
      }
    })
  }
}
