class dygame {
    constructor(p1,p2) {
        this._players = [p1,p2];
        this._turns = [null, null];

        this._sendToPlayers('Game Starts!');
    
   /*     this._players.forEach((player) => {
            player.on('turn', (turn) => {
                this._onturn(idx, turn);
            });
        });*/ 
    }
    _sendToPlayers (msg){
        this._players.forEach((player) => {
            player.emit('message', msg);
        });
    }
    _onturn(playerIndex, turn) {
        this._turns[playerIndex] = turn;
    }

   
}


module.exports = dygame;