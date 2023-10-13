export const canvasWidth = 400;
export const canvasHeight = 400;
export const gridSize = 20;

export const canvas = document.getElementById('game-canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;

export const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = '#b3b3b3';
