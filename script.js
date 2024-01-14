console.log("hii kuldeep don")
let currentsong= new Audio();
let songs;
let currfolder;
async function getsongs(folder){
     currfolder=folder;
     let a= await fetch(`http://127.0.0.1:5500/project%20_%20spotify%20clone/${folder}/`);
     let response= await a.text();
     console.log(response);
     let div= document.createElement("div");
     div.innerHTML= response;
     let as=div.getElementsByTagName("a");
     console.log(a);
     let songs=[];
     for (let index = 0; index < as.length; index++) {
          const element = as[index];
          if(element.href.endsWith(".mp3")){
               songs.push(element.href.split(`/${folder}/`)[1]);
          }
     }
     return songs;
}
     const playmusic = (track,pause=false)=>{
          // let audio= new Audio("./songs/"+track);
          currentsong.src=`/project%20_%20spotify%20clone/${currfolder}/`+track
          if(!pause){
               currentsong.play();
               play.src="pause.svg";
          }
          document.querySelector(".songinfo").innerHTML=decodeURI(track);
          document.querySelector(".songtime").innerHTML="00:00/00:00";
     }
     function secondsToMinutesAndSeconds(totalSeconds) {
          if(isNaN(totalSeconds) || totalSeconds<0){return "00:00";}
          // Calculate minutes and remaining seconds
          var minutes = Math.floor(totalSeconds / 60);
          var seconds = Math.floor(totalSeconds % 60);
        
          // Format the result as "mm:ss"
          var formattedTime = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        
          return formattedTime;
        }
        
       
        
     
async function main(){
     
     songs= await getsongs("songs/romantic");
     console.log(songs);
     playmusic(songs[0],true);

     let songul= document.querySelector(".songlist").getElementsByTagName("ul")[0];
     for (const song of songs) {
          songul.innerHTML = songul.innerHTML + ` 
          <li>
          <img class="invert" src="music.svg" alt="">
          <div class="infos">
               <div>${song.replaceAll("%20"," ")}</div>
               <div>kuldeep</div>
          </div>
          <div class="playnow">
               <span>play now</span>
               <img class="invert" src="play.svg" alt="">
          </div>
          
           </li>`;
     }
     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
          e.addEventListener("click",element=>{
               console.log(e.querySelector(".infos").firstElementChild.innerHTML.trim());
               playmusic(e.querySelector(".infos").firstElementChild.innerHTML.trim());

         })
     });
     play.addEventListener("click",()=>{
          if (currentsong.paused) {
               currentsong.play()
               play.src="pause.svg"
          }
          else{
               currentsong.pause()
               play.src="play.svg"
          }
     })
     currentsong.addEventListener("timeupdate",()=>{
          console.log(currentsong.currentTime,currentsong.duration);
          document.querySelector(".songtime").innerHTML=`${secondsToMinutesAndSeconds(currentsong.currentTime)}/${secondsToMinutesAndSeconds(currentsong.duration)}`;
          document.querySelector(".circle").style.left = (currentsong.currentTime/currentsong.duration)*100 + "%";
     })
     document.querySelector(".seekbar").addEventListener("click",e=>{
          document.querySelector(".circle").style.left= (e.offsetX/e.target.getBoundingClientRect().width)*100 +"%";
          currentsong.currentTime=(e.offsetX/e.target.getBoundingClientRect().width)* currentsong.duration;
     })
     document.querySelector(".hamburger").addEventListener("click",()=>{
          document.querySelector(".left").style.left=0;
     })
     document.querySelector(".close").addEventListener("click",()=>{
          document.querySelector(".left").style.left= "-120%";
     })
     previous.addEventListener("click",()=>{
          let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
          if((index-1)>=0){
               playmusic(songs[index-1]);
          }
     })
     next.addEventListener("click",()=>{
          let index=songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
          if((index+1)<songs.length){
               playmusic(songs[index+1]);
          }
     })
     document.getElementById("myrange").addEventListener("change",(e)=>{
          currentsong.volume=parseInt(e.target.value)/100
     })
} 
    main() 
          