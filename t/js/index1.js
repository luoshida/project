/*fxm*/
fxmhandleNav();
fxmnavCate1();
fxmhandleCart1();
fxmhandleCarousel();
fxmhandleCart();
fxmnavCate();
fxmhandleGoods();
fxmhandleBoxbtn();
function fxmhandleNav(){
	var isStop=false;	
	window.onscroll=function(){
		var navHidden=document.querySelector('.nav-hidden');
		var iTop=document.body.scrollTop||document.documentElement.scrollTop;
		if(iTop>=100){
			if(!isStop){
			// navHidden.style.height='60px';
				animation(navHidden,{height:60},false,2);
				isStop=true;
				navHidden.style.overflow='visible';
			}
			}else{
				if(isStop){
				// navHidden.style.height='0px';
				animation(navHidden,{height:0},false,2);
				isStop=false;
				navHidden.style.overflow='hidden';		
				}
			}
	}
}
function fxmnavCate1(){
	var oNavCate=document.querySelector('.nav-hidden .navCate1');
	var oNavCateUl=document.querySelector('.nav-hidden .navCate1 ul');
	var oPhone=document.querySelector('.nav-hidden .sub-nav ul .navphone');
	var timer=null;
	oPhone.onmouseenter=function(){
		clearTimeout(timer);
		animation(oNavCate,{height:400},true,60);
		// oNavCate.style.height='400px';
		loadData();

	}
	
	oPhone.onmouseleave=function(){
		timer=setTimeout(function(){
			animation(oNavCate,{height:0},true,60);
			// oNavCate.style.height='0px';
		},200)
	}
	oNavCate.onmouseenter=function(){
		clearTimeout(timer);
	}
	oNavCate.onmouseleave=function(){
		animation(oNavCate,{height:0},true,60);
		// oNavCate.style.height='0px';
	}
	
	function loadData(){
		var datas=DataNavPhone[0];
		var sHtml='';
		oNavCateUl.innerHTML='';
		for(var i=0;i<datas.length;i++){

			sHtml += '<li><img src="'+datas[i].img+'" alt=""><p>';
			sHtml += datas[i].name+'</p><p class="price">'+datas[i].price+'</p></li>';
		}
		oNavCateUl.innerHTML=sHtml;
	}
}



