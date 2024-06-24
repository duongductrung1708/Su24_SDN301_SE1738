const Rectangle = require('./rectangle');

function callRectangle(l, w){
    if(l == 0 || w == 0)
        console.log("Length or Width greater than zero!");
    else{
        console.log(`Perimeter: ${Rectangle.perimeter(l, w)}`);
        console.log(`Area: ${Rectangle.area(l, w)}`);
    }
}

callRectangle(10, 5);
callRectangle(20, 15);