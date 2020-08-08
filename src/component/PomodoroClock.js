import React, { Component } from 'react'

class PomodoroClock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            breakTime: 5,
            sessionTime: 25,
            minutes: 25,
            seconds: 0,
            timerStatus: false,
            interval: "",
            label: "Session",
            timeWorking: false,
            break: false
        }
    }


    decrementBreak = () => {
        if (this.state.timeWorking) return;
        if (this.state.breakTime <= 1) return;
        this.setState((prevState) => ({
            breakTime: prevState.breakTime - 1
        }), () => {
            if (this.state.break) {
                this.decMinutesByBreak();
            }
        })
    }


    incrementBreak = () => {
        if (this.state.timeWorking) return;
        if (this.state.breakTime >= 60) return;
        this.setState((prevState) => ({
            breakTime: prevState.breakTime + 1
        }), () => {
            if (this.state.break) {
                this.incMinutesByBreak();
            }
        })
    }


    decMinutesByBreak = () => {

        this.setState((prevState) => ({
            minutes: prevState.breakTime
        }))
    }

    incMinutesByBreak = () => {

        this.setState((prevState) => ({
            minutes: prevState.breakTime
        }))
    }

    decrementSession = () => {
        if (this.state.timeWorking) return;
        if (this.state.sessionTime <= 1) return;
        this.setState((prevState) => ({
            sessionTime: prevState.sessionTime - 1
        }), () => { this.decMinutes() })
    }

    incrementSession = () => {
        if (this.state.timeWorking) return;
        if (this.state.sessionTime >= 60) return;
        this.setState((prevState) => ({
            sessionTime: prevState.sessionTime + 1
        }), () => { this.incMinutes() })
    }


    decMinutes = () => {

        this.setState((prevState) => ({
            minutes: this.state.break ? prevState.breakTime : prevState.sessionTime
        }))
    }

    incMinutes = () => {

        this.setState((prevState) => ({
            minutes: this.state.break ? prevState.breakTime : prevState.sessionTime
        }))
    }


    startAndStop = () => {

        if (this.state.timerStatus === true) {
            this.setState({
                timerStatus: false,
                timeWorking: false

            }, clearInterval(this.state.interval))
            return;
        }
        else {
            this.setState({
                timerStatus: true,
                timeWorking: true,
                interval: setInterval(() => this.setState((prevState) => ({
                    minutes: this.state.seconds === 0 && this.state.minutes === 0 ? this.setState({ timerStatus: false }) : this.state.seconds === 0 ? prevState.minutes - 1 : this.state.minutes,
                    seconds: this.state.seconds === 0 && this.state.minutes === 0 ? this.setState({ timerStatus: false }) : this.state.seconds === 0 ? 59 : prevState.seconds - 1
                }), () => {
                    if (this.state.minutes === 0 && this.state.seconds === 0) {
                        clearInterval(this.state.interval);
                        document.getElementById("beep").play();
                        setTimeout(() => {

                            this.setState((prevState) => ({
                                minutes: prevState.breakTime,
                                seconds: 0,
                                timerStatus: false,
                                label: "Break",
                                break: true
                            }), () => this.breakTimingWorking())
                        }, 1000)
                    }
                }), 1000)
            })


        }
    }

    breakTimingWorking = () => {
        if (this.state.timerStatus === true) {
            this.setState({
                timerStatus: false,
                timeWorking: false

            }, clearInterval(this.state.interval))
            return;
        } else {

            this.setState({
                timerStatus: true,
                timeWorking: true,
                interval: setInterval(() => this.setState((prevState) => ({
                    minutes: this.state.seconds === 0 && this.state.minutes === 0 ? this.setState({ timerStatus: false }) : this.state.seconds === 0 ? prevState.minutes - 1 : this.state.minutes,
                    seconds: this.state.seconds === 0 && this.state.minutes === 0 ? this.setState({ timerStatus: false }) : this.state.seconds === 0 ? 59 : prevState.seconds - 1
                }), () => {
                    console.log("raj")
                    if (this.state.minutes === 0 && this.state.seconds === 0) {
                        clearInterval(this.state.interval);
                        document.getElementById("beep").play();
                        setTimeout(() => {

                            this.setState((prevState) => ({
                                minutes: prevState.sessionTime,
                                seconds: 0,
                                timerStatus: false,
                                label: "Session",
                                break: false
                            }), () => this.startAndStop())
                        }, 1000)
                    }
                }), 1000)
            })

        }

    }


    resetAllStuff = () => {
        const audio = document.getElementById("beep");
        if (this.state.timeWorking) {
            clearInterval(this.state.interval);
            if (audio.duration > 0 && audio.paused === false) {
                audio.pause();
                audio.currentTime = 0;
            }

        }

        this.setState(() => ({
            breakTime: 5,
            sessionTime: 25,
            minutes: 25,
            seconds: 0,
            timerStatus: false,
            interval: "",
            label: "Session",
            break: false
        }))
    }


    render() {
        return (
            <div className="col-11 col-sm-10 col-md-9 col-lg-7 d-flex flex-column justify-content-center align-items-center main" >
                {/* Header */}
                < div className="col-12 col-lg-10" >
                    <h1 className="text-center pt-3">
                        Pomodoro Clock
                    </h1>
                </div >

                {/* break length and Session length */}
                < div className="col-10 d-flex justify-content-around align-items-center all_incdec" >
                    <div className="col-11 col-md-6 p-0">
                        <div className="col-12 py-3 m-0">
                            <h3 className="text-center" id="break-label">Break Length</h3>
                            <div className="col-12 m-0 text-center">
                                <span id="break-decrement" onClick={this.decrementBreak}>
                                    <i className="fa fa-arrow-down fa-2x"></i>
                                </span>
                                <span id="break-length">
                                    {this.state.breakTime}
                                </span>
                                <span id="break-increment" onClick={this.incrementBreak}>
                                    <i className="fa fa-arrow-up fa-2x">
                                    </i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-11 col-md-6 p-0">
                        <div className="col-12 py-3 m-0">
                            <h3 className="text-center" id="session-label">Session Length</h3>
                            <div className="col-12 m-0 text-center">
                                <span id="session-decrement" onClick={this.decrementSession}>
                                    <i className="fa fa-arrow-down fa-2x"></i>
                                </span>
                                <span id="session-length">
                                    {this.state.sessionTime}
                                </span>
                                <span id="session-increment" onClick={this.incrementSession}>
                                    <i className="fa fa-arrow-up fa-2x"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div >


                {/* Timer */}
                < div className="col-12 col-md-9 col-lg-6 pt-4 timer" >
                    <div className="col-11 text-center mx-auto">
                        <h3 className="text-center m-0 p-0" id="timer-label"
                            style={this.state.minutes === 0 ? { "color": "red" } : { "color": "white" }}
                        >
                            {this.state.label}
                        </h3>
                    </div>
                    <div className="col-11 text-center mx-auto">
                        <h1 className="timerCount" id="time-left"
                            style={this.state.minutes === 0 ? { "color": "red" } : { "color": "white" }}
                        >
                            {(parseInt(this.state.minutes, 10) + 100).toString().substr(1)}:{(parseInt(this.state.seconds, 10) + 100).toString().substr(1)}
                        </h1>
                        <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
                    </div>
                </div >


                {/* Control */}
                < div className="col-6 text-center py-3" >
                    <span id="start_stop" onClick={this.state.break ? this.breakTimingWorking : this.startAndStop}>
                        <i className="fa fa-play fa-2x"></i>
                        <i className="fa fa-pause fa-2x"></i>
                    </span>
                    <span id="reset" onClick={this.resetAllStuff}>
                        <i className="fa fa-refresh fa-2x"></i>
                    </span>
                </div >


            </div >
        )
    }
}

export default PomodoroClock
