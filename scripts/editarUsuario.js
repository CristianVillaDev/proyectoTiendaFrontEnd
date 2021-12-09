
$(document).ready(function(){
	console.log('Funcionando');
	
	var data=0;
	autenticacion();
	
	function autenticacion(){
		data = sessionStorage.getItem('usuario');
		
		if(data === null){
			window.location="index.html";
		}
		
		//Si es administrador no puede acceder a editar el usuario con sesión activa
		if(data == 1){
			window.location="principal.html";
		}
		
		$("#cedula").val(data);
		listadoDatos();
	}
	
	$("#session").on("click",function(){
		sessionStorage.removeItem('usuario');
		sessionStorage.removeItem('ciudad');
		autenticacion();
	});
	
	if(data !=1){
		

	}else{
		
		//Administrador - no puede a 
		var btn = $("#editar");
		btn.css("display","none");
		
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

		$.ajax({
	            type: "PUT",
	            url: "http://52.14.249.159:8080/microservicioProductos/usuarios/actualizar/"+data,
	            async: false,
	            data: JSON.stringify({ cedulaUsuario: $("#cedula").val(), emailUsuario: $("#email").val(),nombreUsuario:$("#nombre").val(),password: $("#clave").val(), usuario: $("#usuario").val()}),
	            contentType: "application/json",
	            success: function (data) {
		

					if(data === true){
						
						$("#mensaje").html("Usuario Actualizado");
						
						setTimeout(function(){
							window.location = "principal.html";
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
	
	$("#cancelarOP").on("click",function(){
		window.location="principal.html";
	});
	
	function listadoDatos(){
		var getUrl = window.location;
		//var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
		var baseUrl = getUrl.protocol + "//"+getUrl.host;
		
		 $.ajax({
			type:"GET",
			url: "http://52.14.249.159:8080/microservicioProductos/usuarios/listar/"+data,
			success: function(response){
				
				console.log(response);
				
				const usuario = response[0];
				
				console.log(usuario);
				$("#cedula").val(usuario.cedulaUsuario);
			 	$("#email").val(usuario.emailUsuario);
			  	$("#nombre").val(usuario.nombreUsuario);
			 	$("#clave").val(usuario.password);
			 	$("#usuario").val(usuario.usuario);
			}
		});
	}

});