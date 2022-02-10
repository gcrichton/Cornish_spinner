var amtPerSec = 3075.64;


const mutation = ["         Unmutated", "              Soft", "         Breathed", "            Hard", "         Mixed", "Mixed after 'th'"];
const letters = ["B", "Ch", "D", "G (a, e, i, y)", "G (l, r)", "Gw", "G (o, u, ro, ru)", "K", "M", "P", "T"];  
const mutations = [
['B','V','','P','F','V'],
['Ch','J','','','',''],
['D','Dh','','T','T','T'],
['Ga','-','','K','H','H'],
['Gl','-','','K','',''],
['Gw','W','','Kw','Hw','W'],
['Go','W','','K','Hw','W'],
['K','G','H','','',''],
['M','V','','','F','V'],
['P','B','F','','',''],
['T','D','Th','','','']

]; //two dimensional array


var margin = {
	top: 50,
	right: 40,
	bottom: 40,
	left: 40
}

var radians = 0.0174532925;

var r = 200;
var unmutateR = r;
var mR = r + 16;
var softR = r - 15;
var breathedR = r - 60;
var hardR = r - 75;
var mixedR = r - 105;
var mixedafterR = r - 135;

var unmutatedHandLength = r + 10; //FIX - length changes on drag

var w = d3.select('figure').node().clientWidth - margin.left - margin.right;
var h = d3.select('figure').node().clientHeight - margin.top - margin.bottom;

var unmutatedScale = unmutatedScale = d3.scale.linear()
	.range([0,354])
	.domain([0,59]);

var mutationScale = d3.scale.linear()
	.range([32,110])
	.domain([0,18]);


var softScale = d3.scale.linear()
	.range([0,395])
	.domain([0,18.7]);

var breathedScale = d3.scale.linear()
	.range([0,395])
	.domain([0,18.45]);


/////
var hardScale = d3.scale.linear()
	.range([0,250])
	.domain([0,12]);

var mixedScale = d3.scale.linear()
	.range([0,250])
	.domain([0,12]);

var mixedafterScale = d3.scale.linear()
	.range([0,250])
	.domain([0,12]);


var drag = d3.behavior.drag()
	.on('dragstart', dragstart)
	.on('drag', drag)
	.on('dragend', dragend);

var lineData = [
		{
		type:'unmutated',
		value:0,
		length:-unmutatedHandLength, //////////////
		scale:mixedScale
	}
];

/*function updateData(){
	var t = new Date();
	lineData[0].value = (t.getHours() % 12) + t.getMinutes()/60 ;
	lineData[1].value = t.getMinutes();
	lineData[2].value = t.getSeconds();
}



updateData();
*/

	lineData[0].value = 1.97; //start on B //new - 'snap' to letters on move/drag

var svg = d3.select('svg')
	.attr('width', w + margin.left + margin.right)
	.attr('height', h + margin.top + margin.bottom);

var g = svg.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var face = g.append('g')
	.attr('transform', 'translate(' + r + ',' + r + ')');

face.append('circle')
	.attr({
		class: 'outline',
		r: r,
		cx: 0,
		cy: 0,
		fill: '#a0a0a0'
	});

//gc

face.append('circle')
	.attr({
		class: 'outline',
		r: r-30,
		cx: 0,
		cy: 0,
		fill: '#a0a0a0'
	});

face.append('circle')
	.attr({
		class: 'outline',
		r: r-60,
		cx: 0,
		cy: 0,
		fill: '#a0a0a0'
	});

face.append('circle')
	.attr({
		class: 'outline',
		r: r-90,
		cx: 0,
		cy: 0,
		fill: '#a0a0a0'
	});

face.append('circle')
	.attr({
		class: 'outline',
		r: r-120,
		cx: 0,
		cy: 0,
		fill: '#a0a0a0'
	});

face.append('circle')
	.attr({
		class: 'outline',
		r: r-150,
		cx: 0,
		cy: 0,
		fill: '#a0a0a0'
	});



function getLetter(d){

switch(d){


//case 55:
//return 'Unmutated'
//break;
//case 60:
//return letters[0];
//break;
case 3.5:
return letters[0];
break;
case 7:
return letters[1];
break;

case 10.5:
return letters[2];
break;
case 14:
return letters[3];
break;
case 17.5:
return letters[4];
break;
case 21:
return letters[5];
break;
case 24.5:
return letters[6];
break; 

case 28:
return letters[7];
break;
case 31.5:
return letters[8];
break;

case 35:
return letters[9];
break;

case 38.5:
return letters[10];
break;


case 50:
//var b = letters[3 + ''].split('~');
//var r = b.join("<brt />");
//return r;
//return letters[10];
//break;




default:
return '';// d;
}
}

function getMutation(d){

switch(d){
case 56:
return mutation[0];
break;
case 54:
return mutation[1];
break;
case 52:
return mutation[2];
break;
case 50:
return mutation[3];
break;
case 48:
return mutation[4];
break;
case 46:
return mutation[5];
break;

default:
return '';
}
}

/* FIX - curved text labels
//mutation-label
face.selectAll('unmutated-label')
	.data(d3.range(0,65,3.5)) 
.enter().append('text')
	.classed('unmutated-label', true)
	.text(function(d) {return 'foo' }) //
	.attr({
		'text-anchor': 'left',
		x: function(d) {
			return mR * Math.sin(unmutatedScale(d) * radians);
		},
		y: function(d) {
			return -mR * Math.cos(unmutatedScale(d) * radians) + 8;
		},
		fill: 'yellow',
		'transform-origin':  '10 250%',
		'transform:rotate': '-50'
	});

*/


