/*
*	Timer class with the following methods:
*		- start()
*		- stop()
*		- reset()
*		- getTime()
*		- isRunning()
*
*	Calling stop will pause the timer and does not zero it.
*	Calling start() again will resume the timer.
* 	Timer will not start on creation.
*	getTime() can be called at any time and returns a string for the page.
*	The timer will only reset to zero when calling reset.
* 	isRunning() will return true when the timer is counting and false otherwise.
*/

function ShapularTimer(){
	this.time = null;
	this.running = false;
	this.runningInterval = null;
	
	this.start = function(){
		if(!this.running){
			// Increase timer by 100 milliseconds every 100 milliseconds
			var that = this;
			this.runningInterval = setInterval(function(){
				that.time = new Date(that.time.getTime() + 100);
				console.log(that.getTime());
			}, 100);
			this.running = true;
		}
		this.isRunning();
	}
	
	this.stop = function(){
		clearInterval(this.runningInterval);
		this.running = false;
		this.isRunning();
	}
	
	this.reset = function(){
		this.time = new Date(0, 0, 0, 0, 0, 0, 0);
		console.log("Timer reset");		
	}
	
	this.isRunning = function(){
		console.log("Timer running: " + this.running);
		return this.running;
	}
	
	this.getTime = function(){
		var hours = this.addLeadingZero(this.time.getHours());
		var minutes = this.addLeadingZero(this.time.getMinutes());
		var seconds = this.addLeadingZero(this.time.getSeconds());
		
		return hours + ":" + minutes + ":" + seconds;
	}
	
	this.addLeadingZero = function(number){
		if(number < 10){
			number = "0" + number;
		}
		return number;
	}
	
	// Functions called on creation
	this.reset();
}