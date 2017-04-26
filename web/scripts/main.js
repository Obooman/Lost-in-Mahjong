const logoPaths = document.querySelectorAll('.logo circle,.logo path');
const logo = document.querySelector('.logo');

logoPaths.forEach(function(path,index){
	const length = path.getTotalLength();

	path.style.strokeDasharray = length;
	path.style.strokeDashoffset = length;
	path.dataset.duration = '3s';
	path.dataset.length = length;
})


function strokePath(paths){
	paths.forEach(function(path,index){
		path.style.transition = path.dataset.duration;
		path.style.strokeDashoffset = 0;

		path.addEventListener('transitionend',function(){
			this.style.fill = getComputedStyle(this).stroke;

			if( index === 0 ){
				setTimeout(function(){
				},3000)
			}
		},false)
	})
}

function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}