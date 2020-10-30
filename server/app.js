var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var socketIO = require('socket.io');
var io = socketIO(server);
var dygame = require('./game');
const port = 3000;

const client_path = '${__dirname}/../';
console.log('Server Static path: ',client_path);

app.use(express.static(client_path));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, 'index.html'));
})
io.on('error',(err) => {
    console.error('Server Error:', err);
});

io.on('connection', (socket) => {
    console.log('user connected');
    //var room = io.sockets.adapter.rooms['my_room'];
  //  var room = io.sockets.clients();
//console.log('Room:', room);
});



let waitingPlayer = null;
let player1 = null;
let player2 = null;
let player3 = null;
let player4 = null;
/*var position = {
    x: 200,
    y: 200
};*/
let replay = 0;
let players = []
let p1_curr_pos = []
let play_turns = []
let p0_play_numbers = []
let p1_play_numbers = []
let p2_play_numbers = []
let p3_play_numbers = []
let track_pos = []
let p0_pos = []
let p0_pre_pos = []
let p1_pos = []
let p1_pre_pos = []
let p2_pos = []
let p2_pre_pos = []
let p3_pos = []
let p3_pre_pos = []
let key_pos = [74,14,,41,44,47,62,66,22,26]

let p1_path = [74,75,76,77,67,57,47,37,27,17,16,15,14,13,12,11,21,31,41,51,61,71,72,73,62,52,42,32,22,23,24,
               25,26,36,46,56,66,65,64,63,53,43,33,34,35,45,55,54,44]

let p2_path = [47,37,27,17,16,15,14,13,12,11,21,31,41,51,61,71,72,73,74,75,76,77,67,57,66,65,64,63,62,52,42,32
                ,22,23,24,25,26,36,46,56,55,54,53,43,33,34,35,45,44]

let p3_path = [14,13,12,11,21,31,41,51,61,71,72,73,74,75,76,77,67,57,47,37,27,17,16,15,26,36,46,56,66,65,64,63,
                62,52,42,32,22,23,24,25,35,45,55,54,53,43,33,34,44]

let p4_path = [41,51,61,71,72,73,74,75,76,77,67,57,47,37,27,17,16,15,14,13,12,11,21,31,22,23,24,25,26,36,46,56,
                66,65,64,63,62,52,42,32,33,34,35,45,55,54,53,43,44]
var player_turn;

