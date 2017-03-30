var WIDTH=1024;
var HEIGHT=468;
var RADIUS=8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//设置结束的时间
// var endTime= new Date(2016,10,13,18,47,25);

//固定倒计时多少时间
var endTime=new Date();
//把时间设置成现在的一小时之后 因为要毫秒值所以是3600*1000=
endTime.setTime(endTime.getTime()+3600*1000);

var time=0;
var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]
window.onload=function(){
	var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');
    canvas.width=WIDTH;
    canvas.height=HEIGHT;
    //获取倒计时的值
    time=huoTime();
    setInterval(function(){
           render( context );
            update();
    },50);

}
function huoTime(){
	//当前的时间
	var nowtime=new Date();
	//获取结束与当前时间的毫秒值
	var t=endTime.getTime()-nowtime.getTime();
	t=Math.round(t/1000);
	return t > 0 ? t : 0;
}

function render(text){

	text.clearRect(0,0,WIDTH, HEIGHT);

	//分解毫秒值
	var hours=parseInt(time/3600);
	var minutes=Math.floor((time-hours*3600)/60);
	var seconds=(time%60);

	//绘制图形
	pic(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), text);
	pic(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), text);
	//冒号的绘制
	pic(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10, text);
	//冒号是10*4的 所以是加9个半径+1
	pic(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), text);
	pic(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), text);
	pic(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10, text);
	pic(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), text);
	pic(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), text);
    
    //绘制小球
	for( var i = 0 ; i < balls.length ; i ++ ){
        text.fillStyle=balls[i].color;

        text.beginPath();
        text.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        text.closePath();

        text.fill();
    }

}
function update(){
	//不断获取下一次的时间在分解
	var newtime = huoTime();
	var newhours=parseInt(newtime/3600);
	var newminutes=parseInt((newtime-newhours*3600)/60);
	var newseconds=(newtime%60);

    //上一次的时间
	var hours=parseInt(time/3600);
	var minutes=Math.floor((time-hours*3600)/60);
	var seconds=time%60;
	
	if(newseconds!=seconds){
		if(parseInt(newhours/10)!=parseInt(hours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
		}
		if(parseInt(newhours%10)!=parseInt(hours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10));
		}
		if(parseInt(newminutes/10)!=parseInt(minutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10));
		}
		if(parseInt(newminutes%10)!=parseInt(minutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10));
		}
		if(parseInt(newseconds/10)!=parseInt(seconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10));
		}
		if(parseInt(newseconds%10)!=parseInt(seconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(newseconds%10));
			
		}
        //把下次的值复制给上一次的时间
		time=newtime;
	}
	//不断刷新求得位置
	updateBalls();
	console.log( balls.length);
}

function updateBalls(){
	for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= HEIGHT-RADIUS ){
            balls[i].y = HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }
    }

    var cnt = 0
    for( var i = 0 ; i < balls.length ; i ++ )
        if( balls[i].x + RADIUS > 0 && balls[i].x -RADIUS < WIDTH )
            balls[cnt++] = balls[i]

    while( balls.length > cnt ){
        balls.pop();
    }
}

function addBalls(x,y,n){

    for(var i=0;i<number[n].length;i++){
    	for(var j=0;j<number[n][i].length;j++){
    		if(number[n][i][j]==1){
               var aball={
               	x:x+j*2*(RADIUS+1)+(RADIUS+1),
                y:y+i*2*(RADIUS+1)+(RADIUS+1),
                g:1.5+Math.random(),
                vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                vy:-5,
                color: colors[ Math.floor( Math.random()*colors.length ) ]
               }
               //把创建的每一个小球放进数组里面
               balls.push(aball);
    		}
    	}
    }
}

function pic(x, y, n, text){
	text.fillStyle='#005588';
	for(i=0;i<number[n].length;i++){
		for(j=0;j<number[n][i].length;j++){
            if(number[n][i][j]==1){
            	text.beginPath();
            	text.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
            	text.closePath();
            	text.fill();
            }
		}
	}

}