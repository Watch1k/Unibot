import Vec2 from './Vec2';

function Mouse(canvas) {
	this.pos = new Vec2(0, 0);
	this.down = false;
	const _this = this;
	canvas.parentNode.onmousemove = function (e) {
		const r = canvas.getBoundingClientRect();
		_this.pos.set(e.clientX - r.left, e.clientY - r.top);
	};
	canvas.parentNode.onmouseup = function () {
		_this.down = false;
	};
	canvas.parentNode.onmousedown = function (e) {
		_this.down = true;
		const r = canvas.getBoundingClientRect();
		_this.pos.set(e.clientX - r.left, e.clientY - r.top);
	};
}

module.exports = Mouse;
