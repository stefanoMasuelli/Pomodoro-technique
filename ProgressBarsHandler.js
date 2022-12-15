'use strict';

const cliProgress = require('cli-progress');
const colors = require('ansi-colors');
class ProgressBarHandler{

    totalBar;
    tomatoBars;
    pauseBars;
    lastTomatoBar;
    currentValue = 0;

    constructor( )
    {
        this.multibar = new cliProgress.MultiBar({
            format: '  '+ colors.bgRed('{bar}') + '| {percentage}% | {title}' ,
            clearOnComplete: true,
            hideCursor: true,
        }, cliProgress.Presets.rect);  
    }

    startTotal = () =>{
        if( !this.totalBar ){
            this.totalBar = this.multibar.create(100,0);
        }

        this.totalBar.start(100,this.currentValue,{
            title : "Total",
        });
    }
    updateTotal = (  ) =>{
        this.totalBar.increment( 1 );
    }
    pauseTotal = ( workTime ) =>{
        
        this.currentValue = workTime;
        this.totalBar.update( this.currentValue );
        this.totalBar.stop();
    }
    stopTotal = ( ) =>{
        this.totalBar.stop();
        setTimeout( ()=> this.multibar.stop(), 3000);
    }

    newTomato = ( i , last ) =>{
        this.tomatoBars = this.multibar.create(100,0);
        this.tomatoBars.start(100,0,{
            title : `Tomato - ${i+1}${last ? ' - Last' : ''}`,
        });
    }
    updateTomato = ( ) =>{
        this.tomatoBars.increment( 1 );
    }
    stopTomato = ( ) =>{
        this.tomatoBars.update( 100 );
        this.tomatoBars.stop();
    }

    newPause = ( i , long) =>{
        const title = `${long ? 'long ' : 'short '} pause - ${i+1}`;
        this.pauseBars = this.multibar.create(100,0);
        this.pauseBars.start(100,0,{
            title : title,
        });
    }
    updatePause = ( ) =>{
        this.pauseBars.increment( 1 );
    }
    stopPause = ( ) =>{
        this.pauseBars.update( 100 );
        this.pauseBars.stop();
    }

}

module.exports = ProgressBarHandler
