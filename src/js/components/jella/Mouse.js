import Vec2 from './Vec2';

function Mouse(canvas) {
	this.pos = new Vec2(0, 0);
	this.down = false;
	const _this = this;
	window.onmousemove = function (e) {
		const r = canvas.getBoundingClientRect();
		_this.pos.set(e.clientX - r.left, e.clientY - r.top);
	};
	window.onmouseup = function () {
		_this.down = false;
	};
	window.onmousedown = function (e) {
		_this.down = true;
		const r = canvas.getBoundingClientRect();
		_this.pos.set(e.clientX - r.left, e.clientY - r.top);
	};
}

module.exports = Mouse;
