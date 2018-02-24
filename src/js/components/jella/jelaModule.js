import * as filters from 'pixi-filters';
import Ball from './ball';
import Dot from './jellydot';
import Mouse from './Mouse';
import SvgParse from './SvgParse';

export default class Jelateria {
	constructor(opts) {
		this.canvas = document.getElementById(opts.canvas);
		this.ctx = this.canvas.getContext('2d');
		this.paths = opts.paths;
		this.islands = [];
		this.radius = opts.radius || 50;
		this.m = new Mouse(this.canvas);
		this.parsePaths();
		this.paused = true;
		this.centerBall = new Ball(this.radius, 'transparent');
		this.draw();
		
		this.blurState = false;
		
		this.canvas.setAttribute('width', `${this.canvas.offsetWidth}px`);
		this.canvas.setAttribute('height', `${this.canvas.offsetHeight}px`);
		let style = window.getComputedStyle(this.canvas);
		this.height = parseInt(style.height);
		this.width = parseInt(style.width);
		this.time = 0;
		
		this.tick();
		
		this.initPixi();
	}
	
	initPixi() {
		PIXI.utils.skipHello();
		this.app = new PIXI.Application(800, 600, { antialias: true, transparent: true, resolution: window.devicePixelRatio });
		document.querySelector('main').appendChild(this.app.view);
		this.app.view.classList.add('canvas2');
		this.container = new PIXI.Container();
		this.container.x = 0;
		this.container.y = 0;
		this.mPixi = new Mouse(this.app.view);
		const graphics = new PIXI.Graphics();
		this.graphics2 = new PIXI.Graphics();
		const gradient = new PIXI.Sprite.fromImage('static/img/gradient.png');
		
		gradient.anchor.set(0.5, 0.5);
		gradient.scale.set(2.5);
		gradient.x = 300;
		gradient.y = 150;
		
		this.islands.forEach(island => {
			island.dots.forEach(dot => {
				dot.think();
			});
			island.dots.forEach(dot => {
				dot.move(this.mPixi);
				dot.drawPixi(graphics);
				dot.drawPixi(this.graphics2);
			});
			//this.ConnectDots(island);
		});
		this.container.addChild(gradient);
		this.app.stage.addChild(this.container);
		this.app.stage.addChild(graphics);
		this.app.stage.addChild(this.graphics2);
		this.graphics2.scale.set(1.2);
		this.container.mask = graphics;
		this.graphics2.mask = graphics;
		
		this.app.ticker.add(() => {
			graphics.clear();
			
			this.islands.forEach(island => {
				island.dots.forEach(dot => {
					dot.think();
				});
				island.dots.forEach(dot => {
					dot.move(this.mPixi);
					dot.drawPixi(graphics);
					dot.drawPixi(this.graphics2);
				});
				this.ConnectDotsPixi(island, graphics);
				this.ConnectDotsPixi(island, this.graphics2);
			});
		});
	}
	
	parsePaths() {
		this.paths.forEach(path => {
			let island = {};
			island.dots = [];
			SvgParse(
				path.path,
				path.points,
				path.offsetX,
				path.offsetY,
				path.scale,
				path.strokeFlag,
				path.speedIsland,
				path.motion,
				path.backlash,
				path.route
			).forEach(dot => {
				island.dots.push(new Dot(dot[0], dot[1], this.radius));
			});
			island.color = path.color;
			island.float = path.float;
			island.speedIsland = path.speedIsland;
			island.strokeFlag = path.strokeFlag || false;
			island.motion = path.motion || false;
			island.backlash = path.backlash || 0;
			island.route = path.route || null;
			this.islands.push(island);
		});
	}
	
	floatEffect(island) {
		//
		let amplitude = island.float;
		let motion = island.motion;
		let speed = island.speedIsland;
		let backlash = island.backlash;
		let route = island.route;
		island.dots.forEach(dot => {
			if (parseInt(dot.x) === parseInt(dot.originalX) && parseInt(dot.y) === parseInt(dot.originalY)) {
				dot.floatMe(amplitude + amplitude * Math.random() * 2);
				if (motion) {
					dot.floatMotion(motion, speed, backlash, route);
				}
				
			}
			
		});
	}
	
