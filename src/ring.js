/* init */

var setRinging = function(){

    setTimeout(function(){
        $('.ringing')
            .addClass('-ringing');
    }, 600);

};

setRinging();

/* user */

$('#accept').click(function(){

    $('.ringing')
        .removeClass('-ringing')
    ;

    setTimeout(function(){

        $('.ringing')
            .addClass('-flip')
        ;

        $('.speaking')
            .removeClass('flipback')
        ;

        onStart();

    }, 0);

});

$('#hold').click(function(){

    $('.speaking')
        .toggleClass('hold');

    onPause($('.speaking').hasClass('hold'));

});

$('#refuse').click(function(){

    $('.ringing')
        .removeClass('-ringing')
    ;

    setTimeout(function(){

        $('.ringing')
            .addClass('-fadeout')
        ;

    }, 0);

    setTimeout(function(){

        $('.ringing')
            .addClass('-ringing')
            .removeClass('-fadeout')
        ;

    }, 2000);

});

$('#drop').click(function(){

    onStop();

    $('.speaking')
        .addClass('-drop')
    ;

    setTimeout(function(){

        $('.ringing')
            .removeClass('-flip')
        ;

        $('.speaking')
            .addClass('flipback')
            .removeClass('hold')
            .removeClass('-drop')
        ;

        setRinging();

    }, 2000);

});

$('.sound').click(function(){
    muted = !muted;
    onMuteChange()
    onMute(muted);
});

var onMuteChange = function(){
    if (muted){
        $('.fa-ban').removeClass('hidden');
        $('.fa-phone').removeClass('hidden');
        $('#eq').addClass('hidden');
    } else {
        $('.fa-ban').addClass('hidden');
        $('.fa-phone').addClass('hidden');
        $('#eq').removeClass('hidden');
    }
};

/* eq */

var muted = true;
var stopped = false;

var analyser = null;
var audio = null;

var onStart = function () {
    onMuteChange();
    stopped = false;
    play(muted);
};

var onPause = function (pause) {
    if (!audio){
        return;
    }
    if (pause) {
        audio.pause();
    } else {
        audio.play();
    }
};

var onStop = function () {
    stopped = true;
    if (!audio){
        return;
    }
    audio.pause();
    audio.currentTime = 0;
};

var onMute = function(mute){
    if (!audio){
        return;
    }
    audio.volume = mute ? 0 : 1;
}

var newAudioContext = function(){
    var Context = window['AudioContext'] || window['webkitAudioContext'];
    return new Context();
}

function play(muted) {

    var context, source;

    if (analyser === null){

        context = newAudioContext();
        analyser = context.createAnalyser();

        audio = new Audio('https://myzuka.org/Song/Play/928634?t=635644027144137542&s=6c6027dd9659abea2d0fd7693f43ef92');

        source = context.createMediaElementSource(audio);
        source.connect(analyser);

        analyser.connect(context.destination);

    }

    audio.volume = muted ? 0 : 1;
    audio.play();

    startEq(analyser);
}

function startEq(analyser) {

    var canvas = document.getElementById('eq');
    var context2d = canvas.getContext('2d');
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);

    var animate = function () {

        if (muted){
            setTimeout(function () {
                requestAnimationFrame(animate);
            }, 200);
            return;
        }

        var i, c, sum;

        var color = '#707084',
            w = 9,
            hx = 60,
            x = 0,
            y = 160,
            space = 9 + 2,
            count = 40,
            val = frequencyData.length / count;

        context2d.clearRect(0, 0, 300, 300);

        analyser.getByteFrequencyData(frequencyData);

        sum = 0;
        c = 0;
        for (i = 0; i < frequencyData.length; i++) {
            sum += frequencyData[i];
            if (c++ > val) {
                context2d.beginPath();
                context2d.rect(x + (i / val - 1) * space, y,
                    w, -(sum / hx));
                context2d.fillStyle = color;
                context2d.fill();
                context2d.closePath();
                c = 0;
                sum = 0;
            }
        }

        if (stopped) {
            return;
        }

        setTimeout(function () {
            requestAnimationFrame(animate);
        }, 10);

    };

    requestAnimationFrame(animate);

}
