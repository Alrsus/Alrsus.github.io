function MusicControl(){
    var audio=document.createElement('audio')
    var span=document.createElement('span')
    var button=document.createElement('button')
    document.body.appendChild(span)
    document.body.appendChild(audio)
    document.body.appendChild(button)
    button.innerText="休息一下~"
    button.id="pause"
    button.style=`background:transparent;outline:none; border-radius: 3px ;
    border:1px dotted; cursor: pointer;border-sha`
    span.id="artist"
    span.style=`font-size:12px`
    audio.id="my-audio"
    audio.autoplay=true
    audio.controls=false
    this.musicPlayer = document.getElementById("my-audio");
}

var crePlay=new MusicControl()

var pause=document.querySelector('#pause')
var song=document.querySelector('#my-audio')
var artist=document.querySelector('#artist')



var a= $.ajax({
  type: "get",
  async: false,
  url:  `http://api.jirengu.com/fm/getSong.php`,
  dataType: "jsonp",
  jsonp: "callback",
  jsonpCallback: "JsonCallback",
  scriptCharset: 'GBK',
  error: function() {
    alert('fail');
  }
})
.then(data=>{
  var musicurl
  var picurl
  source=data['song']
  musicurl=source[0]['url']
  artist=source[0]['artist']
$('audio')[0].src=musicurl
$('#artist').text(artist)
})

//自动切换
setInterval(function(){
  var long=song.duration
  if (song.currentTime > long - 2){
     $.ajax({
  type: "get",
  async: false,
  url:  `http://api.jirengu.com/fm/getSong.php`,
  dataType: "jsonp",
  jsonp: "callback",
  jsonpCallback: "JsonCallback",
  scriptCharset: 'GBK',
  error: function() {
    alert('fail');
  }
}).then(data=>{
  source=data['song']
  musicurl=source[0]['url']
  artist=source[0]['artist']
$('audio')[0].src=musicurl
$('#artist').text(artist)
})
  }
},1000)

//暂停播放
$(function(){
  $('#pause').on('click',function(){
    $('#my-audio')[0].pause()
  })
})

