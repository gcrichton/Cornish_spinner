function circleText(){
var labels = document.getElementsByClassName("mutation-label");
for(var i = 0; i < labels.length; i++){
console.log(i);
console.log('foo is ' + labels[i].textContent);
	circularText(labels[i].textContent, 50, i); //use i to alter curve when nearer center
}

}


function circularText(txt, radius, classIndex) {
  txt = txt.split(""),
    classIndex = document.getElementsByClassName("mutation-label")[classIndex];

  var deg = 360 / txt.length,
    origin = 250;

  txt.forEach((ea) => {
    ea = `<text height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 250%'>${ea}</text>`;
    classIndex.innerHTML += ea;
    origin += deg;
  });
}

