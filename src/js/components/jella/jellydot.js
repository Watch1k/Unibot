export default class Dot {
	constructor(x, y, neihgbourhood) {
		this.originalX = x;
		this.originalY = y;
		
		this.startY = y;
		this.startX = x;
		this.step = 0;
		
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.friction = 0.3;
		this.radius = 4;
		this.rotation = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.float = 0;
		this.speedIsland = 0;
		this.spring = 0.09;
		this.alpha = 1;
		this.color = 'transparent';//rgba(255,0,0,1)
		this.lineWidth = 0;
		this.neighbors = [];
		this.neihgbourhood = neihgbourhood;
	}
	
	move(m) {
		let centerBall = { x: m.pos.x, y: m.pos.y, radius: this.neihgbourhood };
		
		// let radius = m.down?150:100;
		let radius = this.neihgbourhood;
		// var minDist = 180;
		// this.x += 1;
		// console.log(m.pos);
		
		let dx = -m.pos.x + this.x;
		let dy = -m.pos.y + this.y;
		var minDist = this.radius + radius;
		let dist = Math.sqrt(dx * dx + dy * dy);
		
		if (dist < minDist) {
			this.float = 0;
			
			var angle = Math.atan2(dy, dx),
				tx = centerBall.x + Math.cos(angle) * minDist,
				ty = centerBall.y + Math.sin(angle) * minDist;
			
			this.vx += (tx - this.x) / 10;
			this.vy += (ty - this.y) / 10;
			
		}
		
		this.vx *= this.friction;
		this.vy *= this.friction;
		
		if (this.motion) {
			
			if (this.route == 'vertical') {
				this.originalY = this.startY + this.backlash * Math.sin(this.step);
			}
			else if (this.route == 'horizontal') {
				this.originalX = this.startX + this.backlash * Math.cos(this.step);
			}
			else {
				this.originalX = this.startX + this.backlash * Math.cos(this.step);
				this.originalY = this.startY + this.backlash * Math.sin(this.step);
			}
			this.step += this.speedIsland;
		}
		
		// begin spir
		this.springBack();
		
		if (this.float > 0) {
			this.x = this.originalX + this.lastFloat * Math.sin(Math.PI * this.float / this.lastFloat);
			this.y = this.originalY + this.lastFloat * Math.sin(2 * Math.PI * this.float / this.lastFloat);
			// this.vx = 0;
			this.float = this.float - 1 / 30;
		}
		
		this.x += this.vx;
		this.y += this.vy;
		// console.log(this.float);
	}
	
	floatMe(amount) {
		// console.log('fl');
		if (this.float < 0.1) {
			this.float = amount;
			this.lastFloat = amount;
		}
		
	}
	
	floatMotion(amount, speed, backlash, route) {
		
		if (amount) {
			this.motion = amount;
			this.speedIsland = speed;
			this.backlash = backlash;
			this.route = route;
		}
		
	}
	
	addNeighbor(n, c, s) {
		var dist = Math.sqrt((n.x - this.x) * (n.x - this.x) + (n.y - this.y) * (n.y - this.y));
		this.neighbors.push({
			point: n,
			x: n.x,
			y: n.y,
			vx: n.vx,
			vy: n.vy,
			dist: dist,
			compress: c,
			strength: s
		});
	}
	
	addAcrossNeighbor(n) {
		this.addNeighbor(n, 1, 1);
	}
	
	setNeighbors(p, n) {
		this.addNeighbor(p, 30, 0.5);
	}
	
	springBack() {
		var dx1 = this.originalX - this.x;
		var dy1 = this.originalY - this.y;
		
		dx1 *= this.spring;
		dy1 *= this.spring;
		
		this.vx += dx1;
		this.vy += dy1;
		
	}
	
	think() {
		
		for (var i = 0, len = this.neighbors.length; i < len; i++) {
			// console.log(this.neighbors);
			var n = this.neighbors[i];
			var dx = this.x - n.x;
			var dy = this.y - n.y;
			
			var d = Math.sqrt(dx * dx + dy * dy);
			var a = (n.dist - d) / d * n.strength;
			if (d < n.dist) {
				a /= n.compress;
			}
			var ox = dx * a * this.friction;
			var oy = dy * a * this.friction;
			
			this.vx += ox;
			this.vy += oy;
			
			n.point.vx -= ox;
			n.point.vy -= oy;
		}
	};
	
	draw(context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		context.scale(this.scaleX, this.scaleY);
		context.lineWidth = this.lineWidth;
		context.globalAlpha = this.alpha;
		context.fillStyle = this.color;
		context.beginPath();
		//x, y, radius, start_angle, end_angle, anti-clockwise
		context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.stroke();
		context.restore();
	}
	
	drawAnchor(context) {
		context.save();
		context.translate(this.originalX, this.originalY);
		context.rotate(this.rotation);
		context.scale(this.scaleX, this.scaleY);
		context.lineWidth = this.lineWidth;
		context.globalAlpha = this.alpha;
		context.beginPath();
		//x, y, radius, start_angle, end_angle, anti-clockwise
		context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
		context.closePath();
		context.restore();
	}
	
	drawPixi(context) {
		//context.save();
		//context.moveTo(this.x, this.y);
		//context.rotation = this.rotation;
		//context.scaleX = this.scaleX;
		//context.scaleY = this.scaleY;
		//context.lineWidth = this.lineWidth;
		//context.globalAlpha = this.alpha;
		//context.fillStyle = this.color;
		context.lineStyle(0);
		context.drawCircle(this.x, this.y, this.radius);
		//context.restore();
	}
	
	movePixi(context) {
		console.log(context);
	}
	
}
