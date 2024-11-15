console.log("Welcome to GroveBox")

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let masterArtist = document.getElementById('masterArtist');
let volumeSlider = document.getElementById('volumeSlider');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let menuIcon = document.getElementById('menuIcon');
let menu = document.getElementById('menu');


audioElement.volume = volumeSlider.value / 100;

volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value / 100;
});


menuIcon.addEventListener('click', () => {
    menu.style.display = (menu.style.display === 'none' || menu.style.display === '') ? 'block' : 'none';
});

// Close the menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && event.target !== menuIcon) {
        menu.style.display = 'none';
    }
});



let songs = [
    {songName: "Tum Se Hi", artist: "Pritam, Mohit Chauhan", filePath: "songs/1.mp3", coverPath: "covers/Tum-Se-Hi.jpg"},
    {songName: "Aye Khuda", artist: "Salim Merchant", filePath: "songs/2.mp3", coverPath: "covers/Aye-Khuda.jpg"},
    {songName: "Love Mera Hit Hit", artist: "Pritam, Neeraj Shridhar, Tulsi Kumar", filePath: "songs/3.mp3", coverPath: "covers/Love-Mera-Hit-Hit.jpg"},
    {songName: "Haule Haule", artist: "Sukhwinder Singh, Salim-Sulaiman, Jaideep Sahni", filePath: "songs/4.mp3", coverPath: "covers/Haule-Haule.jpg"},
    {songName: "Why This Kolaveri Di", artist: "Anirudh Ravichander, Dhanush", filePath: "songs/5.mp3", coverPath: "covers/Why-This-Kolaveri-Di.jpg"},
    {songName: "Haye Mera Dil", artist: "Alfaaz, Yo Yo Honey Singh", filePath: "songs/6.mp3", coverPath: "covers/Haye-Mera-Dil.jpg"},
    {songName: "I Hate Luv Storys", artist: "Vishal-Shekhar, Vishal Dadlani", filePath: "songs/7.mp3", coverPath: "covers/I-Hate-Luv-Storys.jpg"},
    {songName: "Prem Ki Naiya", artist: "Pritam, Neeraj Shridhar, Suzanne D'Mello", filePath: "songs/8.mp3", coverPath: "covers/Prem-Ki-Naiya.jpg"},
    {songName: "Main Aisa Kyon Hoon", artist: "Shankar-Ehsaan-Loy, Shaan", filePath: "songs/9.mp3", coverPath: "covers/Main-Aisa-Kyon-Hoon.jpg"},
    {songName: "Soni De Nakhre", artist: "Wajid Khan, Labh Janjua, Sneha Pant", filePath: "songs/10.mp3", coverPath: "covers/Soni-De-Nakhre.jpg"},
    {songName: "Tujhe Aksa Beach Ghuma Du", artist: "Wajid Khan, Amrita Kak", filePath: "songs/11.mp3", coverPath: "covers/Tujhe-Aksa-Beach-Ghuma-Du.jpg"},
    {songName: "Chale Jaise Hawaien", artist: "KK, Vasundhara Das", filePath: "songs/12.mp3", coverPath: "covers/Chale-Jaise-Hawaien.jpg"},
    {songName: "Genda Phool", artist: "Rekha Bhardwaj", filePath: "songs/13.mp3", coverPath: "covers/Sasural-Genda-Phool.jpg"},
    {songName: "Chor Bazaari", artist: "Neeraj Shridhar, Sunidhi Chauhan, Pritam", filePath: "songs/14.mp3", coverPath: "covers/Chor-Bazaari.jpg"},
    {songName: "Kabhi Kabhi Aditi", artist: "Rashid Ali", filePath: "songs/15.mp3", coverPath: "covers/Kabhi-Kabhi-Aditi.jpg"},
    {songName: "Banjaara", artist: "Sukhwinder Singh, Sohail Sen, Neelesh Misra", filePath: "songs/16.mp3", coverPath: "covers/Banjaara.jpg"},
    {songName: "Caller Tune", artist: "Neeraj Shridhar, Neeti Mohan", filePath: "songs/17.mp3", coverPath: "covers/Caller-Tune.jpg"},
    {songName: "Bewafa", artist: "Imran Khan", filePath: "songs/18.mp3", coverPath: "covers/Bewafa.jpg"},
    {songName: "Tere Liye", artist: "Atif Aslam, Shreya Ghoshal", filePath: "songs/19.mp3", coverPath: "covers/Tere-Liye.jpg"},
    {songName: "Kajra Re", artist: "Javed Ali, Shankar Mahadevan, Alisha Chinai, Shankar-Ehsaan-Loy, Gulzar", filePath: "songs/20.mp3", coverPath: "covers/Kajra-Re.jpg"},
]


songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

const updateCoverImage = (index) => {
    document.getElementById('currentlyPlayingImage').src = songs[index].coverPath;
};


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        updateCoverImage(songIndex); // Update cover image on play
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.addEventListener('click', (e)=>{ 
        const playIcon = element.querySelector('.songItemPlay');
        playIcon.classList.toggle('fa-play-circle');
        playIcon.classList.toggle('fa-pause-circle');
        songIndex = i;
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        masterArtist.innerText = songs[songIndex].artist;
        audioElement.currentTime = 0;
        audioElement.play();
        updateCoverImage(songIndex); // Update cover image when a new song is played
        currentlyPlayingImage.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=songs.length-1){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterArtist.innerText = songs[songIndex].artist;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateCoverImage(songIndex);

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = songs.length-1;
    }
    else{
        songIndex -= 1;
    }
    // audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    masterArtist.innerText = songs[songIndex].artist;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    updateCoverImage(songIndex);
})