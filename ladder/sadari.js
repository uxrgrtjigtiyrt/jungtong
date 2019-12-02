    var idNum = 0;
	var arra=[];
	var view = ["","ㅡ"];
	var num=0;
	window.onload=function(){
		var ok=document.getElementById("ok");
		
		var start=document.getElementById("start");
		
 
		ok.onclick=function(){
			inputName.style.visibility="visible";
			num=document.getElementById("num").value;
			var show="<table border id='input'>";
			show+="<tr><th>  </th><th>이름</th><th>항목</th></tr>"
			for(var i=0; i<num; i++){
				show+="<tr><td>"+(i+1)+"</td><td><input type='text' name='name'></td><td><input type='text' name='item'></td></tr>";
			}
			show+="</table>";
			document.getElementById("show").innerHTML=show;			
		}
 
		start.onclick=function(){
			inputName.style.visibility="hidden";
			result.style.visibility="visible";
			var name=document.getElementsByName("name");
			var item=document.getElementsByName("item");
			var show1="<h3>결과</h3><br>"
			show1+="<table width="+num*70+" height='500' id='output' >";
			show1+="<tr>";
			for(var i=0; i<num; i++){
				show1+="<td class='buttontd'><input id = "+idNum+" type='button' class='button' name='b_name' value="+name[i].value+"></td>";
				idNum++;
				if(i!=num-1){
					show1+="<td> </td>";
					idNum++;
				}
			}
			show1+="</tr>";
			for(var i=0; i<20; i++){
				show1+="<tr>";
				for(var j=0; j<num; j++){
					arra[j]=parseInt(Math.random()*2);
					show1+="<td class='sero'>|</td>";
					idNum++;
					if(j!=num-1){
						if(j!=0&&(arra[j-1]==1)){
							arra[j]=0;
                        }
                        if(view[arra[j]]==""){
                            show1+="<td class='blankgaro'>"+view[arra[j]]+"</td>";
                        }
                        else{
                            show1+="<td class='garo'>"+view[arra[j]]+"</td>";
                        }
					}
				}
				show1+="</tr>";
			}
			show1+="<tr>";
			for(var i=0; i<num; i++){
				show1+="<td>"+item[i].value+"</td>";
				if(i!=num-1){
					show1+="<td> </td>";
				}
			}
			show1+="</tr>";
			show1+="</table>";
			document.getElementById("shResult").innerHTML=show1;
			var b_name = document.getElementsByName("b_name");
			for(var i = 0; i <b_name.length; i++ ){
				b_name[i].onclick=chResult;
			}
		}
	}
	 
	function chResult(){
		var tr = document.getElementsByTagName("tr");
		var i = parseInt(num)+2;
		var j = parseInt(this.id);
		var inter = null;
		var finish=tr[i].childNodes[j].innerHTML;
	
		tr[i].childNodes[j].innerHTML="*";
		inter=setInterval(function(){
		
			
					
					if(tr[i].childNodes[j-1]&&tr[i].childNodes[j-1].innerHTML=="ㅡ"){
						j=j-2;
					}
					else if(tr[i].childNodes[j+1]&&tr[i].childNodes[j+1].innerHTML=="ㅡ"){
						j=j+2;
				
					}
				
						
				finish=tr[++i].childNodes[j].innerHTML;
				
			
			if(finish!="|" && finish!="ㅡ"){
				document.getElementById("resultnum").innerHTML=finish;
				clearInterval(inter);
            }
            else{
                tr[i].childNodes[j].innerHTML="*";
            }
		},100);
	}