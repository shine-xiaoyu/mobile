window.onload=function(){
// 顶部选项卡
    var ren=$(".ren")[0];
    var renxiala=$(".renxiala")[0];
    var r=$("#ren");
    ren.onmouseover=function(){
        renxiala.style.display="block";
        r.className="re open";
    }
    ren.onmouseout=function(){
        renxiala.style.display="none";
        r.className="re";
    }
    var shouji=$(".shouji")[0];
    var shoujixiala=$(".shoujixiala")[0];
    var s=$("#shouji");
    shouji.onmouseover=function(){
        shoujixiala.style.display="block";
        s.className="shou open1";
    }
    shouji.onmouseout=function(){
        shoujixiala.style.display="none";
        s.className="shou";
    }
// 搜索框聚焦失焦事件
    var k=$(".k")[0];
    var val=k.value;
    k.onfocus=function(){
        k.value="";
    }
    k.onblur=function(){
        var nvalue=k.value;
        if(nvalue==""||nvalue==val){
            nvalue=val;
        }
        k.value=nvalue;
    }

    var ck=$(".kuang")[0];
    var val=ck.value;
    ck.onfocus=function(){
        ck.value="";
    }
    ck.onblur=function(){
        var nvalue=ck.value;
        if(nvalue==""||nvalue==val){
            nvalue=val;
        }
        ck.value=nvalue;
    }
// banner 轮播图
    var bannerCenter=$(".bannerCenter")[0];
    var imgItems=$(".imgitem");
    var butLis=$("li",$(".button")[0]);
    var zhuaL=$(".zhuaziL")[0];
    var zhuaR=$(".zhuaziR")[0];
    var imgW=parseInt(getStyle(imgItems[0],"width"));
    var flag=true;
    // console.log(imgW)
    // 页面初始化
    butLis[0].style.background="#E40077";
    for(var i=0;i<imgItems.length;i++){
    	if(i==0){
    		continue;
    	}
    	imgItems[i].style.left=imgW+"px";
    }
    var banT=setInterval(banmove,5000);
    // 放上停止
    bannerCenter.onmouseover=function(){
    	clearInterval(banT);
    }
    bannerCenter.onmouseout=function(){
    	banT=setInterval(banmove,5000);
    }
    // 点击but
    for(var i=0;i<butLis.length;i++){
    	butLis[i].index=i;
	    butLis[i].onclick=function(){
	    	if(flag){
		        if(now<this.index){
		        	imgItems[this.index].style.left=imgW+"px"; 	
					animate(imgItems[now],{left:-imgW},600);
		        }else if(now>this.index){
		        	imgItems[this.index].style.left=-imgW+"px";	
					animate(imgItems[now],{left:imgW},600);
		        }else if(now=this.index){
		        	return;
		        }
		        butLis[now].style.background="#ccc";
		        butLis[this.index].style.background="#E40077";
				animate(imgItems[this.index],{left:0},600,function(){
					flag=true;
				});
				now=this.index;
	    	}
	        
			flag=false;
	    }
    }
    // 点击左右抓
    zhuaL.onclick=function(){
    	if(flag){
    		banmoveL();
    	}
    	flag=false;
    }
    zhuaR.onclick=function(){
    	if(flag){
    		banmove();
    	}
    	flag=false;
    }

    var now=0;
    var next=0;
    function banmove(){
    	next=now+1;
    	if(next==imgItems.length){
    		next=0;
    	}
    	imgItems[next].style.left=imgW+"px";    	
    	butLis[now].style.background="#ccc";
    	butLis[next].style.background="#E40077";
		animate(imgItems[next],{left:0},600);
		animate(imgItems[now],{left:-imgW},600,function(){
			flag=true;
		});
		now=next;		   	
    }
    function banmoveL(){
    	next=now-1;
    	if(next<0){
    		next=imgItems.length-1;
    	}
    	imgItems[next].style.left=-imgW+"px";    	
    	butLis[now].style.background="#ccc";
    	butLis[next].style.background="#E40077";
		animate(imgItems[next],{left:0},600);
		animate(imgItems[now],{left:imgW},600,function(){
			flag=true;
		});
		now=next;
    }


// 选项卡
    var item=$(".item");
    var list=$(".list");
    var item1=$(".item1");
    for(var i=0;i<item.length;i++){
	    item[i].index=i;
		item[i].onmouseover=function(){
		list[this.index].style.display="block";
        item1[this.index+1].style.cssText="color:#0085d0;background:#f6f6f6;"
		}		  
	}
	for(var i=0;i<item.length;i++){
	    item[i].index=i;
		item[i].onmouseout=function(){
		list[this.index].style.display="none";
        item1[this.index+1].style.cssText="color:;background:;"
		}		  
	}
// 长条轮播图
    var lunbodi=$("#lunbodi");
	var lunbo=$("#lunbo");
	var dalunbo=$(".dalunbo")[0];
	var lunbotuS=$("li",dalunbo);
	var zhua2Left=$(".zhuazi2Left")[0];
	var zhua2Right=$(".zhuazi2Right")[0];
	var ow=parseInt(getStyle(lunbotuS[0],"width"))+parseInt(getStyle(lunbotuS[0],"border-right-width"));
	// alert(ow)
	// 动态设置大盒子的宽度
	dalunbo.style.width=ow*(lunbotuS.length)+"px";
	// alert(getStyle(dalunbo,"width"))	
	var t=setInterval(move,3000);
	var zhua2=$(".zhuazi2")[0];
	// 放置停止
	lunbodi.onmouseover=function(){
		clearInterval(t);
	}
	lunbodi.onmouseout=function(){
		t=setInterval(move,3000);
	}
	function move(){
		var first=getFirstChild(dalunbo);
		animate(dalunbo,{left:-ow},600,function(){
			dalunbo.appendChild(first);
			dalunbo.style.left=0;
		})
	}
	// 点击
	zhua2Right.onclick=function(){
		move();
	}
	zhua2Left.onclick=function(){
		var first=getFirstChild(dalunbo);
	    var last=getLastChild(dalunbo);
	    dalunbo.insertBefore(last,first)
		dalunbo.style.left=-ow+"px";
		animate(dalunbo,{left:0},600);		
	}

// 公告
    var xinxi=$(".xinxi",parent);
    var parent=$("ul",$("#gonggao"))[0];
    var ggRight=$("div",$(".ggxiantou")[0])[1];
    var ggLeft=$("div",$(".ggxiantou")[0])[0];
    var gonggao=$("#gonggao");

    ggRight.onclick=function(){
    	dong();
    }
    ggLeft.onclick=function(){
    	dongL();
    }
    gonggao.onmouseover=function(){
    	clearInterval(ggt);
    }
    gonggao.onmouseout=function(){
    	ggt=setInterval(dong,3000);
    }


    var ggt=setInterval(dong,3000);
    function dong(){
    	var diyi=getFirstChild(parent);
    	parent.appendChild(diyi);
    }
    function dongL(){
    	var diyi=getFirstChild(parent);
    	var zuihou=getLastChild(parent);
    	parent.insertBefore(zuihou,diyi);
    }

//在线客服
    var kefu=$(".one",$("#kefu")[0]);

    for(var i=0;i<kefu.length;i++){
    	kefu[i].index=i;
    	kefu[i].onmouseover=function(){
    		animate(kefu[this.index],{left:-80},300)
    	}
    	kefu[i].onmouseout=function(){
    		animate(kefu[this.index],{left:-22},300)
    	}
    } 
    // kefu[0].onclick=function(){
    // 		animate(kefu[0],{left:-80},600)
    // 	}




}