// ie classname 兼容性
function getClass(classname,obj){
	// obj=obj||document; obj 不能==后边的 
	//参数初始化 
	obj=obj||document;
	if(document.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var objs=obj.getElementsByTagName('*');
	    var all=[];
	    for(var i=0;i<objs.length;i++){
	    	// objs[i].className 获取到对象的类名
	    	// 原来if中的条件 
	    	// objs[i].className==classname
	    	// checkClass(objs[i],classname)
		    if(checkClass(objs[i],classname)){
	    	    all.push(objs[i]);
	        }		    
	    }
	    return all;	    
	}
}

function checkClass(obj,classname){
	var str=obj.className;
	var arr=str.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==classname){
			return true;
		}
	}
	return false;
}
//像类名class="one two three" 之类的 
// 1.str.split(" ");分割，再一个个比较
// classNamestr   要验证的字符串
// classname      包含的字符串

// function checkClass(classNamestr,classname){
// 	var str=classNamestr.split(" ");
// 	for(var i=0;i<str.length;i++){
// 		if(str[i]==classname){
// 			return true;
// 		}
// 		return false;	
// 	}

// }



//operateText 操作 内容
// value  设置的文本(调用的时候加引号)
//value!=undefined 为了value="";
function operateText(obj,value){
	if(value!=undefined){
		if(obj.innerText){
			obj.innerText=value;
		}else{
			obj.textContent=value;
		} 
	}else{
		if(obj.innerText){
			obj.innerText;
		}else{
			obj.textContent;
		}
	}
}


// getStyle 获取指定对象的样式
// attr  要获取的样式
// obj   要获取属性的对象
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}



/*
$(val,obj)
val  要获取的元素
obj  要获取元素的范围
$(".one")   获取类名
$("#one")   获取id名
$("div")    获取标签
*/

function $(val,obj){
	if(typeof val=="string"){
	obj=obj||document;
	val=val.replace(/^\s*|\s*$/g,"");
	if(val.charAt(0)=="#"){
		return document.getElementById(val.slice(1));
	}else if(val.charAt(0)=="."){
		return getClass(val.slice(1),obj)
	}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(val)){
		return obj.getElementsByTagName(val)
	}
	}else if(typeof val=="function"){
		window.onload=function(){
			val();
		}
	}	
}


/*获取子节点
getChilds(obj,type)
obj   要获取的元素
type  要获取的节点类型
      true   只获取元素节点
      false  元素节点和文本节点
      （也可以是“no”和“yes” 这个传值的时候要加引号）
      && 与的优先级比||高 所以第二个条件比用加引号扩住

      注释掉的三元运算符有错误？？？
*/
function getChilds(obj,type){
	// type=type||true;
	// type=type?type:true;
	type=type===undefined?true:type;
	var kids=obj.childNodes;
	var arr=[];
	for(var i=0;i<kids.length;i++){
		if(type){
			if(kids[i].nodeType==1){
				arr.push(kids[i]);
			}			
		}else{
			if(kids[i].nodeType==1||(kids[i].nodeType==3&&kids[i].nodeValue.replace(/^\s*|\s*$/g,""))){
				arr.push(kids[i]);
			}
		}
	}
	return arr;
}

/*
getFirstChild
获得第一个孩子节点
*/
function getFirstChild(obj,type){
	// type=type||true;
	type=type===undefined?true:type;
	return getChilds(obj,type)[0];
}

/*
getLastChild
获得第一个孩子节点
*/
function getLastChild(obj,type){
	type=type===undefined?true:type;
	var kid=getChilds(obj,type)
	return kid[kid.length-1];
}

/*
获得任意一个孩子节点
randomChild
*/
function randomChild(obj,n,type){
	type=type===undefined?true:type;
	var kid=getChilds(obj,type);
	if(n>kid.length||n<1){
		return false;
	}
	return kid[n-1];
}



/*
getNext 
获得下一个兄弟节点

true  只获取元素节点
false 获取元素节点和非空文本节点
*/

function getNext(obj,type){
	type=type===undefined?true:type;
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}
	if(type){
		while(next.nodeType==3||next.nodeType==8){
			next=next.nextSibling;
			if(next==null){
		        return false;
	        }
		}
	}else{
		while(!(next.nodeType==1||next.nodeType==3&&next.nodeValue.replace(/^\s*|\s*$/g,""))){
			next=next.nextSibling;
			if(next==null){
		        return false;
	        }
		}
	}
	return next;
}



/*
insertBefore(newobj,obj)
要插入某个对象之前

newobj   要插入的对象
obj      插入到obj之前
*/
function insertBefore(newobj,obj){
	var parent=obj.parentNode;
	return parent.insertBefore(newobj,obj);
}

/*
insertAfter(newobj,obj)
要插入某个对象之后

newobj   要插入的对象
obj      插入到obj之后
*/
function insertAfter(newobj,obj){
	var parent=obj.parentNode;
	var next=getNext(obj,false);
	if(!next){
		return parent.appendChild(newobj);
	}else{
		return parent.insertBefore(newobj,next);
	}

}