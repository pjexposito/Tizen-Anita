function descarga(){
	
	var img = new Image();
	img.src = "http://80.173.198.8:8888/webcam/?action=snapshot";
	document.getElementById("largeImage").src=img.src;


	var titulo = document.querySelector('#titulo');
	var datos = document.querySelector('#datos');
	var API="7DA19991D11848EBBBE1156E9E342F8F";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://80.173.198.8:8888/api/job", true);
    xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.setRequestHeader("X-Api-Key", API);

	xhttp.onreadystatechange = function () { //Call a function when the state changes.
	    if (xhttp.readyState === 4 && xhttp.status === 200) {
	        var respuesta = JSON.parse(xhttp.responseText);
			var progreso = parseFloat(respuesta.progress.completion).toFixed(2)+"%";
			var date = new Date(null);
			date.setSeconds(respuesta.progress.printTimeLeft);
			var restante = date.toISOString().substr(11, 8);
			var nombre = respuesta.job.file.name.slice(0,-6);
			titulo.innerHTML = nombre;
			datos.innerHTML= restante+" restante<br>"+progreso;
			console.log(progreso);
			console.log(restante);
			console.log(nombre);
	    }
	};
    xhttp.send();
	
}
window.onload = function () {
    // TODO:: Do your initialization job
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName === "back") {
			try {
			    tizen.application.getCurrentApplication().exit();
			} catch (ignore) {
			}
		}
	});

    // Sample code
    var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", function(){
    	descarga();
    });
 descarga();   
};
