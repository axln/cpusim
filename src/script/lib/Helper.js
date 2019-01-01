'use strict';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Helper() {}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.uid = function (length) {
    var chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var password = '';
    for(var i = 0; i < length; ++i) {
        password += chars[Helper.randomInteger(0, chars.length - 1)];
    }
    return password;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.randomInteger = function (min, max) {
    var rand = min + Math.random() * (max - min);
    return Math.round(rand);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.getNormalPath = function (point1, point2, yFirst) {
    //console.log('Helper.getNormalPath', arguments);
    if (point1.left == point2.left || point1.top == point2.top) {
        return [
            point2
        ];
    } else if (yFirst === true) {
        return [
            {
                left: point1.left,
                top : point2.top
            },
            point2
        ];
    } else {
        return [
            {
                left: point2.left,
                top : point1.top
            },
            point2
        ];
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.clone = function (obj) {
    return JSON.parse(JSON.stringify(obj));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.cloneArray = function (arr) {
    return JSON.parse(JSON.stringify(arr));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.number2BinString = function (dec) {
    // >>> is the unsigned right shift operator which converts number to 32 bit unsigned integer
    return (dec >>> 0).toString(2);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.number2BinStringWithPadding = function (dec) {
    var binaryStr = Helper.number2BinString(dec);
    // zero padding
    var count = 8 - binaryStr.length;
    for (var k = 0; k < count; ++k) {
        binaryStr = '0' + binaryStr;
    }
    return binaryStr;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.binStringToNumber = function (binString) {
    // >>> is the unsigned right shift operator which converts number to 32 bit unsigned integer
    return parseInt(binString, 2);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.busStateToNumber = function (lines) {
    var binaryString = '';
    for (var i = 0; i < lines.length; ++i) {
        binaryString = lines[i].toString() + binaryString;
    }
    return parseInt(binaryString, 2);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.numberToHexString = function (number) {
    var strVal = number.toString(16).toUpperCase();
    if (number <= 0xF) {
        strVal = '0' + strVal;
    }
    return '0x' + strVal;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.pointInRect = function (point, rect) {
    return point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Helper.rectOverlap = function (rect1, rect2) {
    var xOverlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
    var yOverlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
    return xOverlap * yOverlap > 0;
};


module.exports = Helper;