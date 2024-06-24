// exports.perimeter = (l, w) => 2*(l+w)
// exports.area = (l, w) => l * w

function perimeter(l, w){
    return 2*(l+w);
}

function area(l, w){
   return l * w;
}

module.exports = {
    perimeter,
    area
}