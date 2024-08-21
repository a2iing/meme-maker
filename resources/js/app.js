const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const setLineWidth = document.getElementById('line-width');
const setColor = document.getElementById('color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const modeBtn = document.getElementById('mode-btn');
const modeIcon = modeBtn.querySelector('i');
const clearBtn = document.getElementById('clear-btn');
const eraserBtn = document.getElementById('eraser-btn');
const saveBtn = document.getElementById('save-btn');
const fileInput = document.getElementById('file');
const fontFace = document.getElementById('font-face');
const fontSize = document.getElementById('font-size');
const textShapeSolid = document.querySelector(".radio-btn #isSolid");
const textInput = document.getElementById('text');
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = setLineWidth.value;
ctx.lineCap = "round";
ctx.strokeStyle = setColor.value;
let drawing = false;
let filling = false;

function modeChange() { // filling Toggle
    if(filling) {
        filling = false;
        modeIcon.classList.add('fa-fill-drip');
        modeIcon.classList.remove('fa-pen');
    } else {
        filling = true;
        modeIcon.classList.remove('fa-fill-drip');
        modeIcon.classList.add('fa-pen');
    }
}

function onMove(event) {
    if(drawing) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startDrawing() {
    drawing = true;
}

function endDrawing() {
    drawing = false;
    ctx.beginPath();
}

function changeLineWidth(event) {
    ctx.lineWidth = event.target.value;
}

function changeColor(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function setColorOption(event) {
    const color = event.target.dataset.color;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    setColor.value = color;
}

function fillCanvas() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function clearCanvas() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function eraserModeOn() {
    ctx.strokeStyle = "#fff";
    filling = false;
    modeIcon.classList.add('fa-fill-drip');
    modeIcon.classList.remove('fa-pen');
}

function fileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function() {
        ctx.drawImage(image, 0, 0 , CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    const font = fontFace.value;
    const size = fontSize.value;
    if (text != "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = "Bold " + size + "px " + font;
        if (textShapeSolid.checked === true) {
            ctx.fillText(text, event.offsetX, event.offsetY);
        } else {
            ctx.strokeText(text, event.offsetX, event.offsetY);
        }
        ctx.restore();
    }
}

function saveImage() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseleave", endDrawing);
canvas.addEventListener("click", fillCanvas);
canvas.addEventListener("dblclick", onDoubleClick);

setLineWidth.addEventListener("change", changeLineWidth);
setColor.addEventListener("change", changeColor);

colorOptions.forEach(option => option.addEventListener('click', setColorOption));

modeBtn.addEventListener("click", modeChange);
clearBtn.addEventListener("click", clearCanvas);
eraserBtn.addEventListener("click", eraserModeOn);
fileInput.addEventListener("change", fileChange);
saveBtn.addEventListener("click", saveImage);