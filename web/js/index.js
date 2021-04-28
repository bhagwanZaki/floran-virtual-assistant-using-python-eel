// window.addEventListener('online', () => {

// });
// window.addEventListener('offline', () => console.log('Became offline'));


const talk = new SpeechSynthesisUtterance();
const btn = document.getElementById('speech')
const SpeechRecongnition = window.SpeechRecognition || window.webkitSpeechRecognition
const rec = new SpeechRecongnition()
var is_input = false


//////// FUNCTION THAT WILL BE EXECUTED WHENEVER PROGRAM IS RUN //////

// FUNCTION CALLING PYTHON initFun() FUNTION
function startinit(){
    eel.initFun()(startmsg)
}
// FUNCTION THAT TAKES THE VALUE FROM PYTHON initFun()
function startmsg(result){
    if(result[0] === 0){
        console.log("inside start")
        read("Hello I am Floran I am your virtual assistant")
        messageTemplate("Hello I am Floran I am your virtual assistant","left")
        read("What should I call you")
        messageTemplate("What should I call you","left")
        is_input = true
        console.log(result[1])
        set_mode(result[1])
    }
    else{
        read("welcome back")
        messageTemplate("welcome back","left")
        set_mode(result[1])
    }
}
/// CALLLING FUNCTION
startinit()
    
////////////////////////////////////////////////////////////////////////////


///// FUNCTION THAT IS RESPONSIBLE FOR VOICE TO TEXT /////
rec.onstart = function(){
    console.log('start speaking')
    document.getElementById('speech').classList.toggle('speaking')
}

// WHEN ONE STOP SPEAKING 
rec.onresult = function(e){
    const speech = e.resultIndex
    const transcript =  e.results[speech][0].transcript;
    
    // console.log(transcript)
    messageTemplate(transcript,"right")
    search(transcript)
    document.getElementById('speech').classList.remove('speaking')

}

// TO START THE VOICE RECOGNITION 
btn.addEventListener('click',()=>{
    rec.start()
})

//  FUNCTION THAT WILL MAKE THE TEXT TO VOICE STOP
function stopSpeaking(){
    window.speechSynthesis.cancel()
}

///////////////////////////////////////////////////////////////


/// FUNCTION TO TAKE THE MESSAGE FROM USER AND PROCESS IT
function getMessage(){
    var messageField = document.getElementById("message").value
    if(window.speechSynthesis.speaking){
        console.log('speaking')
        // talk.cancel()
        window.speechSynthesis.cancel();

    }
    else{
        // talk.cancel()
        window.speechSynthesis.cancel();
    }
    messageTemplate(messageField,"right")
    if(is_input == false){
        search(messageField)
    }
    else{
        getname(messageField)
        is_input = false
    }
    document.getElementById("message").value = ""
    document.getElementById('send_message').style.display = 'none'
    document.getElementById('speech').style.display = 'inline-block'
}

// FUNCTION THAT MAKE THE MESSAGE 
function messageTemplate(text,side){
    var $message;
    $message = $($('.message_template').clone().html());
    $message.addClass(side).find('.text').html(text);
    $message.addClass('appeared')
    $('.messages').append($message);
    // console.log($message);
}



/// MAIN FUNCTION THAT IS RESPONSIBLE FOR VOICE ASSISTANT
function search(text){
    if(text.split(' ')[0] === 'search'){
        console.log('searching')
        search_ele = ['search','search for']
        for(i = 0;i<search_ele.length;i++){
            if (text.includes(search_ele[i])){
                c = text.split(search_ele[i])
            }
        }
        messageTemplate("Opening google","left")
        read("Opening google")
        window.open('http://google.com/search?q='+c[1]);
    }
    else if(text.localeCompare('stop') === 0 || text.localeCompare('stop speaking') === 0 || text.localeCompare('hey floran stop speaking') === 0 ){
        console.log('inside tatti')
        stopSpeaking()
    }
    else if(text.localeCompare('hey floran change name') === 0 || text.localeCompare('change name') === 0 || text.localeCompare('change the name') === 0 || text.localeCompare('hey floran change the name') === 0 ){
        is_input = true
        read("Enter or tell the name you want")
        messageTemplate("Enter or tell the name you want","left")
        console.log("inside change name")
    }
    else if(text.localeCompare('hey floran change theme') === 0 || text.localeCompare('change theme') === 0 || text.localeCompare('change the theme') === 0 || text.localeCompare('hey floran change the theme') === 0 ){
        // is_input = true
        // read("Enter or tell the name you want")
        // messageTemplate("Enter or tell the name you want","left")
        // console.log("inside change name")
        change_theme()
    }
    else if (text.localeCompare('help') == 0){
        read("Here are the commands that you can tell me")
        messageTemplate("Greeting          | hi, hello, hey","left")
        messageTemplate("Take a photo      | launch camera, take a photo","left")
        messageTemplate("search in browser | search <query>, search for <query>","left")
        messageTemplate("jokes             | tell me a joke, can you say a joke, joke","left")
        messageTemplate("you can also get the information you want try saying 'naruto uzumaki'","left")
        messageTemplate("you can also perform mathematical operation here","left")
    }
    else{
        eel.search(text)(answer)
    }
}

