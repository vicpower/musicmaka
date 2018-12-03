
var socket;

var mic, recorder, soundFile;

var state = 0;

var carrier; // these are for oscillator
var modulator; 
var fft;

var song;
var capture;

var bite;

var img;

function preload() {

  img = loadImage('cat.png');

  // preload your audio file so everything is ready on page load
  soundFormats('mp3', 'ogg');
  mySound = loadSound('music/originals/comemehway.mp3');
  song = loadSound('music/originals/goldencity.mp3');

//sounds for all the letter keys on qwerty keyboard

  qq = loadSound('music/q.mp3');
  ww = loadSound('music/w.mp3');
  ee = loadSound('music/e.mp3');
  rr = loadSound('music/r.mp3');
  tt = loadSound('music/t.mp3');
  yy = loadSound('music/y.mp3');
  uu = loadSound('music/u.mp3');
  ii = loadSound('music/i.mp3');
  oo = loadSound('music/o.mp3');
  pp = loadSound('music/p.mp3');
  aa = loadSound('music/a.mp3');
  ss = loadSound('music/s.mp3');
  dd = loadSound('music/d.mp3');
  ff = loadSound('music/f.mp3');
  gg = loadSound('music/g.mp3');
  hh = loadSound('music/h.mp3');
  jj = loadSound('music/j.mp3');
  kk = loadSound('music/k.mp3');
  ll = loadSound('music/l.mp3');
  zz = loadSound('music/z.mp3');
  xx = loadSound('music/x.mp3');
  cc = loadSound('music/c.mp3');
  vv = loadSound('music/v.mp3');
  bb = loadSound('music/b.mp3');
  nn = loadSound('music/n.mp3');
  mm = loadSound('music/m.mp3');
}


let t = 0; // time variable
var mic;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //song.loop();

  //capture = createCapture(VIDEO);
  //capture.size(320, 240);

  // Create an Audio input
  mic = new p5.AudioIn();

  mic.start();
 
  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  soundFile = new p5.SoundFile();

  //var louder = map(vol, 0, 1, height, 0);
  mySound.setVolume(1);
  //mySound.play();

  carrier = new p5.Oscillator(); // connects to master output by default
  carrier.freq(2000);
  carrier.amp(0);
  // carrier's amp is 0 by default, giving our modulator total control

  carrier.start();

  modulator = new p5.Oscillator('triangle');
  modulator.disconnect();  // disconnect the modulator from master output
  modulator.freq(5);
  modulator.amp(1);
  modulator.start();

  // Modulate the carrier's amplitude with the modulator
  // Optionally, we can scale the signal.
  carrier.amp(modulator.scale(-1,1,1,-1));

  // create an fft to analyze the audio
  fft = new p5.FFT();

  socket = io.connect('http://169.233.184.0.:8080');
}


function draw() {
  background(random(220,240),random(220,240),random(220,240));
  noStroke();
  //fill(0);
 //noStroke();
  fill(random(255),random(255),random(255),random(0.1,99));
  ellipse(windowWidth/2, windowHeight/2, random(330,500), random(330,500));

  tint(255, random(50,200));
  image(img, windowWidth/3.1, windowHeight/5.5); 
  
  // push();
  // translate(windowWidth*0.1, windowHeight*0.5);
  // rotate(frameCount / 10.0);;
  // image(img, windowWidth/2, windowHeight/2); 
  // pop();

  var volume = map(mouseX, 0, width, 0, 1);
  volume = constrain(volume, 0, 1);
  song.amp(volume);

  var speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.1, 3);
  song.rate(speed);

  //image(capture, 0, 0, 320, 240);
  //filter('INVERT');

  // map mouseY to moodulator freq between 0 and 20hz
  var modFreq = map(mouseY, 0, height, 20, 0);
  modulator.freq(modFreq);

  var modAmp = map(mouseX, 0, width, 0, 1);
  modulator.amp(modAmp, 0.01); // fade time of 0.1 for smooth fading
}

function mousePressed() {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {

    // Tell recorder to record to a p5.SoundFile which we will use for playback
    mm.loop();
    recorder.record(soundFile);
    background(255,0,0);
    state++;
  }

  else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile

    background(0);
    textSize(42);
    textAlign(CENTER);
    text('RECORDING HALTED. Click again to play and save.', windowWidth/2, windowHeight/2);
    state++;
    //frameRate(20);
    //I am trying to figure out how to make this stay longer or flash at the viewer
  }

  else if (state === 2) {
    soundFile.play(); // play the result!
    //saveSound(soundFile, 'myChaos.wav'); // save file
    saveSound(soundFile, (new Date()).getTime() + ".wav");
    state = 0;
  }


}

  t = t + 0.01; // update time

  var vol = mic.getLevel();
  //for some reason this is not able to read "getLevel" on the developper conso
  console.log(vol);

