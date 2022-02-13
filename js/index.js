const musicsArray = [{
        name: 'Santur',
        src: 'media/Ahang Santour.mp3'
    },
    {
        name: 'Sport',
        src: 'media/bass-sport12.mp3'
    },
    {
        name: 'Beat',
        src: 'media/base.mp3'
    },
    {
        name: 'Wave',
        src: 'media/wave.mp3'
    },
];

const audioElem = document.querySelector('audio');
const playBtn = document.querySelector('.fa-play');
const pauseBtn = document.querySelector('.fa-pause');
const prevBtn = document.querySelector('.fa-backward');
const nextBtn = document.querySelector('.fa-forward');
const state = document.querySelector('.state');
const musicName = document.querySelector('#musicName');
const currentMin = document.querySelector('.minute');
const currentSec = document.querySelector('.second');
const totalTime = document.querySelector('.totalTime');
const progressBar = document.querySelector('.progress');
const progressValue = document.querySelector('.progress-bar');

let audioIndex = 0;
let isPlaying = false;

progressBar.addEventListener('click', (e) => {
    const tagWidth = progressBar.style.width;
    console.log(e.target.style.width)
    console.log(tagWidth)
    const clickX = e.layerX;
    const percent = (clickX / 223.5)*100;
    progressValue.style.width = `${percent}%`;
    audioElem.currentTime = percent * audioElem.duration / 100;

});

state.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-play')) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        audioElem.play();
    }
    if (e.target.classList.contains('fa-pause')){
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        audioElem.pause();
    }
});

// **** click on next button **** 
nextBtn.addEventListener('click', () => {
    // console.log(audioElem.duration)
    
    audioIndex++;

    if (audioIndex > musicsArray.length) {
        audioIndex = 0;
    }
    
    audioElem.setAttribute('src', musicsArray[audioIndex].src);
    // showTotalTime();
    musicName.innerHTML = musicsArray[audioIndex].name;
    audioElem.play();
    
});

// **** click on previous button **** 
prevBtn.addEventListener('click', () => {
    audioIndex--;

    if (audioIndex < 0) {
        audioIndex = 0;
    }

    audioElem.setAttribute('src', musicsArray[audioIndex].src);
    musicName.innerHTML = musicsArray[audioIndex].name;
    audioElem.play();
});

audioElem.addEventListener('timeupdate', () => {
    showCurrentTime();
    showTotalTime();
    updateProgressBar();
})

function updateProgressBar() {
    const percent = audioElem.currentTime / audioElem.duration;
    progressValue.style.width = `${percent*100}%`;
}

function showTotalTime() {
    const minT = Math.floor(audioElem.duration / 60);
    const secT = Math.floor(audioElem.duration % 60);
    if (secT < 10) {
        const minSecT = minT + ':' + '0'+secT;
        totalTime.innerHTML = minSecT;
    }
    if (secT >= 10) {
        const minSecT = minT + ':' + secT;
        totalTime.innerHTML = minSecT;
    }
}

function showCurrentTime() {
    setInterval(() => {
        const min = Math.floor(audioElem.currentTime / 60);
        const sec = Math.floor(audioElem.currentTime % 60);
        if (sec < 10) {
            currentSec.innerHTML = '0' + sec;
        }
        if (sec >= 10) {
            currentSec.innerHTML = sec;
        }
        if (min < 10) {
            currentMin.innerHTML = '0' + min;
        }
        if (min >= 10) {
            currentMin.innerHTML = min;
        }
    }, 1000);
}
