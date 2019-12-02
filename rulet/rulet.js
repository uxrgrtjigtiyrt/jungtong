const roullete = document.querySelector(".roullete");
const trigger = document.querySelector(".trigger");
trigger.addEventListener("click", onClickTrigger);
var lang=0;
var j=0;

function checkenter(){
  if (window.event.keyCode == 13) {    
     plus();
  }
  else if(window.event.keyCode==46){
    minus();
  }
}

function onClickTrigger(e) {
  var result=document.getElementsByClassName("result")[0];
  j++
  if(j%2==1){
    roullete.classList.add("loop");
    trigger.innerHTML="정지";
  }
  else{
    var rand=Math.floor(Math.random()*360);
    roullete.classList.remove("loop");
    roullete.style.transform='rotate(-'+rand+'deg)';
    trigger.innerHTML="뽑기";
    var a=roullete.style.transform.replace(/[^0-9]/g,"");
    tmp=360/lang;
    var t=0;
    for(i=tmp/2;i<=360;i+=tmp){
      if(t+1==lang){
        if(i%360<a||(i+tmp)%360>a){
          result.innerHTML=roullete.getElementsByClassName("content")[t].innerHTML;
        }
      }
      if(i%360<a&&(i+tmp)%360>a){
        result.innerHTML=roullete.getElementsByClassName("content")[t].innerHTML;
      }
      t++;
    }
  }
}


function plus(){
    var input=document.getElementsByClassName("input")[0];
    var value,stroke,tmp;
    for(i=0;i<lang;i++){
      value=roullete.getElementsByClassName("content")[i];
      tmp=360/(lang+1)*(i+1);
      value.style.transform='rotate('+tmp+'deg)';
    }
    lang++;
      value=document.createElement("div");
      value.setAttribute("class","content");
      value.innerHTML=input.value;
      tmp=360;
      value.style.transform='rotate('+tmp+'deg)';
      roullete.appendChild(value);
      tmp+=90;
      stroke=document.createElement("div");
      stroke.setAttribute("class","line");
      roullete.appendChild(stroke);

      for(i=0;i<lang;i++){
        tmp=360/(lang)*(i+1)+90+360/lang/2;
        stroke=roullete.getElementsByClassName("line")[i];
        stroke.style.transform='rotate('+tmp+'deg)';
        if(lang==1){
          stroke.style.opacity="0";
        }
        else{
          stroke.style.opacity="1";
        }
      }
      input.value="";
      input.focus();
}
function minus(){
    var input=document.getElementsByClassName("input")[0];
    var value,stroke,tmp;
    var lastvalue=document.getElementsByClassName("content")[lang-1];
    var laststroke=document.getElementsByClassName("line")[lang-1];
    roullete.removeChild(lastvalue);
    roullete.removeChild(laststroke);
    for(i=0;i<lang-1;i++){
      value=roullete.getElementsByClassName("content")[i];
      tmp=360/(lang-1)*(i+1);
      value.style.transform='rotate('+tmp+'deg)';
    }
    lang--;
    for(i=0;i<lang;i++){
      tmp=360/(lang)*(i+1)+90+360/lang/2;
        stroke=roullete.getElementsByClassName("line")[i];
        stroke.style.transform='rotate('+tmp+'deg)';
        if(lang==1){
          stroke.style.opacity="0";
        }
        else{
          stroke.style.opacity="1";
        }
    }
    input.focus();
}
