window.onload=function(){
	handleCart();
	handleNav();
	handleMenu();
	handleCarousel();
	handleMidd();
	countDown();
	handleMid2();
	handlezhineng();
}
function handleCart(){
	var tNav=document.querySelector('.nav');
	var tNavD=document.querySelector('.nav .navD');
	var tNavDS=tNavD.querySelector('.navDS');
	var tNavDLoad=tNavD.querySelector('.loading');
	var tNavDS=tNavD.firstElementChild;
	var tNavI=tNav.firstElementChild;
	var tNavA=tNavI.nextElementSibling;
	tNav.onmouseenter=function(){
		tNav.style.backgroundColor='#fff';
		tNavI.style.color='red';
		tNavA.style.color='red';
		tNavDLoad.style.display = 'block';
		animation(tNavD,{'height':100},false,function(){
			tNavDLoad.style.display='none';
			tNavDS.style.display='block';
		})
	}
	tNav.onmouseleave=function(){
		tNav.style.backgroundColor='#424242';
		tNavI.style.color='#b0b0b0';
		tNavA.style.color='#b0b0b0';
		tNavDS.style.display = 'none';
		animation(tNavD,{'height':0},false)
	}
}
function handleNav(){
	var uBox1=document.querySelector('.box1'); 
	var uBox1Li=uBox1.getElementsByTagName('li');
	var uNavcontent=document.querySelector('.nav-content');
	var uNavcontentUl=uNavcontent.getElementsByTagName('ul')[0];
	var uNavcontentLi=uNavcontent.getElementsByTagName('li');
	var uNavLoad=document.querySelector('.nav-content .loading');
	var timer;
	for (var i = 0; i < uBox1Li.length-2; i++) {
		uBox1Li[i].index=i;
		uBox1Li[i].onmouseenter=function(){
			clearTimeout(timer);
			uNavcontentUl.innerHTML='';

			animation(uNavcontent,{'height':200});
			var index=this.index;
			setTimeout(function(){
				uNavLoad.style.display = 'none';
				loadData(index);	
			},1000)
		} 
		uBox1Li[i].onmouseleave=function(){
			timer=setTimeout(function(){
				animation(uNavcontent,{'height':0},true,)
			},300);
			
		}
		uNavcontent.onmouseenter=function(){
			clearTimeout(timer);
		}
		uNavcontent.onmouseleave=function(){
			timer=setTimeout(function(){
				animation(uNavcontent,{'height':0},true)
			},300);
		}
	}
	function loadData(index){
		uNavcontentUl.innerHTML='';
		var aTheArray=theArray[index];
		if(!aTheArray){
			return;
		}
		for (var i = 0; i < aTheArray.length; i++) {
			aTheArray[i]
			var oLi=document.createElement('li');
			if (aTheArray[i].tag) {
				var oDiv1=document.createElement('div');
				oDiv1.innerHTML=aTheArray[i].tag;
				oLi.appendChild(oDiv1);
			}else{
				var oDiv1=document.createElement('div');
				oDiv1.style.opacity=0;
				oLi.appendChild(oDiv1);
			}
			var oDiv2=document.createElement('div');
			var oImg=document.createElement('img');
			oImg.src=aTheArray[i].img;
			oDiv2.appendChild(oImg);
			oLi.appendChild(oDiv2);
			var oP1=document.createElement('p');
			oP1.innerHTML=aTheArray[i].name;
			oLi.appendChild(oP1);
			var oP2=document.createElement('p');
			oP2.innerHTML=aTheArray[i].price+'元起';
			oLi.appendChild(oP2);
			uNavcontentUl.appendChild(oLi);
		}
	}
}
function handleMenu(){
	var uBox2=document.querySelector('.up .box2');
	var uBox2D=document.querySelector('.box2 .box2D');
	var uBox2I=document.querySelector('.box2 .box2I');
	uBox2I.onfocus=function(){
		uBox2D.style.display='block';
		uBox2I.style.outline='none';
		uBox2I.style.borderColor='orange';
	}
	uBox2I.onblur=function(){
		uBox2D.style.display='none';
		uBox2I.style.borderColor='#e0e0e0';
	}
}
function handleCarousel(){
	new Carousel({
		id:'carousel',
		aImg:[
			'images/xuanchuan1.png',
			'images/xuanchuan2.png',
			'images/xuanchuan3.png',
			'images/xuanchuan4.png',
			'images/xuanchuan5.png'
		],
		width:1226,
		height:460,
		playDuration:3000		
	})
}
function handleMidd(){
	var oLeft=document.querySelector('.midd .left');
	var oLeftLi=oLeft.getElementsByTagName('li');
	var oLeftList=document.querySelector('.midd .leftList');
	var oLeftListUl=oLeftList.getElementsByTagName('ul')[0];
	var timer=null;
	for (var i = 0; i < oLeftLi.length; i++) {
		oLeftLi[i].index=i;
		oLeftLi[i].onmouseenter=function(){
			for (var j = 0; j < oLeftLi.length; j++) {
				oLeftLi[j].className='';
			}
			this.className='active';
			oLeftList.style.display='block';
			loadData(this.index);
		}
	}
	oLeft.onmouseleave=function(){
		timer=setTimeout(function(){
			for (var i = 0; i < oLeftLi.length; i++){
				oLeftLi[i].className='';		
			}
			oLeftList.style.display='none';
		},100)	
	}
	oLeftList.onmouseenter=function(){
		clearTimeout(timer);
	}
	oLeftList.onmouseleave=function(){
		for (var i = 0; i < oLeftLi.length; i++){
				oLeftLi[i].className='';		
			}
		oLeftList.style.display='none';
	}
	function loadData(index){
		oLeftListUl.innerHTML='';
		var oLeftListArr=theArray1[index];
		if (!oLeftListArr) {
			return
		}
		if (index==2) {
			oLeftList.style.width='700px';
		}else{
			oLeftList.style.width='1000px';
		}
		
		var LiARR='';
		for (var i = 0; i < oLeftListArr.length; i++) {
			// var oLeftListLi=document.createElement('li');
			// var oLeftListLiI=document.createElement('img');
			// oLeftListLiI.src=oLeftListArr[i].img;
			// var oLeftListLiA=document.createElement('a');
			// oLeftListLiA.innerHTML=oLeftListArr[i].name;
			// oLeftListLi.appendChild(oLeftListLiI);
			// oLeftListLi.appendChild(oLeftListLiA);
			// oLeftListUl.appendChild(oLeftListLi);

			LiARR += '<li><img src="'+oLeftListArr[i].img+'">';
			LiARR += '<a href="#">'+oLeftListArr[i].name+'</a></li>'
		}
		oLeftListUl.innerHTML=LiARR;
	}
}
function countDown(){
	var oKing=document.querySelector('.king');
	var oKingU=document.querySelector('.king .kingU');
	var oKingLi=oKingU.getElementsByTagName('li');
	
	var future=new Date('2018/5/21 12:00:00');
	function toStr(num){
		if(num<10){
			return '0'+num;
		}else{
			return ''+num;
		}
	}
	var timer;
	timer=setInterval(function(){
		var nows=new Date();
		var allTime=(future.getTime()-nows.getTime())/1000;
		if (allTime<0) {
			allTime=0;
			clearInterval(timer);
		}
		var h=parseInt(allTime/3600);
		var m=parseInt((allTime%3600)/60);
		var s=parseInt((allTime%3600)%60);
		
		oKingLi[0].innerHTML=toStr(h);
		oKingLi[2].innerHTML=toStr(m);
		oKingLi[4].innerHTML=toStr(s);
	},50)
}
function handleMid2(){
	var oNav2=document.querySelector('.mid2 .nav2');
	var oDiv=oNav2.getElementsByTagName('div');
	var okaDiv=document.querySelector('.mid2 .content .kinga'); 
	var okaDivU=okaDiv.querySelector('.kingaU'); 

	oDiv[0].onclick=function(){
		animation(okaDivU,{'marginLeft':-980});
		oDiv[0].className='';
		oDiv[1].className='linkNow';
	}
	oDiv[1].onclick=function(){
		animation(okaDivU,{'marginLeft':0});
		oDiv[1].className='';
		oDiv[0].className='linkNow';
	}
}
function handlezhineng(){
	var oNav2=document.querySelector('.zhineng .nav2');
	var oNav2Li=document.querySelectorAll('.zhineng .nav2 li');
	var oCon2=document.querySelector('.zhineng .content .con22');
	var oCon2Ul=oCon2.querySelector('ul');
	for (var i = 0; i < oNav2Li.length; i++) {
		oNav2Li[i].index=i
		oNav2Li[i].onmouseover=function(){
			for (var j = 0; j < oNav2Li.length; j++) {
				oNav2Li[j].className='';
			}
			this.className='changeOrange';
			gogogo(this.index);
		}
	}
	function gogogo(index){
		oCon2Ul.innerHTML='';
		var theArray22=theArray2[index];
		var kong='';
		console.log(theArray22.length);
		for (var i = 0; i < theArray22.length-1; i++) {
			kong+='<li class="bb"><img src="'+theArray22[i].img+'"><div><p>'+theArray22[i].p1+'</p><p>'+theArray22[i].p2+'</p></div></li>';	
		}
		kong+='<li><div class="aa"><img src="'+theArray22[theArray22.length-1].img1+'"></div><div class="aa"><img src="'+theArray22[theArray22.length-1].img2+'"></div></li>';
		oCon2Ul.innerHTML=kong;	
	}
	  
}