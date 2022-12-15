

class TimerHandler{

    constructor( totalHours, oneTomato, shortPause, longPause ){

        //convertire in secondi
        this.totalHoursInSec = totalHours*3600;
        this.oneTomato = oneTomato*60;
        this.shortPause = shortPause*60;
        this.longPause = longPause*60;

        this.onePercent = {
            total : this.totalHoursInSec/100,
            tomato : this.oneTomato/100,
            shortPause : this.shortPause/100,
            longPause : this.longPause/100,
            lastTomato : (this.totalHoursInSec%oneTomato)/100 
        }

        this.remainingTime = this.totalHoursInSec;
    
    }

    timer( seconds ){
        return new Promise((resolve,reject)=>{
            setTimeout( ()=>{
                resolve();
            },seconds*1000);
        })
    }

    total = async() => {

        await this.timer( this.totalHoursInSec );
    }

    tomatoTimer = async( shorterTomato ) =>{
        if( shorterTomato ){
            await this.timer( this.remainingTime )
            this.remainingTime = 0;
        }else{
            await this.timer( this.oneTomato );
            this.remainingTime -= this.oneTomato;
        }
      }

    pauseTimer = async( longPause ) =>{
        if( longPause ){
            await this.timer( this.longPause );
        }else{
            await this.timer( this.shortPause );
        }
      }

    workTime = () =>{
        return (this.totalHoursInSec - this.remainingTime)/this.totalHoursInSec*100;
    }
    checkRemainingTime = () =>{
      return this.remainingTime>0;
    }
    lastTomato = ( ) =>{
        return this.remainingTime <= this.oneTomato;
    }
    isShorterTomato = ( ) => {
        return this.remainingTime < this.oneTomato;
    }

    onePercentTotalTimer = ( func ) =>{
        return setInterval(()=>{
            func();
        },this.onePercent.total*1000)
    }

    onePercentTomatoTimer = ( func, shorterTomato ) =>{
        
        const ms = shorterTomato ? this.onePercent.lastTomato : this.onePercent.tomato;
 
        return setInterval(()=>{
            func();
        },ms*1000)
    }
    onePercentPauseTimer = ( func , long ) =>{
        
        const ms = long ? this.onePercent.longPause : this.onePercent.shortPause;
        
        return setInterval(()=>{
            func();
        },ms*1000)
    }
}





module.exports = TimerHandler;
