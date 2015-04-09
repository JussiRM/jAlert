/**
 * Created by jussi.laitinen on 2.4.2015.
 */
/*
 jAlert
 Created by: Jussi Laitinen
 Purpose: Show (non-blocking) message on screen
 */

var jAlert;
//jAlert = jAlert || {}; //if jAlert is not defined Create It

jAlert = function(msg, options) {
    "use strict";
    return jAlert.display(msg, options);
}

jAlert.display = function(msg, options) {
    //Option variables
    var time = 2000;
    var vAlign = 'bottom';
    var useCssAnimation = false;

    //Check options
    if (options !== undefined || typeof options !== object)
    {
        if(options.time !== undefined)
        {
            time = options.time;
        }

        if(options.vAlign !== undefined)
        {
            var temp = options.vAlign;
            if (temp === 'bottom' || temp === 'middle' || temp === 'top')
            {
                vAlign = options.vAlign;
            }
            else
            {
                console.log('Warning: options.vAlign value must be either "bottom", "middle" or "top". Falling back to default value');
            }
        }

        if (options.useCssAnimation !== undefined)
        {
            if (options.useCssAnimation === true || options.useCssAnimation === false)
            useCssAnimation = options.useCssAnimation;
        }
    }

    //Create container for the info message
    var $container = $('<div></div>');
    $container.append('<span id="jAlert_msg">' + msg + '</span>');

    //Check where to position the popup vertically. f stands for flipper (for bottom start/end to *-1)
    var bottomPx
    var f = 1;
    if (vAlign === 'bottom')
    {
        bottomPx = 40;
        f = -1;
    }
    else if (vAlign === 'middle')
    {
        bottomPx = ( $(window).height() / 2 );
    }
    else
    {
        bottomPx = ( $(window).height() - 80 );
    }

    //Make CSS Declarations
    $container.css({
        position: 'fixed',
        bottom: bottomPx + 'px',
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
        fontWeight: 'bold',
        fontSize: '1.0em',
        fontFamily: 'Segoe UI, Roboto, Verdana',
        wordWrap: 'break-word'
    });

    //Give this container a classname
    var contClass = 'jalert-container';
    $container.attr('class', contClass);

    //Insert container into the DOM
    $('body').append($container);

    //Position the just added container NOW because earlier it would give wrong width
    var posLeft = ($(window).width() / 2) - ( $container.outerWidth() / 2 );
    $container.css( { left: posLeft } );

    //Use CSS or jQuery animations
    if(!useCssAnimation) {
        //Animate the container
        $container.animate({
            opacity: 1.0,
            bottom: (bottomPx - (40 * f)) + 'px'
        }, 750, 'swing', function () {
            setTimeout(function () {
                $($container).animate({
                    opacity: 0.0,
                    bottom: (bottomPx - (80 * f)) + 'px'
                }, 750, 'swing', function () {
                    //Remove the container
                    $container.remove();
                });
            }, time);
        });
    }
    else {
        var transitionEndCounter = 0;
        $container.css({
            transition: 'all 750ms ease-out'
        });

        $($container).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            console.log(transitionEndCounter);
            if (transitionEndCounter == 0)
            {
                window.setTimeout(function() {
                    $container.css({
                        opacity: 0.0,
                        bottom: (bottomPx - (80 * f)) + 'px'
                    });
                    transitionEndCounter++;
                }, time);
            }
            else
            {
                $container.remove();
            }
        });

        //Change some bottom, opacity CSS properties
        $container.css({
            opacity: 1.0,
            bottom: (bottomPx - (40 * f)) + 'px'
        });
    }
};