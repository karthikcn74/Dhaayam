//import { Component, OnInit } from '@angular/core';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import  * as io from 'socket.io-client';
import * as js from './app-custom';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { fade } from './animation';


@Component({
  selector: 'app-root',
  animations: [
    fade,
    trigger('openClose', [
      // ...
      state('canvas', style({
        width: '150',
        height: '80',
        opacity: 1,
        backgroundColor: 'blue'
      })),
      state('open', style({
        width: '80px',
        height: '80px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        width: '80px',
        height: '80px',
        opacity: 0.5,
        backgroundColor: 'green',
        border:'80px'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 

})

export class AppComponent implements OnInit {
  
  title = 'Dhaayam';
  arrayOne(n: number): any[] {
    return Array(n);
  }
  position : string;
  isOpen = true;
  changePosition(newPosition: any){
    this.position = newPosition;
  
    this.isOpen = !this.isOpen;

  }
  
  private context: any;
  private ctx: any;
  private precont: any;
  private socket: any;
  private curr_pos: number[];
  private play_coins: number[];
  private game_starts: any;  
  private socketid: any;
  public playername: any;
  public winplay: any;
  private play_numbers: number[];
  public play_but0:string;
  public play_but1:string;
  public play_but2:string;
  public play_but3:string;
  public timer: any;
  public count: any;
  
  ngOnInit(){
    this.game_starts = 0;
    this.play_numbers = [];
    this.play_coins = [];
    this.winplay = '';
    this.timer = 0;
    this.count = 0;
    var temp_var: any;
    this.playername = '';
    this.play_but0 = "";
    this.play_but1 = "false";
    this.play_but2 = "false";
    this.play_but3 = "false";
    this.socket = io("http://localhost:3000");
    
    //this.loadScript('../custom.js');
    check_box("74")
    check_box("14")
    check_box("41")
    check_box("44")
    check_box("47")
    check_box("62")
    check_box("66")
    check_box("22")
    check_box("26")

    this.socket.on('message',msg => {
      show_message(msg);
    });
    this.socket.on('socket', id => {
      this.socketid = id;
    });
    this.socket.on('players_id', sessionid => {
      //show_message('Players Arr:'+sessionid);
      //show_message('This session:'+this.socketid);
      for (var p=0; p<=sessionid.length;p++){
       if (this.socketid == sessionid[p]){
          this.playername = p;
          break;
        }
      }
      //this.playername = temp_var;
      //show_message('Playername:'+this.playername);
    });
  
  }
  @ViewChild("game")
  private gameCanvas: ElementRef;
  private cellid_ser: any;
  private arr_play: number[];
  private msg: any;
  private sessionid: any;
  private coin_nos: number;
  private flash: any;
  

  public ngAfterViewInit() {
    this.curr_pos = [];
    this.coin_nos = 0;
    this.flash = '';
    var cir = new js();
    show_message("Value"+cir.id_cap);
//cir._check_flash([74,74],50,1000);
//cir._flash_set_int(74,50);
//cir._check_flash_set(74,50, 50000);
//cir._flash_check(74,50,2000);
  /*  const timeElem = document.querySelector("#time");
    var requestId;
    
    function loop(time) {
        requestId = undefined;
        
        doStuff(time)
        start();
    }
    
    function start() {
        if (!requestId) {
           requestId = window.requestAnimationFrame(loop);
        }
    }
    
    function stop() {
        if (requestId) {
           window.cancelAnimationFrame(requestId);
           requestId = undefined;
        }
    }
    
    function doStuff(time) {
      console.log("Hello World");
      timeElem.textContent = (time * 0.001).toFixed(2);
    }
      
    
    document.querySelector("#start").addEventListener('click', function() {
      start();
    });
    
    document.querySelector("#stop").addEventListener('click', function() {
      stop();
    });
*/
    this.socket.on("input", player_turn => {
      //show_message('Turn:'+player_turn+"-"+this.playername);
        if (player_turn == 0) {
          this.play_but0 = "";  
          [this.play_but1,this.play_but2,this.play_but3] = "false";      
        } else if (player_turn == 1) {
          this.play_but1 = ""; 
          [this.play_but0,this.play_but2,this.play_but3] = "false";  
        }  else if (player_turn == 2) {
          this.play_but2 = ""; 
          [this.play_but1,this.play_but0,this.play_but3] = "false";  
        }  else if (player_turn == 3) {
          this.play_but3 = "";  
          [this.play_but1,this.play_but2,this.play_but0] = "false";  
        } else {
          this.play_but0 = "";  
          [this.play_but1,this.play_but2,this.play_but3] = "false";   
        }
    } );
    var rectXPos = 13;
    var rectYPos = 13;
    var rectWidth = 15;
    var rectHeight = 15;
    var thickness = 1; 
    var color = '';
   
    this.socket.on('play_input',({position,cellid, playername,game_stat, play_numbers, pos_arr}) => {
  //    alert("In input");
        show_message("player flas - "+playername+"pos"+pos_arr);
        cir._check_flash(pos_arr,50,1000,'start');
    
        var element = document.getElementsByClassName("column");
        const someObject = {aProperty: ''};
        for (var i = 0; i < element.length; i++) {
            
        element[i].addEventListener('click',
         function() {
           //show_message("Listerner Param1:"+position+"#"+cellid+"#"+playername+"#"+game_stat+"#"+play_numbers);
          var obj =  new AppComponent();
          obj.move(position,cellid,playername,game_stat,play_numbers, this.id);
        }, true);
    }       
    });
    /*this.socket.on('message',msg => {
      show_message(msg);
    });
    this.socket.on('socket', id => {
      this.socketid = id;
    });
    
    this.socket.on('players_id', sessionid => {
      show_message('Players Arr:'+sessionid);
      show_message('This session:'+this.socketid);
      for (var p=0; p<=sessionid.length;p++){
        show_message(sessionid[p]);
        if (this.socketid == sessionid[p]){
          this.playername = p;
          show_message('Playername - In loop:'+this.playername);
        }
      }
      show_message('Playername - 2:'+this.playername);
    });
    show_message('Playername:'+this.playername);
    //player_prop(this.playername);
      */
     //this.socket.on('player', player => {

      //  this.socket.emit("new player");
      //  show_message('Player:'+this.playername);
        //this.socket.emit("cellid", cellid );
        //disable_play('play2','false');
        var rectXPos = 13;
        var rectYPos = 13;
        var rectWidth = 15;
        var rectHeight = 15;
        var thickness = 1; 
        var color = '';

        this.socket.on("Win",(winplay) => {
          this.winplay = winplay;
        });
        this.socket.on("prev", ({cellid, playername}) => {
          for(var p=0; p<=cellid.length-1;p++){
            const prec = document.getElementById(cellid[p]) as HTMLCanvasElement;
            this.precont = prec.getContext("2d");
            if (cellid[p] == 74 || cellid[p] == 41 || cellid[p] == 44 || cellid[p] == 47 || cellid[p] == 62 || 
              cellid[p] == 66 || cellid[p] == 22 || cellid[p] == 26 || cellid[p] == 14) {
                rectWidth = 7;
                rectHeight = 7;
              if (playername == 0) {
                rectXPos = p * 6;
                rectYPos =  32;               
              } else if (playername == 1) {
                rectXPos = p * 6;
                rectYPos = 23;
              } else if (playername == 2) {
                rectXPos = p * 6;
                rectYPos = 14;
              } else if (playername == 3) {
                rectXPos = p * 6;
                rectYPos = 5;
              }
           
              cir._clear_rect(this.precont,rectXPos,rectYPos,rectWidth,rectHeight,thickness); 
              cir._mark_check_box(this.precont);
             
          } else {
              rectXPos = 13;
              rectYPos = 13;
              rectWidth = 15;
              rectHeight = 15;
              cir._clear_rect(this.precont,rectXPos,rectYPos,rectWidth,rectHeight,thickness); 
          }
          //cir._flash(this.precont, 50,color, cellid[p],rectXPos,rectYPos,rectWidth,rectHeight,thickness,0); 
        }
      });
    
        this.socket.on("cell", ({cellid_ser, playername,winplay}) => {
          //show_message('Player in:'+ playername);
          if (winplay == 6){
            show_message("Player:"+playername+"Wins!")
          }
          
          for (var i=0; i<=cellid_ser.length-1; i++) {
          const c = document.getElementById(cellid_ser[i]) as HTMLCanvasElement;
          this.context = c.getContext("2d");
          
          if (cellid_ser.length>=1){
            this.coin_nos = 1;
            this.flash = 0;
          }
          
          if (cellid_ser[i] == 74 || cellid_ser[i] == 41 || cellid_ser[i] == 44 || cellid_ser[i] == 47 || cellid_ser[i] == 62 || 
            cellid_ser[i] == 66 || cellid_ser[i] == 22 || cellid_ser[i] == 26 || cellid_ser[i] == 14) {
              rectWidth = 7;
              rectHeight = 7;
              if (playername == 0) {
                rectXPos = i * 6;
                rectYPos =  32;
                color = "#13118a";
                show_message("coin"+this.coin_nos);
                if (this.coin_nos == 1 && this.flash == 0){
                  //cir._flash(this.context, 50,color, cellid_ser[i],rectXPos,rectYPos,rectWidth,rectHeight,thickness,1);       
                } 
              } else if (playername == 1) {
                rectXPos = i * 6;
                rectYPos = 23;
                color = "#e0310d";
                if (this.coin_nos == 1){
                  show_message("In flash"+color+cellid_ser[i]);
                  //cir._flash(this.context, 50,color, cellid_ser[i]); 
                } 
              } else if (playername == 2) {
                rectXPos = i * 6;
                rectYPos = 14;
                color = "#fce408";
                if (this.coin_nos == 1){
                  show_message("In flash"+color+cellid_ser[i]);
                 // cir._flash(this.context, 50,color, cellid_ser[i]); 
                } 
              } else if (playername == 3) {
                rectXPos = i * 6;
                rectYPos = 5;
                color = "#29fc08";
                if (this.coin_nos == 1){
                  show_message("In flash"+color+cellid_ser[i]);
                  //cir._flash(this.context, 50,color, cellid_ser[i]); 
                } 
              }
          } else {
              rectXPos = 13;
              rectYPos = 13;
              rectWidth = 15;
              rectHeight = 15;    
          }
          
          cir._draw_rect(this.context,rectXPos,rectYPos,rectWidth,rectHeight,thickness,color);
          this.curr_pos = [];
          this.curr_pos.push(cellid_ser);
         
         /* function check_play_clk() {
            const c = document.getElementById(cellid_ser) as HTMLCanvasElement;
            this.ctx = c.getContext("2d");
            this.flash == 1;
            //cir._flash(this.ctx, 0,color, cellid_ser,rectXPos,rectYPos,rectWidth,rectHeight,thickness,0); 
            alert(cellid_ser);
            
            
          } */ 
          }
        });
  
      
  }
  
  public check_play_clk(id_cap) {
    alert(id_cap);
    this.socket.emit('get_click',id_cap);
  }  
  
  public clear(inc){
   

    /*const noop = () => {};

    const requestTimeout = (fn, delay, registerCancel) => {
      const start = new Date().getTime();
    
      const loop = () => {
        const delta = new Date().getTime() - start;
    console.log("Hell");
        if (delta >= delay) {
          fn();
          registerCancel(noop);
          return;
        }
    
        const raf = requestAnimationFrame(loop);
        registerCancel(() => cancelAnimationFrame(raf));
      };
    
      const raf = requestAnimationFrame(loop);
      registerCancel(() => cancelAnimationFrame(raf));
    };
    
    let cancel = noop;
    const registerCancel = fn => cancel = fn;
    
    requestTimeout(() => console.log("I'm a delayed work"), 300, registerCancel);
    
    // In case I need to cancel the current scheduled work:
    if(inc == 2){
    cancel();
    }*/
   
     
  }
  public move(pos,cell,player,game,play_num, mov_pos) {
//    alert(this.playername);
    if(mov_pos == 0){
    var position = this.our_random_range(0, 6);
    if (position == 0){
      position = 12;
    }
    show_message(position);
    /*if (position == 2 || position == 3 || position == 4) {
      const button = document.getElementById('play'+this.playername) as HTMLButtonElement;
      button.disabled = true;
    }*/
    if (position == 1 && this.game_starts == 0) {
      this.game_starts = 1;
      position = 0;
    }
    
    if (position == 0  || (this.game_starts && (position == 1 || position == 5) && this.play_coins.length < 6 )){
      var coin_len =  this.play_coins.length;
      coin_len++;
      this.play_coins.push(coin_len);
      var coin = "p"+ coin_len;
      position = 0;
                 
      const ct = document.getElementById(coin) as HTMLCanvasElement;
      this.ctx = ct.getContext("2d");
      this.ctx.fillStyle="#FF0000";
      this.ctx.fillRect(20, 20, 150, 100);
      this.ctx.moveTo(0,0);
      this.ctx.lineTo(40,40);

      this.ctx.stroke();
      this.ctx.moveTo(40,0);
      this.ctx.lineTo(0,40);
      this.ctx.stroke();   

      } else {
        //alert(position);
        this.play_numbers.push(position);
      }
    
     // show_message(this.play_numbers);
      show_message('Param:'+position+"-"+this.curr_pos+"-"+this.playername+"-"+this.game_starts+"-"+this.play_numbers);
      //if (this.game_starts) {
      this.socket.emit('event', {position: position,cellid: this.curr_pos,playername: this.playername, 
        game_stat: this.game_starts,play_numbers: this.play_numbers, mov_pos: mov_pos});
    } else {
      show_message('Param:'+pos+"#"+cell+"#"+player+"#"+game+"#"+play_num+"#"+ mov_pos);
      this.socket.emit('event', {position: pos,cellid: cell,playername: player, 
        game_stat: game,play_numbers: play_num, mov_pos: mov_pos});
    }
      //} else {
      //  this.playername++;
      //  show_message("Check Player:"+this.playername);
     // }
         //this.socket.emit('cellid',this.curr_pos);
  }
  
  
  public our_random_range(mymin:number, mymax: number) {
    return Math.floor(Math.random() * (mymax - mymin +1)) + mymin;
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  } 
}
/*function player_prop(playername: any) {
  alert("in function");
  this.socket.emit("new player");
  //this.socket.emit("cellid", cellid );
  this.socket.on("prev", cellid => {
      const prec = document.getElementById(cellid) as HTMLCanvasElement;
      this.precont = prec.getContext("2d");
      this.precont.clearRect(20,20,15,15); 
      if (cellid == 74 || cellid == 41 || cellid == 44 || cellid == 47 || cellid == 62 || cellid == 66 || 
        cellid == 22 || cellid == 26 || cellid == 14) {
      this.precont.moveTo(0,0);
      this.precont.lineTo(40,40);
      this.precont.stroke();
      this.precont.moveTo(40,0);
      this.precont.lineTo(0,40);
      this.precont.stroke();
      }
  })
  this.socket.on("cell", cellid_ser => {
    const c = document.getElementById(cellid_ser) as HTMLCanvasElement;
    this.context = c.getContext("2d");
    this.context.fillStyle="#13118a";
    this.context.fillRect(20,20,15,15);
    this.curr_pos = cellid_ser;
    //this.curr_pos.push(cellid_ser);
  });
}*/

function show_message(msg: any){
  const parent = document.querySelector('#events');

    const el = document.createElement('li');
    el.innerHTML = msg;
    parent.appendChild(el);
}
function check_box(cell_val: string){
const c = document.getElementById(cell_val) as HTMLCanvasElement;
const ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(40,40);
ctx.stroke();
ctx.stroke();
ctx.moveTo(40,0);
ctx.lineTo(0,40);
ctx.stroke();
ctx.stroke();
/*for(var i=1; i<=7; i++){
  for(var p=1; p<=7; p++){
    alert("cell"+i+p);
    const c = document.getElementById("cell"+i+p) as HTMLCanvasElement;
    const ctx = c.getContext("2d");
alert("in java");
ctx.moveTo(0,0);
ctx.lineTo(40,40);

ctx.stroke();
ctx.moveTo(40,0);
ctx.lineTo(0,40);
ctx.stroke();   
  
  }


}*/

} 
 

