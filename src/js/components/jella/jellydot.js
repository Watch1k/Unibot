export default class Dot {
	constructor(x, y, neihgbourhood) {
		this.originalX = x;
		this.originalY = y;
		
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.friction = 0.3;
		this.radius = 4;
		this.float = 0;
		this.speedIsland = 0;
		this.spring = 0.09;
		this.color = 'transparent';
		this.neighbors = [];
		this.neihgbourhood = neihgbourhood;
	}
	
	move(m) {
		let centerBall = { x: m.pos.x, y: m.pos.y, radius: this.neihgbourhood };
		
		let radius = this.neihgbourhood;
		
		let dx = -m.pos.x + this.x;
		let dy = -m.pos.y + this.y;
		const minDist = this.radius + radius;
		let dist = Math.sqrt(dx * dx + dy * dy);
		
		if (dist < minDist) {
			this.float = 0;
			
			const angle = Math.atan2(dy, dx),
				tx = centerBall.x + Math.cos(angle) * minDist,
				ty = centerBall.y + Math.sin(angle) * minDist;
			
			this.vx += (tx - this.x) / 10;
			this.vy += (ty - this.y) / 10;
			
		}
		
		this.vx *= this.friction;
		this.vy *= this.friction;
		
		// begin spring
		this.springBack();
		
		this.x += this.vx;
		this.y += this.vy;
	}
	
	springBack() {
		let dx1 = this.originalX - this.x;
		let dy1 = this.originalY - this.y;
		
		dx1 *= this.spring;
		dy1 *= this.spring;
		
		this.vx += dx1;
		this.vy += dy1;
		
	}
	
	think() {
		let i = 0;
		const len = this.neighbors.length;
		for (; i < len; i++) {
			const n = this.neighbors[i];
			const dx = this.x - n.x;
			const dy = this.y - n.y;
			
			const d = Math.sqrt(dx * dx + dy * dy);
			let a = (n.dist - d) / d * n.strength;
			if (d < n.dist) {
				a /= n.compress;
			}
			const ox = dx * a * this.friction;
			const oy = dy * a * this.friction;
			
			this.vx += ox;
			this.vy += oy;
			
			n.point.vx -= ox;
			n.point.vy -= oy;
		}
	};
	
	drawPixi(context) {
		context.drawCircle(this.x, this.y, this.radius);
	}
}