//still working out little things to make more user friendly!

  function keyReleased() {

  if (key === 'q') {
    bite = qq.loop();
  }
  if (key === 'w') {
    bite = ww.loop();
  }
  if (key === 'e') {
    bite = ee.loop();
  }
  if (key === 'r') {
    bite = rr.loop();
  }
  if (key === 't') {
    bite = tt.loop();
  }
  if (key === 'y') {
    bite = yy.loop();
  }
  if (key === 'u') {
    bite = uu.loop();
  } 
  if (key === 'i') {
    bite = ii.loop();
  } 
  if (key === 'o') {
    bite = oo.loop();
  }
  if (key === 'p') {
    bite = pp.loop();
  }
  if (key === 'a') {
    bite = aa.loop();
  }
  if (key === 's') {
    bite = ss.loop();
  }
  if (key === 'd') {
    bite = dd.loop();
  }
  if (key === 'f') {
    bite = ff.loop();
  }
  if (key === 'g') {
    bite = gg.loop();
  } 
  if (key === 'h') {
    bite = hh.loop();
  } 
  if (key === 'j') {
    bite = jj.loop();
  }
  if (key === 'k') {
    bite = kk.loop();
  }
  if (key === 'l') {
    bite = ll.loop();
  }
  if (key === 'z') {
    bite = zz.loop();
  }
  if (key === 'x') {
    bite = xx.loop();
  }
  if (key === 'c') {
    bite = cc.loop();
  }
  if (key === 'v') {
    bite = vv.loop();
  } 
  if (key === 'b') {
    bite = bb.loop();
  } 
  if (key === 'n') {
    bite = nn.loop();
  }
  if (key === 'm') {
    bite = mm.loop();
  }

}

function keyTyped() {
  background(30,30,30);
  if (key === 'q') {
    bite = qq.pause();
  }
  if (key === 'w') {
    bite = ww.pause();
  }
  if (key === 'e') {
    bite = ee.pause();
  }
  if (key === 'r') {
    bite = rr.pause();
  }
  if (key === 't') {
    bite = tt.pause();
  }
  if (key === 'y') {
    bite = yy.pause();
  }
  if (key === 'u') {
    bite = uu.pause();
  } 
  if (key === 'i') {
    bite = ii.pause();
  } 
  if (key === 'o') {
    bite = oo.pause();
  }
  if (key === 'p') {
    bite = pp.pause();
  }
  if (key === 'a') {
    bite = aa.pause();
  }
  if (key === 's') {
    bite = ss.pause();
  }
  if (key === 'd') {
    bite = dd.pause();
  }
  if (key === 'f') {
    bite = ff.pause();
  }
  if (key === 'g') {
    bite = gg.pause();
  } 
  if (key === 'h') {
    bite = hh.pause();
  } 
  if (key === 'j') {
    bite = jj.pause();
  }
  if (key === 'k') {
    bite = kk.pause();
  }
  if (key === 'l') {
    bite = ll.pause();
  }
  if (key === 'z') {
    bite = zz.pause();
  }
  if (key === 'x') {
    bite = xx.pause();
  }
  if (key === 'c') {
    bite = cc.pause();
  }
  if (key === 'v') {
    bite = vv.pause();
  } 
  if (key === 'b') {
    bite = bb.pause();
  } 
  if (key === 'n') {
    bite = nn.pause();
  }
  if (key === 'm') {
    bite = mm.pause();
  }
}


//this allows you to stop music but not play multiple simultaneously?? speeliiing whaaaaat
//   function keyPressed() {
//   //background(30,30,30);
//   if (key === '<' || '.') {
//     bite = qq.stop();
//     bite = ww.stop();
//     bite = ee.stop();
//     bite = rr.stop();
//     bite = tt.stop();
//     bite = yy.stop();
//     bite = uu.stop();
//     bite = ii.stop();
//     bite = oo.stop();
//     bite = pp.stop();
//     bite = aa.stop();
//     bite = ss.stop();
//     bite = dd.stop();
//     bite = ff.stop();
//     bite = gg.stop();
//     bite = hh.stop();
//     bite = jj.stop();
//     bite = kk.stop();
//     bite = ll.stop();
//     bite = zz.stop();
//     bite = xx.stop();
//     bite = cc.stop();
//     bite = vv.stop();
//     bite = bb.stop();
//     bite = nn.stop();
//     bite = mm.stop();
//   }

// }