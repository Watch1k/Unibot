import { TimelineMax, TweenMax } from 'gsap';
import 'gsap/ScrollToPlugin';
import PerfectScrollbar from 'perfect-scrollbar';
import { css, Resp, validateEmail } from '../../modules/dev/helpers';

class Chat {
	constructor() {
		this.container = document.querySelector('.chat');
		if (!this.container) return;
		this.initBtn = [...document.querySelectorAll('.js-chat-init')];
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
		this.mailInit = false;
		
		this.paddingBottom = Resp.isMobile ? 180 : 120;
		this.controlsMinHeight = Resp.isMobile ? 38 : 83;
		this.chatHeight = this.contentChat.clientHeight + this.paddingBottom + this.controlsMinHeight;
		this.eventTarget = this.dataBotContainer.children[0].getAttribute('data-bot');
		this.ps = new PerfectScrollbar(this.contentChat, {
			wheelSpeed: 0.5,
			wheelPropagation: true,
			swipeEasing: false
		});
		
		this.init();
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
		if (!Resp.isMobile) this.contentChat.addEventListener('ps-scroll-y', shadow);
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
	
	animHuman(text, data = false) {
		const _this = this;
		const textContainer = document.createElement('div');
		const human = this.contentChat.appendChild(this.divHuman.cloneNode(true));
		const humanInner = human.children[0];
		const mailState = validateEmail(data.toString());
		
		humanInner.appendChild(textContainer);
		textContainer.innerHTML = text;
		
		TweenMax.to(_this.contentChat, 0.35, {
			scrollTo: { y: _this.contentChat.scrollHeight - _this.contentChat.clientHeight, autoKill: false },
			onComplete() {
				_this.moveBtns(false);
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
					if (data) {
						if (mailState) {
							_this.animBot('submit', data);
						} else {
							_this.animBot('rejected');
						}
					} else {
						_this.animBot(_this.eventTarget);
					}
				}, 750);
			}
		});
	}
	
	animBot(targetIndex, data = false) {
		if (targetIndex === 'null') return;
		
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
						scrollTo: { y: _this.contentChat.scrollHeight - _this.contentChat.clientHeight, autoKill: false },
						onStart() {
							_this.moveBtns();
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
						scrollTo: { y: _this.contentChat.scrollHeight - _this.contentChat.clientHeight, autoKill: false },
						onStart() {
							_this.moveBtns();
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
					if (targetIndex === 'rejected') this.eventTarget = 'rejected';
					this.showButtons(this.eventTarget);
				}
			};
		}
		
		this::genMsg(i);
	}
	
	mail() {
		const _this = this;
		const tl = new TimelineMax();
		const form = this.divMail;
		
		this.btnContainer.appendChild(form);
		tl.fromTo(form, 0.5, { y: 20 }, { alpha: 1, y: 0 });
		
		if (!this.mailInit) {
			form.addEventListener('submit', submit);
			
			function submit(e) {
				e.preventDefault();
				const data = form.querySelector('[type="email"]').value;
				
				tl
					.to(_this.btnContainer, 0.5, { alpha: 0 })
					.add(() => {
						_this.animHuman(data, data);
					});
			}
			
			this.mailInit = true;
		}
	}
	
	showButtons(targetIndex) {
		this.moveBtns();
		
		if (targetIndex === 'last') {
			this.mail();
		} else {
			const tl = new TimelineMax();
			const btnArray = this.dataBtnContainer.querySelector(`[data-btn='${targetIndex}']`).children;
			
			if (targetIndex === 'rejected') {
				this.btnContainer.removeChild(this.btnContainer.firstChild);
				this.divMail.reset();
				tl.set(this.btnContainer, { alpha: 1 });
			}
			
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
							this.eventTarget = btn.getAttribute('data-btn-event-target') || false;
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
		const offsetTop = Resp.isDesk ? 50 : 150;
		
		if (Resp.isMobile) {
			TweenMax.to(window, 0.75, {
				scrollTo: {
					y: this.container.parentNode,
					autoKill: false
				}
			});
		} else {
			TweenMax.to(window, 1, { scrollTo: { y: this.container.getBoundingClientRect().top + window.pageYOffset - offsetTop, autoKill: false } });
		}
		
		const tl = new TimelineMax()
			.to(this.container, 0.5, { height: this.chatHeight })
			.addLabel('afterHeight', '')
			.to(this.closeBtn, 0.5, { alpha: 1 }, 'afterHeight+=0.25')
			.fromTo(this.iconBot, 0.5, { alpha: 0, x: -20 }, { alpha: 1, x: 0 }, 'afterHeight+=0.75')
			.to(this.content, 0.5, { autoAlpha: 1 }, Resp.isMobile ? '-=0.75' : '-=0.25');
		
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
