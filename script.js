console.log("Welcome to Spotify.");

let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songIndex = 0;
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
        {songName: "Mortals",filePath: "1.mp3", coverPath: "1.jpg"},
        {songName: "Huma-Huma",filePath: "2.mp3", coverPath: "2.jpg"},
        {songName: "Invincible",filePath: "3.mp3", coverPath: "3.jpg"},
        {songName: "My Heart",filePath: "4.mp3", coverPath: "4.jpg"},
        {songName: "Janji Heroes",filePath: "5.mp3", coverPath: "5.jpg"},
    ]


songItems.forEach((Element, i)=>{
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

//handle Playing 
masterPlay.addEventListener("click" , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
    
});

audioElement.addEventListener("timeupdate" , ()=>{
    console.log("timeupdate");
    //update progress bar
    var progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

// change song using progress bar
myProgressBar.addEventListener("change" , ()=> {
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
        Element.classList.remove("fa-pause");
        Element.classList.add("fa-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((Element)=>{
    Element.addEventListener("click" , (e)=>{
        // if(audioElement.paused){
        //     makeAllPlays();
        //     songIndex = parseInt(e.target.id);
        //     e.target.classList.remove('fa-play');
        //     e.target.classList.add('fa-pause');
        //     audioElement.src = `${songIndex+1}.mp3`;
        //     masterSongName.innerText = songs[songIndex].songName;
        //     audioElement.currentTime = 0;
        //     audioElement.play();
        //     gif.style.opacity = 1;
        //     masterPlay.classList.remove('fa-circle-play');
        //     masterPlay.classList.add('fa-circle-pause');
        // }
        // else{
        //     e.target.classList.remove('fa-pause');
        //     e.target.classList.add('fa-play');
        //     audioElement.pause();
        // }
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
});

document.getElementById("next").addEventListener("click" , ()=>{
    if(songIndex>=4){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

});

document.getElementById("previous").addEventListener("click" , ()=>{
    if(songIndex<=0){
        songIndex=4;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");

});

