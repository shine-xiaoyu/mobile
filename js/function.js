/*
ie 使用classname的兼容性
 getClass(classname)  获取指定类名的元素
 classname  指定要获取的元素的classname

思路：
 1.判断浏览器
   document.getElementsByClassname
   不加括号 是一个属性
 range  指定一个范围,具体的dom对象
 2.获取所有元素

 3.元素的类名是否等于指定的类名
 4.符合条件储存到数组
 5.返回数组
*/

function getclass(classname,range){
	// range=range||document;
	// range=range?range:document;
	range=range===undefined?document:range;
	if(document.getElementsByClassName){
		return range.getElementsByClassName(classname);
	}else{
		var arr=[];
		var all=range.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			//当前元素的className是否包含指定的classname
			// if(check(all[i].className,classname)){
			// 	arr.push(all[i]);
			// }
			if(all[i].className==classname){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
// checkclass(clsaaNamestr,classname)

function checkclass(clsaaNamestr,classname){
	var arr=className.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]===classname){
			return true;
		}
	}
	return false;
}


/*
$(selecter,range) 获取元素
$(".one") 
$("#one") 
$("div") 

1.初始化参数range
selecter  去空
2.判断他的第一个字符
3.获取元素
*/

function $(selecter,range){
	range=range||document;
	if(selecter.charAt(0)=="."){
		return getclass(selecter.substring(1),range)
	}else if(selecter.charAt(0)=="#"){
		return range.getElementById(selecter.substring(1))
	}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selecter)){
		// 正则里不要有空格等无关符号
		return range.getElementsByTagName(selecter)
	}
}


/*
getContent(obj,value)
   获取或者设置obj的文本
   obj 指定对象
   value 设置的文本
1.判断是 获取，设置
   参数的个数
   value
2.获取
   判断浏览器是否支持属性
   return obj.innerText
   return obj.textContent
3.设置
   判断浏览器是否支持属性
   obj.innerText=value
   obj.textContent=value  
*/

function getContent(obj,value){
	if(value){
		if(obj.innerText){
			obj.innerText=value
		}else{
			obj.textContent=value
		}
	}else{
		if(obj.innerText){
			return obj.innerText   
		}else{
			return obj.textContent
		}
	}
}



//获取指定元素的样式
// getstyle(obj,attr)
// obj 
// attr 样式属性
// 1.判断浏览器属性
// 2.返回属性值

function getStyle(obj,attr){
	if(window.getComputedStyle){
		return getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr]
	}
}


/*
getChild(obj,type)
obj
type 子元素节点的类型
    true
    false   
1.获取所有子元素
2.节点类型

(/^\s*|)
*/
function getChilds(obj){
	var childs=obj.childNodes;
	var arr=[];

	for(var i=0;i<childs.length;i++){
		if(childs[i]==1){
			arr.push(childs[i]);
		}
		return arr;
	}
}