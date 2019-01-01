'use strict';

var util     = require('util');
var Promise  = require('aigle');
var $        = require('jquery');
var Circuit  = require('./circuit/Circuit');
var Helper   = require('./Helper');
var Assembly = require('./Assembly');

util.inherits(Root, Circuit);

Root.GRID_STEP = 50;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Root(options) {
    var self = this;
    Root.super_.call(self, options);

    self.canvas         = document.getElementById(options.id);
    self.ctx            = self.canvas.getContext('2d');
    self.translated     = {x: 0.5, y: 0.5};
    self.mouseDown      = false;
    self.cursorSet      = false;
    self.visibleArea    = null;
    self.loadingPromise = null;
    window.root         = self;

    self.models = {
        wires: {
            title: 'Wire Test',
            load : require('./model/wireTest')
        },
        gates: {
            title: 'Gates',
            load: require('./model/gates')
        },

        latch: {
            title: 'Latch',
            load: require('./model/latch')
        },
        cpu: {
            title: 'CPU',
            load : require('./model/cpuTest')
        },
        stepper: {
            title: 'Stepper',
            load : require('./model/stepper')
        },
        ram: {
            title: 'RAM',
            load : require('./model/ramTest')
        },
        dFlipFlop: {
            title: 'D Flip Flop',
            load : require('./model/DFlipFlop')
        },
        srLatch: {
            title: 'SR-latch',
            load : require('./model/srLatch')
        },
        clock: {
            title: 'Clock',
            load : require('./model/clock')
        },
        bus1: {
            title: 'Bus1',
            load : require('./model/bus1')
        },
        alu: {
            title: 'ALU',
            load : require('./model/ALU')
        },
        adder: {
            title: 'Adder',
            load: require('./model/adder')
        },
        compare: {
            title: 'Compare',
            load : require('./model/compare')
        },
        byte: {
            title: 'Byte Operators',
            load : require('./model/operators')
        },
        test: {
            title: 'Test',
            load : require('./model/test')
        },
        busTest: {
            title: 'Bus Test',
            load: require('./model/busTest')
        },
        decoder7: {
            title: 'Decoder7',
            load: require('./model/dec7')
        },
        register: {
            title: 'Register',
            load: require('./model/register')
        },
        decoders: {
            title: 'Decoders',
            load: require('./model/decoders')
        }
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.init = function () {
    var self = this;
    //console.log('Root.prototype.init');
    return Root.super_.prototype.init.call(self).then(function () {
        self.ctx.lineCap = 'square';
        self.ctx.lineWidth = 1;
        self.ctx.translate(self.translated.x, self.translated.y);
        self.visibleArea = self.getVisibleArea();

        self.attachEventHandlers();

        var modelControl = $('#selectedModel');

        return self.loadModel(self.models[modelControl[0].value]);
    }).catch(function (err) {
        console.error('Root: Error during initialization:', err.stack);

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.loadModel = function (model) {
    var self = this;
    return Promise.try(function () {
        // if already loading, wait before it completes
        if (self.loadingPromise && self.loadingPromise.isPending()) {
            return self.loadingPromise;
        }
    }).then(function () {
        var loadingStartTime = Date.now();
        self.title = model.title;
        return self.loadingPromise = model.load.bind(self)().then(function () {
            self._redraw();
            console.log('Root: Model loaded in %d ms', Date.now() - loadingStartTime);
        }).finally(function () {
            self.loadingPromise = null;
        });
    });
};

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.createButton = function (title, cb) {
    var self = this;
    var parentDiv = $('#controlPanel');
    var div = $('<div/>', {class: 'input-control'});
    var button = $('<button/>', {text: ' ' + title});
    button.appendTo(div);
    div.appendTo(parentDiv);
    button.click(cb);
};
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.createControl = function (control, afterUpdate) {
    var self = this;
    var parentDiv = $('#controlPanel');
    var div = $('<div/>', {class: 'input-control'});
    var label = $('<label/>', {text: ' ' + control.title});
    label.appendTo(div);
    var attr = {
        //id: 'cb_nand1_0',
        type: 'checkbox'
    };
    if (control.input.value) {
        attr.checked = 'checked';
    }
    var input = $('<input />', attr);
    label.prepend(input);
    div.appendTo(parentDiv);
    input.click(function (event) {
        control.input.setValue(this.checked).then(function () {
            if (afterUpdate) {
                afterUpdate(control);
            }
            self._redraw();
        }).catch(function (err) {
            console.error('Root: Error while updating %s value:', control.title, err.stack);
        });
    });
};
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.attachEventHandlers = function () {
    var self = this;
    $(document).on('mousedown', self.canvas, self.onCanvasMouseDown.bind(self));
    $(document).on('mousemove', self.canvas, self.onCanvasMouseMove.bind(self));
    $(document).on('mouseup',   self.canvas, self.onCanvasMouseUp.bind(self));

    var modelControl = $('#selectedModel');

    for (var id in self.models) {
        $('<option/>', {
            value: id,
            text : self.models[id].title
        }).appendTo(modelControl);
    }

    var urlParams = Helper.getURLParams();
    //console.log('urlParams: ', urlParams);
    if (urlParams.model && self.models[urlParams.model]) {
        modelControl[0].selectedIndex = Object.keys(self.models).indexOf(urlParams.model);
    } else if (window.localStorage.getItem('modelIndex')) {
        modelControl[0].selectedIndex = parseInt(window.localStorage.getItem('modelIndex'));
    }



    modelControl.change(function (event) {
        var modelId = modelControl[0].value;
        window.localStorage.setItem('modelIndex', modelControl[0].selectedIndex);
        console.log('Root: Model changed to: ' + modelId);
        self.clear();
        self.defaultView();
        //$('#controlPanel').empty();
        $('#tick').off();

        var model = self.models[modelId];
        self.loadModel(model).catch(function (err) {
            console.error('Root: Error loading model:', err.stack);
        });
    });

    var zoomControl = $('#zoomControl');
    var zoomItemCount = zoomControl.find('option').length;
    zoomControl.change(function (event) {
        var zoomValue = parseFloat(this.value);
        console.log('zoom changed:', zoomValue);
        self.updateZoom(zoomValue);
    });

    function zoomIn(mousePoint) {
        var index = zoomControl[0].selectedIndex;
        if (index < zoomItemCount - 1) {
            zoomControl[0].selectedIndex = index + 1;
            self.updateZoom(zoomControl.val(), mousePoint);
        }
    }

    function zoomOut(mousePoint) {
        var index = zoomControl[0].selectedIndex;
        if (index > 0) {
            zoomControl[0].selectedIndex = index - 1;
            //console.log('value:', zoomControl.val());
            self.updateZoom(zoomControl.val(), mousePoint);
        }
    }

    $('#zoomIn').click(function () {
        zoomIn();
    });
    $('#zoomOut').click(function () {
        zoomOut()
    });

    $(self.canvas).bind('mousewheel', function (event) {
        var mousePoint = {x: event.offsetX, y: event.offsetY};
        if (event.originalEvent.wheelDelta > 0) {
            zoomIn(mousePoint);
        } else {
            zoomOut(mousePoint);
        }
        event.preventDefault();
    });

    $('#defaultView').click(function () {
        zoomControl.val('1');
        self.defaultView();
        self._redraw();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.defaultView = function () {
    var self = this;
    self.offsetBy({
        x: -self.translated.x + 0.5,
        y: -self.translated.y + 0.5
    });
    self.scale = 1;
    self.visibleArea = self.getVisibleArea();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.updateZoom = function (zoomValue, mousePoint) {
    var self = this;
    if (!mousePoint) {
        mousePoint = {
            x: self.canvas.width / 2,
            y: self.canvas.height / 2
        };
    }
    var modelPoint = {
        x: (mousePoint.x - self.translated.x - 0.5) / self.scale,
        y: (mousePoint.y - self.translated.y - 0.5) / self.scale
    };
    var newModelPoint = {
        x: (mousePoint.x - self.translated.x - 0.5) / zoomValue,
        y: (mousePoint.y - self.translated.y - 0.5) / zoomValue
    };
    self.scale = zoomValue;
    self.offsetBy({
        x: Math.round((newModelPoint.x - modelPoint.x) * zoomValue),
        y: Math.round((newModelPoint.y - modelPoint.y) * zoomValue)
    });
    self._redraw();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype._redraw = function () {
    var self = this;
    self.clearCanvas();
    self.draw(self.ctx);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.draw = function (ctx) {
    var self = this;
    ctx.save();
    try {
        self.drawGrid(ctx);
        self.printTitle(ctx);
        for (var i = 0; i < self.wires.length; ++i) {
            // todo: check if wire is in visible area
            self.wires[i].draw(ctx);
        }
        for (var j = 0; j < self.buses.length; ++j) {
            self.buses[j].draw(ctx);
        }
        for (var uid in self.children) {
            self.children[uid].draw(ctx);
        }
    } catch (err) {
        console.error('Root: Error during draw:', err.stack);
    } finally {
        ctx.restore();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.drawGrid = function (ctx) {
    var self = this;
    if (self.scale > 0.3) {
        ctx.beginPath();
        ctx.strokeStyle = '#EFEFEF';

        var step = Root.GRID_STEP;
        var fromX = Math.floor(-self.translated.x / self.scale / step) * step;
        var toX = fromX + self.canvas.width / self.scale + step;

        var fromY = Math.floor(-self.translated.y / self.scale / step) * step;
        var toY = fromY + self.canvas.height / self.scale + step;

        for (var x = fromX; x < toX; x += step) {
            self.moveTo(ctx, x - 1, fromY - 1);
            self.lineTo(ctx, x - 1, toY - 1);
            ctx.stroke();
        }

        for (var y = fromY; y < toY; y += step) {
            self.moveTo(ctx, fromX - 1, y - 1);
            self.lineTo(ctx, toX - 1, y - 1);
            ctx.stroke();
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.clearCanvas = function () {
    var self = this;
    self.ctx.clearRect(
        -self.translated.x,
        -self.translated.y,
        self.canvas.width,
        self.canvas.height
    );
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.canvasToModel = function (point) {
    var self = this;
    return {
        x: Math.round((point.x - self.translated.x - 0.5) / self.scale),
        y: Math.round((point.y - self.translated.y - 0.5) / self.scale)
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.getVisibleArea = function () {
    var self = this;
    var leftTop = self.canvasToModel({x: 0, y: 0});
    var bottomRight = self.canvasToModel({x: self.canvas.width, y: self.canvas.height});
    return {
        left  : leftTop.x,
        top   : leftTop.y,
        right : bottomRight.x,
        bottom: bottomRight.y
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.onCanvasMouseDown = function (event) {
    var self = this;
    if (event.target == self.canvas) {
        event.preventDefault();

        //console.log('mouse down event:', event);
        //console.log('mouse down client:', event.clientX, event.clientY);
        //console.log('mouse down offset:', event.offsetX, event.offsetY);

        self.lastPos = {
            x: event.screenX,
            y: event.screenY
        };
        self.downPos = {
            x: event.screenX,
            y: event.screenY
        };
        self.mouseDown = true;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.onCanvasMouseMove = function (event) {
    var self = this;
    if (self.mouseDown) {
        //event.preventDefault();
        var diff = {
            x: event.screenX - self.lastPos.x,
            y: event.screenY - self.lastPos.y
        };
        self.lastPos = {
            x: event.screenX,
            y: event.screenY
        };
        self.offsetBy(diff);
        if (!self.cursorSet) {
            self.canvas.style.cursor = 'move';
            self.cursorSet = true;
        }

        self._redraw();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.onCanvasMouseUp = function (event) {
    var self = this;
    if (self.mouseDown) {
        if (self.cursorSet) {
            self.canvas.style.cursor = 'default';
            self.cursorSet = false;
        }

        var diff = {
            x: event.screenX - self.downPos.x,
            y: event.screenY - self.downPos.y
        };
        if (diff.x == 0 && diff.y == 0) {
            var globalPoint = self.canvasToModel({
                x: event.offsetX,
                y: event.offsetY
            });
            self.handleClick(globalPoint);
        }

        //console.log('mouse up:', event);
        self.mouseDown = false;
        self.lastPos   = null;
        self.downPos   = null;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.offsetBy = function (diff) {
    var self = this;
    self.ctx.translate(
        diff.x,
        diff.y
    );
    self.translated = {
        x: self.translated.x + diff.x,
        y: self.translated.y + diff.y
    };
    self.visibleArea = self.getVisibleArea();
    //console.log('Root: Visible area changed:', self.visibleArea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Root.prototype.dumpInfo = function () {
    var self = this;
    console.log('Children:', self.children);
};

module.exports = Root;