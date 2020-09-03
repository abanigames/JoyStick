function puppetplay(joystick, puppet, initialPos) {

    var pressed = 0;
    var movedX = 0;
    var movedY = 0;
    if ("ontouchstart" in document.documentElement) {
        puppet.addEventListener("touchstart", onTouchStart, false);
        puppet.addEventListener("touchmove", onTouchMove, false);
        puppet.addEventListener("touchend", onTouchEnd, false);
    } else {
        puppet.addEventListener("mousedown", onMouseDown, false);
        puppet.addEventListener("mousemove", onMouseMove, false);
        puppet.addEventListener("mouseup", onMouseUp, false);
    }

    function onTouchStart(event) {
        pressed = 1;
    }

    function onTouchMove(event) {
        event.preventDefault();

        if (pressed === 1) {
            console.log(initialPos)
            console.log(movedX, movedY, initialPos.x, initialPos.y)
            console.log(event.targetTouches[0].pageX, event.targetTouches[0].pageY)
            movedX = initialPos.x - event.targetTouches[0].pageX;
            movedY = initialPos.y - event.targetTouches[0].pageY;
            // Manage offset
            console.log(movedX, movedY)
            new_pos_left = (parseInt(initialPos.x) - movedX) - parseInt(initialPos.x)
            new_pos_top = parseInt(initialPos.y) - movedY
            console.log(new_pos_left, new_pos_top)
            puppet.style.left = new_pos_left + 'px'
            puppet.style.top = new_pos_top + 'px'


        }
    }

    function onTouchEnd(event) {
        pressed = 0;
        // If required reset position store variable
        puppet.style.left = initialPos.x + 'px'
        puppet.style.top = initialPos.y + 'px'

    }




    function onMouseDown(event) {
        pressed = 1;
    }

    function onMouseMove(event) {

        if (pressed === 1) {
            movedX = event.pageX;
            movedY = event.pageY;
            // Manage offset
            puppet.getBoundingClientRect().x = puppet.getBoundingClientRect().y + movedX
            puppet.getBoundingClientRect().y = puppet.getBoundingClientRect().y + movedY




        }
    }

    function onMouseUp(event) {
        pressed = 0;
        // If required reset position store variable
        if (autoReturnToCenter) {
            movedX = centerX;
            movedY = centerY;
        }



    }



}

function trackpose(puppet, movedX, movedY) {

    console.log(puppet.getBoundingClientRect())


    var current_pos_left = parseInt(puppet.getBoundingClientRect().left)
    var current_pos_top = parseInt(puppet.getBoundingClientRect().top)
    var new_pos_left = current_pos_left + 10
    var new_pos_top = current_pos_top + 10

    puppet.style.left = new_pos_left + 'px'
    puppet.style.top = new_pos_top + 'px'
    console.log(puppet.style.left)

    console.log(puppet.getBoundingClientRect())
}

function trackinitial(puppet) {
    return puppet.getBoundingClientRect()
}