'use strict';

const TimeHandler = require('./TimeHandler.js');
const ProgressBarsHandler = require('./ProgressBarsHandler.js');
const notify = require('./Notifier.js');

class Tomato{

      intervalTotal = null;
      intervalTomato = null;
      intervalLastTomato = null;

      currentTomato = 0;
      currentShortPause = 0;
      currentLongPause = 0;

      constructor( hours,oneTomato,short,long,cycleNumber ){
        this.timeHandler = new TimeHandler(hours,oneTomato,short,long);
        
        this.cycleNumber = cycleNumber;
        this.progressBarsHandler = new ProgressBarsHandler( );
      }

      startUpdateTotalBar = ( ) => {
        this.intervalTotal = this.timeHandler.onePercentTotalTimer( this.progressBarsHandler.updateTotal );
      }
      startUpdateTomatoBar = ( shorterTomato ) => {
        this.intervalTomato = this.timeHandler.onePercentTomatoTimer( this.progressBarsHandler.updateTomato, shorterTomato);
      }
      startUpdatePauseBar = ( longPause ) => {
        this.intervalPause = this.timeHandler.onePercentPauseTimer( this.progressBarsHandler.updatePause , longPause );
      }
      

      startTomato = ( last, shorterTomato ) => 
      {
        notify( `start ${last ? 'last':''} tomato` );
        
        this.progressBarsHandler.startTotal( );
        this.progressBarsHandler.newTomato( this.currentTomato ,last );
        
        this.startUpdateTotalBar( );
        this.startUpdateTomatoBar( shorterTomato );
        
        this.timeHandler.tomatoTimer( shorterTomato )
          .then( ( ) => this.endTomato( last ) )
      }

      endTomato = () =>
      {
          this.currentTomato ++;
          
          const workTime = this.timeHandler.workTime()
          this.progressBarsHandler.pauseTotal( workTime );
          this.progressBarsHandler.stopTomato();

          clearInterval( this.intervalTomato );
          clearInterval( this.intervalTotal );
          
          if( !this.timeHandler.checkRemainingTime() )
          {
            this.endWork();
          }
          else 
          {
            const longPause = this.currentTomato % this.cycleNumber == 0;
            this.startPause( longPause );
          }
        }

      startPause = ( longPause ) => 
      {
        notify(`start ${longPause ? 'long' : 'short'} pause.`);

        const pauseNumber = longPause ? this.currentLongPause : this.currentShortPause;
        this.progressBarsHandler.newPause( pauseNumber , longPause );
        this.startUpdatePauseBar( longPause );
        
        this.timeHandler.pauseTimer( longPause )
          .then( ( ) => this.endPause( longPause ) )
      }
      endPause = ( long ) => 
      {
          clearInterval( this.intervalPause );
          
          this.progressBarsHandler.stopPause();
          
          if( long ){
            this.currentLongPause++;
          }else{
            this.currentShortPause++;
          }

          const last = this.timeHandler.lastTomato();
          const shorterTomato = this.timeHandler.isShorterTomato( );
          this.startTomato( last, shorterTomato );
        }

        endWork = ( ) => 
        {
          notify('work ended');
          this.progressBarsHandler.stopTotal();
          clearInterval( this.intervalTotal );  
        }
}

module.exports = Tomato;
