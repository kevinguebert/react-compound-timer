var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from "react";
import TimerModel from "../../lib/models/TimerModel";
var TimerContext = React.createContext({
    ms: 0,
    s: 0,
    m: 0,
    h: 0,
    d: 0
});
var TimerValue = /** @class */ (function (_super) {
    __extends(TimerValue, _super);
    function TimerValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimerValue.prototype.shouldComponentUpdate = function (nextProps) {
        var value = this.props.value;
        if (value !== nextProps.value) {
            return true;
        }
        return false;
    };
    TimerValue.prototype.render = function () {
        var value = this.props.value;
        var stringValue = String(value);
        if (value < 10) {
            stringValue = "0" + stringValue;
        }
        return stringValue || null;
    };
    return TimerValue;
}(React.Component));
var Milliseconds = function () { return (React.createElement(Timer.Consumer, null, function (_a) {
    var ms = _a.ms;
    return React.createElement(TimerValue, { value: ms });
})); };
var Seconds = function () { return (React.createElement(Timer.Consumer, null, function (_a) {
    var s = _a.s;
    return React.createElement(TimerValue, { value: s });
})); };
var Minutes = function () { return (React.createElement(Timer.Consumer, null, function (_a) {
    var m = _a.m;
    return React.createElement(TimerValue, { value: m });
})); };
var Hours = function () { return (React.createElement(Timer.Consumer, null, function (_a) {
    var h = _a.h;
    return React.createElement(TimerValue, { value: h });
})); };
var Days = function () { return (React.createElement(Timer.Consumer, null, function (_a) {
    var d = _a.d;
    return React.createElement(TimerValue, { value: d });
})); };
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, initialTime = _a.initialTime, direction = _a.direction, timeToUpdate = _a.timeToUpdate, lastUnit = _a.lastUnit, checkpoints = _a.checkpoints;
        _this.timer = new TimerModel({
            initialTime: initialTime,
            direction: direction,
            timeToUpdate: timeToUpdate,
            lastUnit: lastUnit,
            checkpoints: checkpoints,
            onChange: _this.setState.bind(_this)
        });
        _this.state = __assign({}, _this.timer.timeParts, { timerState: "INITED" });
        _this.start = _this.start.bind(_this);
        _this.pause = _this.pause.bind(_this);
        _this.resume = _this.resume.bind(_this);
        _this.stop = _this.stop.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.setTime = _this.setTime.bind(_this);
        _this.getTime = _this.getTime.bind(_this);
        _this.getTimerState = _this.getTimerState.bind(_this);
        _this.setDirection = _this.setDirection.bind(_this);
        _this.setCheckpoints = _this.setCheckpoints.bind(_this);
        return _this;
    }
    Timer.getUI = function (children, renderProps) {
        if (children === null) {
            return null;
        }
        if (Array.isArray(children) || React.isValidElement(children)) {
            return children;
        }
        if (children.prototype && children.prototype.isReactComponent) {
            return React.createElement(children, renderProps);
        }
        if (typeof children === "function") {
            return children(renderProps);
        }
        throw new Error("Please use one of the supported APIs for children");
    };
    Timer.prototype.componentDidMount = function () {
        var startImmediately = this.props.startImmediately;
        startImmediately && this.timer.start();
    };
    Timer.prototype.componentWillUnmount = function () {
        this.timer.stop();
    };
    Timer.prototype.render = function () {
        var _a = this, start = _a.start, pause = _a.pause, resume = _a.resume, stop = _a.stop, reset = _a.reset, getTime = _a.getTime, getTimerState = _a.getTimerState, setTime = _a.setTime, setDirection = _a.setDirection, setCheckpoints = _a.setCheckpoints;
        var _b = this.state, ms = _b.ms, s = _b.s, m = _b.m, h = _b.h, d = _b.d, timerState = _b.timerState;
        var children = this.props.children;
        return (React.createElement(TimerContext.Provider, { value: { ms: ms, s: s, m: m, h: h, d: d } }, Timer.getUI(children, {
            start: start,
            resume: resume,
            pause: pause,
            stop: stop,
            reset: reset,
            getTime: getTime,
            getTimerState: getTimerState,
            setTime: setTime,
            setDirection: setDirection,
            setCheckpoints: setCheckpoints,
            timerState: timerState
        })));
    };
    Timer.prototype.setTime = function (time) {
        this.timer.setTime(time);
    };
    Timer.prototype.getTime = function () {
        return this.timer.getTime();
    };
    Timer.prototype.getTimerState = function () {
        return this.timer.state;
    };
    Timer.prototype.setDirection = function (direction) {
        this.timer.setDirection(direction);
    };
    Timer.prototype.setCheckpoints = function (checkpoints) {
        this.timer.setCheckpoints(checkpoints);
    };
    Timer.prototype.start = function () {
        this.timer.start();
        this.props.onStart();
    };
    Timer.prototype.stop = function () {
        this.timer.stop();
        this.props.onStop();
    };
    Timer.prototype.pause = function () {
        this.timer.pause();
        this.props.onPause();
    };
    Timer.prototype.reset = function () {
        this.timer.reset();
        this.props.onReset();
    };
    Timer.prototype.resume = function () {
        this.timer.resume();
        this.props.onResume();
    };
    Timer.Consumer = TimerContext.Consumer;
    Timer.Milliseconds = Milliseconds;
    Timer.Seconds = Seconds;
    Timer.Minutes = Minutes;
    Timer.Hours = Hours;
    Timer.Days = Days;
    Timer.defaultProps = {
        timeToUpdate: 1000,
        direction: "forward",
        initialTime: 0,
        startImmediately: true,
        lastUnit: "d",
        checkpoints: [],
        children: null,
        onStart: function () { },
        onResume: function () { },
        onPause: function () { },
        onStop: function () { },
        onReset: function () { }
    };
    return Timer;
}(React.PureComponent));
export default Timer;
//# sourceMappingURL=Timer.js.map