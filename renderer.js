const coordinatesElement = document.getElementById('coordinates');
const startButton = document.getElementById('startButton');
const getCymbal = document.getElementById('getCymbal');
const cymbalCoordsForm = document.getElementById('cymbalCoordsForm');

window.electronAPI.onMousePosition(({ x, y }) => {
  coordinatesElement.textContent = `X: ${x}, Y: ${y}`;
});

startButton.addEventListener('click', () => {
  window.electronAPI.triggerMouseSequence();
});

getCymbal.addEventListener('click', () => {
  window.electronAPI.triggerGetCymbal();
});

cymbalCoordsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const xCoord = parseInt(document.getElementById('xCoord').value, 10);
  const yCoord = parseInt(document.getElementById('yCoord').value, 10);

  window.electronAPI.setCymbalCoords({ x: xCoord, y: yCoord });
});