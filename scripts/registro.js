
$(document).ready(function(){
	console.log('Funcionando');
	
	var data = sessionStorage.getItem('usuario');

	if(data != null){
		window.location="principal.html";
		alert("ya estas logueado");
	}

	$("#formulario").submit(e =>{
		e.preventDefault();
		
		const datos ={
			cedulaUsuario: $("#cedula").val(),
		 	emailUsuario: $("#email").val(),
		  	nombreUsuario: $("#nombre").val(),
		 	password: $("#clave").val(),
		 	usuario: $("#usuario").val()
		};
		
		const cedula =  $("#cedula").val();
		
		var getUrl = window.location;
		//var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
		var baseUrl = getUrl.protocol + "//"+getUrl.host;
		console.log(baseUrl);

		$.ajax({
	            type: "POST",
	            url:"http://52.14.249.159:8080/microservicioProductos/usuarios/guardar",
	            async: false,
	            data: JSON.stringify({ cedulaUsuario: $("#cedula").val(), emailUsuario: $("#email").val(),nombreUsuario:$("#nombre").val(),password: $("#clave").val(), usuario: $("#usuario").val()}),
	            contentType: "application/json",
	            complete: function (data) {
		
					console.log(data.responseJSON);
					
					if(data.responseJSON){
						
						$("#mensaje").html("Usuario Registrado");
						
						setTimeout(function(){
							window.location="index.html";
						},1500);
						
					}else{
						
						$("#mensaje").html("Error, valide la información");
						
					}
				},
				error : function(xhr, status) {
       			 	$("#mensaje").html("Error, valide sus credenciales: "+status);
    			}
	    });
	});

});