window.onkeydown = function (e) {
    e = e || window.event;
    var code = e.keyCode;
    e.preventDefault();

    if (code === 80) {
        //  P key
        start()
    }
};
   
//game function
function start() {
    var started=false
    var h = false
    var flap
    //clear scoreboard
    document.getElementById('start').innerHTML = "<br>Score:0";
    document.getElementById('start').style.cursor = "pointer";

    document.getElementById("lost").style.display = "none"
    //Prelims
    var canvas = document.getElementById("canvas");

    // Get our 2D context for drawing
    var ctx = canvas.getContext("2d");

    // Frames-per-second
    var FPS = 50;

    //generating ball speed
    function randNum(min, max) {
        return Math.random() * (max - min) + min;
    }

    //Doesn't end
    var end = false;

    //Set score 

    var score = 0;

    //Remove start button



    //ball 
    var controlledBall = {

        //atributes
        x:80,
        y: 150,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 1500,
        radius: 12,
        color: "black",
        dead: false,
        //draw
        draw: function () {
            ctx.beginPath();
            ctx.shadowBlur = "20";
            ctx.shadowColor = "darkgray";
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fill();

            //increase score

            document.getElementById("start").innerHTML = "<br>Score:" + score
        },

        //Update
        update: function () {
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;

            //Collision Detection

            if (this.y < 0 && this.y > -100) {
                this.y = this.radius;
                this.vy = 0;
            }
            if (this.y + this.radius > canvas.height - 10) {
                this.y = canvas.height - this.radius;
                this.vy = 0;

                //end and reset
                window.clearInterval(gameLoop);
                document.getElementById("lost").style.display = "block"
                document.getElementById("buttons").innerHTML = "<input type=button value='Restart (R)' id=button2 onclick=start()>"
                document.getElementById("score").innerHTML = "Score:" + score
                window.clearInterval(gameLoop);

                window.onkeydown = function (e) {
                    e = e || window.event;
                    var code = e.keyCode;
                    e.preventDefault();

                    if (code === 82) {
                        //  R key
                        start()
                    }
                };

            }

        }

    };

    //Controll Ball
    window.onkeydown = function (e) {
        e = e || window.event;
        var code = e.keyCode;
        e.preventDefault();
        started=true;
        downPipe1.vx=-100;
        downPipe2.vx=-100;
        upPipe1.vx=-100;
        upPipe2.vx=-100;
        controlledBall.ay=1500;
        if (code === 72) {
            h = true
        }

        if (code === 32 && controlledBall.dead !== true && h !== true) {
            // Down key
            controlledBall.vy = -370;
        }
    };
 
    window.onmousedown = function (e) {
        e = e || window.event;
        started=true;
        downPipe1.vx=-100;
        downPipe2.vx=-100;
        upPipe1.vx=-100;
        upPipe2.vx=-100;
        controlledBall.ay=1500;
        if (controlledBall.dead != true) {
            // Down key
            controlledBall.vy = -370;
        }

    };

    function detection(ball, rect) {

        var insideX = false
        var insideY = false

        var dX = Math.abs(ball.x - (rect.x + rect.width / 2))
        var dY = Math.abs(ball.y - (rect.y + rect.height / 2))

        if (dX < ball.radius + rect.width / 2) {
            insideX = true
        }
        if (dY < ball.radius + rect.height / 2) {
            insideY = true
        }
        if (insideX && insideY) {
            controlledBall.dead = true
            if (controlledBall.vy < 1) {
                controlledBall.vy = 5
            }
            controlledBall.vx = -5
            upPipe1.vx = 0
            upPipe2.vx = 0
            downPipe1.vx = 0
            downPipe2.vx = 0
            controlledBall.color = 'rgba(169,10,19,.5)';

        }

    }

    var upPipe1 = {

        //atributes
        pastBall: 0,
        x: 450,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        width: 40,
        height: 130,
        color: "white",

        //draw
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },

        //Update 
        update: function () {
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;

            //Collision Detection

            if ((this.x + this.width) < 0) {
                this.x = 250;
                this.vx = -100;
                this.height = randNum(70, 230);
                downPipe1.y = this.height + 95
                downPipe1.height = 1000

            }

            if (this.x < 60 && this.pastBall === false) {
                score++
                this.pastBall = true
            }

            if (this.x > 62) {
                this.pastBall = false
            }

        }

    };

    var downPipe1 = {

        //atributes
        x: 450,
        y: 240,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        width: 40,
        height: 120,
        color: "white",

        //draw
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },

        //Update
        update: function () {
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;

            //Collision Detection

            if ((this.x + this.width) < 0) {
                this.x = 250;
                this.vx = -100;

            }

            if (this.x < 60 && this.x > 59.5) {
                score++
            }

        }

    };

    var upPipe2 = {

        //atributes
        x: 603,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        width: 40,
        height: 230,
        color: "white",

        //draw
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },

        //Update
        update: function () {
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;

            //Collision Detection

            if ((this.x + this.width) < 0) {
                this.x = 250;
                this.vx = -100;
                this.height = randNum(70, 230);
                downPipe2.y = this.height + 95
                downPipe2.height = 1000

            }

            if (this.x < 60 && this.pastBall === false) {
                score++
                this.pastBall = true
            }

            if (this.x > 62) {
                this.pastBall = false
            }

        }

    };

    var downPipe2 = {

        //atributes
        x: 603,
        y: 330,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        width: 40,
        height: 240,
        color: "white",

        //draw
        draw: function () {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },

        //Update
        update: function () {
            this.vx += this.ax / FPS;
            this.vy += this.ay / FPS;
            this.x += this.vx / FPS;
            this.y += this.vy / FPS;

            //Collision Detection

            if ((this.x + this.width) < 0) {
                this.x = 250;
                this.vx = -100;

            }

        }

    };

    //---------------------------Game loop draw function ----------------- 
    function draw2() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "lightgray";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        downPipe1.draw();
        upPipe1.draw();
        downPipe2.draw();
        upPipe2.draw();
        controlledBall.draw();
        ctx.fillStyle = "darkgray";
        ctx.fillRect(0, canvas.height - 10, 300, 30)

    }

    // Game loop update function
    function update2() {

        controlledBall.update();
        downPipe1.update();
        upPipe1.update();
        downPipe2.update();
        upPipe2.update();
        if(started==false&&controlledBall.y>170){
            controlledBall.vy = -370;
        }

    }

    function tick2(settings) {
        if (h) {
            auto()
        }
        update2();
        draw2();
        detection(controlledBall, upPipe2)
        detection(controlledBall, downPipe2)
        detection(controlledBall, upPipe1)
        detection(controlledBall, downPipe1)

    }

    var gameLoop = window.setInterval(tick2, 1000 / FPS);

    //Autopilot-WIP

    function auto() {
        var closerPipe = 0
        var closerPipeBottom = 0

        if (downPipe1.x - 20 > 0 && downPipe1.x - 20 < downPipe2.x - 20 || downPipe2.x - 20 < 0) { 
            closerPipe = 1

        } else {
            closerPipe = 2
        }

        if (closerPipe === 1 && downPipe1.y < controlledBall.y + 27 && controlledBall.dead !== true) {
            controlledBall.vy = -370
        }

        if (closerPipe === 2 && downPipe2.y < controlledBall.y + 27 && controlledBall.dead !== true) {
         controlledBall.vy = -370
        }
    }

    if (end) {
        window.clearInterval(gameLoop);

    }

}
