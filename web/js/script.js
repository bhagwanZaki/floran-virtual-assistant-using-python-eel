function py_video() {
    eel.video_feed()()
}

py_video()
eel.expose(updateImageSrc);
function updateImageSrc(val) {
    let elem = document.getElementById('bg');
    elem.src = "data:image/jpeg;base64," + val
}


function capture(){
    eel.capture_img()(success_fun)
    
    // eel.capture_img()(success_fun)
}

function success_fun(result){
    if (result === "True"){
        window.close()
    }
}