export default class Drawcanvas {
    constructor(options) {
        this.canvas = document.getElementById(options.canvas);
        this.context = this.canvas.getContext('2d');

        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.color = (options.color) ? options.color : '#000';
        this.size = (options.size) ? options.size : 3;
        this.canvas.addEventListener('mousedown', (e) => {
            this.start(e);
        });
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const canvasCoords = this.offset(this.canvas);
            let t = {
                offsetX: e.touches[0].pageX - canvasCoords.left,
                offsetY: e.touches[0].pageY - canvasCoords.top
            };
            this.start(t);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            this.move(e);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const canvasCoords = this.offset(this.canvas);
            let t = {
                offsetX: e.touches[0].pageX - canvasCoords.left,
                offsetY: e.touches[0].pageY - canvasCoords.top
            };
            this.move(t);
        });

        this.canvas.addEventListener('mouseup', () => {
            this.stop();
        });
        this.canvas.addEventListener('touchend', () => {
            this.stop();
        });
    }

    start(e) {
        this.paint = true;
        this.addClick(e.offsetX, e.offsetY, false);
    }

    move(e) {
        if (this.paint) {
            this.addClick(e.offsetX, e.offsetY, true);
        }
    }

    stop(e) {
        this.paint = false;
    }

    addClick(x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
        this.redraw();
    }

    redraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.strokeStyle = this.color;
        this.context.lineJoin = 'round';
        this.context.lineWidth = this.size;

        for (let i = 0; i < this.clickX.length; i++) {
            this.context.beginPath();
            if (this.clickDrag[i] && i) {
                this.context.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
            } else {
                this.context.moveTo(this.clickX[i] - 1, this.clickY[i]);
            }
            this.context.lineTo(this.clickX[i], this.clickY[i]);
            this.context.closePath();
            this.context.stroke();
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.dragging = [];
    }

    offset(elt) {
        return elt.getBoundingClientRect();
    }
}

