//console.log("I am here in app");

class ear {
    constructor() {
      this.id_cap = 99;
      this.timer = 0;
      this.cap_id;
      //this.requestId;
    }

    _check_flash(cell,cnt,duration,stat){
    count = cnt;
    const timeElem = document.querySelector("#time");
    var requestId;
    var cap_cell;
    var startTime =null; 
    var time ;   
    var req;
    var time;
    var timeoutId;
    var check_ret;
    window.requestAnimationFrame = window.requestAnimationFrame

    window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    //|| function(requestID){clearTimeout(requestID)} 

    //console.log("Cell - Val- Bef:",cell);
    let {p1,p2,p3,p4,p5,p6} = this._get_pos(cell);
    console.log("Cell - Val:",p1,p2,p3,p4,p5,p6);
    
/*    function startTimer () {
        console.log("in timer", timer);
        
        if ((!timer)&& (!timeoutId)) {
                timer = true;
            timeoutId = setTimeout(stop_tim,2000);
            
        } else {
            console.log("Timeout - Clear",timeoutId);
            clearTimeout(timeoutId);
            check_ret = 10;
            console.log("Before return", check_ret);
            return check_ret;}
        //console.log("Reqd:",requestId);
        function stop_tim(){
            console.log("Timeout",timeoutId);
            startTimer();
        }
    }
    function resolveAfter2Seconds(x) { 
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 2000);
        });
      }
      
      async function f1() {
        var x = await resolveAfter2Seconds(10);
        console.log(x); // 10
        //return x;
        if (x){
            start();
        }
        return requestId;
        //console.log("Reqd:",requestId);
      }
      
      
    function stopTimer () {
        timer = true;
        loop();
    }*/
    function loop() {
        requestId = undefined;
        timeoutId = undefined;
        check_ret = undefined;
        req = undefined;
        console.log("In start",count);
        if(count >= 0 ){
            doStuff();
        }
    start();
    }
    function start() {
        console.log("In Dur",duration);
            startTime = null;
            window.requestAnimationFrame = (function(){
                return function (f){
            time = new Date().getTime(); //millisecond-timstamp
            if (startTime == null) {
                    startTime = time;
            }
            var progress = time - startTime;
            //console.log("Timeset:",time,startTime,progress,duration);
            if (progress < duration) {
                //console.log("Timer in du",time,startTime,progress,duration,req);
                req = setTimeout(f,duration);
            } else {
                clearTimeout(req);
                req=undefined;
            }
            };   
     
            })();
            //console.log("In here");
           if (!requestId) {
               req=undefined;
               startTime = null;
               requestId = (function (){
                    return window.requestAnimationFrame(loop);})();
               console.log("Req- start",requestId,req);
        }        
    }
    function stop() {
        //alert("In Stop");
        console.log(requestId,req);
        
        console.log("End of cap",cap_cell);
        if(req){
        //window.cancelAnimationFrame = (function(req){clearTimeout(req)});
        clearTimeout(req);
        }
        if (requestId) {
           window.cancelAnimationFrame(requestId);
           requestId = undefined;
        }
    }
    
    function doStuff() {
      console.log("Hello World",count);
      var obj = new ear();         
      //timeElem.textContent = (time * 0.001).toFixed(2);
           
      count--;
        var rectXPos = 13;
        var rectYPos = 13;
        var rectWidth = 15;
        var rectHeight = 15;
        var thickness = 1; 
        var color = "#13118a";

      if(count%2 == 1) {
        console.log("set 1",count);
        // draw the text
        console.log("PP",p1);
       if (p1){
        
        var c1 = document.getElementById(p1).getContext("2d");    
        obj._highlight_box(c1,0,0,367,367,color);
        //obj._draw_rect(c1,rectXPos,rectYPos,rectWidth,rectHeight,thickness,'#FFF');
        
            if (p1 == 74 || p1 == 41 || p1 == 44 || p1 == 47 || p1 == 62 || 
                p1 == 66 || p1 == 22 || p1 == 26 || p1 == 14) {
                obj._mark_check_box(c1);
            }                 
        }
        if (p2){
        var c2 = document.getElementById(p2).getContext("2d");
        obj._highlight_box(c2,0,0,367,367,color); 
        //obj._draw_rect(c2,rectXPos,rectYPos,rectWidth,rectHeight,thickness,'#FFF');
        
        if (p2 == 74 || p2 == 41 || p2 == 44 || p2 == 47 || p2 == 62 || 
            p2 == 66 || p2 == 22 || p2 == 26 || p2 == 14) {
            obj._mark_check_box(c2);
        }                   
        }
      
    } else {
        console.log("clear 1",count);
        // don't draw it (ie. clear it off)
        if(p1){
            var c1 = document.getElementById(p1).getContext("2d");    
            obj._clear_rect_area(c1,0,0,367,367);  
        //    obj._draw_rect(c1,rectXPos,rectYPos,rectWidth,rectHeight,thickness,color);
            if (p1 == 74 || p1 == 41 || p1 == 44 || p1 == 47 || p1 == 62 || 
                p1 == 66 || p1 == 22 || p1 == 26 || p1 == 14) {
                obj._mark_check_box(c1);
            }      
        }   
        if(p2){
            var c2 = document.getElementById(p2).getContext("2d");    
            obj._clear_rect_area(c2,0,0,367,367);  
          //  obj._draw_rect(c2,rectXPos,rectYPos,rectWidth,rectHeight,thickness,color);
            if (p2 == 74 || p2 == 41 || p2 == 44 || p2 == 47 || p2 == 62 || 
                p2 == 66 || p2 == 22 || p2 == 26 || p2 == 14) {
               obj._mark_check_box(c2);
            }      
        }
       
    }
    }
    
    if(stat){
        stat = undefined;
        start();
    }
    //start();
    document.querySelector("#start").addEventListener('click', function() {
     start();
    //loop();
     //start();
     //startTimer();
    });
    
    document.querySelector("#stop").addEventListener('click', function() {
      stop();
    });

       
    var element = document.getElementsByClassName("column");
    const someObject = {aProperty: ''};
    for (var i = 0; i < element.length; i++) {
        
        element[i].addEventListener('click',  function() {
          someObject.aProperty = this.id;
          var obj = new ear();
          obj.id_cap = this.id;
          cap_cell = this.id;
          stop();
          
          console.log("I am in listern here");
          //obj._click_elem(this.id);
          //return new Promise(this.id);
          timeElem.textContent = this.id;
        }, true);
    }
    console.log("I came here");
    if(cap_cell){
        alert(cap_cell);
        return cap_cell;
    }
    }
   