face.selectAll('unmutated-label')
	.data(d3.range(0,65,3.5)) //was 5 for increments 
//.enter().append(getLetter)
.enter().append('text')
	.classed('unmutated-label', true)
	.text(function(d) {return /*d;*/ getLetter(d); }) //r
	.attr({
		'text-anchor': 'left',
		x: function(d) {
//console.log('foo3 ' +  mR * Math.sin(unmutatedScale(d) * radians));
			return mR * Math.sin(unmutatedScale(d) * radians);
		},
		y: function(d) {
			return -mR * Math.cos(unmutatedScale(d) * radians) + 8;
		},
		fill: 'white',
			onclick : "mClick(this)",

/*,
		'font-weight': 'bold',
                'stroke-width': '2'*/
	});

//gc



face.selectAll('mutation-label')
	.data(d3.range(46,58,2))
//.enter().append(getLetter)
.enter().append('text')
	.classed('mutation-label', true)
	.text(function(d) {return getMutation(d); }) //
	.attr({
		'text-anchor': 'left',
		x: function(d) {
			return mR * Math.sin(mutationScale(d) * radians) + 10;
		},
		y: function(d) {
			return -mR * Math.cos(mutationScale(d) * radians) - 185;
		},
		fill: 'yellow'
	});



//gc


/*
face.selectAll('.hour')
	.data(d3.range(0, 12))
.enter().append('line')
	.attr({
		class: 'hour',
		x1: 0,
		x2: 0,
		y1: r,
		y2: r - 20,
		transform: function(d) {
			return 'rotate(' + hourScale(d) + ')';
		}
	});
*/
//

face.selectAll('soft-label')
	.data(d3.range(1, 12, 1))
.enter().append('text')
	.text(function(d) { return mutations[d-1][1]; })
	.attr({
		class: 'soft-label',
		'text-anchor': 'middle',
		x: function(d) {
			return softR * Math.sin(softScale(d) * radians);
		},
		y: function(d) {
			return -softR * Math.cos(softScale(d) * radians) + 7;
		},
		fill: '#0D47A1',
		'font-size': 20
	});


face.selectAll('breathed-label')
	.data(d3.range(1, 12, 1))
.enter().append('text')
	.text(function(d) { return mutations[d-1][2]; })
	.attr({
		class: 'breathed-label',
		'text-anchor': 'middle',
		x: function(d) {
			return breathedR * Math.sin(breathedScale(d) * radians);
		},
		y: function(d) {
			return -breathedR * Math.cos(breathedScale(d) * radians) + 24;
		},
		fill: '#1565C0',
		'font-size': 20
	});


face.selectAll('hard-label')
	.data(d3.range(1, 12, 1))
.enter().append('text')
	.text(function(d) { return mutations[d-1][3]; })
	.attr({
		class: 'hard-label',
		'text-anchor': 'middle',
		x: function(d) {
			return hardR * Math.sin(hardScale(d) * radians);
		},
		y: function(d) {
			return -hardR * Math.cos(hardScale(d) * radians) + 9;
		},
		fill: '#2962FF',
		'font-size': 20
	});

face.selectAll('mixed-label')
	.data(d3.range(1, 12, 1))
.enter().append('text')
	.text(function(d) { return mutations[d-1][4]; })
	.attr({
		class: 'mixed-label',
		'text-anchor': 'middle',
		x: function(d) {
			return mixedR * Math.sin(mixedScale(d) * radians);
		},
		y: function(d) {
			return -mixedR * Math.cos(mixedScale(d) * radians) + 9;
		},
		fill: '#2979FF',
		'font-size': 20
	});

face.selectAll('mixedafter-label')
	.data(d3.range(1, 12, 1))
.enter().append('text')
	.text(function(d) { return mutations[d-1][5]; })
	.attr({
		class: 'mixedafter-label',
		'text-anchor': 'middle',
		x: function(d) {
			return mixedafterR * Math.sin(mixedafterScale(d) * radians);
		},
		y: function(d) {
			return -mixedafterR * Math.cos(mixedafterScale(d) * radians) + 9;
		},
		fill: '#2962FF',
		'font-size': 20
	});




var lines = face.append('g');

lines.selectAll('line')
	.data(lineData)
.enter().append('line')
	.attr({
		class: function(d) { return d.type + '-line'; },
		x1: 0,
		y1: 0,
		x2: function(d) {
			return d.length * Math.cos(d.value);
		},
		y2: function(d) {
			return d.length * Math.sin(d.value);
		},
		id: 'unmutated-line'
		})
	.call(drag);

// small circle in middle
face.append('circle')
	.attr({
		cx: 0,
		cy: 0,
		r: 20,
		fill: 'white',
		'stroke': '#374140',
		'stroke-width': 3
	});

function dragstart() {
}

function drag() { //FIX length + 10
	
	var rad = Math.atan2(d3.event.y, d3.event.x);
	
	d3.select(this)
		.attr({
			x2: function(d) {
				return r * Math.cos(rad);
			},
			y2: function(d) {
				return r * Math.sin(rad);
			}
		});
}

function dragend() {
}


function mClick(x){
//set line to location of text element that was clicked
//set x,y of unmutated-line
var uh = document.getElementById('unmutated-line');
uh.setAttribute("x2",  x.getAttribute("x"));
uh.setAttribute("y2",  x.getAttribute("y"));

}



/*
function circleText(){

}*/
