



//canvas erstellen
window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");


//canvas anpassen an Windowgrösse
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;


//variabeln initiating
    let painting = false;
    var t = 6;
    prevX = 0, currX = 0, prevY = 0, currY = 0;

    w = canvas.width;
    h = canvas.height;



//Eventlistener
    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", handlePointerMove);


//Position von Beginn merken
    function recordPointerLocation(e) {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
    }


//Mausbewegung und ev. Zeichnen
    function handlePointerMove(e) {
        if (painting) {
            recordPointerLocation(e);
            drawLine();
        }
    }


 //Beginn Zeichnen   
    function handlePointerDown(e) {
        recordPointerLocation(e);
        painting = true;
    }


//Ende Zeichnen
    function stopDrawing() {
        painting = false;
    }


//liniengrösse
ctx.lineWidth = 4;


//Zeichnen mit Spiegeln implementierung
    function drawLine() {
        //Variabeln 
        var startLineX = prevX, startLineXmirror = startLineX,
            startLineY = prevY, startLineYmirror = startLineY,
            endLineX = currX, endLineXmirror = endLineX,
            endLineY = currY, endLineYmirror = endLineY;


       ctx.beginPath();

//Original Linie von Start zu Ende
        ctx.moveTo(startLineX, startLineY);
        ctx.lineTo(endLineX, endLineY);
        ctx.stroke();
        ctx.closePath();


//Variabeln Spiegelung
        //winkel1 ist die Spiegelung an Mittelpunkt
        var winkel1 = (2 * Math.PI) / t;
        
        // Abstand von startLinie zu Mittelpunkt  
        var radiusStart = Math.sqrt(((startLineX - MittelpunktX) ** 2) + ((startLineY - MittelpunktY) ** 2));
        //Winkel zwischen Koordinatensystem und startlinie
        var winkel2Start = 0
        console.log("winkel2Start: ", winkel2Start)






        //Berechnung winkel2Start, weil sin()
        //Fall 1
        if (startLineX > MittelpunktX && (startLineY < MittelpunktY)) {
            winkel2Start = Math.asin((startLineX - MittelpunktX) / radiusStart)
            console.log("winkel2Start Fall 1: ", winkel2Start)

        } else {
            //Fall 2
            if (startLineX <= MittelpunktX && (startLineY < MittelpunktY)) {
                var hilfswinkel2 = Math.asin((MittelpunktX - startLineX) / radiusStart)
                winkel2Start = 2 * Math.PI - hilfswinkel2;
                console.log("winkel2Start: Fall 2 ", winkel2Start)

            } else {

                //Fall 3
                if (startLineX > MittelpunktX && (startLineY >= MittelpunktY)) {
                    var hilfswinkel2 = Math.asin((startLineX - MittelpunktX) / radiusStart)
                    winkel2Start = Math.PI - hilfswinkel2;
                    console.log("winkel2Start Fall 3: ", winkel2Start)

                    // Fall 4
                } else {
                    var hilfswinkel2 = Math.asin((MittelpunktX - startLineX) / radiusStart)
                    winkel2Start = Math.PI + hilfswinkel2;

                    console.log("winkel2Start: Fall 4 ", winkel2Start)



                }
            }

        }


        console.log("winkel2Start:nach switch  ", winkel2Start)

    

        //variabeln für Endpunkt        
        var radiusEnde = Math.sqrt(((endLineX - MittelpunktX) ** 2) + ((endLineY - MittelpunktY) ** 2));
        
        var winkel2End = 0
   

        console.log("winkel2end test ", winkel2End)



        //Fall 1
        if (endLineX > MittelpunktX && (endLineY < MittelpunktY)) {
            winkel2End = Math.asin((endLineX - MittelpunktX) / radiusEnde)

        } else {
            //Fall 2
            if (endLineX <= MittelpunktX && (endLineY < MittelpunktY)) {
                var hilfswinkel2 = Math.asin((MittelpunktX - endLineX) / radiusEnde)
                winkel2End = 2 * Math.PI - hilfswinkel2;

            } else {

                //Fall 3
                if (endLineX > MittelpunktX && (endLineY >= MittelpunktY)) {
                    var hilfswinkel2 = Math.asin((endLineX - MittelpunktX) / radiusEnde)
                    winkel2End = Math.PI - hilfswinkel2;
                    // Fall 4
                } else {
                    var hilfswinkel2 = Math.asin((MittelpunktX - endLineX) / radiusEnde)
                    winkel2End = Math.PI + hilfswinkel2;


                }
            }

        }

console.log("winkel2End:nach switch  ", winkel2End)


        //verschiebunng um winkel3Start zu Koordinatensystem
        var winkel3Start =  winkel2Start;
        var winkel3End = winkel2End;
     

        console.log(winkel2Start);
        console.log(winkel2End);

        //t-fache Spiegelung von Linie
        for (i = 0; i < t ; i++) {

            console.log("winkel3Start: ", winkel3Start);
            console.log("das ist winkel3End:", winkel3End);



            startLineXmirror = MittelpunktX - Math.sin(winkel3Start) * radiusStart;
            startLineYmirror = MittelpunktY + Math.cos(winkel3Start) * radiusStart;
            endLineXmirror = MittelpunktX - Math.sin(winkel3End) * radiusEnde;
            endLineYmirror = MittelpunktY + Math.cos(winkel3End) * radiusEnde;

            winkel3Start += winkel1;
            winkel3End += winkel1;

            //Linie zeichnen
           // ctx.beginPath();

            ctx.moveTo(startLineXmirror, startLineYmirror);
            ctx.lineTo(endLineXmirror, endLineYmirror);


            ctx.stroke();
            //ctx.closePath();


        } 


    }




    
    //Mittelpunkt Position
    var MittelpunktRadius = 5;
    var MittelpunktX = canvas.width / 2 - MittelpunktRadius;
    var MittelpunktY = canvas.height / 2 - MittelpunktRadius;
    

    //Mittelpunkt Kreis zeichnen
    ctx.arc(MittelpunktX, MittelpunktY, MittelpunktRadius, 0, 2 * Math.PI);
    ctx.stroke();
    



    //Hilfsgitter
    function hilfsgitter() {
        console.log("test")

        for (var i = 0; i < 20; i++) {


            //Kreislinien

            //ctx.beginPath();

            ctx.moveTo(MittelpunktX + 30 * i, MittelpunktY);
            ctx.arc(MittelpunktX, MittelpunktY, 30 * i, 0, 2 * Math.PI);
            ctx.stroke();

            //gerade Linien
            var linien = 8
            ctx.beginPath();
            ctx.moveTo(MittelpunktX, 0);
            ctx.lineTo(MittelpunktX, canvas.height);
            ctx.moveTo(0, MittelpunktY);
            ctx.lineTo(canvas.width, MittelpunktY);


        }


    
    }

   /* function Spiegeln() {

        var winkel1 = 360 / t;
        var radiusStart = Math.sqrt(((startLineX - MittelpunktX) ** 2) + ((startLineY - MittelpunktY) ** 2));
        var winkel2Start = Math.asin(Math.abs(startLineX - MittelpunktX) / radiusStart);
        var radiusEnde = Math.sqrt(((endLineX - MittelpunktX) ** 2) + ((endLineY - MittelpunktY) ** 2));
        var winkel2End = Math.asin(Math.abs(endLineX - MittelpunktX) / radiusEnde);
        var winkel3Start = winkel1 + winkel2Start;
        var winkel3End = winkel1 + winkel2End

        for (i = 0; i < t; i++) {
            startLineXmirror = MittelpunktX + Math.sin(-winkel3Start) * radiusStart;
            startLineYmirror = MittelpunktY + Math.cos(-winkel3Start) * radiusStart;
            endLineXmirror = MittelpunktX + Math.sin(-winkel3End) * radiusEnde;
            endLineYmirror = MittelpunktY + Math.cos(-winkel3End) * radiusEnde;

            winkel3Start -= winkel1;
            winkel3End -= winkel1;

            ctx.beginPath();


            context.moveTo(startLineXmirror, startLineYmirror);
            context.lineTo(endLineXmirror, endLineYmirror);


            ctx.stroke();
            ctx.closePath();
        }

        console.log(e);

    } */




});


