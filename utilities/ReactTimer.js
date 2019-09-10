module.exports = class ReactTimer{
  constructor(context, callback, delay, runOnce=false){
    this.context   = context;
    this.callback  = callback;
    this.runOnce   = runOnce;
    this.delay     = delay;
    this.remaining = delay;

    this.timer = 0;
    this.on = false;

    this.countdown = this.countdown.bind(this);
  }

  start(restart=false){
    this.on = true;

    if(restart){
      window.clearTimeout(this.timer);
      this.remaining = this.delay;
      this.context.setState({time: this.delay});
      this.timer = window.setInterval(this.countdown, 1000);
    }
    else{
      this.timer = window.setInterval(this.countdown, 1000);
    }
  }

  pause(){
    window.clearTimeout(this.timer);
    this.on = false;
  }

  countdown(){
    if(this.remaining > 0){
      this.remaining -= 1;
      this.context.setState({time: this.context.state.time-1});
    }
    if(this.remaining === 0){
      this.remaining = this.delay;
      this.callback();
      this.context.setState({time: this.delay});
    }
  }
}
