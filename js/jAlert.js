/**
 * Created by jussi.laitinen on 2.4.2015.
 */
/*
 jAlert
 Created by: Jussi Laitinen
 Purpose: Show (non-blocking) message
 */

var jAlert;
//jAlert = jAlert || {}; //if jAlert is not defined Create It

jAlert = function(msg, options) {
    "use strict";
    return jAlert.display(msg, options);
}

jAlert.display = function(msg, options) {
    //Is time parameter set?
    //if (time === undefined || typeof time !== 'number')
    //{
    //    time = 2000;
    //}

    //Check options
    if (options !== undefined || typeof options !== object)
    {

    }

    //Create container for the info message
    var $container = $('<div></div>');
    $container.append('<span id="jAlert_msg">' + msg + '</span>');

    //Make CSS Declarations
    $container.css({
        position: 'fixed',
        bottom: '0px',
        //right: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '250px',

        backgroundColor: 'rgba(0,0,0, 0.80)',
        borderRadius: '10px',

        padding: '24px',
        zIndex: '1000',

        opacity:0
    });

    $container.find('span').css({
        color: '#ffffff',
        textShadow: '0px 0px 6px #000000',
        wordWrap: 'break-word'
    });

    //Give this container a classname
    var contClass = 'jalert-container';
    $container.attr('class', contClass);

    //Insert container into the DOM
    $('body').append($container);

    //Position the just added container NOW because earlier it would give wrong width
    var posLeft = ($('body').width() / 2) - ( $container.outerWidth() / 2 );
    $container.css( { left: posLeft } );

    //Animate the container
    $container.animate({
        opacity: 1.0,
        bottom: '40px'
    }, 750, 'swing', function() {
        setTimeout(function() {
            $($container).animate({
                opacity: 0.0,
                bottom: '80px'
            }, 750, 'swing', function() {
                //Remove the container
                $container.remove();
            });
        }, time);
    });
};