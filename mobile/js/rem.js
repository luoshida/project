	;(function(window,document){
		var iHtml=document.getElementsByTagName('html')[0];
		window.addEventListener('resize',reWidth,false);
		document.addEventListener('DOMContentLoaded',reWidth,false);
		// window.onresize=function(){
		// 	reWidth();
		// }
		function reWidth(){
			var iWidth=document.body.clientWidth||document.documentElement.clientWidth;
			var iFontSize=iWidth/10;
			iHtml.style.fontSize=iFontSize+'px';
		}
	})(window,document);