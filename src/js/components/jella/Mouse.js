import Vec2 from './Vec2';

function Mouse(canvas) {
	this.pos = new Vec2(0, 0);
	this.down = false;
	var self = this;
	canvas.parentNode.onmousemove = function (e) {
		var r = canvas.getBoundingClientRect();
		self.pos.set(e.clientX - r.left, e.clientY - r.top);
		// return e.preventDefault();
	};
	canvas.parentNode.onmouseup = function (e) {
		self.down = false;
		// return e.preventDefault();
	};
	canvas.parentNode.onmousedown = function (e) {
		self.down = true;
		var r = canvas.getBoundingClientRect();
		self.pos.set(e.clientX - r.left, e.clientY - r.top);
		// return e.preventDefault();
	};
}

module.exports = Mouse;