io.on("connection", (socket) => {
    console.log('Socket Connected:', socket.id);
    socket.emit('socket', socket.id);
    players.push(socket.id);
    io.emit('players_id', players);
    let p0_pos = []
    let p0_pre_pos = []
    let p1_pos = []
    let p1_pre_pos = []
    let p2_pos = []
    let p2_pre_pos = []
    let p3_pos = []
    let p3_pre_pos = []

    if (players.length>3) {
        players = []
    }  

    if (waitingPlayer) {
        //[socket,waitingPlayer].foreach(s => s.emit('message','Game Starts!'));
        //console.log('Game Starts!');
        new dygame(waitingPlayer,socket); 
        waitingPlayer = null;
    } else {
        //console.log('Waiting for opponent!');
        waitingPlayer = socket;
        waitingPlayer.emit('message','Waiting for opponent');
    }
   
    


        socket.on("event", ({position, cellid, playername, game_stat,play_numbers,mov_pos}) => {
        play_turns.push(position);
       
       console.log("Get Click",mov_pos);
        /*if (game_stat == 0){
        check_turns(playername, position, 0, 0);
        }*/ //Commented till dev work
        /*console.log('Play number Arr0:'+p0_play_numbers);
        console.log('Play number Arr1:'+p1_play_numbers);
        console.log('Play number Arr2:'+p2_play_numbers);
        console.log('Play number Arr3:'+p3_play_numbers);
        //Commented for testing..
        if (playername != player_turn){
            p0_play_numbers = [];
            p1_play_numbers = [];
            p2_play_numbers = [];
            p3_play_numbers = [];
        }    
        console.log('Playername - Turn ',playername,player_turn);        
        //io.emit('input',player_turn);*///Commented for testing
        console.log("Mov Pso", mov_pos);
        if ((mov_pos == 0) || (p0_pos.length > 1)) {

        if (position == 0){
        make_first_move(playername, game_stat,position,cellid,p1_path);
        }
        if (playername == 0 && game_stat != 0 && position != 0){
            p0_play_numbers.push(position);
            console.log("P arr",p0_pos,p0_pos.length);
            var stat = check_move(playername, game_stat, position,cellid,p1_path, p0_pos);
            console.log("Stat:",stat);
            if (stat == "nogame"){
               check_turns(playername, position, 1, 0);
            } else if (stat == "input"){
                socket.emit('play_input', {position: position,cellid: cellid,playername:playername, game_stat: game_stat, 
                    play_numbers: play_numbers, pos_arr: p0_pos});
                    socket.on("events", ({position, cellid, playername, game_stat,play_numbers,mov_pos}) => {
                        console.log("Late Click",mov_pos);
                    });
            } else if (stat == 'mandate') {
                get_positions(playername, game_stat,position,cellid,p1_path,p0_play_numbers,0);
            }
        } else {
            get_positions(playername, game_stat,position,cellid,p1_path,p0_play_numbers,mov_pos);
        }
        } else if (playername == 1 && game_stat != 0 && position != 0){
            p1_play_numbers.push(position);
            get_positions(playername, game_stat,position,cellid,p2_path,p1_play_numbers);
        } else if (playername == 2 && game_stat != 0 && position != 0){
            p2_play_numbers.push(position);
            get_positions(playername, game_stat,position,cellid,p3_path,p2_play_numbers);
        } else if (playername == 3 && game_stat != 0 && position != 0){
            p3_play_numbers.push(position);
            get_positions(playername, game_stat,position,cellid,p4_path,p3_play_numbers);
        } else {}  
        /*if (playername == 0 && game_stat != 0){
            if(position == '0' && p1_curr_pos.length == 0){
                    console.log('case id', position);
                    // cellid = cellid + 1; 
                    cellid = p1_path[0];
                //     p1_curr_pos.push(cellid);
                    console.log('Cell pos ;', cellid);
                    io.emit("cell", {cellid_ser: cellid,playername: playername});      
            } else if (position == 1 || position == 2 || position == 3 || position == 4 || position == 5 ||
                position == 6 || position == 12 ){
                console.log('case id', position,playername);
                movePosition(position, cellid,p1_path,playername);
            } else {
                    io.emit("cell", cellid);                         
            }   
        } else*/ if (playername == 1 && game_stat != 0) {
                if(position == '0' && p1_curr_pos.length == 0){
                        console.log('case id', position);
                        // cellid = cellid + 1; 
                        cellid = p2_path[0];
                    //     p1_curr_pos.push(cellid);
                        console.log('Cell pos ;', cellid);
                        io.emit("cell", {cellid_ser: cellid,playername: playername});        
                } else if (position == 1 || position == 2 || position == 3 || position == 4 || position == 5 ||
                    position == 6 || position == 12 ){
                    console.log('case id', position);
                    //movePosition(position, cellid,p2_path,playername);
                } else {
                        io.emit("cell", cellid);                         
                }   
        } else if (playername == 2 && game_stat != 0) {
                if(position == '0' && p1_curr_pos.length == 0){
                        console.log('case id', position);
                        // cellid = cellid + 1; 
                        cellid = p3_path[0];
                    //     p1_curr_pos.push(cellid);
                        console.log('Cell pos ;', cellid);
                        io.emit("cell", {cellid_ser: cellid,playername: playername});            
                } else if (position == 1 || position == 2 || position == 3 || position == 4 || position == 5 ||
                    position == 6 || position == 12 ){
                    console.log('case id', position);
                    io.emit("player", playername); 
                    //movePosition(position, cellid,p3_path,playername);
                } else {
                        io.emit("cell", cellid);                         
                }   
        } else if (playername == 3 && game_stat != 0) {
                if(position == '0' && p1_curr_pos.length == 0){
                        console.log('case id', position);
                        // cellid = cellid + 1; 
                        cellid = p4_path[0];
                    //     p1_curr_pos.push(cellid);
                        console.log('Cell pos ;', cellid);
                        io.emit("cell", {cellid_ser: cellid,playername: playername});            
                } else if (position == 1 || position == 2 || position == 3 || position == 4 || position == 5 ||
                    position == 6 || position == 12 ){
                    console.log('case id', position);
                    io.emit("player", playername); 
                  //  movePosition(position, cellid,p4_path,playername);
                } else {
                        io.emit("cell", cellid);                         
                }   
            }
        
    });
    socket.on("events", ({position, cellid, playername, game_stat,play_numbers,mov_pos}) => {
        console.log("Late Click",mov_pos);
    });
    const check_win = (p_pos, playername) => {
        var count = 0;
        console.log("Ppos:",p_pos);
        for (var i=0;i<=p_pos.length-1; i++) {
            if (p_pos[i] == 44){
                count++;
            }
        }
        console.log("WinCount:",count);
        return count;
    }
    const movePosition = (position, p_pos, p_path,playername,p_pre_pos) => {
        //var curr_ind = p_path.indexOf(cellid); 
        //var nex_pos = p_path[curr_ind + position];
        var win_play = 0;
        win_play = check_win(p_pos, playername);
        console.log("Win:",win_play);
        console.log('NextPos:',p_pos);
        console.log('Pre Pos',p_pre_pos);
        io.emit("prev", {cellid: p_pre_pos,playername: playername});  
        io.emit("cell", {cellid_ser: p_pos,playername: playername});
        if (win_play == 6) {
        io.emit("Win", {playername: playername});
        }
        //p0_pre_pos = p_pos;
        p0_play_numbers = [];
        //return nex_pos;
    };
    function make_first_move(playername, game_stat, position, cellid,p_path_move, p_play_numbers)  {
       if (playername == 0 && game_stat != 0 && position == 0) {
                console.log("Pos leght",p0_pos.length,p_path[0]);
                //p0_pos[p0_pos.length+1] = p_path[0];
                p0_pos.push(p_path_move[0]);
                //cellid = p_path[0];
                io.emit("cell", {cellid_ser: p0_pos,playername: playername});   
                //p0_pre_pos = p0_pos;
       }
    }

    function check_move(playername, game_stat, position,cellid,p_path, p_pos) {
        var take_input = 0;
        var no_game = 0;
        var track_pos = [];
        var cnt = check_win(p_pos, playername);
        
        //console.log("check_take:",p_pos.length,cnt,position);
        if (game_stat != 0 && position != 0 && p_pos.length > 1 && cnt < 5 ) {
            for (i=0;i<=p_pos.length;i++){
                
                var p_ind = p_path.indexOf(p_pos[i]); 
                var pos_new = p_path[p_ind + position];
                if ((pos_new) && (p_path.indexOf(pos_new) == p_path.indexOf(p_path[p_path.length-1]))){
                    take_input++;
                    if ((p_pos[i]) && (!track_pos.includes(p_pos[i]))){
                        track_pos.push(p_pos[i]);
                    }
                } else if ((pos_new) && (p_path.indexOf(pos_new) < p_path.indexOf(p_path[p_path.length-1]))){
                    take_input++;
                    if ((p_pos[i]) && (!track_pos.includes(p_pos[i]))){
                        track_pos.push(p_pos[i]);
                    }
                } else if ((pos_new) && (p_path.indexOf(pos_new) > p_path.indexOf(p_path[p_path.length-1]))){
                    no_game = 1;
                } 
            }
            //console.log("track:",track_pos,track_pos.length) ;
            if ((take_input > 1) && (track_pos.length > 1)) {
                return "input";
            }
            if(track_pos.length == 1){
                return "mandate";
            }
            if (no_game == 1 && take_input == 0) {
                return "nogame";
            }
        }
    }
    function get_positions (playername, game_stat, position, cellid,p_path, p_play_numbers,mov_pos)  {
            if (playername == 0 && game_stat != 0 && position != 0) {
                console.log("first P0 pos ", position, p0_pos, p0_pre_pos,p_play_numbers,mov_pos);
                
              /*  if (position == '0'){ 
                    console.log("Pos leght",p0_pos.length,p_path[0]);
                    //p0_pos[p0_pos.length+1] = p_path[0];
                    p0_pos.push(p_path[0]);
                    cellid = p_path[0];
                    io.emit("cell", {cellid_ser: p0_pos,playername: playername});   
                }*/
               // if (position != 0) {
                    var final_cell = 0;
                    var play_arr_temp = [];
                    var move_on = 0;
                    play_arr_temp = p_play_numbers;
                    for (var i=0; i<=play_arr_temp.length-1; i++){
                        final_cell = final_cell + play_arr_temp[i];
                        for(var m=0;m<=p0_pos.length-1;m++){
                            if (p0_pos[m] != 44){
                            var p0_ind = p_path.indexOf(p0_pos[m]); 
                            var pos_new = p_path[p0_ind + play_arr_temp[i]];
                            if ((pos_new) && (p_path.indexOf(pos_new) == p_path.indexOf(p_path[p_path.length-1]))){
                                p0_pre_pos[m] = p0_pos[m];
                                //play_arr_temp[i] = '';
                                p0_pos[m] = 44;
                                move_on = 1;
                                break;
                            } else if ((pos_new) && (p_path.indexOf(pos_new) < p_path.indexOf(p_path[p_path.length-1]))){
                                p0_pre_pos[m] = p0_pos[m];
                                if (pos_new){
                                p0_pos[m] = pos_new;
                                }
                                //play_arr_temp[i] = '';
                                move_on = 1;
                                break;
                                //io.emit("prev", {cellid: p0_pre_pos,playername: playername});  
                                //io.emit("cell", {cellid_ser: p0_pos,playername: playername});
        
                            } else if ((pos_new) && (p_path.indexOf(pos_new) > p_path.indexOf(p_path[p_path.length-1]))){
                                //continue;
                            } 
                           // if (p0_pos[i] != 99){
            
                           // console.log('case id', p0_pos);
                           // console.log('case id_Pre', p0_pre_pos);
                           // }  
                            }
                        }
                    }   
                    if(move_on == 1){
                    console.log('case id', p0_pos);
                    //console.log('case id_Pre', p0_pre_pos);
                    movePosition(position, p0_pos,p_path,playername,p0_pre_pos);
                    }
                    //console.log("Pos:",next_pos);
                    //p0_pos = next_pos;
                //} 
                //console.log("Path_pos:-",p0_pos);
            }
    }
    const check_turns = (playername, position, swift, replay) => {
        if (position == 2 || position == 3 || position == 4 || swift == 1) {
            if (playername == 3) {
                player_turn = 0;
            } else {
                player_turn = playername;
                player_turn++;
            }
        } else {
            player_turn = playername;
        }
        io.emit('input',player_turn);
    };

    const p_path = (playername) => {
        if (playername == 0){
            return p1_path;
        }
        if (playername == 1){
            return p2_path;
        }

        if (playername == 3){
            return p3_path;
        }
        if (playername == 4){
            return p4_path;
        }
    }       
    
    
    
    //});
    
});




server.listen(3000, () => {
    console.log('started on port: 3000.. ${port}');
}); 


