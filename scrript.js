const textarea = document.querySelector('#text');
let voiceList = document.querySelector('#voice');
let speechbtn = document.querySelector('.submit');


let synth=speechSynthesis
let isSpeaking=true

function voicespeech(){
    for(let voice of synth.getVoices()){
        let option = document.createElement('option')
        option.text = voice.name
        voiceList.addEventListener(option)
        console.log(option)
    }
}
synth.addEventListener('voiceschanged',voicespeech)

function texttospeech(text){
    let utternance = new SpeechSynthesisUtterance(text)
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utternance.voice = voice
        }
    }
    speechSynthesis.speak(utternance)
}

speechbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(textarea.value !=''){
        if(!synth.speaking){
            texttospeech(textarea.value)
        }
        if(textarea.value.length>80){
            if(isSpeaking){
                synth.resume()
                isSpeaking = false
                speechbtn.innerHTML = 'pause speech'
            }else{
                synth.pause()
                isSpeaking = true
                speechbtn.innerHTML = 'Resume Speech'

            }
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true
                    speechbtn.innerHTML = 'Convert to Speech'
                }
            })
        }else{
            speechbtn.innerHTML = 'Convert to Speech'
        }
    }
})