    _click_elem(click_item){
        console.log("Clicke item:", click_item);
        this.id_cap = click_item;
        this.cap_id = click_item;
        console.log("id",this.id_cap,this.cap_id);
    }
    _get_elem(){
        alert(this.id_cap);
         return new Promise(resolve =>  {
            888;
          });
    }
    _draw_cirle (c,x,y,radius,color) { 
        //alert("In draw");
        c.beginPath();
        c.arc(x,y,radius, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.stroke();
        c.beginPath();
        c.arc(x,y,radius, 0, Math.PI * 2, false);
        c.strokeStyle = color;
        c.stroke();
        
    }

   
    _flash (c, cnt,color, cell,rectXPos,rectYPos,rectWidth,rectHeight,thickness,cmd) {
        var count = cnt;
        var timer;
        //let {p1,p2,p3,p4,p5,p6} = this._get_pos(cell);
        
        //if (count != 0){
            timer = setInterval(function() { console.log("Hello");},500);
        //}
        console.log("In Flash",count, cmd, timer);    
        if( count == 0) {
            console.log("in clear interval");
            clearInterval(timer);
        }
           /* count--;
            //if (cmd == 1){
            console.log("in set interval");
            var obj = new ear();         
            console.log(p1,p2,p3,p4,p5,p6);
            
            if( count%2 == 1) {
                // draw the text
                if (p1){
                var c1 = document.getElementById(p1).getContext("2d");    
                obj._highlight_box(c1,0,0,367,367,color);
                obj._draw_rect(c1,rectXPos,rectYPos,rectWidth,rectHeight,thickness,'#FFF');
                
                if (p1 == 74 || p1 == 41 || p1 == 44 || p1 == 47 || p1 == 62 || 
                    p1 == 66 || p1 == 22 || p1 == 26 || p1 == 14) {
                    obj._mark_check_box(c1);
                }                 
                }
                if (p2){
                var c2 = document.getElementById(p2).getContext("2d");
                obj._highlight_box(c2,0,0,367,367,color); 
                obj._draw_rect(c2,rectXPos,rectYPos,rectWidth,rectHeight,thickness,'#FFF');
                
                if (p2 == 74 || p2 == 41 || p2 == 44 || p2 == 47 || p2 == 62 || 
                    p2 == 66 || p2 == 22 || p2 == 26 || p2 == 14) {
                    obj._mark_check_box(c2);
                }                   
                }
                
            } else {
                // don't draw it (ie. clear it off)
                if(p1){
                    var c1 = document.getElementById(p1).getContext("2d");    
                    obj._clear_rect_area(c1,0,0,367,367);  
                    obj._draw_rect(c1,rectXPos,rectYPos,rectWidth,rectHeight,thickness,color);
                    if (p1 == 74 || p1 == 41 || p1 == 44 || p1 == 47 || p1 == 62 || 
                        p1 == 66 || p1 == 22 || p1 == 26 || p1 == 14) {
                        obj._mark_check_box(c1);
                    }      
                }   
                if(p2){
                    var c2 = document.getElementById(p2).getContext("2d");    
                    obj._clear_rect_area(c2,0,0,367,367);  
                    obj._draw_rect(c2,rectXPos,rectYPos,rectWidth,rectHeight,thickness,color);
                    if (p2 == 74 || p2 == 41 || p2 == 44 || p2 == 47 || p2 == 62 || 
                        p2 == 66 || p2 == 22 || p2 == 26 || p2 == 14) {
                       obj._mark_check_box(c2);
                    }      
                }      
            }*/
        //}
   /*     },1000);
    }
        console.log("inside flash",cmd, timer);
        if( count == 0) {
            console.log("in clear interval");
            clearInterval(timer);
        }*/
           
        
    }
    _click_flash(cnt,pause){
        //alert(cnt);
        //alert(pause);
        var count = cnt;
        if(cnt == 0){
          console.log("I came here");
          window.cancelAnimationFrame(this.timer);
        }
        
        if(cnt != 0){
          //count = 160;  
         // console.log("Count:",count);
          this.timer  = window.requestAnimationFrame(repeatoften);
        }
       function repeatoften(){
            if(pause) return;
        
            if (cnt != 0){
                if(count!=0 && pause == false){
                
                console.log("Hello");
                window.requestAnimationFrame(repeatoften);
                count--;
                }
          }
    }

    }
    _draw_rect(c,rectXPos,rectYPos,rectWidth,rectHeight,thickness,color){
        
        c.fillStyle='#000';
        c.fillRect(rectXPos - (thickness), rectYPos - (thickness), rectWidth + (thickness * 2), rectHeight + (thickness * 2));
        c.fillStyle=color;
        c.fillRect(rectXPos,rectYPos,rectWidth,rectHeight);
    }
    _clear_rect(c,rectXPos,rectYPos,rectWidth,rectHeight,thickness){        
        c.clearRect(rectXPos - (thickness), rectYPos - (thickness), rectWidth + (thickness * 2), rectHeight + (thickness * 2));
        c.clearRect(rectXPos,rectYPos,rectWidth,rectHeight);
    }
    _clear_rect_area(c,rectXPos,rectYPos,rectWidth,rectHeight){
        c.clearRect(rectXPos,rectYPos,rectWidth,rectHeight); 
    }
    _highlight_box(c,rectXPos,rectYPos,rectWidth,rectHeight,color){
        c.fillStyle=color;
        c.fillRect(rectXPos,rectYPos,rectWidth,rectHeight);
    }
    _mark_check_box(c){
        c.moveTo(0,0);
        c.lineTo(40,40);
        c.stroke();
        c.moveTo(40,0);
        c.lineTo(0,40);
        c.stroke();
        
        c.moveTo(0,0);
        c.lineTo(40,40);
        c.stroke();
        c.moveTo(40,0);
        c.lineTo(0,40);
        c.stroke();
    }

    _canvas_element(){
        //alert("In canvas");
        var element = document.getElementsByClassName("column");
        const someObject = {aProperty: ''};
        var id_cap1 = 0;
        var obj = new ear();
        for (var i = 0; i < element.length; i++) {
            element[i].addEventListener('click',  function() {
     /*         someObject.aProperty = 'Data Again'; 
              someObject.aProperty = this.id;
              
              //obj._check_flash.stop();
              console.log(someObject.aProperty);  // Expected Value: 'Data'
              //obj._check_flash.stop();
              console.log(someObject.aProperty); */
               // Change the value
              return this.id;
            }, true);
           // this.check_play_clk, false);
        }
        //console.log(someObject.aProperty);
        //if(someObject.aProperty){
         //someObject.aProperty;}
        /*function boxClick(event) {
          this.id_cap1 = this.id;
          someObject.aProperty = this.id;*/
       /*
        var element = document.getElementsByClassName("column");
        var id_cap1 = 0;
        for (var i = 0; i < element.length; i++) {
            element[i].addEventListener('click', boxClick, false);
        }
        
        function boxClick(event) {
            var cir = new ear();
            console.log("In func:",cir.id_cap,id_cap1);
            cir.id_cap = this.id;
            id_cap1 = this.id;
            console.log("In After func:",cir.id_cap, id_cap1);
            //cir._click_element(this.id);
            //id_cap = this.id;
            //id_cap = this.id;
            console.log(this.id);
           return this.id;
        }
        var ob = new ear();*/
        console.log("ID HERE:",someObject.aProperty);
    }
    _call_chk(){

        function str(){
            alert ("In function call");
        }
    }
    _get_pos(p_pos){
        var p1,p2,p3,p4,p5,p6 = 0;
        var p_arr = [];
        for (var i=0; i<=p_pos.length-1;i++){
            if (!p_arr.includes(p_pos[i])){
                p_arr.push(p_pos[i]);
            }
        }
        console.log("ARR",p_pos,p_pos.length,p_arr);
        if (p_arr[0]){p1 = p_arr[0];}
        if (p_arr[1]){p2 = p_arr[1];}
        if (p_arr[2]){p3 = p_arr[2];}
        if (p_arr[3]){p4 = p_arr[3];}
        if (p_arr[4]){p5 = p_arr[4];}
        if (p_arr[5]){p6 = p_arr[5];}
        return {p1,p2,p3,p4,p5,p6};
    }
}



module.exports = ear;