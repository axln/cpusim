'use strict';

var Helper = require('./Helper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Assembly() {}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function regToNumber(reg) {
    switch (reg) {
        case 'r0':
            return 0;
        case 'r1':
            return 1;
        case 'r2':
            return 2;
        case 'r3':
            return 3;
        default:
            throw new Error('Unknown register: ' + reg);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generate2Reg(parsedLine) {
    var self = this;

    var regA = regToNumber(parsedLine.operands[0]);
    var regB = regToNumber(parsedLine.operands[1]);

    return [(self.code << 4) + (regA << 2) + regB];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generateInOut(parsedLine) {
    var self = this;
    var instrType =  parsedLine.mnemonic == 'in' ? 0 : 1; // in or out
    var regB = regToNumber(parsedLine.operands[1]);
    if (parsedLine.operands[0] == 'data') {
        return [(self.code << 4) + (instrType << 3) + regB];
    } else if (parsedLine.operands[0] == 'addr') {
        return [(self.code << 4) + (instrType << 3) + (1 << 2) + regB];
    } else {
        throw new Error('Unknown in/out operand value: ' + parsedLine.operands[0]);
    }
 }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.INSTR = {
    db: {
        opCount: 1,
        length: 1,
        generate: function (parsedLine) {
            return [parseInt(parsedLine.operands[0])];
        }
    },
    ld: {
        code   : 0, // 0000
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    st: {
        code   : 1, // 0001
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    data: {
        code   : 2, // 0010
        opCount: 2,
        length : 2,
        generate: function (parsedLine) {
            var self = this;
            var regB = regToNumber(parsedLine.operands[0]);
            return [(self.code << 4) + regB, parseInt(parsedLine.operands[1])];
        }
    },
    jmpr: {
        code   : 3, // 0011
        opCount: 1,
        length : 1,
        generate: function (parsedLine) {
            var self = this;
            var regB = regToNumber(parsedLine.operands[0]);
            return [(self.code << 4) + regB];
        }
    },
    jmp: {
        code   : 4, // 0100
        opCount: 1,
        length : 2,
        generate: function (parsedLine, symbols) {
            var self = this;
            var resolvedSymbol = symbols[parsedLine.operands[0]];
            if (resolvedSymbol) {
                return [self.code << 4, resolvedSymbol];
            } else {
                throw new Error('Unresolved symbol: ' + parsedLine.operands[0] + ' at line ' + parsedLine.lineNo);
            }
        }
    },
    j: {
        code   : 5, // 0101
        opCount: 1,
        length : 2,
        generate: function (parsedLine, symbols) {
            var self = this;
            var resolvedSymbol = symbols[parsedLine.operands[0]];
            if (resolvedSymbol) {
                var instrCode = self.code << 4;
                if (parsedLine.mnemonic.indexOf('c') >=0) {
                    instrCode += 1 << 3;
                }
                if (parsedLine.mnemonic.indexOf('a') >=0) {
                    instrCode += 1 << 2;
                }
                if (parsedLine.mnemonic.indexOf('e') >=0) {
                    instrCode += 1 << 1;
                }
                if (parsedLine.mnemonic.indexOf('z') >=0) {
                    instrCode += 1;
                }

                return [instrCode, resolvedSymbol];
            } else {
                throw new Error('Unresolved symbol: ' + parsedLine.operands[0] + ' at line ' + parsedLine.lineNo);
            }
        }
    },
    clf: {
        code   : 6, // 0110
        opCount: 0,
        length : 1,
        generate: function (parsedLine) {
            var self = this;
            return [self.code << 4];
        }
    },
    "in": {
        code   : 7, // 0111
        opCount: 2,
        length : 1,
        generate: generateInOut
    },
    out: {
        code   : 7, // 0111
        opCount: 2,
        length : 1,
        generate: generateInOut
    },
    add: {
        code   : 8, // 1000
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    shr: {
        code   : 9, // 1001
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    shl: {
        code   : 10, // 1010
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    not: {
        code   : 11, // 1011
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    and: {
        code   : 12, // 1100
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    or: {
        code   : 13, // 1101
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    xor: {
        code   : 14, // 1110
        opCount: 2,
        length : 1,
        generate: generate2Reg
    },
    cmp: {
        code   : 15, // 1111
        opCount: 2,
        length : 1,
        generate: generate2Reg
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.parseLine = function (line, lineNo) {
    ///console.log('parseLine:', line, lineNo);
    line = line.trim().toLowerCase();
    if (line == '') {
        return null;
    }
    var lineRegEx = /^(([a-z][a-z0-9]*)\s*:\s*)?([a-z]+)(\s+(([a-z0-9]+)(\s*,\s*([a-z0-9]+))?)?)?$/;
    var matched = line.match(lineRegEx);
    if (matched) {
        var result = {
            line    : line,
            lineNo  : lineNo,
            mnemonic: matched[3],
            operands: []
        };
        if (matched[2]) {
            result.label = matched[2];
        }

        if (matched[6]) {
            result.operands.push(matched[6]);
            if (matched[8]) {
                result.operands.push(matched[8]);
            }
        }
        //console.log(matched);
        return result;
    } else {
        throw new Error('Parsing failed at line '+ lineNo);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.isJmpIf = function (parsedLine) {
    var jmpIfRegEx = /^j(c?)(a?)(e?)(z?)$/;
    return !!parsedLine.mnemonic.match(jmpIfRegEx);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Assembly.translate = function (program) {
    var binary       = [];
    var parsedLines  = [];
    var instrOffset  = 0;
    var symbols = {};
    try {
        var lines = program.split('\n');
        for (var lineIndex = 0; lineIndex < lines.length; ++lineIndex) {
            var line = lines[lineIndex];
            var lineNo = lineIndex + 1;
            var parsedLine = Assembly.parseLine(line, lineNo);
            if (parsedLine) {
                if (Assembly.INSTR[parsedLine.mnemonic]) {
                    parsedLine.instr = Assembly.INSTR[parsedLine.mnemonic];
                } else if (Assembly.isJmpIf(parsedLine)) {
                    parsedLine.instr = Assembly.INSTR.j;
                } else {
                    throw new Error('Unknown mnemonic: ' + parsedLine.mnemonic + ' at line ' + lineNo);
                }
                if (parsedLine.operands.length !== parsedLine.instr.opCount) {
                    throw new Error('Wrong number of operands at line ' + lineNo + ': ' + line);
                }
                parsedLine.offset = instrOffset;
                if (parsedLine.label) {
                    if (symbols[parsedLine.label]) {
                        throw new Error('Duplicate label at line ' + lineNo  + ': ' + parsedLine.label)
                    } else {
                        symbols[parsedLine.label] = instrOffset;
                    }
                }
                parsedLines.push(parsedLine);
                instrOffset += parsedLine.instr.length;
            }
        }
        for (var i = 0; i < parsedLines.length; ++i) {
            parsedLine = parsedLines[i];
            var bytes = parsedLine.instr.generate.call(parsedLine.instr, parsedLine, symbols);
            parsedLine.bytes = bytes;
            parsedLine.binaryBytes = [];
            parsedLine.hexBytes = [];
            bytes.forEach(function (byte) {
                binary.push(byte);
                parsedLine.binaryBytes.push(Helper.number2BinStringWithPadding(byte));
                parsedLine.hexBytes.push(Helper.numberToHexString(byte));
            });
        }
        console.log('symbols:', symbols);
        console.log('parsedLines:', parsedLines);

        return binary;
    } catch (err) {
        console.error('Assembly failed:', err.stack);
    }
};

// test
/*var binary = Assembly.translate('jmp start\ndb 0x11\ndata r2, 0x15\nfirst: add r0,r2\nor r3, r1\n second: jz start\n third: clf\njmpr r2\nstart:xor r1, r1');
console.log('image:', binary);*/

module.exports = Assembly;