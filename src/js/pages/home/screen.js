import Jelateria from '../../components/jella/jelaModule';
import { TweenMax, TimelineMax } from 'gsap';
import ScrollAnim from '../../modules/dev/animation/scrollAnim';

export default class HomeScreen {
	constructor() {
		this.init();
		this.test();
	}
	
	init() {
		const container = document.querySelector('.screen');
		const paymentPartsFirst = new Jelateria({
			container: document.querySelector('.screen__canvas'),
			ratioState: true,
			paths: [{
				radius: 70,
				path: '#path-screen-1',
				bottom: true,
				offsetX: -75,
				offsetY: -165,
				points: 15,
				scale: 32,
				motion: true,
				backlash: 10,
				speedMotion: 0.015
			}, {
				radius: 100,
				path: '#path-screen-2',
				offsetX: -290,
				offsetY: -45,
				points: 25,
				scale: 32,
				right: true,
				motion: true,
				backlash: 10,
				speedMotion: 0.01
			}, {
				radius: 70,
				path: '#path-screen-3',
				bottom: true,
				offsetX: -20,
				offsetY: -175,
				points: 15,
				scale: 32,
				blur: 4,
				left: true,
				motion: true,
				backlash: 10,
				speedMotion: 0.0075
			}, {
				radius: 70,
				path: '#path-screen-4',
				bottom: true,
				offsetX: 160,
				offsetY: -310,
				points: 15,
				scale: 32,
				blur: 7,
				motion: true,
				backlash: 20,
				speedMotion: 0.005,
				reverseMotion: true
			}, {
				radius: 100,
				path: '#path-screen-5',
				bottom: true,
				offsetX: -320,
				offsetY: -380,
				points: 20,
				scale: 32,
				right: true,
				motion: true,
				backlash: 10,
				reverseMotion: true,
				speedMotion: 0.0075
			}],
			gradients: [{
				name: 'screen-gradient-1'
			}, {
				name: 'screen-gradient-2',
				offsetX: 11,
				offsetY: 7
			}, {
				name: 'screen-gradient-3'
			}, {
				name: 'screen-gradient-4'
			}, {
				name: 'screen-gradient-5',
				offsetX: 11,
				offsetY: 19
			}]
		});
		
		new ScrollAnim({
			el: container,
			inView: true,
			reverse: true,
			onEnter() {
				paymentPartsFirst.start();
			},
			onLeave() {
				paymentPartsFirst.stop();
			}
		});
	}
	
