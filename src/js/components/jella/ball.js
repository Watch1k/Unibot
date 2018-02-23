function Ball(radius, color) {
	this.radius = radius || 20;
	
	this.color = color || '#EDC951';
	this.originalX = 0;
	this.originalY = 0;
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.rotation = 0;
	this.scaleX = 1;
	this.scaleY = 1;
	this.alpha = 0.5;
	this.lineWidth = 0;
	this.friction = 0.9;
	this.spring = 0.03;
}

Ball.prototype.move = function (m) {
	let centerBall = { x: m.pos.x, y: m.pos.y, radius: 150 };
	
	// let ball = this;
	var dx = this.x - centerBall.x;
	var dy = this.y - centerBall.y;
	var minDist = this.radius + 150;
	var dist = Math.sqrt(dx * dx + dy * dy);
	// console.log(this.x,this.y, dist,minDist,centerBall);
	if (dist < minDist) {
		var angle = Math.atan2(dy, dx),
			tx = centerBall.x + Math.cos(angle) * minDist,
			ty = centerBall.y + Math.sin(angle) * minDist;
		
		this.vx += tx - this.x;
		this.vy += ty - this.y;
	}
	console.log(tx, ty, this.x, this.vx, '1');
	
	this.vx *= this.friction;
	this.vy *= this.friction;
	console.log(tx, ty, this.x, this.vx, '2');
	// begin
	var dx1 = this.originalX - this.x;
	var dy1 = this.originalY - this.y;
	
	dx1 *= this.spring;
	dy1 *= this.spring;
	
	this.vx += dx1;
	this.vy += dy1;
	console.log(tx, ty, this.x, this.vx, '3');
	// end
	this.x += this.vx;
	this.y += this.vy;
};

Ball.prototype.draw = function (context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.scale(this.scaleX, this.scaleY);
	context.lineWidth = this.lineWidth;
	context.globalAlpha = this.alpha;
	context.fillStyle = this.color;
	context.beginPath();
	//x, y, radius, start_angle, end_angle, anti-clockwise
	context.arc(0, 0, this.radius, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();
	if (this.lineWidth > 0) {
		context.stroke();
	}
	context.restore();
};

Ball.prototype.getBounds = function (context) {
	return {
		x: this.x - this.radius,
		y: this.y - this.radius,
		width: this.radius * 2,
		height: this.radius * 2
	};
};
module.exports = Ball;
