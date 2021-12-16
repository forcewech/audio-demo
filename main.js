const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// tab ui
const panes = $$('.tab-pane');
const tabs = $$('.tab-ui');
const line = $('.line');
const tabActive = $('.tab-ui.active');
// mp3 player
const curtimetext = document.getElementById("curtimetext");
const durtimetext = document.getElementById("durtimetext");
const track = $('.audio');
const prev = document.getElementById('prev');
const play = $('.play-pause');
let timer;
// const pause = document.getElementById('pause');
const next = document.getElementById('next');
const range = document.getElementById('duration-range');
let index_no = 0;
let Playing_song = false;
const nameSong = $('.name-song');
// img
const randomMusic = document.getElementById('random');
const returnMusic = document.getElementById('return');
const imgMusic = $('.img-track');
const cdThumbAnimate = imgMusic.animate([{ transform: "rotate(360deg)" }], {
    duration: 10000, // 10 seconds
    iterations: Infinity
  });
line.style.left = tabActive.offsetLeft + "px";
line.style.width = tabActive.offsetWidth + "px";
[...tabs].forEach((tab, index) => {
    const pane = panes[index];
    tab.onclick = function(){
        line.style.left = tab.offsetLeft + "px";
        line.style.width = tab.offsetWidth + "px";
        [...tabs].forEach(tab => {
            tab.classList.remove('active');
        });
        [...panes].forEach(pane => {
            pane.classList.remove('active');
        });
        pane.classList.add('active');
        tab.classList.add('active');
    }
});
//All songs list
let All_song = [
    {
      name: "All My Tears",
      path: "music/music1.mp3",
      img: "img/pic1.jfif",
    //   singer: "1"
    },
    {
      name: "What He Wrote",
      path: "music/music2.mp3",
      img: "img/pic2.jpg",
    //   singer: "2"
    },
    {
      name: "Wonderful Life",
      path: "music/music3.mp3",
      img: "img/pic3.jpg",
    //   singer: "3"
    },
    {
      name: "Tom Waits - Time",
      path: "music/music4.mp3",
      img: "img/pic4.jpg",
    //   singer: "4"
    },
    {
      name: "You Want It Darker",
      path: "music/music5.mp3",
      img: "img/pic5.jpg",
    //   singer: "5"
    }
 ];

 function load_track(index_no){
	track.src = All_song[index_no].path;
    imgMusic.src = All_song[index_no].img;
    nameSong.innerHTML = All_song[index_no].name ;
    seektimeupdate();
}

track.onloadeddata = function(){
    seektimeupdate();
}

load_track(index_no);

function seektimeupdate(){
    if(track.duration){
        var nt = track.currentTime * (100 / track.duration);
        range.value = nt;
        var curmins = Math.floor(track.currentTime / 60);
        var cursecs = Math.floor(track.currentTime - curmins * 60);
        var durmins = Math.floor(track.duration / 60);
        var dursecs = Math.floor(track.duration - durmins * 60);
        if(cursecs < 10){ cursecs = "0"+cursecs; }
        if(dursecs < 10){ dursecs = "0"+dursecs; }
        if(curmins < 10){ curmins = "0"+curmins; }
        if(durmins < 10){ durmins = "0"+durmins; }
        curtimetext.innerHTML = curmins+":"+cursecs;
        durtimetext.innerHTML = durmins+":"+dursecs;
    }
}
track.addEventListener("timeupdate", seektimeupdate); 
range.addEventListener("change", function(e){
    track.currentTime = Math.floor(e.target.value*(track.duration / 100));
});

next.addEventListener("click", function(){seektimeupdate
    if(index_no < All_song.length - 1){
		index_no += 1;
		load_track(index_no);
		playsong();
	}else{
		index_no = 0;
		load_track(index_no);
		playsong();

	}
});
prev.addEventListener("click", function(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    
    }else{
        index_no = All_song.length;
        load_track(index_no);
        playsong();
    }
});


cdThumbAnimate.pause();

play.addEventListener("click",function(){
    if(Playing_song==false){
        playsong();
        cdThumbAnimate.play();
    }else{
        pausesong();
        cdThumbAnimate.pause();
    }
});

 // play song
function playsong(){
    track.play();
    Playing_song = true;
    play.innerHTML = '<i class="fas fa-pause icon-mp3"></i>';
  }
  
  //pause song
function pausesong(){
      track.pause();
      Playing_song = false;
      play.innerHTML = '<i class="fas fa-play-circle icon-mp3"></i>';
}

randomMusic.addEventListener("click", function(){
    randomMusic.classList.toggle('active-color');
    track.addEventListener('ended', function(){
        if(index_no < All_song.length - 1){
            load_track(++index_no);
            track.play();
        }
        else{
            index_no = 0;
            load_track(index_no);
            track.play();
        }
      });
});

returnMusic.addEventListener("click", function(){
    returnMusic.classList.toggle('active-color');
    track.addEventListener('ended', function(){
        // Reset the video to 0
        track.currentTime = 0;
        // And play again
        track.play();
      });
});

// slider
window.addEventListener("load", function(){
    const slider = document.querySelector('.slider');
    const sliderMain = document.querySelector('.slider-main');
    const sliderItems = document.querySelectorAll('.slider-item');
    const nextBtn = document.querySelector('.slider-next');
    const prevBtn = document.querySelector('.slider-prev');
    const sliderLength = sliderItems.length;
    const dotItems = document.querySelectorAll('.dots-item');
    const sliderItemWidth = sliderItems[0].offsetWidth;
    let positionX = 0;
    let index = 0;
    nextBtn.addEventListener("click", function(){
        handleChangeSlide(1);
    });
    prevBtn.addEventListener("click", function(){
        handleChangeSlide(-1);
    });
    [...dotItems].forEach(item => item.addEventListener("click", function(e){
        [...dotItems].forEach(el => el.classList.remove("active"));
        e.target.classList.add("active");
        const slideIndex = parseInt(e.target.dataset.index);
        index = slideIndex;
        positionX = -1*index*sliderItemWidth;
        sliderMain.style = `transform: translateX(${positionX}px)`;
    }));
    function handleChangeSlide(direction){
        if(direction === 1){
            if(index === sliderLength-1){
                positionX = 0;
                sliderMain.style = `transform: translateX(${positionX}px)`;
                index = 0;
                [...dotItems].forEach(el => el.classList.remove("active"));
                dotItems[index].classList.add("active");
                return;
            };
            positionX -= sliderItemWidth;
            sliderMain.style = `transform: translateX(${positionX}px)`;
            index++;
        } else if(direction === -1){
            if(index === 0) return;
            positionX += sliderItemWidth;
            sliderMain.style = `transform: translateX(${positionX}px)`;
            index--;
        }
        [...dotItems].forEach(el => el.classList.remove("active"));
        dotItems[index].classList.add("active");
    }
});