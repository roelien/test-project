    if ( !window.requestAnimationFrame ) { // Deze methode vertelt de browser dat je een animatie wilt uitvoeren
        window.requestAnimationFrame = ( function() {
            return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame || //voor Firefox
            window.oRequestAnimationFrame || //voor Opera
            window.msRequestAnimationFrame || //voor internet explorer
               
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
            window.setTimeout( callback, 1000 / 60 );
            }; 
        } )(); 
    }
   
    function drawDisc( x,y,r ) {  // Tekent de bal
        theContext.beginPath();
        theContext.arc(x,y,r,0,Math.PI*2,false);
        theContext.closePath();
        theContext.fill();
        theContext.fillStyle='#fff';
    }
    function drawPlatform1(x, y) {   // Tekent het platform links
        theContext.beginPath();
        theContext.rect(platform1X, platform1Y, 10, hoogtePlatform)
        theContext.closePath();
        theContext.stroke();
    }
    function drawPlatform2(x, y) {   // Tekent het platform rechts
        theContext.beginPath();
        theContext.rect(platform2X, platform2Y, 10, hoogtePlatform)
        theContext.closePath();
        theContext.stroke();
    }
    //-------------------------------------------------------------------------------//
    function drawPlatform3(x, y) {   // Tekent het platform rechts
        theContext.beginPath();
        theContext.rect(platform3X, platform3Y, breedtePlatform, 10)
        theContext.closePath();
        theContext.stroke();
    }
    function drawPlatform4(x, y) {   // Tekent het platform rechts
        theContext.beginPath();
        theContext.rect(platform4X, platform4Y, breedtePlatform, 10)
        theContext.closePath();
        theContext.stroke();
    }
    //-------------------------------------------------------------------------------//
    function drawMiddelline(){
        theContext.beginPath();
        theContext.setLineDash([canvasWidth/50, canvasWidth/50]);
        theContext.moveTo(canvasWidth/2,0);
        theContext.lineTo(canvasWidth/2, canvasHeight);
        theContext.lineWidth = canvasWidth/200;
        theContext.strokeStyle ='#fff';
        theContext.stroke();
    }
    function startDrawing(canvasId) {
        var canvasElement = document.getElementById(canvasId);
        var drawingContext = canvasElement.getContext("2d");
        return drawingContext;
    }
   
    var canvasWidth = 1000
    var canvasHeight = 600
    var theContext = startDrawing("mijnCanvasje")
    window.addEventListener('resize', resizeCanvas, false)
    function resizeCanvas() {
        mijnCanvasje.width = canvasWidth
        mijnCanvasje.height = canvasHeight
    }
    resizeCanvas();
 
    var x = (canvasWidth/100)*25;  // houdt de veranderende horizontale positie bij
    var y = (canvasHeight/2);  // houd de veranderende verticale positie bij
    var frameTeller = 0;
    var stapX = 0//(canvasWidth/100)*1;    // De X-as snelheid (in frames) per seconde
    var stapY = 0//(canvasWidth/100)*1;    // De Y-as snelheid (in frames) per seconde
    var straal = 10;  // De straal van de bal
    var hoogtePlatform = (canvasHeight/100)*15;   // De hoogte van de platform (in pixels)
    // var platform1X = (canvasWidth/100)*5    // Beginpositie X-as platform links
    var platform1Y    // Beginpositie Y-as (niet ingesteld)
    var onderkantPlatform1
    var bovenkantPlatform1
    var platform2X    // Beginpositie X-as platform rechts
    var platform2Y     // Beginpositie Y-as platform rechts
    var onderkantPlatform2
    var bovenkantPlatform2
    //-------------------------------------------------------------------------------//
    var breedtePlatform = (canvasWidth/100)*15;   // De breedte van de platform (in pixels)
    var platform3X    // Beginpositie X-as platform rechts
    var platform3Y     // Beginpositie Y-as platform rechts
    var onderkantPlatform3
    var bovenkantPlatform3
    var platform4X    // Beginpositie X-as platform rechts
    var platform4Y     // Beginpositie Y-as platform rechts
    var onderkantPlatform4
    var bovenkantPlatform4
    //-------------------------------------------------------------------------------//
    var hitCounter = 0   // Variable die bijhoud hoe vaak de bal op het platform komt
    var speler1Count = 0    // Variable die bijhoud hoe veel punten speler 1 heeft
    var speler2Count = 0    // Variable die bijhoud hoe veel punten speler 2 heeft
    var beginCount = 0
    
    setInterval( maakSpel, 40 )   // 40 frames per seconde
   
    function init(){
        balkLinks = document.getElementById("balkLinks");  //Creëer variable van de linker balk
        balkRechts = document.getElementById("balkRechts");   //Creëer variable van de rechter balk
        //-------------------------------------------------------------------------------//
        balkBoven = document.getElementById("balkBoven");   //Creëer variable van de rechter balk
        balkOnder = document.getElementById("balkOnder");   //Creëer variable van de rechter balk
        //-------------------------------------------------------------------------------//
        w = canvasWidth;  //Breedte van het canvas
        h = canvasHeight;    //Hoogte van het canvas
        balkLinks.style.left = (w/100)*5+"px";    //Positie balkLinks
        balkLinks.style.top = (h/2)+"px";
        balkLinks.style.height = hoogtePlatform+"px";
        balkLinks.snelheid = {x:0,y:0}
        balkLinks.positie = {x:0,y:h/2}
   
        balkRechts.style.left = (w/100)*95+"px"; //positie balkRechts
        balkRechts.style.top = (h/2)+"px";
        balkRechts.style.height = hoogtePlatform+"px";
        balkRechts.snelheid = {x:0,y:0}
        balkRechts.positie = {x:0,y:h/2}
        //-------------------------------------------------------------------------------//
        balkBoven.style.left = (w/2)+"px"; //positie balkBoven
        balkBoven.style.top = (h/100)*5+"px";
        balkBoven.style.width = breedtePlatform+"px"
        balkBoven.snelheid = {x:0,y:0}
        balkBoven.positie = {x:(w/2)-(breedtePlatform/2),y:(h/8)}
        balkOnder.style.left = (w/2)+"px"; //positie balkOnder
        balkOnder.style.top = (h/100)*95+"px";
        balkOnder.style.width = breedtePlatform+"px"
        balkOnder.snelheid = {x:0,y:0}
        balkOnder.positie = {x:(w/2)-(breedtePlatform/2),y:(h/2)}
        //-------------------------------------------------------------------------------//
    
        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", function(event) {
                balkLinks.snelheid.y = Math.round(event.beta);
                balkLinks.snelheid.x = Math.round(event.gamma);
                balkRechts.snelheid.y = Math.round(event.beta); //beta is je mobiel kantelen via de lengte.
                balkRechts.snelheid.x = Math.round(event.gamma); //gamma is je mobiel kantelen via de breedte.
                balkBoven.snelheid.y = Math.round(event.beta);
                balkBoven.snelheid.x = Math.round(event.gamma);
                balkOnder.snelheid.y = Math.round(event.beta);
                balkOnder.snelheid.x = Math.round(event.gamma);
            } )
        }; 
        update();
    }
    function update(){
        balkLinks.positie.y += (balkLinks.snelheid.y / 2);    //Verplaatsing van het linker platform
        balkRechts.positie.y += (balkRechts.snelheid.y / 2);  //Verplaatsing van het rechter platform
        //-------------------------------------------------------------------------------//
        balkBoven.positie.x += (balkBoven.snelheid.x / 2);  //Verplaatsing van het bovenste platform
        balkOnder.positie.x += (balkOnder.snelheid.x / 2);  //Verplaatsing van het onderste platform
        //-------------------------------------------------------------------------------//
        if (balkLinks.positie.y < 0 && balkLinks.snelheid.y < 0){   //bovenkant platform links
            balkLinks.positie.y = 0;
        }      
        if (balkLinks.positie.y > canvasHeight - hoogtePlatform && balkLinks.snelheid.y > 0){  //onderkant platform links
            balkLinks.positie.y = canvasHeight - hoogtePlatform;
        }
        if (balkRechts.positie.y < 0 && balkRechts.snelheid.y < 0){ //bovenkant platform rechts
            balkRechts.positie.y = 0;
        }
        if (balkRechts.positie.y > canvasHeight - hoogtePlatform && balkRechts.snelheid.y > 0){ //onderkant platform rechts
            balkRechts.positie.y = canvasHeight - hoogtePlatform;
        }
        //-------------------------------------------------------------------------------//
        if (balkBoven.positie.x < 0 && balkBoven.snelheid.x < 0){ //bovenkant platform Boven
            balkBoven.positie.x = 0;
        }
        if (balkBoven.positie.x > canvasWidth - breedtePlatform && balkBoven.snelheid.x > 0){ //onderkant platform Boven
            balkBoven.positie.x = canvasWidth - breedtePlatform;
        }
        if (balkOnder.positie.x < 0 && balkOnder.snelheid.x < 0){ //bovenkant platform Onder
            balkOnder.positie.x = 0;
        }
        if (balkOnder.positie.x > canvasWidth - breedtePlatform && balkOnder.snelheid.x > 0){ //onderkant platform Onder
            balkOnder.positie.x = canvasWidth - breedtePlatform;
        }
        //-------------------------------------------------------------------------------//
        balkLinks.style.top = balkLinks.positie.y + "px"   //De positie bepalen van de linker balk
        platform1X = balkLinks.positie.x + 75 
        platform1Y = balkLinks.positie.y + 75
        balkRechts.style.top = balkRechts.positie.y + "px"    //De positie bepalen van de rechter balk
        platform2X = balkRechts.positie.x + 75
        platform2Y = balkRechts.positie.y + 75
        //-------------------------------------------------------------------------------//
        balkBoven.style.left = balkBoven.positie.x + "px"    //De positie bepalen van de boven balk
        platform3X = balkBoven.positie.x + 0
        platform3Y = balkBoven.positie.y + 0
        balkOnder.style.left = balkOnder.positie.x + "px"    //De positie bepalen van de onder balk
        platform4X = balkOnder.positie.x + 0
        platform4Y = balkOnder.positie.y + 0
        //-------------------------------------------------------------------------------//
        requestAnimationFrame( update );    //KEEP ANIMATING
    }
    function maakSpel() {   // Het spel beginnen
        onderkantPlatform1 = balkLinks.positie.y + 75 + hoogtePlatform   //Onderkant van het linker platform berekenen
        bovenkantPlatform1 = balkLinks.positie.y + 75      //Bovenkant van het linker platform berekenen
        bovenkantPlatform2 = balkRechts.positie.y + 75     //Bovenkant van het rechter platform berekenen
        onderkantPlatform2 = balkRechts.positie.y + 75 + hoogtePlatform   //Onderkant van het rechter platform
        //-------------------------------------------------------------------------------//
        onderkantPlatform3 = balkBoven.positie.x + 0 + breedtePlatform   //Onderkant van het linker platform berekenen
        bovenkantPlatform3 = balkBoven.positie.x + 0      //Bovenkant van het linker platform berekenen
        onderkantPlatform4 = balkOnder.positie.x + 0 + breedtePlatform   //Onderkant van het rechter platform
        bovenkantPlatform4 = balkOnder.positie.x + 0     //Bovenkant van het rechter platform berekenen
        //-------------------------------------------------------------------------------//
        
        frameTeller++;
        x += stapX;
        y += stapY;
        theContext.clearRect(0,0,canvasWidth,canvasHeight);    // wis het canvas
        drawDisc( x, y, straal );
        drawMiddelline();
        //console.log(hitCounter)
        
        if (beginCount == 0){   //Deze if zorgt er voor dat deze onclick actie maar één keer uitgevoerd kan worden
            mijnCanvasje.onclick = function startSpel() {   //Klikken om het spel te beginnen
                if (beginCount == 0){      //Opnieuw, maar één eer uitvoeren, anders blijft hij in de function zitten
                    stapX = (canvasWidth/100)*1     //Balsnelheid
                    stapY = (canvasWidth/100)*1     //Balsnelheid
                    beginCount = 1
                }
            }
        }
      
        if (hitCounter % 2 != 0) {
            if(x <= (canvasWidth/100)*5 + straal + 10 && x >= (canvasWidth/100)*5){ //90   // Checken of het linker platform wordt geraakt 
                hitCounter++
                if (hitCounter % 5 == 0) {    // Bij elke 5 aanrakingen de balSneller() functie uitoeren
                    balSneller()
                }
                if (y >= (balkLinks.positie.y) - straal && y <= (balkLinks.positie.y) && x >= (canvasWidth/100)*5 && x <= (canvasWidth/100)*5 + 10 + straal){   //Checken of de bovenkant van het platform geraakt wordt
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (y <= (balkLinks.positie.y + 75 + hoogtePlatform) + straal &&y >= (balkLinks.positie.y + 75 + hoogtePlatform) && x >= (canvasWidth/100)*5 && x <= (canvasWidth/100)*5 + 10 + straal) {   //Checken of de onderkant van het platform geraakt wordt
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (y <= balkLinks.positie.y + 95 && y > balkLinks.positie.y){    //Checken of het midden van het platform geraakt wordt
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
            }
        }
        if (hitCounter % 2 != 0){
            if (x >= (canvasWidth/100)*95 - straal && x <= (canvasWidth/100)*95 + straal + 50){    // Checken of het rechter platform wordt geraakt
                hitCounter++
                if (hitCounter % 5 == 0){  // Bij elke 5 aanrakingen de balSneller() functie uitoeren
                   balSneller()
                }
                if (y >= (balkRechts.positie.y) - straal && y <= (balkRechts.positie.y) && x >= (canvasWidth/100)*95 - 10 - straal && x <= (canvasWidth/100)*95){  //Checken of de bovenkant van het platform geraakt wordt 
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (y <= (balkRechts.positie.y + 75 - hoogtePlatform) + straal && y >= (balkRechts.positie.y + 75 - hoogtePlatform) && x >= (canvasWidth/100)*95 - 10 - straal && x <= (canvasWidth/100)*95) {     //Checken of de onderkant van het platform geraakt wordt
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (y <= balkRechts.positie.y + 95 && y >= balkRechts.positie.y) {     //Checken of het midden van het platform geraatk wordt
                   stapX = -stapX
                   navigator.vibrate(200);  
                }
            }
        }
        //-------------------------------------------------------------------------------//
        if (hitCounter % 2 == 0){
            if (y >= /*(canvasWidth/100)*95 - straal*/40 && y <= 50/*(canvasWidth/100)*95 + straal + 50*/){ //150    // Checken of het boven platform wordt geraakt
                hitCounter++
                if (hitCounter % 5 == 0){  // Bij elke 5 aanrakingen de balSneller() functie uitoeren
                   balSneller()
                }
                if (y >= (balkBoven.positie.y) - straal && y <= (balkBoven.positie.y) && x >= (canvasWidth/100)*95 - 10 - straal && x <= (canvasWidth/100)*95){  //Checken of de bovenkant van het platform geraakt wordt 
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (y <= (balkBoven.positie.y + 75 - hoogtePlatform) + straal && x >= (balkBoven.positie.y + 75 - hoogtePlatform) && x >= (canvasWidth/100)*95 - 10 - straal && y <= (canvasWidth/100)*95) {     //Checken of de onderkant van het platform geraakt wordt
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (x <= balkBoven.positie.x + 150 && x >= balkBoven.positie.x) {     //Checken of het midden van het platform geraatk wordt
                   stapY = -stapY
                   navigator.vibrate(200);
                   //console.log("bovenkant")  
                }
            }
        }
        if (hitCounter % 2 == 0){
            if (y >= /*(canvasWidth/100)*95 - straal*/ 560 && y <= /*(canvasWidth/100)*95 + straal + 50*/ 570){    // Checken of het onder platform wordt geraakt
                //console.log("onderkant")
                hitCounter++
                if (hitCounter % 5 == 0){  // Bij elke 5 aanrakingen de balSneller() functie uitoeren
                   balSneller()
                }
                if (y >= (balkOnder.positie.y) - straal && y <= (balkOnder.positie.y) && x >= (canvasWidth/100)*95 - 10 - straal && x <= (canvasWidth/100)*95){  //Checken of de bovenkant van het platform geraakt wordt 
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (y <= (balkOnder.positie.y + 75 - hoogtePlatform) + straal && y >= (balkOnder.positie.y + 75 - hoogtePlatform) && x >= (canvasWidth/100)*95 - 10 - straal && x <= (canvasWidth/100)*95) {     //Checken of de onderkant van het platform geraakt wordt
                   stapY =- stapY
                   stapX =- stapX
                   navigator.vibrate(200);  
                }
                if (x <= balkOnder.positie.x + 150 && x >= balkOnder.positie.x) {     //Checken of het midden van het platform geraatk wordt
                    //console.log("onderkant")
                   stapY = -stapY
                   navigator.vibrate(200);  
                }
            }
        }
        //-------------------------------------------------------------------------------//
        if ( y >= canvasHeight - straal || y <= straal ){    // Checken of de boven en onderkant van het canvas wordt geraakt
            stapY = -stapY;
        }
        if ( x <= 0 || x >= canvasWidth){  // Checken of de bal langs een platform gaat
            if (x <= 0){   // Gaat de bal voorbij aan speler 1, dan wint speler 2
                navigator.vibrate(500);
                speler2Count++    // Punt er bij voor speler 2
                document.getElementById("speler1").innerHTML = speler1Count   // Update de score speler 1
                document.getElementById("speler2").innerHTML = speler2Count   // Update de score speler 2
                resetBal("speler2")  // Reset de bal positie, speler 2 heeft gewonnen
            }
            if (x >= canvasWidth){    // Gaat de bal voorbij aan speler 2, dan wint speler 1
                navigator.vibrate([200,500,200]);
                speler1Count++    // Punt er bij voor speler 1
                document.getElementById("speler1").innerHTML = speler1Count   // Update de score speler 1
                document.getElementById("speler2").innerHTML = speler2Count   // Update de score speler 2
                resetBal("speler1")  // Reset de bal positie, speler 1 heeft gewonnen
            }
        }
        //-------------------------------------------------------------------------------//
        //boven en onderkant nog door canvas en spelercount
        //-------------------------------------------------------------------------------//
        function resetBal(winnaar) {
            if (winnaar == "speler1") {   // Welke speler heeft gewonnen?
                var anderGetal = 0      //Variable naar 0 zetten
                x = (w/100)*75  // Set bal X-as positie
                y = h/2     // Set bal Y-as positie
                stapX = 0     // Snelheid X-as 5px per sec
                stapY = 0     // Snelheid Y-as 5px per sec
                hitCounter = 0    // Reset de hitCounter
                mijnCanvasje.onclick = function beginSpelRechts() {     //De functie beginSpelRechts() uitvoeren als er op het canvas geklikt wordt
                    if (anderGetal == 0) {      //Deze if zorgt er voor dat je maar één keer de onclick actie kan uitvoeren
                        stapX = -(canvasWidth/100)*1
                        stapY = -(canvasWidth/100)*1
                        anderGetal = 1
                    }
                }
            }
            if (winnaar == "speler2") {   // Welke speler heeft gewonnen?
                var anderGetal = 0      //Variable naar 0 zetten
                x = (w/100)*25    // Set bal X-as positie
                y = h/2     // Set bal Y-as positie
                stapX = 0    // Snelheid X-as 5px per sec
                stapY = 0   // Snelheid Y-as 5px per sec
                hitCounter = 0    // Reset de hitCounter
                mijnCanvasje.onclick = function beginSpelLinks() {      //De functie beginSpelRechts() uitvoeren als er op het canvas geklikt wordt
                    if (anderGetal == 0) {      //Deze if zorgt er voor dat je maar één keer de onclick actie kan uitvoeren
                        stapX = (canvasWidth/100)*1
                        stapY = (canvasWidth/100)*1
                        anderGetal = 1
                    }
                }
            }
        }
   }
    function balSneller() {    // De snelheid van de bal met 2px verhogen
        if (stapX > 0) {  // Checken of de X-coördinaat van de bal naar rechts gaat
            stapX+=2
        }
        if (stapY > 0) {  // Checken of de Y-coörinaat van de bal naar beneden gaat
            stapY+=2
        }
        if (stapX < 0) {  // Checken of de X-coördinaat van de bal naar links gaat
            stapX-=2
        }
        if (stapY < 0) {  // Checken of de Y-coördinaat van de bal naar boven gaat
            stapY-=2
        }
   }
