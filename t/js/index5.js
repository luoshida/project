(function(){
	var oSon2=document.getElementById('son2');
	var oButton=document.getElementById('button');
	var oSon=document.querySelector('.son');
	var timer;
	oButton.onmouseover=function(){
		animation(oSon2,{'marginLeft':0},true);
		oSon.style.display='block';	
	}
	oSon2.onmouseover=function(){
		animation(oSon2,{'marginLeft':0},true);
		oSon.style.display='block';	
	}
	oSon2.onmouseout=function(){
		animation(oSon2,{'marginLeft':-183},true);
		oSon.style.display='none';			
	}
})();
// (function(win,doc){
// 	var oRoot=doc.getElementsByTagName('html')[0];
// 	function nnn(){
// 		var iWidth=doc.body.clientWidth || doc.documentElement.clientWidth;
// 		console.log(iWidth);
// 		oRoot.style.fontSize=iWidth/10 +'px';
// 	}
// 	win.addEventListener('resize',nnn,false);
// 	win.addEventListener('DOMContentLoaded',nnn);
	
// })(window,document)

