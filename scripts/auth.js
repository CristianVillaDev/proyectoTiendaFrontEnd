$(document).ready(function(){
	console.log("JQuery funcionando");
	
	var data = sessionStorage.getItem('usuario');

	if(data != null){
		window.location="principal.html";
		alert("ya estas logueado");
	}
	
	$("#formulario").submit(e => {
		e.preventDefault();
		
	 	var getUrl = window.location;
		//var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
		var baseUrl = getUrl.protocol + "//"+getUrl.host;
		
		var ciudad ="";
		
		if($("#ciudad").val() == 1){
			ciudad = "Bogotá";
		}else if($("#ciudad").val() ==2){
			ciduad= "Medellin";
		}else if($("#ciudad").val() ==3){
			ciudad="Cali";
		}
		
		$.ajax({
			type:"POST",
			async: false,
			data: JSON.stringify({usuario:$("#usuario").val(), password:$("#password").val()}),
			url: "http://52.14.249.159:8080/microservicioProductos/usuarios/auth",
			contentType: "application/json",
			success: function(response){
				
				if(response===1){
					$("#mensaje").html("Ingreso al sistema Admin");
						
					setTimeout(function(){
						window.location="principal.html";
					},1500);
				}
				
				if(response != 0){
					console.log("Ingreso al sistema");
					setTimeout(function(){
						window.location="principal.html";
					},1500);
				}
				
				if(response != 0){
					
					let cedula_usuario = response;
					sessionStorage.setItem('usuario', cedula_usuario);
					sessionStorage.setItem('ciudad', ciudad);
					
					window.location="principal.html";
					
				}else{
					
					$("#mensaje").html("Usuario o contraseña incorrectos!");
					
				}
				
			}
		});
	});
});
