function animation(obj,opation,isLinear,Speed,fnEnd){
	clearInterval(obj.timer);
	var iSpeed=0;
	obj.timer=setInterval(function(){
		var isStopAll=true;
		for(attr in opation){
			var cuur=parseFloat(getComputedStyle(obj,false)[attr]);
			
			var isStop=false;
			if(attr=='opacity'){
				cuur=Math.round(cuur*100);
			}
			if(isLinear){
				if(opation[attr]<cuur){
					iSpeed=-Speed;
				}else{
					iSpeed=Speed;
				}
				if(Math.abs(opation[attr]-cuur)<=Math.abs(iSpeed)){
					isStop=true;
				}else{
					isStopAll=false;
				}

			}else{
				iSpeed=(opation[attr]-cuur)/Speed;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				if(!iSpeed){
					isStop=true;
				}else{
					isStopAll=false;
				}
			}
			if(isStop){
				
				if(isLinear){
						if(attr=='opacity'){
							obj.style[attr]=opation[attr]/100;
						}else{
							obj.style[attr]=opation[attr]+'px';
						}	
				}
			}else{
				if(attr=='opacity'){
				obj.style[attr]=(cuur+iSpeed)/100;

				}
				else{
					obj.style[attr]=cuur+iSpeed+'px';
				}
				
			}
		}
		if(isStopAll){
			clearInterval(obj.timer);
			if(fnEnd){
				fnEnd();
			}
		}

	},30);
}


function Carousel(option){
	this.oCarousal=null;
	this.oImgBox=null;
	this._option=option;
	this.aImg=option.arr;
	this.width=option.width;
	this.height=option.height;
	this.playDuration=option.playDuration;
	this.leftBtn=null;
	this.rightBtn=null;
	this.oBtnbox=null;
	this.now=0;
	this.timer=null;
	this.init();
	this.bindEvent();
	
	if(this.playDuration){
		this.bindEventtimer();
	}
}
Carousel.prototype.init=function(){
	this.oCarousal=document.getElementById(this._option.id);
	this.oCarousal.style.position='relative';
	
	this.oCarousal.style.height=this.height+'px';
	this.oCarousal.style.width=this.width+'px';
	this.oImgBox=document.createElement('ul');
	this.oCarousal.appendChild(this.oImgBox);
	for( var i=0;i<this.aImg.length;i++){
		var oLi=document.createElement('li');
		this.oImgBox.appendChild(oLi);
		var oImg=document.createElement('img');
		oLi.style.listStyle='none';
		oLi.style.position='absolute';
		oLi.style.top=0;
		oLi.style.left=0;
		oImg.style.height=this.height+'px';
		oImg.style.width=this.width+'px';
		oImg.src=this.aImg[i];
		oLi.appendChild(oImg);
		if(i==0){
		oLi.style.zIndex=50;
		oLi.style.opacity=1;	
		}else{
		oLi.style.zIndex=0;
		oLi.style.opacity=0.5;
		}
	}
	this.leftBtn=document.createElement('span');
	this.rightBtn=document.createElement('span');
	this.leftBtn.className='leftBtn';
	this.rightBtn.className='rightBtn';
	this.leftBtn.style.zIndex=999;
	this.rightBtn.style.zIndex=999;
	this.leftBtn.innerHTML='&lt';
	this.rightBtn.innerHTML='&gt';
	// this.oCarousal.appendChild(this.leftBtn);
	// this.oCarousal.appendChild(this.rightBtn);

	this.oBtnbox=document.createElement('ul');

	this.oCarousal.appendChild(this.oBtnbox);
	this.oBtnbox.className='oBtnbox';
	this.oBtnbox.style.zIndex=999;
	
	
	
	for(var i=0;i<this.aImg.length;i++){
		var oLi=document.createElement('li');
		this.oBtnbox.appendChild(oLi);
		if(i==0){
			oLi.className='active';
		}
	}
}
Carousel.prototype.bindEvent=function(){
	this.rightBtn.onclick=function(){

		this.now++;
		if(this.now>=this.aImg.length){
			this.now=0;
		}
		this.tab();
	}.bind(this);
	this.leftBtn.onclick=function(){

		this.now--;
		if(this.now<0){
			this.now=this.aImg.length-1;
		}
		this.tab();

	}.bind(this);
	var _self=this;
	for(var i=0;i<this.oBtnbox.children.length;i++){
		this.oBtnbox.children[i].index=i;
		this.oBtnbox.children[i].onclick=function(){
			_self.now=this.index;
			_self.tab();
		};
	}
	this.tab=function(){
		for(var i=0;i<this.aImg.length;i++){
			this.oImgBox.children[i].style.zIndex=0;
			this.oImgBox.children[i].style.opacity=0;
			this.oBtnbox.children[i].className='';
		}
		this.oImgBox.children[this.now].style.zIndex=50;
		animation(this.oImgBox.children[this.now],{'opacity':100},false,10);
		this.oBtnbox.children[this.now].className='active';
	}
	
	Carousel.prototype.bindEventtimer=function(){
		var timer=setInterval(this.rightBtn.onclick,this.playDuration);
		this.oCarousal.onmouseover=function(){
			clearInterval(timer);
		};
		this.oCarousal.onmouseout=function(){
			timer=setInterval(this.rightBtn.onclick,this.playDuration);
		}.bind(this);
	}	
}