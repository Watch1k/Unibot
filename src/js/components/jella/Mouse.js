import Vec2 from './Vec2';

export default class Mouse {
	constructor(canvas) {
		this.init(canvas);
	}
	
	init(canvas) {
		this.pos = new Vec2(0, 0);
		this.down = false;
		const _this = this;
		window.addEventListener('mousemove', function (e) {
			const r = canvas.getBoundingClientRect();
			_this.pos.set(e.clientX - r.left, e.clientY - r.top);
		});
		window.addEventListener('mouseup', function () {
			_this.down = false;
		});
		window.addEventListener('mousedown', function (e) {
			_this.down = true;
			const r = canvas.getBoundingClientRect();
			_this.pos.set(e.clientX - r.left, e.clientY - r.top);
		});
	}
}