	ConnectDots(island) {
		let dots = island.dots;
		
		if (island.strokeFlag) {
			this.ctx.beginPath();
			this.ctx.moveTo(dots[0].x, dots[0].y);
			
			const i = 1;
			for (let i = 1; i < dots.length - 2; i++) {
				const xc = (dots[i].x + dots[i + 1].x) / 2;
				const yc = (dots[i].y + dots[i + 1].y) / 2;
				this.ctx.quadraticCurveTo(dots[i].x, dots[i].y, xc, yc);
			}
			this.ctx.quadraticCurveTo(dots[i].x, dots[i].y, dots[i + 1].x, dots[i + 1].y);
			this.ctx.quadraticCurveTo(dots[i + 1].x, dots[i + 1].y, dots[0].x, dots[0].y);
			
			this.ctx.strokeStyle = island.color;
			this.ctx.stroke();
		} else {
			this.ctx.beginPath();
			
			for (let i = 0, jLen = dots.length; i <= jLen; ++i) {
				const p0 = dots[i >= jLen ? i - jLen : i];
				const p1 = dots[i + 1 >= jLen ? i + 1 - jLen : i + 1];
				this.ctx.quadraticCurveTo(
					p0.x,
					p0.y,
					(p0.x + p1.x) * 0.5,
					(p0.y + p1.y) * 0.5
				);
			}
			
			this.ctx.closePath();
			this.ctx.fillStyle = island.color;
			this.ctx.fill();
		}
		
	}
	
	ConnectDotsPixi(island, graphics) {
		let dots = island.dots;
		
		graphics.beginFill();
		graphics.moveTo(dots[0].x, dots[0].y);
		
		if (island.strokeFlag) {
			const i = 1;
			for (let i = 1; i < dots.length - 2; i++) {
				const xc = (dots[i].x + dots[i + 1].x) / 2;
				const yc = (dots[i].y + dots[i + 1].y) / 2;
				graphics.quadraticCurveTo(dots[i].x, dots[i].y, xc, yc);
			}
			graphics.quadraticCurveTo(dots[i].x, dots[i].y, dots[i + 1].x, dots[i + 1].y);
			graphics.quadraticCurveTo(dots[i + 1].x, dots[i + 1].y, dots[0].x, dots[0].y);
			
			graphics.strokeStyle = island.color;
			graphics.stroke();
		} else {
			for (let i = 0, jLen = dots.length; i <= jLen; ++i) {
				const p0 = dots[i >= jLen ? i - jLen : i];
				const p1 = dots[i + 1 >= jLen ? i + 1 - jLen : i + 1];
				graphics.quadraticCurveTo(
					p0.x,
					p0.y,
					(p0.x + p1.x) * 0.5,
					(p0.y + p1.y) * 0.5
				);
			}
			//graphics.lineStyle(4, 0xffd900, 1);
			graphics.lineStyle(0);
			graphics.endFill();
			const blurFilter = new PIXI.filters.BlurFilter(3);
			const glowFilter = new filters.GlowFilter(20, 0.25, 0.25, 0xffffff);
			if (this.blurState) {
				this.graphics2.filters = [glowFilter, blurFilter];
			} else {
				this.graphics2.filters = [glowFilter];
			}
			//graphics.fillStyle = island.color;
			//graphics.fill();
		}
		
	}
	
	blurToggle() {
		this.blurState = !this.blurState;
	}
	
	draw() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		
		// mouse draw
		this.centerBall.x = this.m.pos.x;
		this.centerBall.y = this.m.pos.y;
		this.centerBall.draw(this.ctx);
		// end
		
		this.islands.forEach(island => {
			this.floatEffect(island);
			island.dots.forEach(dot => {
				dot.think();
			});
			island.dots.forEach(dot => {
				dot.move(this.m);
				dot.draw(this.ctx);
				dot.drawAnchor(this.ctx);
			});
			//this.ConnectDots(island);
		});
		cancelAnimationFrame(this.fr);
	}
	
	tick() {
		if (!this.paused) {
			this.time++;
			this.draw();
		}
		this.fr = window.requestAnimationFrame(this.tick.bind(this));
	}
	
	pause() {
		this.paused = true;
	}
	
	play() {
		this.paused = false;
	}
}
