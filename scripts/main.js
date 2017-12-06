window.onerror = function(ev){alert(ev)};

FastClick.attach(document.body);

var logo 		= $('.logo');
var logoPaths 	= $('.logo circle,.logo path');
var aMj 		= $('.mahjong');
var modal 		= $('.modal');
var inner 		= $('.modal > .inner');
var closeModal 	= $('.modal-close');

var loadingCircle = $('.loading');

var audios = {
	loading : new Audio('assets/buzi.mp3'),
	stroke 	: new Audio('assets/loading.mp3'),
	chicken : new Audio('assets/chicken.wav'),
	crack : new Audio('assets/crack.wav'),
	money 	: new Audio('assets/money.mp3')
}

logoPaths.forEach(function(path,index){
	const length = path.getTotalLength ? path.getTotalLength() : 1000;

	path.style.strokeDasharray = length;
	path.style.strokeDashoffset = length;
	path.dataset.duration = '1.5s';
	path.dataset.length = length;
})

function strokePath(paths,cb){
	paths.forEach(function(path,index){
		path.style.transition = path.dataset.duration;
		path.style.strokeDashoffset = 0;

		path.addEventListener('transitionend',function(){
			this.style.fill = getComputedStyle(this).stroke;

			if( index === 0 ){
				setTimeout(function(){
					cb && cb();
				},1500)
			}
		},false)
	})
}

function loadStatics(staticArray){
	staticArray.forEach(function(imagePath){
		var image = new Image();
		image.src = imagePath;
	})
}

setTimeout(function(){
	audios.stroke.play();

	strokePath(logoPaths,() => {
		logo.classList.add('loaded-logo');
		loadingCircle.classList.add('animated','bounceOutDown');

		setTimeout(function(){
			aMj.forEach(function(oMj){
				oMj.style.display = 'block';
				oMj.classList.add('animated','fadeIn');
			})
		},600)
	});
},1000)

requestAnimationFrame(animationHub)

function animationHub(){
	var rotate = loadingCircle.dataset.rotate || 0;

	loadingCircle.style.transform = 'rotate('+rotate+'deg)'

	loadingCircle.dataset.rotate = rotate - -3;

	if( !loadingCircle.classList.contains('animated') ){
		requestAnimationFrame(animationHub)
	}
}

aMj.forEach(function(oMj){
	oMj.onclick = function(){
		inner.remove();
		inner = document.createElement('div');
		inner.classList.add('inner');

		var title = $('.modal-title');

		if( title.remove ) title.remove();

		if( audios[this.dataset.kind] ){
			 audios[this.dataset.kind].play();
		} else {
			audios.crack.play();
		}

		var obj = this.cloneNode();

		obj.innerHTML = this.innerHTML;
		obj.classList.add('modal-title');
		obj.style.border = 'none';

		modal.insertBefore(inner,closeModal);
		modal.insertBefore(obj,inner);

		modal.style.top = 0;
		modal.style.borderRadius = 0;

		makeSlide(this.dataset.kind);
	}
})

closeModal.onclick = function(){
	modal.style.top = '100%';
	modal.style.borderRadius = "500px";
}

function makeSlide(kind){
	var oContent = document.createElement('div');
	oContent.classList.add('slide');

	inner.appendChild(oContent);

	for( var i = 0; i< 8; i++ ){
		var oD = document.createElement('div');
		var oImage = new Image();
		oImage.src = 'assets/'+kind+'-'+i+'.png'
		oD.classList.add('mahjong-card');

		oD.appendChild(oImage);
		oContent.appendChild(oD);
	}
}