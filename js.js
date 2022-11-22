window.addEventListener('load', function () {
    var foc = document.querySelector('.focus');
    var btnl = document.querySelector('.btnleft');
    var btnr = document.querySelector('.btnright');
    foc.addEventListener('mouseover', function () {
        btnl.style.display = "block";
        btnr.style.display = "block";
        clearInterval(timer);
        timer = null;
    });
    foc.addEventListener('mouseout', function () {
        btnl.style.display = "none";
        btnr.style.display = "none";
        timer = setInterval(function () {
            btnr.click();
        }, 3000);
    });

    var ul = foc.querySelector('ul');
    var ol = foc.querySelector('ol');
    function animate(obj, target, callback) {
        if (obj.timer)
            clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                if (callback) callback();
            }
            obj.style.left = obj.offsetLeft + step + "px";
        });
    }
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        ol.appendChild(li);
        li.setAttribute('index', i);
    }
    ol.children[0].className = "current";
    ol.addEventListener('click', function (e) {
        if (e.target == this) return;
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        e.target.className = 'current';
        cnt = e.target.getAttribute('index');
        var ind = e.target.getAttribute('index');
        animate(ul, -ind * foc.offsetWidth);
    });
    var cnt = 0;
    function cleancircle() {
        for (var i = 0; i < ol.children.length; i++) {
            if (i != cnt) ol.children[i].className = '';
            else ol.children[i].className = 'current';
        }
    }
    var flag = true;
    btnl.addEventListener('click', function () {
        if (!flag) return;
        flag = false;
        if (--cnt < 0) cnt = ol.children.length - 1;
        cleancircle();
        animate(ul, -cnt * foc.offsetWidth, function () { flag = true; });
    });
    btnr.addEventListener('click', function () {
        if (!flag) return;
        flag = false;
        if (++cnt >= ul.children.length) cnt = 0;
        cleancircle();
        animate(ul, -cnt * foc.offsetWidth, function () { flag = true; });
    });

    var timer = setInterval(function () {
        btnr.click();
    }, 3000);
});