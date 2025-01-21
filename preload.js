const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onMousePosition: (callback) => {
    ipcRenderer.on('mouse-position', (event, value) => callback(value));
  },
  triggerMouseSequence: () => ipcRenderer.send('start-mouse-sequence'),
  triggerGetCymbal: () => ipcRenderer.send('get-cymbal-coords'),
  setCymbalCoords: (coords) => ipcRenderer.send('set-cymbal-coords', coords)
});