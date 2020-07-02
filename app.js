const app = () => {
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
//Sounds
    const sounds = document.querySelectorAll(".sound-picker button");
//Time display
    const timeDisplay = document.querySelector(".time-display");
    const outlineLenght = outline.getTotalLength();
 //Duration
    const timeSelect = document.querySelectorAll(".time-select button");
    let fakeDuration = 600;
    outline.style.strokeDashoffset = outlineLenght;
    outline.style.strokeDasharray = outlineLenght;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
//Pick Different sound
sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });
 //Play Sound
 play.addEventListener("click", function() {
    checkPlaying(song);
  });
//Select sound
timeSelect.forEach(option => {
    option.addEventListener("click", function() {
        fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = Math.floor(fakeDuration / 60) + ":" + Math.floor(fakeDuration % 60);
        });
  });
//Stop and play
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg";
        }else{
            song.pause();
            video.pause();
            play.src ="./svg/play.svg";
        }
    };
//Animate the circle
    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        timeDisplay.textContent = `${minutes}:${seconds}`;
        let progress = outlineLenght - (currentTime / fakeDuration) * outlineLenght;
        outline.style.strokeDashoffset = progress;
            if(currentTime >= fakeDuration){
                song.pause();
                song.currentTime = 0;
                play.src = "./svg/play.svg";
                video.pause();
            }   
    };   
};
app();