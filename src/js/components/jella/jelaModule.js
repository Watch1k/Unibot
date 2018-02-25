import 'pixi.js';
import Dot from './jellydot';
import Mouse from './Mouse';
import SvgParse from './SvgParse';

export default class Jelateria {
	constructor(opts) {
		this.canvasContainer = opts.container;
		this.canvasWidth = this.canvasContainer.offsetWidth;
		this.canvasHeight = this.canvasContainer.offsetHeight;
		this.paths = opts.paths;
		this.islands = [];
		this.radius = opts.radius || 50;
		this.jellyArray = [];
		this.parsePaths();
		this.offsetX = opts.paths[0].offsetX;
		this.offsetY = opts.paths[0].offsetY;
		this.gradients = opts.gradients;
		
		this.initPixi();
	}
	
	initPixi() {
		PIXI.utils.skipHello();
		this.app = new PIXI.Application(this.canvasWidth, this.canvasHeight, { antialias: true, transparent: true });
		this.canvasContainer.appendChild(this.app.view);
		this.canvas = this.app.view;
		this.canvas.setAttribute('width', `${this.canvasWidth}px`);
		this.canvas.setAttribute('height', `${this.canvasHeight}px`);
		this.canvas.setAttribute('data-jelly', 'true');
		const style = window.getComputedStyle(this.canvas);
		this.height = parseInt(style.height);
		this.width = parseInt(style.width);
		
		this.mPixi = new Mouse(this.app.view);
		
		this.paths.forEach((el, index) => {
			this.jellyArray.push(this.initJelly(index));
		});
		
		this.app.ticker.add(() => {
			this.jellyArray.forEach((jelly, index) => {
				jelly.graphics.clear();
				
				this.islands[index].dots.forEach(dot => {
					dot.think();
				});
				this.islands[index].dots.forEach(dot => {
					dot.move(this.mPixi);
					dot.drawPixi(jelly.graphics);
				});
				this.ConnectDotsPixi(this.islands[index], jelly.graphics);
			});
		});
	}
	
	initJelly(curIndex) {
		const graphics = new PIXI.Graphics();
		const container = new PIXI.Container();
		const gradient = new PIXI.Sprite.fromImage(`static/img/${this.gradients[curIndex].name}.png`);
		
		container.x = 0;
		container.y = 0;
		
		gradient.texture.baseTexture.on('loaded', () => {
			const curWidth = gradient.width;
			const curHeight = gradient.height;
			gradient.anchor.set(0.5, 0.5);
			gradient.scale.set(1.4);
			gradient.x = this.canvasWidth / 2 + this.paths[curIndex].offsetX + curWidth / 2;
			gradient.y = this.paths[curIndex].offsetY + curHeight / 2;
		});
		
		container.addChild(gradient);
		this.app.stage.addChild(container);
		this.app.stage.addChild(graphics);
		container.mask = graphics;
		
		if (this.paths[curIndex].blur) {
			const blurFilter = new PIXI.filters.BlurFilter(this.paths[curIndex].blur);
			container.filters = [blurFilter];
		}
		
		return {
			graphics: graphics,
			container: container,
			gradient: gradient
		};
	}
	
	parsePaths() {
		this.paths.forEach((path, index) => {
			let island = {};
			island.dots = [];
			const offsetX = this.canvasWidth / 2 + path.offsetX;
			SvgParse(
				path.path,
				path.points,
				offsetX,
				path.offsetY,
				path.scale,
				path.speedIsland,
				path.motion,
				path.backlash,
				path.route
			).forEach(dot => {
				island.dots.push(new Dot(dot[0], dot[1], this.paths[index].radius));
			});
			island.color = path.color;
			island.float = path.float;
			island.speedIsland = path.speedIsland;
			island.motion = path.motion || false;
			island.backlash = path.backlash || 0;
			island.route = path.route || null;
			this.islands.push(island);
		});
	}
	
	ConnectDotsPixi(island, graphics) {
		let dots = island.dots;
		
		graphics.beginFill();
		graphics.moveTo(dots[0].x, dots[0].y);
		
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
		graphics.endFill();
	}
	
	pause() {
	}
	
	play() {
	}
}