	test() {
		function(t, e, i) {
			'use strict';
			var n = i(308),
				r = i.n(n),
				s = i(44),
				a = i.n(s),
				o = {
					mouse: {
						x: 0,
						y: 0
					},
					install: function(t) {
						t.directive('bezier-ellipse', function(t, e) {
							o._bezierNode(t, e), o._attachMouseMoveEvent();
						});
					},
					_bezierNode: function(t, e) {
						e.value.active ? o._explode(t.querySelector(e.value.containerSelector), e.value.ellipses, e.value.duration, e.value.delta, e.value.delay, e.value.stroke) : void 0 !== e.oldValue && o._implode(t.querySelector(e.oldValue.containerSelector), e.oldValue.duration, e.oldValue.delay);
					},
					_explode: function(t, e, i, n, r, s) {
						var a = o._getEllipsesNodeList(e - 1, s);
						a.push(o._getFillerEllipse(s)), o._addEllipsesTo(t, a), o._randomizeEllipses(a, i, n, r);
					},
					_implode: function(t) {
						var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5,
							i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
							n = t.querySelectorAll('.vue-bezier-ellipse-container svg');
						TweenMax.killTweensOf(n), TweenMax.set(n, {
							opacity: .5
						});
						var r = !0,
							s = !1,
							l = void 0;
						try {
							for (var c, u = a()(n); !(r = (c = u.next()).done); r = !0) {
								var h = c.value;
								TweenMax.set(h, {
									opacity: .5
								}), TweenMax.to(h, e / 10, {
									opacity: 0
								}), TweenMax.to(h, e / 5, {
									xPercent: '0%',
									yPercent: '0%',
									rotation: 0,
									ease: Power0.easeNone,
									delay: o._getRandomFloatValueBetween(0, i / 3),
									scaleX: 0,
									scaleY: 0,
									scaleZ: 0,
									onComplete: function() {
										this.target.parentNode.removeChild(this.target);
									}
								});
							}
						} catch (t) {
							s = !0, l = t;
						} finally {
							try {
								!r && u.return && u.return();
							} finally {
								if (s) throw l;
							}
						}
					},
					_addEllipsesTo: function(t, e) {
						var i = o._getAnimationContainer(),
							n = !0,
							r = !1,
							s = void 0;
						try {
							for (var l, c = a()(e); !(n = (l = c.next()).done); n = !0) {
								var u = l.value;
								i.appendChild(u);
							}
						} catch (t) {
							r = !0, s = t;
						} finally {
							try {
								!n && c.return && c.return();
							} finally {
								if (r) throw s;
							}
						}
						return t.appendChild(i), i.querySelectorAll('svg');
					},
					_getAnimationContainer: function() {
						var t = document.createElement('div');
						return t.setAttribute('class', 'vue-bezier-ellipse-container'), t.setAttribute('style', 'position: absolute; top: 0; left: 0; width: 100%; height: 100%'), t;
					},
					_getFillerEllipse: function(t) {
						return o._getEllipseNode(!1, t);
					},
					_getEllipsesNodeList: function(t, e) {
						for (var i = [], n = 0; n < t; n++) i.push(o._getEllipseNode(!0, e));
						return i;
					},
					_getEllipseNode: function() {
						var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
							e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
							i = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
							n = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
						return i.setAttributeNS(null, 'viewBox', '0 0 341 133'), t && i.setAttributeNS(null, 'style', 'position: absolute; top: 0; left: 0'), n.setAttributeNS(null, 'y', '1'), n.setAttributeNS(null, 'width', '340'), n.setAttributeNS(null, 'height', '132.11'), n.setAttributeNS(null, 'rx', '66'), n.setAttributeNS(null, 'ry', '66'), n.setAttributeNS(null, 'style', 'fill:none;stroke:#fff;stroke-opacity:1;stroke-miterlimit:10;stroke-width:' + e + 'px'), i.appendChild(n), i;
					},
					_morphEllipses: function(t) {
						o._attachMouseMoveEvent();
						var e = !0,
							i = !1,
							n = void 0;
						try {
							for (var r, s = a()(t); !(e = (r = s.next()).done); e = !0) {
								var l = r.value;
								o._shakeEllipse(l);
							}
						} catch (t) {
							i = !0, n = t;
						} finally {
							try {
								!e && s.return && s.return();
							} finally {
								if (i) throw n;
							}
						}
					},
					_shakeEllipse: function(t) {
						var e = MorphSVGPlugin.convertToPath(t.querySelector('rect')),
							i = o._getEllipseInstructions(t.querySelector('path')),
							n = o._getBezierPoints(e[0]),
							s = JSON.parse(r()(n)),
							l = [0, 7, 12, 19],
							c = [3, 4, 15, 16],
							u = [0, 3, 4, 7, 12, 15, 16, 19];
						TweenMax.ticker.addEventListener('tick', function() {
							var e = !0,
								r = !1,
								h = void 0;
							try {
								for (var d, p = a()(u); !(e = (d = p.next()).done); e = !0) ! function() {
									var e = d.value,
										r = l.some(function(t) {
											return t === e;
										}) ? parseFloat(s[e].x) + 15 * (o.mouse.x > 900 ? -1 : 1) * (e % 2 == 0 ? 1 : -1) : parseFloat(s[e].x),
										a = c.some(function(t) {
											return t === e;
										}) ? parseFloat(s[e].y) + 10 * (o.mouse.y > 500 ? -1 : 1) * (e % 2 == 0 ? -1 : 1) : parseFloat(s[e].y);
									TweenMax.to(n[e], .75, {
										x: r,
										y: a,
										onUpdate: function() {
											t.querySelector('path').setAttribute('d', i + o._bezierPointsToPathD(n));
										},
										ease: Bounce.easeOut
									});
								}();
							} catch (t) {
								r = !0, h = t;
							} finally {
								try {
									!e && p.return && p.return();
								} finally {
									if (r) throw h;
								}
							}
						});
					},
					_attachMouseMoveEvent: function() {
						window.addEventListener('mousemove', function(t) {
							o.mouse = {
								x: t.clientX,
								y: t.clientY
							};
						});
					},
					_getBezierPoints: function(t) {
						for (var e = t.getAttribute('d').split('C')[1].split('z')[0].split(','), i = [], n = 0; n < e.length; n += 2) i.push({
							x: e[n],
							y: e[n + 1]
						});
						return i;
					},
					_bezierPointsToPathD: function(t) {
						return 'C' + t.map(function(t) {
							return t.x + ',' + t.y;
						}).join() + 'z';
					},
					_getEllipseInstructions: function(t) {
						return t.getAttribute('d').split('C')[0];
					},
					_randomizeEllipses: function(t) {
						var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5,
							i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 30,
							n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 3;
						e = o._getDurationSpan(e, i);
						var r = !0,
							s = !1,
							l = void 0;
						try {
							for (var c, u = a()(t); !(r = (c = u.next()).done); r = !0) {
								var h = c.value;
								o._recursiveRandomEllipse(h, e.avg, e.min, e.max, o._getRandomFloatValueBetween(n, 2 * n));
							}
						} catch (t) {
							s = !0, l = t;
						} finally {
							try {
								!r && u.return && u.return();
							} finally {
								if (s) throw l;
							}
						}
					},
					_recursiveRandomEllipse: function(t, e, i, n) {
						var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0;
						TweenMax.to(t, e, {
							delay: r,
							xPercent: o._getRandomIntValueBetween(-10, 10) + '%',
							yPercent: o._getRandomIntValueBetween(-10, 10) + '%',
							rotation: o._getRandomIntValueBetween(-10, 10),
							scaleX: o._getRandomFloatValueBetween(1, 1.25),
							scaleY: o._getRandomFloatValueBetween(1, 1.25),
							scaleZ: o._getRandomFloatValueBetween(1, 1.25),
							ease: Power0.easeNone,
							onComplete: function() {
								o._recursiveRandomEllipse(t, o._getRandomFloatValueBetween(i, n), i, n);
							},
							onUpdate: function() {
								var e = t.getBoundingClientRect().left + t.getBoundingClientRect().width / 2,
									i = t.getBoundingClientRect().top + t.getBoundingClientRect().height / 2,
									n = Math.sqrt((e - o.mouse.x) * (e - o.mouse.x) + (i - o.mouse.y) * (i - o.mouse.y)),
									r = Math.sqrt(window.innerHeight * window.innerHeight + window.innerWidth * window.innerWidth),
									s = 1 - n / r;
								this.timeScale(s * (6 * s));
							}
						});
					},
					_getRandomIntValueBetween: function(t, e) {
						return t = Math.ceil(t), e = Math.floor(e), Math.floor(Math.random() * (e - t + 1)) + t;
					},
					_getRandomFloatValueBetween: function(t, e) {
						return Math.random() * (e - t) + t;
					},
					_getDurationSpan: function(t, e) {
						var i = e / 100 * t;
						return {
							min: t - i,
							max: t + i,
							avg: t
						};
					}
				};
			e.a = o;
		}
	}
}
