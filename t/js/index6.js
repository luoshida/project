
(function(){
	new Carousel({
		id:'show',
		aImg:[
			'images/image5/zhu1.png','images/image5/zhu2.png','images/image5/zhu3.png'
		],
		width:1220,
		height:501,
		playDuration:4000,
	});
	new Carousel1({
		id:'div22',
		aImg:[
			'images/image5/2tu1.jpg','images/image5/2tu2.jpg','images/image5/2tu3.jpg','images/image5/2tu4.jpg'
		],
		width:811,
		height:524,
		playDuration:3000,
	});
	new Carousel1({
		id:'div23',
		aImg:[
			'images/image5/2tu5.jpg','images/image5/2tu6.jpg','images/image5/2tu7.jpg','images/image5/2tu8.jpg'
		],
		width:239,
		height:476,
		playDuration:3000,
	});
})();
(function(){
	var oAccountL=document.querySelector('.account .accountL');
	var oAccountD=document.querySelector('.account .accountD');
	var timer;
	oAccountL.onmouseenter=function(){
		oAccountD.style.display='block';
	}
	oAccountL.onmouseleave=function(){
		oAccountD.style.display='none';	
	}
	oAccountD.onmouseenter=function(){
		oAccountD.style.display='block';
	}
	oAccountD.onmouseleave=function(){
		oAccountD.style.display='none';
	}
})();
(function(){
 	var oDemon=document.getElementById('demon');
 	var oDemonLi=oDemon.getElementsByTagName('li');
 	for (var i = 0; i < oDemonLi.length; i++) {
 		oDemonLi[i].onmouseenter=function(){
 			animation(this,{'opacity':0},false);
 		}
 		oDemonLi[i].onmouseleave=function(){
 			animation(this,{'opacity':100},true);
 		}
 	}
})();
(function(){
	var oLi8=document.querySelector('.label .li8');
	var oLabel=document.querySelector('.label');
	var oA=document.querySelectorAll('.label a');

	var oLiList=document.querySelector('.content .liList');
	var oNav=document.querySelector('.content .nav');
	var timer;
	oLi8.onmouseenter=function(){
		animation(oLiList,{'height':250},true);
		// oNav.style.backgroundColor='white';
		oLabel.className='label btnLine';
	}
	oLi8.onmouseleave=function(){
		animation(oLiList,{'height':0},true);
		// oNav.style.backgroundColor='#f3f3f3';
		oLabel.className='label';
	}
	oLiList.onmouseenter=function(){
		animation(oLiList,{'height':250},true);
		// oNav.style.backgroundColor='white';
		oLabel.className='label btnLine';
	}
	oLiList.onmouseleave=function(){
		animation(oLiList,{'height':0},true);
		// oNav.style.backgroundColor='#f3f3f3';
		oLabel.className='label';
	}
	for (var i = 0; i < oA.length; i++) {
		oA[i].onmouseover=function(){
			this.style.opacity=1;
		}
		oA[i].onmouseout=function(){
			this.style.opacity=0.8;
		}
	}
})();
(function(){
	var aLi=document.querySelectorAll('.content .nav li' );
	var aA=document.querySelectorAll('.content .nav a' );
	var oContent=document.querySelector('.content');
	var aContent=oContent.querySelectorAll('.theContent');
	for (var i = 0; i < aLi.length-1; i++) {
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for (var j = 0; j < aLi.length-1; j++) {
				aA[j].style.color='#616161';
				aA[j].style.fontWeight=500;
				aContent[j].style.display='none';
			}
			if (this.index>0) {
				oContent.style.backgroundColor='#fafafa';
			}else{
				oContent.style.backgroundColor='#eaeaea';
			}
			aA[this.index].style.color='#222';
			aA[this.index].style.fontWeight= 900;
			aContent[this.index].style.display='block';
		}
	}
})();
(function(){
	var oBig=document.getElementById('big3');
	var aLi=oBig.querySelectorAll('li');
	for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseenter=function(){
			// animation1(this,{'paddingTop':35},true);
			// var aImg=this.querySelectorAll('img');
			// console.log(aImg);
			// aImg[1].style.display='none';
			var oP=this.querySelector('p');
			// console.log(oP);
			animation1(oP,{'opacity':100},false);
		}
		aLi[i].onmouseleave=function(){
			// animation1(this,{'paddingTop':92},true);
			// var aImg=this.querySelectorAll('img');
			// aImg[1].style.display='block';
			var oP=this.querySelector('p');
			animation1(oP,{'opacity':0},false);
		}
	}
})();
