// function playSound(audioName){
//     let audio = new Audio(audioName);
//     audio.loop = true;
//     audio.play();
// }
// playSound("backgroundmusic.mp3");

// let clickSound = new Audio("clickSound.mp3");
// clickSound.volume=1;
// gameBody.onclick=()=>{
//     clickSound.pause();
//     clickSound.currentTime=0;
//     clickSound.play();
// }

var audio = document.getElementById("audio");

function playSound(){
    if (audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
}
