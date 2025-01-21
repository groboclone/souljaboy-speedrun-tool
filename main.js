const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const robot = require("@jitsi/robotjs");

let mainWindow;
let cymbalCoords = {x:686, y:495};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Set up interval to send mouse position to renderer
function sendMousePosition() {
  if (mainWindow) {
    const mousePos = robot.getMousePos();
    mainWindow.webContents.send('mouse-position', mousePos);
  }
  setTimeout(sendMousePosition, 16); // Approximately 60fps
}

app.on('ready', () => {
  sendMousePosition();
});

function clickCoord(coord1, coord2, button){
  robot.moveMouse(coord1, coord2);
  robot.mouseToggle("down", button);
  robot.mouseToggle("up", button);
}
function pressButton(button){
  robot.keyToggle(button, "down");
  robot.keyToggle(button, "up");
}

function toggleLiveSplitTimer(){
  //assumes your livesplit timer hotkey is set to ctrl+shift+q
  robot.keyToggle("control", "down");
  robot.keyToggle("shift", "down");
  robot.keyToggle("q", "down");
  robot.keyToggle("control", "up");
  robot.keyToggle("shift", "up");
  robot.keyToggle("q", "up");
}


// Get cymbal sampler coordinates
ipcMain.on('get-cymbal-coords', () => {

  //always start from 627, 264
  robot.moveMouse(627, 264);

  //Drag clips to channel rack
  robot.moveMouse(262, 498); //808 Clav in browser
  robot.keyToggle("shift", "down");
  robot.mouseToggle("down", "left");
  robot.moveMouse(352, 466); //Channel Rack
  robot.mouseToggle("up", "left");
  robot.keyToggle("shift", "up");
  
  //bring up cymbal sampler 
  clickCoord(456, 567, "left");
})

ipcMain.on('set-cymbal-coords', (event, coords) => {
  cymbalCoords.x = coords.x;
  cymbalCoords.y = coords.y;
  console.log(`Cymbal coordinates updated to: X=${cymbalCoords.x}, Y=${cymbalCoords.y}`);


});

// Handle mouse sequence trigger
ipcMain.on('start-mouse-sequence', () => {
  //start timer
  toggleLiveSplitTimer();

  //always start from 627, 264
  robot.moveMouse(627, 264);

  //Drag clips to channel rack
  robot.moveMouse(262, 498); //808 Clav in browser
  robot.keyToggle("shift", "down");
  robot.mouseToggle("down", "left");
  robot.moveMouse(352, 466); // Channel Rack
  robot.mouseToggle("up", "left");
  robot.keyToggle("shift", "up");

  //reverse the cymbal
  clickCoord(456, 567, "left"); //Ekit Cymbal 3 in Channel Rack
  clickCoord(cymbalCoords.x, cymbalCoords.y, "left"); //Reverse button


  pressButton("f6")

  //Boom piano beat 1
  clickCoord(527, 534, "left");
  //808 kick beat 1
  clickCoord(527, 505, "left");
  //808 kick beat 4
  clickCoord(720, 505, "left");
  //808 clav beat 5
  clickCoord(785, 475, "left");
  //808 kick beat 6
  clickCoord(847, 505, "left");
  //808 clav beat 6.5
  clickCoord(880, 475, "left");
  //808 kick beat 7.5
  clickCoord(945, 505, "left");
  //808 clav beat 8
  clickCoord(976, 475, "left");
  //Cymbal beat 5
  clickCoord(782, 564, "left");

  //fill each 2 steps HIP_Hat_4
  clickCoord(489, 598, "right");
  pressButton("2");
  //click and drag 16ths on last 3 beats of HIP_Hat_4
  robot.moveMouse(863, 591);
  robot.mouseToggle("down", "left");
  robot.moveMouse(1022, 591);
  robot.mouseToggle("up", "left");

  //HIP_Snaph beat 3
  clickCoord(656, 625, "left");
  //HIP_Snaph beat 7
  clickCoord(915, 625, "left");
  //PERC_SteelDrum_C5 beat 6
  clickCoord(848, 682, "left");
  //HIT_2 beat 1
  clickCoord(528, 652, "left");
  //PERC_SteelDrum_C5 beat 1      
  clickCoord(528, 684, "left");

  //open graph editor for PERC
  clickCoord(487, 681, "right");
  pressButton("g");
  //add G4 beat 2.5
  clickCoord(622, 869, "left");
  //add G#4 beat 4
  clickCoord(719, 857, "left");
  //add G4 beat 7.5
  clickCoord(944, 871, "left");

  //right click pattern 1 in the panel picker and split by pattern
  clickCoord(400, 174, "right");
  pressButton("s");
  //select all patterns
  clickCoord(400, 174, "left");

  robot.moveMouse(400, 374);
  robot.keyToggle("shift", "down");
  robot.mouseToggle("down", "left");
  robot.mouseToggle("up", "left");
  robot.keyToggle("shift", "up");
  
  //drag to playlist
  robot.mouseToggle("down", "left");
  robot.moveMouse(577, 371);
  robot.mouseToggle("up", "left");

  //duplicate all playlist clips
  robot.keyToggle("control", "down");
  robot.keyToggle("b", "down");
  robot.keyToggle("control", "up");
  robot.keyToggle("b", "up");
  //switch to pencil tool
  pressButton("p");
  //delete boom piano bar 3
  clickCoord(720, 482, "right");
  //delete cymbal bar 1+2
  clickCoord(649, 522, "right");
  //delete HIT_2 bar 3
  clickCoord(694, 683, "right");

  //duplicate all clips 5 times
  robot.keyToggle("control", "down");
  robot.keyToggle("a", "down");
  robot.keyToggle("control", "up");
  robot.keyToggle("a", "up");
  for (let i = 0; i < 5; i++){
    robot.keyToggle("control", "down");
    robot.keyToggle("b", "down");
    robot.keyToggle("control", "up");
    robot.keyToggle("b", "up");
  }
    //switch to select tool
    pressButton("e");
    //delete clav and kick, bars 17 to 24
    robot.moveMouse(1724, 310);
    robot.mouseToggle("down", "left");
    robot.moveMouse(1355, 420); //blaze it 
    robot.mouseToggle("up", "left");
    pressButton("delete");
    //delete HIP_Hat_4 bars 1 to 16
    robot.moveMouse(1340, 554);
    robot.mouseToggle("down", "left");
    robot.moveMouse(658, 553);
    robot.mouseToggle("up", "left");
    pressButton("delete");
    //delete 808 kick + 808 clav bars 1 to 8
    robot.moveMouse(951, 325);
    robot.mouseToggle("down", "left");
    robot.moveMouse(665, 413);
    robot.mouseToggle("up", "left");
    pressButton("delete");
    //switch to slice tool
    pressButton("c");
    robot.moveMouse(1038, 393);
    robot.mouseToggle("down", "left");
    robot.moveMouse(1038, 404);
    robot.mouseToggle("up", "left");
    pressButton("p");
    clickCoord(1025, 402, "right");
    
    //stop timer
    toggleLiveSplitTimer();
});
