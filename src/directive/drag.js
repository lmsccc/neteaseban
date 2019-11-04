function drag(el, binding){
    let disX = 0;
    let disY = 0;
    let maxLeft = 0;
    let maxTop = 0;
    el.ontouchstart = function(e){
        let touchObj = e.touches[0];
        disX = touchObj.clientX - el.offsetLeft;
        disY = touchObj.clientY - el.offsetTop;
        maxLeft = document.body.clientWidth - el.clientWidth;
        maxTop = document.body.clientHeight - el.clientHeight;

    }
    el.ontouchmove = function(e){
        let touchObj = e.touches[0];
        let left = touchObj.clientX - disX ;
        let top = touchObj.clientY - disY;
        el.style.left = left < 0 ? 0 : left > maxLeft ?  maxLeft + 'px' : left + 'px';
        el.style.top = top < 0 ? 0 : top > maxTop ? maxTop + 'px' : top + 'px';

    }
}

export default {
    bind(el, binding){
        drag(el, binding)
    }
}
