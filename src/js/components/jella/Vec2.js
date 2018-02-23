function Vec2(x, y) {
    this.x = x;
    this.y = y;
}
Vec2.prototype.set = function(x, y) {
    this.x = x;
    this.y = y;
    return this;
};
Vec2.prototype.copy = function(v) {
    return this.set(v.x, v.y);
};
Vec2.prototype.translate = function(x, y) {
    return this.set(this.x + x, this.y + y);
};
Vec2.prototype.scale = function(v) {
    return this.set(this.x * v, this.y * v);
};
Vec2.prototype.distance = function(o) {
    var dx = this.x - o.x, dy = this.y - o.y;
    return Math.sqrt(dx * dx + dy * dy);
};

module.exports = Vec2;
