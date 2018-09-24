fct();
flt();



function fct(){
	var oGwc=document.getElementById('gouwuche');
	var oGw=document.getElementById('gouwu');
    var oImg=oGwc.getElementsByTagName('img');
    var oNev=document.getElementsByTagName('ul')[0];
    var oLi = oNev.getElementsByTagName('li');
    //console.log(oNev);
    	//console.log(oLi);
   /* oNev.onmouseenter=function(){
        oLi[2].style.opacity='0.6'; 	
    };
    oNev.onmouseleave=function(){
        oLi[2].style.opacity='0.9'; 	
    };*/
    oGwc.onmouseenter=function(){
    	oGw.style.display='block';
    };
    oGwc.onmouseleave=function(){
    	oGw.style.display='none';
    };
};
function flt(){
	var oBs=document.getElementsByTagName('h4');
	var oHs=document.getElementsByTagName('h2');
	var oBd=document.getElementById('baide');
	var oHd=document.getElementById('heide');
	var oBsd=document.getElementById('baise');
	var oHsd=document.getElementById('heise');
	var oBj1=document.getElementById('bj1');
	var oBj2=document.getElementById('bj2');
	var oUl=oBj1.getElementsByTagName('ul');
	var oLi=document.getElementsByTagName('a');
    var oHs1= oHs[0];    
    var oBs1= oBs[0];
    var oHs2= oHs[1];    
    var oBs2= oBs[1];
     //console.log(oBj1);
    oLi[3].style.color='rgba(255,255,255,0.9)';
    oLi[17].style.color='rgba(255,255,255,0.9)';
    oBs1.onclick=function(){
       	oBd.style.display='block';
       	oHd.style.display='none';
       	oBj1.style.background='white';
       	for(var i=0;i<oLi.length;i++){
       		oLi[3].style.color='rgba(0,0,0,0.9)';
       		oLi[17].style.color='rgba(0,0,0,0.9)';
       		if(i<25){
       			oLi[i].style.color='rgba(0,0,0,0.6)';
       		}
       	}
       };
     console.log(oBj1);
    oHs1.onclick=function(){
       	oBd.style.display='none';
       	oHd.style.display='block';
       	oBj1.style.background='#1a1a1a';
       	for(var j=0;j<oLi.length;j++){
       		oLi[3].style.color='rgba(255,255,255,0.9)';
       		oLi[17].style.color='rgba(255,255,255,0.9)';
       		if(j<25){
       			oLi[j].style.color='rgba(255,255,255,0.6)';
       		}
       	}
       }; 
       oBs2.onclick=function(){
       	oBd.style.display='block';
       	oHd.style.display='none';
       }
       oHs2.onclick=function(){
       	oBd.style.display='none';
       	oHd.style.display='block';
       }

       /*oHs1.onclick=function(){
       	oHd.style.display='block';
       	oBd.style.display='none';
       }*/
       oBs2.onclick=function(){
       	oBsd.style.display='block';
       	oHsd.style.display='none';
       };
       oHs2.onclick=function(){
       	oHsd.style.display='block';
       	oBsd.style.display='none';
       }
    } 

    window.onscroll=function(){
            var t=document.documentElement.scrollTop || document.body.scrollTop; 
            //console.log(t);
            var $gundong =  document.getElementById('gundong');
            var gunA = $gundong.getElementsByTagName('a');
            //console.log(gunA[5]);
            if(t<155){
              $gundong.style.display="none";
            } 
            if(t>155 && t<1100){
               $gundong.style.display="block";
               $gundong.style.background='#1a1a1a';
               for(var i=0;i<gunA.length;i++){
                  gunA[0].style.color='rgba(255,255,255,0.8)';
                  gunA[1].style.color='rgba(255,255,255,0.3)';
                  gunA[2].style.color='rgba(255,255,255,0.3)';
                  gunA[3].style.color='rgba(255,255,255,0.3)';
                  gunA[4].style.color='rgba(255,255,255,0.3)';
                  gunA[6].style.color='rgba(255,255,255,0.3)';
                  gunA[7].style.color='rgba(255,255,255,0.3)';
               }
            }
            if(t>1100 && t<2400){
               $gundong.style.background='white';
               for(var i=0;i<gunA.length;i++){
                  gunA[0].style.color='rgba(0,0,0,0.8)';
                  gunA[1].style.color='rgba(0,0,0,0.3)';
                  gunA[2].style.color='rgba(0,0,0,0.3)';
                  gunA[3].style.color='rgba(0,0,0,0.3)';
                  gunA[4].style.color='rgba(0,0,0,0.3)';
                  gunA[6].style.color='rgba(0,0,0,0.3)';
                  gunA[7].style.color='rgba(0,0,0,0.3)';
               }
            }
            if(t>2400){
               $gundong.style.background='#1a1a1a';
               for(var i=0;i<gunA.length;i++){
                  gunA[0].style.color='rgba(255,255,255,0.8)';
                  gunA[1].style.color='rgba(255,255,255,0.3)';
                  gunA[2].style.color='rgba(255,255,255,0.3)';
                  gunA[3].style.color='rgba(255,255,255,0.3)';
                  gunA[4].style.color='rgba(255,255,255,0.3)';
                  gunA[6].style.color='rgba(255,255,255,0.3)';
                  gunA[7].style.color='rgba(255,255,255,0.3)';
               }
            }
       }
$(function(){
    


})