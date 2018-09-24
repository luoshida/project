/*
function animation(obj,opation,isLinear,fnEnd){
    //1.一开始关闭定时器是为了防止重复触发函数时有多个定时器工作加快动画执行
    //2.定时器做为对象的参数是为了多个物体动画时不相互干扰	
	clearInterval(obj.timer);
	//初始化速度
	var iSpeed = 0;

	obj.timer = setInterval(function(){
		//1.isStopAll用来代表改对象上的所有属性的动画是否执行完毕
		//2.每次定时器函数执行时把isStopAll改为true,在属性循环执行动画中如果有一个属性没有结束动画,就把该值该为false
		var isStopAll = true;
		//循环执行每个属性的动画
		for(attr in opation){
			//1.由于getComputedStyle的返回值有单位,所以需要类型转换,由于透明度可能有小数,所以用parseFloat
            //2.offsetWidht/offsetHeight指的是元素的宽和高,而不是内容的宽和高,所以用getComputedStyle
			var curr = parseFloat(getComputedStyle(obj,false)[attr]);
			//单次属性的动画是否结束,默认时false,表明不结束,只有符合结束条件时改为true
			var isStop = false;
			//透明度的处理以百分比的形式计算,所以乘以100
			if(attr == 'opacity'){
				curr = Math.round(curr*100)
			}
			//匀速动画
			if(isLinear){
				//1.根据当前值和目标值来决定速度的正负
                //2.如果当前值小于目标值,速度为正
                //3.如果当前值大于目标值,速度为负
				if(curr > opation[attr]){
					iSpeed = -10;
				}else{
					iSpeed = 10;
				}
              	//匀速动画动画结束的条件:
                //1.当前值和目标值的差不够一次动画时,即当目值和目标值的差小于速度时,动画结束并且物体直接到达目标
                //2.由于速度有正负,所以用绝对值
				if(Math.abs(opation[attr] - curr) <= Math.abs(iSpeed)){
					isStop = true;
				}else{
				//如果当前动画没有结束,不能结束该对象的动画
					isStopAll = false;
				}
			//减速动画						
			}else{
				//减速动画的目标离当前值越近速度越小
				iSpeed = (opation[attr] - curr)/5;
				//由于减速动画的计算公式会产生小数,所以用取整函数
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				
				//减速动画的结束条件是目标值和当前值相等,即速度是0
				if(!iSpeed){
					isStop = true;
				}else{
				//如果当前动画没有结束,不能结束该对象的动画					
					isStopAll = false;
				}
			}

			//单个属性动画结束
			if(isStop){
				//匀速动画结束时的处理
				if(isLinear){
					//透明度的处理
					if(attr == 'opacity'){
						obj.style[attr] = opation[attr] / 100;
					//其他有px单位的属性处理	
					}else{
						obj.style[attr] = opation[attr] + 'px';	
					}		
				}
			//单个属性动画执行	
			}else{
				//透明度的处理
				if(attr == 'opacity'){
					obj.style[attr] = (curr + iSpeed)/100 ;
				//其他有px单位的属性处理	
				}else{
					obj.style[attr] = curr + iSpeed + 'px';
				}
			}
		}
		//如果循环中没有把isStopAll改为false,说明所有动画都执行完毕了
		if(isStopAll){
			//结束改对象上的动画
			clearInterval(obj.timer);
			//如果有后续函数的话,调用后续函数
			if(fnEnd){
				fnEnd();
			}
		}
	},30)
}

function Carousel(option){
	//罗列属性
	//获取容器
	this.oBox = document.getElementById(option.id);
	this.oImgUl = null;
	this.aImg = option.aImg;
	this.width = option.width;
	this.height = option.height;
	this.leftBtn = null;
	this.rightBtn = null;
	this.oBottomBtn = null;
	this.playDuration = option.playDuration;
	this.now = 0;
	//初始化
	this.init();
	//绑定事件
	this.bindEvent();

	if(this.playDuration){
		this.autoPlay();
	}
}
Carousel.prototype.init = function(){
	//创建放图片的ul容器
	this.oBox.style.width = this.width + 'px';
	this.oBox.style.height = this.height + 'px';
	this.oBox.style.position = 'relative';
	this.oImgUl = document.createElement('ul');
	/*
	for(var i = 0;i<this.aImg.length;i++){
		var oLi = document.createElement('li');
		var oImg = document.createElement('img');
		oLi.style.position = 'absolute';
		oLi.style.top = 0;
		oLi.style.left = 0;

		//默认显示第一张
		if(i==0){
			oLi.style.opacity = 1;
			oLi.style.zIndex = 50;
		}else{
			oLi.style.opacity = 0.5;
			oLi.style.zIndex = 0;
		}
		oImg.style.width = this.width + 'px';
		oImg.style.height = this.height + 'px';
		oImg.src = this.aImg[i];
		oLi.appendChild(oImg);
		this.oImgUl.appendChild(oLi);
	}
	//左右按钮
	this.leftBtn = document.createElement('span');
	this.rightBtn = document.createElement('span');
	this.leftBtn.className = 'leftBtn';
	this.rightBtn.className = 'rightBtn';
	this.leftBtn.style.zIndex = 999;
	this.rightBtn.style.zIndex = 999;
	this.leftBtn.innerHTML = "&lt;";
	this.rightBtn.innerHTML = "&gt;";
	
	//底部按钮
	this.oBottomBtn = document.createElement('ul');
	this.oBottomBtn.className = 'bottomBtn';
	this.oBottomBtn.style.zIndex = 999; 
	for(var i = 0;i<this.aImg.length;i++){
		var oLi = document.createElement('li');
		if(i == 0){
			oLi.className = 'active';
		}
		this.oBottomBtn.appendChild(oLi);
	}

	//把按钮添加到到顶层父容器中
	this.oBox.appendChild(this.leftBtn);
	this.oBox.appendChild(this.rightBtn);
	
	this.oBox.appendChild(this.oBottomBtn);

	//给底部按钮容器添加ml使其水平居中
	this.oBottomBtn.style.marginLeft = - this.oBottomBtn.offsetWidth * 0.5 + 'px';
	//把ul容器添加到顶层父容器中
	this.oBox.appendChild(this.oImgUl);
}
Carousel.prototype.bindEvent = function(){
	//显示下一张
	this.rightBtn.onclick = function(){
		this.now++;
		if(this.now >=  this.oImgUl.children.length){
			this.now = 0;
		}
		this.tab();
	}.bind(this);

	//显示上一张
	this.leftBtn.onclick = function(){
		this.now--;
		if(this.now < 0){
			this.now = this.oImgUl.children.length - 1;
		}
		this.tab();
	}.bind(this);	

	//底部按钮事件
	var _self = this;
	for(var i = 0;i<this.oBottomBtn.children.length;i++){
		this.oBottomBtn.children[i].index = i;
		this.oBottomBtn.children[i].onclick = function(){
			_self.now = this.index;
			_self.tab();
		}
	}	
}
Carousel.prototype.tab = function(){
	//改变所有的li
	for(var i = 0;i<this.oImgUl.children.length;i++){
		this.oImgUl.children[i].style.zIndex = 0;
		this.oImgUl.children[i].style.opacity = 0.5;
		this.oBottomBtn.children[i].className = '';
	}
	//改变当前的li
	this.oImgUl.children[this.now].style.zIndex = 50;
	// this.oImgUl.children[this.now].style.opacity = 1;
	this.oBottomBtn.children[this.now].className = 'active';
	animation(this.oImgUl.children[this.now],{opacity:100});				
}*/
/*
Carousel.prototype.autoPlay = function(){
	var timer = null;
	timer = setInterval(this.rightBtn.onclick,this.playDuration);
	this.oBox.onmouseover = function(){
		clearInterval(timer);
	}
	this.oBox.onmouseout = function(){
		timer = setInterval(this.rightBtn.onclick,this.playDuration);			
	}.bind(this);
}
*/
