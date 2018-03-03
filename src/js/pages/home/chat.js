import { TimelineMax, TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';
import PerfectScrollbar from 'perfect-scrollbar';
import { css } from '../../modules/dev/helpers';

class Chat {
	constructor() {
		this.container = document.querySelector('.chat');
		this.initBtn = document.querySelectorAll('.js-chat-init');
		this.iconBot = this.container.querySelector('.chat__icon-bot');
		this.closeBtn = this.container.querySelector('.chat__close-btn');
		this.content = this.container.querySelector('.chat__content');
		this.contentChat = this.container.querySelector('.chat__content-chat');
		
		this.divBot = this.container.querySelector('.chat__content-chat-bot');
		this.dataBotContainer = this.container.querySelector('.chat__data-bot');
		
		this.divHuman = this.container.querySelector('.chat__content-chat-human');
		
		this.btnContainer = this.container.querySelector('.chat__content-controls');
		this.divBtn = this.container.querySelector('.chat__content-controls-btn-wrap');
		this.dataBtnContainer = this.container.querySelector('.chat__data-btn');
		
		this.divMail = this.container.querySelector('.chat__content-controls-form');
		
		this.firstInitInd = true;
		
		this.paddingBottom = 120;
		this.controlsMinHeight = 83;
		this.chatHeight = this.contentChat.clientHeight + this.paddingBottom + this.controlsMinHeight;
		this.eventTarget = 0;
		this.ps = new PerfectScrollbar(this.contentChat, {
			wheelSpeed: 0.5,
			wheelPropagation: true,
			swipePropagation: true,
			swipeEasing: false
		});
		
		if (this.container) this.init();
	}
	
	init() {
		this.bindEvents();
	}
	
	bindEvents() {
		this.initBtn.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				this.openChat();
			});
		});
		
		this.closeBtn.addEventListener('click', () => {
			this.closeChat();
		});
		
		const shadow = () => {
			this.content.classList.add(css.active);
			this.ps.settings.wheelPropagation = false;
			this.contentChat.removeEventListener('ps-scroll-y', shadow);
			this.contentChat.addEventListener('ps-y-reach-start', () => {
				this.content.classList.remove(css.active);
			});
			this.contentChat.addEventListener('ps-scroll-down', () => {
				this.content.classList.add(css.active);
			});
		};
		this.contentChat.addEventListener('ps-scroll-y', shadow);
	}
	
	moveBtns(state = true) {
		const targetEl = [...this.contentChat.children].filter(item => {
			return item.classList.contains('chat__content-chat-bot') ||
				item.classList.contains('chat__content-chat-human');
		}).slice(-1)[0];
		let distance = targetEl.offsetTop + targetEl.clientHeight;
		
		distance = distance > this.contentChat.clientHeight ? this.contentChat.clientHeight : distance;
		this.controlsDistance = distance + 15;
		
		TweenMax.to(this.btnContainer, state ? 0 : 0.35, {
			y: distance + 15
		});
	}
	
	setPadding() {
		if (this.controlsDistance + this.paddingBottom + this.btnContainer.clientHeight > this.chatHeight) {
			this.chatHeight = this.controlsDistance + this.paddingBottom + this.btnContainer.clientHeight;
			TweenMax.to(this.container, 0.5, { height: this.chatHeight });
		}
	}
	
	animHuman(text) {
		const _this = this;
		const textContainer = document.createElement('div');
		const human = this.contentChat.appendChild(this.divHuman.cloneNode(true));
		const humanInner = human.children[0];
		
		humanInner.appendChild(textContainer);
		textContainer.innerHTML = text;
		
		TweenMax.to(_this.contentChat, 0.35, {
			scrollTo: _this.contentChat.scrollHeight - _this.contentChat.clientHeight,
			onComplete() {
				_this.moveBtns(false);
				_this.ps.update();
			}
		});
		
		TweenMax.fromTo(human, 0.35, {
			alpha: 0, y: 10
		}, {
			alpha: 1, y: 0,
			delay: 0.35,
			immediateRender: false,
			onComplete() {
				setTimeout(() => {
					_this.animBot(_this.eventTarget);
				}, 750);
			}
		});
	}
	
	animBot(targetIndex) {
		const _this = this;
		const tl = new TimelineMax();
		const phraseArray = this.dataBotContainer.querySelector(`[data-bot='${targetIndex}']`).children;
		const textContainer = document.createElement('div');
		let i = 0;
		
		function genMsg(i) {
			const phrase = this.contentChat.appendChild(this.divBot.cloneNode(true));
			const phraseInner = phrase.children[0];
			const currentTextContainer = textContainer.cloneNode();
			
			tl.clear();
			tl
				.add(() => {
					TweenMax.to(_this.contentChat, 0.25, {
						scrollTo: _this.contentChat.scrollHeight - _this.contentChat.clientHeight,
						onStart() {
							_this.moveBtns();
						},
						onComplete() {
							_this.ps.update();
						}
					});
				})
				.fromTo(phrase, 0.25, { alpha: 0, y: 10 }, { alpha: 1, y: 0, delay: 0.35, immediateRender: false })
				.add(this.waitBot(phraseInner));
			
			const tempWidth = phraseInner.clientWidth;
			const tempHeight = phraseInner.clientHeight;
			
			tl
				.add(() => {
					phraseInner.appendChild(currentTextContainer);
					TweenMax.set(currentTextContainer, { alpha: 0 });
					currentTextContainer.innerHTML = phraseArray[i].innerHTML;
				})
				.set(phraseInner, { width: 'auto', height: 'auto' })
				.add(() => {
					TweenMax.to(_this.contentChat, 0.35, {
						scrollTo: _this.contentChat.scrollHeight - _this.contentChat.clientHeight,
						onStart() {
							_this.moveBtns();
						},
						onComplete() {
							_this.ps.update();
						}
					});
				})
				.from(phraseInner, 0.35, {
					width: tempWidth, height: tempHeight, immediateRender: false
				})
				.fromTo(currentTextContainer, 0.25, { y: 5 }, { alpha: 1, y: 0, immediateRender: false });
			
			tl.vars.onComplete = () => {
				i++;
				if (i < phraseArray.length) {
					this::genMsg(i);
				} else {
					this.showButtons(this.eventTarget);
				}
			};
		}
		
		this::genMsg(i);
	}
	
	mail() {
		const form = this.divMail;
		this.btnContainer.appendChild(form);
		
		TweenMax.fromTo(form, 0.5, { y: 20 }, { alpha: 1, y: 0 });
	}
	
	showButtons(targetIndex) {
		this.moveBtns();
		
		if (targetIndex === 'last') {
			this.mail();
		} else {
			const tl = new TimelineMax();
			const btnArray = this.dataBtnContainer.querySelector(`[data-btn='${targetIndex}']`).children;
			
			for (let i = 0, len = btnArray.length; i < len; i++) {
				const btn = this.btnContainer.appendChild(this.divBtn.cloneNode(true));
				btn.querySelector('.btn__text').innerHTML = btnArray[i].innerHTML;
				btn.setAttribute('data-btn-event-target', btnArray[i].getAttribute('data-btn-event-target'));
				
				tl
					.set(btn, { y: 20 }, '-=0.15')
					.to(btn, 0.5, { alpha: 1, y: 0 }, '-=0.15');
				
				btn.addEventListener('click', (e) => {
					e.preventDefault();
					
					const btnTl = new TimelineMax();
					const siblingsBtn = [...btn.parentElement.children].filter(el => el !== btn);
					
					btnTl
						.to(btn, 0.3, {
							y: -60,
							x: btn.parentElement.clientWidth - btn.offsetLeft - btn.clientWidth
						}, 0)
						.to(btn, 0.20, {
							alpha: 0
						}, '-=0.20')
						.add(() => {
							this.eventTarget = btn.getAttribute('data-btn-event-target');
							this.animHuman(btn.querySelector('.btn__text').innerHTML);
						}, 0)
						.to(siblingsBtn, 0.1, { alpha: 0, y: 10 }, 0)
						.add(() => {
							[...btn.parentElement.children].forEach(el => el.remove());
						});
				});
			}
		}
		
		this.setPadding();
	}
	
	waitBot(phraseInner) {
		const waitTl = new TimelineMax();
		
		waitTl
			.set(phraseInner, { width: phraseInner.clientWidth, height: phraseInner.clientHeight })
			.staggerTo(phraseInner.children, 0.20, { alpha: 1, ease: Power1.easeInOut }, 0.05, 0)
			.staggerFromTo(phraseInner.children, 0.20, {
				y: 4
			}, {
				y: -4,
				repeat: 4,
				yoyo: true,
				ease: Power1.easeInOut
			}, 0.05, 0)
			.to(phraseInner.children, 0.20, {
				alpha: 0,
				ease: Power1.easeInOut
			}, '-=0.20')
			.add(() => {
				[...phraseInner.children].forEach(item => item.remove());
			});
		
		return waitTl;
	}
	
	openChat() {
		TweenMax.to(window, 1, { scrollTo: this.container.getBoundingClientRect().top + window.pageYOffset - 50 });
		
		const tl = new TimelineMax()
			.to(this.container, 0.5, { height: this.chatHeight })
			.addLabel('afterHeight', '')
			.to(this.closeBtn, 0.5, { alpha: 1 }, 'afterHeight+=0.25')
			.to(this.iconBot, 0.5, { alpha: 1 }, 'afterHeight+=0.75')
			.fromTo(this.iconBot, 0.5, { x: -30 }, { x: 0 }, 'afterHeight+=1')
			.to(this.content, 0.5, { autoAlpha: 1 }, '-=0.75');
		
		if (this.firstInitInd) {
			tl.add(() => this.initChat(), '-=0.5');
			this.firstInitInd = false;
		}
	}
	
	closeChat() {
		new TimelineMax()
			.to(this.content, 0.25, { autoAlpha: 0 }, 0)
			.to(this.container, 0.5, { height: 0 }, 0)
			.to(this.closeBtn, 0.25, { alpha: 0 }, 0)
			.to(this.iconBot, 0.25, { alpha: 0, x: -20 }, 0);
	}
	
	initChat() {
		this.animBot(this.eventTarget);
	}
}

export default new Chat();