function fxmhandleCart1(){
	var oNavCart=document.querySelector('.nav-hidden .nav3 .navCart');
	var oNavCart1=document.querySelector('.nav-hidden .nav3 .navCart1');
	var oNav=document.querySelector('.nav-hidden .nav3');
	var oLoader=document.querySelector('.nav-hidden .loader');
	var oNavA=document.querySelectorAll('.nav-hidden .nav3 a')[1];
	var timer=null;
	
	oNavA.onmouseenter=function(){
		clearTimeout(timer);
		oNavCart.style.display='block';
		oNavCart1.style.display='none';
		oLoader.style.display='block';
		setTimeout(function(){
			oLoader.style.display='none';
			oNavCart1.style.display='block';			
		},100)
	}
	oNavCart.onmouseenter=function(){
		clearTimeout(timer);
	}
	oNavCart.onmouseleave=function(){
		oNavCart.style.display='none';
	}
	oNavA.onmouseleave=function(){
		timer=setTimeout(function(){
			oNavCart.style.display='none';
		},200);
	}
}
function fxmhandleCarousel(){
		new Carousel(
		{
			id:'carousel',
			arr:['images/images1/banner.png','images/images1/select.png'],
			height:500,
			width:1220,
			playDuration:3000
		}
	);
}
function fxmhandleCart(){
	var oNavCart=document.querySelector('.nav .nav3 .navCart');
	var oNavCart1=document.querySelector('.nav .nav3 .navCart1');
	var oNav=document.querySelector('.nav .nav3');
	var oLoader=document.querySelector('.loader');
	var oNavA=document.querySelectorAll('.nav .nav3 a')[1];
	var timer=null;
	
	oNavA.onmouseenter=function(){
		// clearTimeout(timer);
		oNavCart.style.display='block';
		oNavCart1.style.display='none';
		oLoader.style.display='block';
		setTimeout(function(){
			oNavCart1.style.display='block';
			oLoader.style.display='none';
		},100)
	}
	oNavCart.onmouseenter=function(){
		clearTimeout(timer);
	}
	oNavCart.onmouseleave=function(){
		oNavCart.style.display='none';
	}
	oNavA.onmouseleave=function(){
		timer=setTimeout(function(){
			oNavCart.style.display='none';
		},200);
	}
}
function fxmnavCate(){
	var oNavCate=document.querySelector('.navCate');
	var oNavCateUl=document.querySelector('.navCate ul');
	var oPhone=document.querySelector('.sub-nav-banner .sub-nav ul .navphone');
	var timer=null;
	oPhone.onmouseenter=function(){
		clearTimeout(timer);
		animation(oNavCate,{height:400},true,60);
		// oNavCate.style.height='400px';
		loadData();

	}
	
	oPhone.onmouseleave=function(){
		timer=setTimeout(function(){
			animation(oNavCate,{height:0},true,60);
			// oNavCate.style.height='0px';
		},200)
	}
	oNavCate.onmouseenter=function(){
		clearTimeout(timer);
	}
	oNavCate.onmouseleave=function(){
		animation(oNavCate,{height:0},true,60);
		// oNavCate.style.height='0px';
	}
	
	function loadData(){
		var datas=DataNavPhone[0];
		var sHtml='';
		oNavCateUl.innerHTML='';
		for(var i=0;i<datas.length;i++){

			sHtml += '<li><img src="'+datas[i].img+'" alt=""><p>';
			sHtml += datas[i].name+'</p><p class="price">'+datas[i].price+'</p></li>';
		}
		oNavCateUl.innerHTML=sHtml;
	}
}
function fxmhandleGoods(){
	var aA=document.querySelectorAll('.goods .hot-goods .goodstop a');
	var aGoodsbottom=document.querySelector('.goods .hot-goods .goodsbottom');
	var aGoodUl=document.querySelector('.hot-goods .goodsbottom .goodsbox');
	loadData();
	aA[1].onclick=function(){
		aA[0].className='';
		this.className='active';
		animation(aGoodUl,{marginLeft:-1216},true,50);
		// aGoodUl.style.marginLeft='-1216px';
	}
	aA[0].onclick=function(){
		aA[1].className='';
		this.className='active';
		// aGoodUl.style.marginLeft='0px';
		animation(aGoodUl,{marginLeft:0},true,50);
	}
	function loadData(){
		// var oLi=document.createElement('li');
		// aGoodUl.appendChild(oLi);
		aGoodUl.innerHTML='';
		var sHtml='';
		var datas=DataGoods[0];
		for(var i=0;i<datas.length;i++){
			sHtml += '<li><a href="" class="shadows"></a><img src='+datas[i].img;
			sHtml += ' alt="" class="boxbtnimg"><p class="info">'+datas[i].info+'</p><p class="desc">';
			sHtml += datas[i].desc+'</p><ul class="boxbtn"><li><a href=""></a>';
			sHtml += '</li><li><a href=""></a></li><li><a href=""></a></li></ul><p class="price">';
			sHtml += datas[i].price+'</p><div class="buy"><span class="check">'+datas[i].check;
			sHtml += '</span><span class="purchase">'+datas[i].purchase+'</span>';
			sHtml += '</div></li>'
		}
		aGoodUl.innerHTML=sHtml;

	}
}
function fxmhandleBoxbtn(){
	var aUl=document.querySelectorAll('.boxbtn');
	var aImg=document.querySelectorAll('.boxbtnimg')
	// console.log(aImg);
	for(var i=0;i<aUl.length;i++){

		var aA=aUl[i].getElementsByTagName('a');
		for(var j=0;j<aA.length;j++){
			aA[1].className='active';
			(function(aA,i){
				aA[0].onmouseenter=function(){
					for(var k=0;k<aA.length;k++){
						aA[k].className='';
					}

					this.className='active';
					aImg[i].src='images/images1/hot22.png';	
				}	
				aA[2].onmouseenter=function(){
					for(var k=0;k<aA.length;k++){
						aA[k].className='';

					}
					this.className='active';
					aImg[i].src='images/images1/hot22.png';	
				}	
				aA[1].onmouseenter=function(){
					for(var k=0;k<aA.length;k++){
						aA[k].className='';
					}
					this.className='active';
					aImg[i].src='images/images1/hot2.png';	
				}				
			})(aA,i);


		}
	}
}