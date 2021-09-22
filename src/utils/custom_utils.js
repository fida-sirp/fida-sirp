String.prototype.capitalize = function() {
    let s = this;
    return s && s.trim() && s.slice(0,1).toUpperCase() + s.slice(1);
}