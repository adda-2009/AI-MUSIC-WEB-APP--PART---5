song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

function preload()
{
song=loadSound("Made-In-India(PaglaSongs).mp3");
}

function setup()
{
canvas=createCanvas(200,200);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;
leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);
console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
}
}

function draw()
{
image(video,0,0,600,600);
fill("#E63232");
stroke("#E63232");
if (scoreRightWrist>0.2)
{
circle(leftWristX,leftWristY,25);
if(rightWristY>0&&rightWristY<=100)
{
document.getElementById("div_speed").innerHTML="speed = 0.5";
song.rate(0.5);
}

else if (rightWristY>100&&rightWristY<=200)
{
document.getElementById("div_speed").innerHTML="speed = 1";
song.rate(1);
}

else if (rightWristY>200&&rightWristY<=300)
{
document.getElementById("div_speed").innerHTML="speed = 1.5";
song.rate(1.5);
}

else if (rightWristY>300&&rightWristY<=400)
{
document.getElementById("div_speed").innerHTML="speed = 2";
song.rate(2);
}

else if (rightWristY>400&&rightWristY<=500)
{
document.getElementById("div_speed").innerHTML="speed = 2.5";
song.rate(2.5);
}
}

if (scoreLeftWrist>0.2)
{
circle(leftWristX,leftWristY,25);


InNumberleftWristY=Number(leftWristY);
removeDecimals=floor(InNumberleftWristY);
volume=removeDecimals/600;
document.getElementById("volumeh3").innerHTML="volume = "+volume;
song.setVolume(volume);
}}


function play()
{
song.play();
song.setVolume(1);
song.rate(1);
}

function stop()
{
song.stop();
}

function modelLoaded()
{
console.log('Model Loaded.... :)');
}