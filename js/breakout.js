+//Setup the canvas
 var canvas = document.getElementById("myCanvas");
 var ctx = canvas.getContext("2d");
 
-ctx.beginPath();
-ctx.rect(20, 40, 100, 50);
-ctx.fillStyle = "#FF0000";
-ctx.fill();
-ctx.closePath();
+//Setup the starting point
+var x = canvas.width/2;
+var y = canvas.height-30;
 
-ctx.beginPath();
-ctx.arc(240, 160, 20, 0, Math.PI*2, false);
-ctx.fillStyle = "green";
-ctx.fill();
-ctx.closePath();
+//Draw the ball
+function draw() {
+	ctx.beginPath();
+	ctx.arc(x, y, 10, 0, Math.PI*2);
+	ctx.fillStyle = "#0095DD";
+	ctx.fill();
+	ctx.closePath();
+}
 
-ctx.beginPath();
-ctx.rect(160, 10, 100, 40);
-ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
-ctx.stroke();
-ctx.closePath();
-
-ctx.beginPath();
-ctx.rect(490, 290, 20, 20);
-ctx.fillStyle = "yellow";
-ctx.fill();
-ctx.closePath();
+setInterval(draw,10);