function MaintoggleTheme() { 
    // Obtains an array of all <link> 
    // elements. 
    // Select your element using indexing. 
    var theme = document.getElementsByTagName('link')[3]; 

    // Change the value of href attribute  
    // to change the css sheet. 
    if (theme.getAttribute('href') == 'css/light.css') { 
        theme.setAttribute('href', 'css/dark.css'); 
        change_theme()
    } else { 
        theme.setAttribute('href', 'css/light.css'); 
        change_theme()
    } 
}


function change_theme(){
    eel.change_theme()(set_mode)
}

function set_mode(mode){
    console.log(mode);
    var theme = document.getElementsByTagName('link')[3]; 
    if (mode == 0){
        theme.setAttribute('href', 'css/light.css'); 
        document.getElementById("theme").checked = false;
    } else{
        theme.setAttribute('href', 'css/dark.css'); 
        document.getElementById("theme").checked = true;
    }
}

// INPUT TAKING FUNCTION THAT WILL TAKE INPUT FROM USER AND SEND IT TO PYTHON
function getname(text){
    eel.take_input(text)(named)

}


// FUNCTION THAT WILL GIVE ALERT THAT NAME IS CHANGE IN DATABASE
function named(result){
    answer(result,change=1)
}

// 2ND MAIN FUNCTION THAT TAKES THE RESULT FROM PYTHON AND SHOW IT TO USER
function answer(result,change = 0){
    // console.log(result)
    if(change === 1){
        read("hello "+result)
        messageTemplate("hello "+result,"left")
    }
    else{
        read(result)
        messageTemplate(result,"left")
    }
    
}

document.getElementById("send_message").onclick= function(){
    getMessage()
}

document.getElementById("message").onkeyup=function(e){
    if (e.which === 13) {
        getMessage()
    }
}

$('body').on('input', "#message", function() {
    if($(this).val().length) {
    //   var hasVal = true;
    document.getElementById('speech').style.display = 'none'
    document.getElementById('send_message').style.display = 'inline-block'

    } else {
        document.getElementById('send_message').style.display = 'none'
        document.getElementById('speech').style.display = 'inline-block'

    //   var hasVal = false;
    }
  });




  var voiceSelect = document.getElementById('voice');
  var myTimeout;
  function myTimer() {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
      myTimeout = setTimeout(myTimer, 500);
  }
  function loadVoices() {
    // Fetch the available voices.
    var voices = speechSynthesis.getVoices();
    voices.reverse();
    // Loop through each of the voices.
     voices.forEach(function(voice, i) {
      // Create a new option element.
        //   console.log(voice.name)
        var option = document.createElement('option');
    
    // Set the options value and text.
		option.value = voice.name;
		option.innerHTML = voice.name;
        voiceSelect.appendChild(option);
      });
  }
  
  // Execute loadVoices.
  loadVoices();
  
  // Chrome loads voices asynchronously.
  window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
  };

function read(text){
    myTimeout = setTimeout(myTimer, 500);
    
    
    talk.text = text;
    talk.volume = 1;
    talk.rate = 0.8;
    talk.pitch = 1; 
    if (voiceSelect.value) {
		talk.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
	}
    window.speechSynthesis.speak(talk)
}

