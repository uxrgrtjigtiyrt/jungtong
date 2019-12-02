var horizontal = document.getElementById("rows");
var Vertical = document.getElementById("cols");
var area = document.getElementById("area");
var SetCloseBtn = document.getElementById("setting_close_button");
var SetSetBtn = document.getElementById("setting_setting_button");
var SetEnable = document.getElementById("setting_enable");
var SetId = document.getElementById("setting_deskID");
var SetName = document.getElementById("setting_name");
var setting = document.getElementById("setting");
var random = document.getElementById("random");

var rows = 0;
var cols = 0;
var buttons = [];

SetCloseBtn.onclick = function(){
  setting.style.display = "none";
}

horizontal.oninput = function(){
  if(isNaN(this.value)){
    this.value = this.value.slice(0,-1);
  }else{
    rows = parseInt(this.value);
  }
  generate();
}

Vertical.oninput = function(){
  if(isNaN(this.value)){
    this.value = this.value.slice(0,-1);
  }else{
    cols = parseInt(this.value);
  }
  generate();
}

SetSetBtn.onclick = function(){
  var id = parseInt(SetId.value)-1;
  if(SetName.value != ""){
    buttons[id].name = SetName.value;
    buttons[id].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(id+1)+'</span>';
    buttons[id].innerHTML += '<span style="color:black; font-size:15px;">'+SetName.value+'</span>';
  }else{
    buttons[id].name = "";
    buttons[id].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(id+1)+'</span>';
    buttons[id].innerHTML += '<span style="color:black; font-size:15px;">이름 입력</span>';
  }
  buttons[id].using = SetEnable.checked;
  if(!buttons[id].using){
    buttons[id].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(id+1)+'</span>';
    buttons[id].innerHTML += '<span style="color:red; font-size:15px;">사용 안함</span>';
  }
  setting.style.display = "";
}

random.onclick=function(){
  var Mix = [];
  var j=0;
  for(var i=0;i<buttons.length;i++){
    if(buttons[i].using){
      Mix[j] = buttons[i].name;
      j += 1;
    }
  }

  var using = [];
  for(var i=0;i<buttons.length;i++){
    using[i] = buttons[i].using;
  }
  Mix = Mix.sort(function(){return 0.5-Math.random()});

  var buttonsHTML = '';
  var c=0;
  for(var i=0;i<cols;i++){
    buttonsHTML += '<div>';
    for(var j=0;j<rows;j++){
      buttonsHTML += '<button class="desk" id="'+String(c)+'">' + '</button>';
      c += 1;
    }
  }
  area.innerHTML = buttonsHTML;

  buttons = [];
  var j=0;
  for(var i=0;i<cols*rows;i++){
    buttons[i] = document.getElementById(String(i));
    buttons[i].onclick = function(){
      setting.style.display = "block";
      SetEnable.checked = this.using;
      SetId.value = 1+this.id*1;
      SetName.value = this.name;
    }

    buttons[i].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px"font-size:15px;>'+String(i+1)+'</span>';
    buttons[i].using = using[i];
    if(buttons[i].using){
      buttons[i].name = Mix[j];
      if(buttons[i].name == ""){
        buttons[i].innerHTML += '<span style="color:black"font-size:15px;>이름 입력</span>';
      }else{
        buttons[i].innerHTML +=  '<span style="color:black; font-size:15px;">'+buttons[i].name+'</span>';
      }
      j+=1;
    }else{
      buttons[i].name = "";
      buttons[i].innerHTML += '<span style="color:red"font-size:15px;>사용 안함</span>';
    }
  }
}

function generate(){
  if(cols != 0 && rows != 0){
    var buttonsHTML = '';
    for(var i=0;i<cols;i++){
      buttonsHTML += '<div>';
      for(var j=0;j<rows;j++){
        buttonsHTML += '<button class="desk" id="'+String(i*rows+j)+'">' + '</button>'
      }
      buttonsHTML += '</div>';
    }
    area.innerHTML = buttonsHTML;


    buttons = [];
    for(var i=0;i<cols*rows;i++){
      buttons[i] = document.getElementById(String(i));
      buttons[i].onclick = function(){
        setting.style.display = "block";
        SetEnable.checked = this.using;
        SetId.value = 1+this.id*1;
        SetName.value = this.name;
      }
      buttons[i].name = i+1;
      buttons[i].innerHTML = '<span style="font-size:0.5em;position:absolute;left:0px;top:0px">'+String(i+1)+'</span>';
      buttons[i].innerHTML += '<span style="color:black;font-size:15px;">'+buttons[i].name+'</span>';
      buttons[i].using = true;
    }
    random.style.display = "block"
  }
}