import React from "react";
import { TimePartsType } from "src/lib/helpers/getTimeParts";
import { TimerStateType } from "src/lib/models/TimerState";
interface TimerProps {
    /** Timer count direction */
    direction?: "forward" | "backward";
    /** Inittial time on timer */
    initialTime?: number;
    /** Time to rerender */
    timeToUpdate?: number;
    /** Start timer immediately after render */
    startImmediately?: boolean;
    /** Function that will be called on timer start */
    onStart?: () => any;
    /** Function that will be called on timer resume */
    onResume?: () => any;
    /** Function that will be called on timer pause */
    onPause?: () => any;
    /** Function that will be called on timer stop */
    onStop?: () => any;
    /** Function that will be called on timer reset */
    onReset?: () => any;
    /** Last unit will accumulate time, for example, 26 hours or 90 seconds */
    lastUnit?: "ms" | "s" | "m" | "h" | "d";
    /** Time checkpoints with callback functions */
    checkpoints?: Array<{
        time: number;
        callback: () => any;
    }>;
}
interface TimerState extends TimePartsType {
    timerState: TimerStateType;
}
declare class Timer extends React.PureComponent<TimerProps, TimerState> {
    static Consumer: React.ExoticComponent<React.ConsumerProps<TimePartsType>>;
    static Milliseconds: () => JSX.Element;
    static Seconds: () => JSX.Element;
    static Minutes: () => JSX.Element;
    static Hours: () => JSX.Element;
    static Days: () => JSX.Element;
    static defaultProps: {
        timeToUpdate: number;
        direction: string;
        initialTime: number;
        startImmediately: boolean;
        lastUnit: string;
        checkpoints: any[];
        children: any;
        onStart: () => void;
        onResume: () => void;
        onPause: () => void;
        onStop: () => void;
        onReset: () => void;
    };
    static getUI(children: any, renderProps: any): any;
    private timer;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private setTime;
    private getTime;
    private getTimerState;
    private setDirection;
    private setCheckpoints;
    private start;
    private stop;
    private pause;
    private reset;
    private resume;
}
export default Timer;
