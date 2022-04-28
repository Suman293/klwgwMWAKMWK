song = "";
leftwristx = 0
rightwrist_x = 0
leftwristy = 0
rightwrist_y = 0
scoreRightWrist = 0
scoreLeftWrist = 0

function preload()

{
    song = loadSound("Music_app.mp4");
}

function setup()
{
   canvas = createCanvas(600,500);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();
PoseNet = ml5.poseNet(video,modelLoaded)
PoseNet.on("pose", gotPoses)
}

function draw()
{
 image(video, 0, 0, 600, 500);

 fill("#FF0000");
 stroke("#FF0000");

 if(scoreRightWrist > 0.2)
     {
         circle(rightwrist_x, rightwrist_y,20);

         if(rightwrist_y >0 && rightwrist_y <= 100)
         {
             document.getElementById("speed").innerHTML = "Speed = 0.5x";
             song.rate(0.5);
         }
         else if(rightwrist_y >100 && rightwrist_y <= 200)
         {
             document.getElementById("speed").innerHTML = "Speed = 1x";
             song.rate(1);
         }
         else if(rightwrist_y >200 && rightwrist_y <= 300)
         {
             document.getElementById("speed").innerHTML = "Speed = 1.5x";
             song.rate(1.5);
         }
         else if(rightwrist_y >300 && rightwrist_y <= 400)
         {
             document.getElementById("speed").innerHTML = "Speed = 2x";
             song.rate(2);
         }
         else if(rightwrist_y >400)
         {
             document.getElementById("speed").innerHTML = "Speed = 2.5x";
             song.rate(2.5);
         }
     }

     if(scoreLeftWrist > 0.2)
     {
         circle(leftwristx,leftwristy,20);
         InNumberleftwristy = Number(leftwristy);
         new_leftwristy = floor(InNumberleftwristy *2);
         leftwristy_divide_1000 = new_leftwristy/1000;
         document.getElementById("volume").innerHTML = "Volume = " + leftwristy_divide_1000;
         song.setVolume(leftwristy_divide_1000);
     }
}

function Play_song()
{
    song.setVolume(1);
    song.rate(1)
    song.play()

}

function modelLoaded()
{
    console.log('Model has been Initiated');
}

function gotPoses(results)
{
 if (results.length>0) {
        console.log(results)

    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrsit = results[0].pose.keypoints[9].score;
    
    leftwristx = results[0].pose.leftWrist.x
    leftwristy = results[0].pose.leftWrist.y
    console.log("leftWristx = " + leftwristx +"leftWristy = "+ leftwristy)

    rightwrist_x = results[0].pose.rightWrist.x
    rightwrist_y = results[0].pose.rightWrist.y
    console.log("rightWrist_x = " + rightwrist_x +" rightWrist_y = "+ rightwrist_y);

 }
}