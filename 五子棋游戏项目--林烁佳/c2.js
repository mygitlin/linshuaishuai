var obackImg = new Image();
var oblack = new Image();
var owhite = new Image();
obackImg.src = 'images/bak.jpg';
oblack.src = 'images/black.png';
owhite.src = 'images/white.png';
window.onload = function (ev) {
  var oCan = document.getElementById('can');
  var ctx = oCan.getContext('2d');
  ctx.drawImage(obackImg, 0, 0);
  huaxiang(ctx);
  var qiziColor = true;
  var geZiShuLiang = [];
  for(var i=0;i<15;i++){
      geZiShuLiang[i] = [];
      for(var j=0;j<15;j++){
          geZiShuLiang[i][j]=0;
      }
  }
  oCan.onclick = function (e) {
      var i = Math.round((e.offsetX-40)/40);
      var j = Math.round((e.offsetY-40)/40);
      if(geZiShuLiang[i][j] == 0){
          if(qiziColor){
              ctx.drawImage(oblack,i*40+22,j*40+22);
              geZiShuLiang[i][j] = 1;
              qiziColor = false;
              shuyin(geZiShuLiang,i,j,1)
          }else {
              ctx.drawImage(owhite,i*40+22,j*40+22);
              geZiShuLiang[i][j] = 2;
              qiziColor = true;
              shuyin(geZiShuLiang,i,j,2);
          }
      }
  }
};
function shuyin(arr,x,y,num) {
    var newX = x;
    var newY = y;
    var jiShu = 1;
    var newNum = num;
    //横方向
    while(x-1>=0 && arr[x-1][y] == num){
        jiShu++;
        x--;
    }
    x = newX;
    y = newY;
    while (x+1<15 && arr[x+1][y] == num){
        jiShu++;
        x++;
    }
    jieGuo(jiShu,newNum);
    // 竖方向
    x = newX;
    y = newY;
    jiShu = 1;
    while (y-1>=0 && arr[x][y-1]==num){
        jiShu++;
        y--;
    }
    x = newX;
    y = newY;
    while (y+1<=15 && arr[x][y+1]==num){
        jiShu++;
        y++;
    }
    jieGuo(jiShu,newNum);
    //左上往右下
    x = newX;
    y = newY;
    jiShu = 1;
    while (x-1>=0 && y-1>=0 && arr[x-1][y-1]==num){
        jiShu++;
        x--;
        y--;
    }
    x = newX;
    y = newY;
    while (y+1<15 && x+1<15 && arr[x+1][y+1]==num){
        jiShu++;
        x++;
        y++;
    }
    jieGuo(jiShu,newNum);
    //左下往右上
    x = newX;
    y = newY;
    jiShu = 1;
    while (x+1<15 && y-1>=0 && arr[x+1][y-1]==num){
        jiShu++;
        x++;
        y--;
    }
    x = newX;
    y = newY;
    while (x-1>=0 && y+1<15 && arr[x-1][y+1]==num){
        jiShu++;
        x--;
        y++;
    }
    jieGuo(jiShu,newNum);
}
//结果
function jieGuo(obj,num) {
    var oBox = document.getElementById('box');
    var oH2 = document.getElementById('h2');
    var oBtn = document.getElementById('btn');
    if(obj>=5){
        if(num==1){
            oBox.style.display = 'block';
            oH2.innerHTML = '黑子';
        }else {
            oBox.style.display = 'block';
            oH2.innerHTML = '白子';
        }
        oBtn.onclick = function (ev) {
            location.reload();
        }
    }
}
//绘制棋盘线
function huaxiang(ctx) {
    for(var i=0;i<15;i++){
        ctx.fillStyle = '#222';
        ctx.moveTo(40+i*40,40);
        ctx.lineTo(40+i*40,600);
        ctx.moveTo(40,40+i*40);
        ctx.lineTo(600,40+i*40);
        ctx.stroke();
        ctx.fill();
    }
}
