var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 8080
var io = require("socket.io").listen(app.listen(port));


app.get('/', function(req, res){

  //send the index.html file for all requests
  res.sendFile(__dirname + '/index.html');

});

console.log('listening on *:'+ port);

var ballArr=[
    {
    x:100,
    y:100,
    r: 10,
    stepX:5,
    stepY:5,  
    },
];

var platformArr=[
    {
        platformX:50,
        platformY:50,
        width: 10,
        height: 35,    
    },
    {
        platformX: 250,
        platformY: 50,
        width: 20,
        height: 100,
    }

];

function moveBall(ball){
    ball.x += ball.stepX;
    ball.y += ball.stepY;
    
    if(ball.x == 990 || ball.x == 10){
   		ball.stepX = -ball.stepX;
   	}
   	if (ball.y == 10 || ball.y == 590){
   		ball.stepY = -ball.stepY;
   	}
    
    return ball;
}



setInterval( function() {    
    for(var i=0;i<ballArr.length; i++) {
        
        var thisBall=ballArr[i];
        moveBall(thisBall);
    }
    
    io.sockets.emit('canvas', ballArr);
    console.log (ballArr);
    
    for(var i=0; i<platformArr.length;i++){
        var thisPlatform= platformArr[i];
    }
    io.sockets.emit('platform', platformArr);
    console.log (platformArr)
    
}, 1000 );

