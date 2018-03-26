(function () { 
  var banInd = document.getElementsByClassName('banner-index')[0],
    iArr = banInd.children,
    arrow = document.getElementsByClassName('arrow')[0],
    btns = arrow.children,
    mainSlider = document.getElementsByClassName('main-slider')[0],
    mainBanner = document.getElementsByClassName('main-banner')[0], //ul
    liArr = mainBanner.children;
  imgWidth = mainSlider.offsetWidth;
  // console.log(iArr);
  //点亮盒子
  for (var i = 0; i < iArr.length; i++) {
    //绑定自定义属性
    iArr[i].index = i;
    iArr[i].onmouseover = function () {
      for (var j = 0; j < iArr.length; j++) {
        iArr[j].className = "";
      }
      this.className = "active";
      // 让后面需要用的变量key和square与当前的index同步；
      key = square = this.index;

      animate(mainBanner, -this.index * imgWidth);
    }
  }
  //实现图片的自动播放
  var key = 0,
    square = 0,
    timer = null;
  //定义定时器实现每秒播放一次
  timer = setInterval(autoPlay, 2000);

  function autoPlay() {
    key++; //图片自增
    if (key > liArr.length - 1) {
      mainBanner.style.left = 0;
      key = 1;
    }
    animate(mainBanner, -key * imgWidth);

    //实现索引的自增
    square++; //绑定底部的索引
    if (square > iArr.length - 1) {
      square = 0;
    }
    //点亮盒子
    for (var i = 0; i < iArr.length; i++) {
      iArr[i].className = '';
    }
    iArr[square].className = 'active';
  }
  //实现鼠标进入和移开的时候定时器的开闭
  mainSlider.onmouseover = function () {
    clearInterval(timer);
  }
  mainSlider.onmouseout = function () {
    timer = setInterval(autoPlay, 2000)
  }

  // 实现左右焦点的播放
  btns[0].onclick = function () {
    //点击左侧按钮 图片往右边走key--
    key--;
    if (key < 0) {
      mainBanner.style.left = -(liArr.length - 1) * imgWidth + 'px';
      key = iArr.length - 1;
    }
    animate(mainBanner, -key * imgWidth);
    square--;
    if (square < 0) {
      square = iArr.length - 1;
    }
    for (var i = 0; i < iArr.length; i++) {
      iArr[i].className = '';
    }
    iArr[square].className = 'active';
  }
  btns[1].onclick = function () {
    autoPlay();
  }

  function animate(ele, target) {
    clearInterval(ele.timer);
    var speed = target > ele.offsetLeft ? 15 : -15;
    ele.timer = setInterval(function () {
      var val = target - ele.offsetLeft;
      ele.style.left = ele.offsetLeft + speed + "px";
      if (Math.abs(val) < Math.abs(speed)) {
        ele.style.left = target + "px";
        clearInterval(ele.timer);
      }
    }, 5)
  }
 })()
 