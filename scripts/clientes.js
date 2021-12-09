$(document).ready(function(){
	
	console.log('Funcionando clientes');
	
	var data=0;
	
	//Cuando carga la pagina ejecuta el metodo que valida si esta autenticado
	autenticacion();
	
	function autenticacion(){
		data = sessionStorage.getItem('usuario');
		
		if(data === null){
			window.location="index.html";
		}
		
		if(data!=1){
			window.location="principal.html";
		}
	}
	
	$("#session").on("click",function(){
		sessionStorage.removeItem('usuario');
		sessionStorage.removeItem('ciudad');
		autenticacion();
	});
	
	$("#editar").on("click",function(){
		window.location ="editarUsuario.html";
	});
	
		if(data !=1){
		
		//Usuario - no puede acceder a productos, clientes y proveedores
		var btn = $("#accesoProductos");
		btn.css("display","none");
		
		var btn2 = $("#accesoClientes");
		btn2.css("display","none");
		
		var btn3 = $("#accesoProveedores");
		btn3.css("display","none");
		
		var btn4 = $("#accesoUsuarios");
		btn4.css("display","none");
		
	}else{
		
		//Administrador - no puede a 
		var btn = $("#editar");
		btn.css("display","none");
		
	}

	listado();
	
	let flag = false;
	
	var btnCancelar = $("#cancelarOP");
	btnCancelar.css("display","none");
		
	$("#formulario").submit(e =>{
		e.preventDefault();
		
		const datos ={
			cedulaCliente: $("#cedula").val(),
		 	direccionCliente: $("#direccion").val(),
		  	emailCliente: $("#email").val(),
		 	nombreCliente: $("#nombre").val(),
		 	telefonoCliente: $("#telefono").val()
		};
		
		const cedula =  $("#cedula").val();
		
		let url = '';
		let type= '';
		let mensaje ='';
		var getUrl = window.location;
		var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
		
		if(flag){
			url = "http://52.14.249.159:8080/microservicioClientes/clientes/actualizar/"+cedula;
			type= "PUT";
			mensaje="Datos del Usuario Actualizados";	
		}else{
			url = "http://52.14.249.159:8080/microservicioClientes/clientes/guardar";
			type= "POST";
			mensaje="Usuario Creado";
		}
		
		$.ajax({
	            type: type,
	            url: url,
	            async: false,
	            data: JSON.stringify({ cedulaCliente: $("#cedula").val(),direccionCliente: $("#direccion").val(),emailCliente: $("#email").val(),nombreCliente: $("#nombre").val(),	telefonoCliente: $("#telefono").val()}),
	            contentType: "application/json",
	            complete: function (data) {
 
				 	listado();
				
					limpiadoCampos();	
					
					flag = false;
					
					alert(mensaje);
					
					var btnCancelar = $("#cancelarOP");
					btnCancelar.css("display","none");
					
					$("#botton").text("Crear");

					$("#cedula").removeAttr('disabled');
	       		 }
	    });
	});

	function limpiadoCampos(){
			  $("#cedula").val("");
		 	  $("#direccion").val("");
		  	  $("#email").val("");
		 	  $("#nombre").val("");
		 	  $("#telefono").val("");
	}
	
	function listado(){
		var getUrl = window.location;
		var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
		console.log("listar");
	   $.ajax({
	        type: "GET",
	        url: "http://52.14.249.159:8080/microservicioClientes/clientes/listar",  
	        success: function(data) {
				const clientes = data;
				console.log(clientes);
				let template='';
				clientes.forEach(cliente => {
					template += `
						<tr>
							<td style="font-size: 13px">${cliente.cedulaCliente}</td>
							<td style="font-size: 13px">${cliente.direccionCliente}</td>
							<td style="font-size: 13px">${cliente.emailCliente}</td>
							<td style="font-size: 13px">${cliente.nombreCliente}</td>
							<td style="font-size: 13px">${cliente.telefonoCliente}</td>
							<td style="font-size: 13px" ><button id="${cliente.cedulaCliente}"   type="button" class="btn btn-info ver p-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver</button></td>
							<td style="font-size: 13px" ><button id="${cliente.cedulaCliente}"   type="button" class="btn btn-info modificar p-1">Modificar</button></td>
							<td style="font-size: 13px" ><button id="${cliente.cedulaCliente}"   type="button" class="btn btn-danger borrar p-1" >Eliminar</button></td>
						</tr>
					`
				});
				$('#cuerpoTabla').html(template);
	         }
	      });
	}

	$(document).on('click','.borrar',(response)=> {
		const cedula_p = $(this)[0].activeElement;
		const cedula = $(cedula_p).attr('id');
		var getUrl = window.location;
		var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
 		$.ajax({
			type:"DELETE",
			url: "http://52.14.249.159:8080/microservicioClientes/clientes/eliminar/"+cedula,
			success: function(response){
				listado();
				alert("Datos del Cliente Borrados");
			}
		});
	});
	
	$(document).on('click','.modificar',(response)=> {
			const cedula = $(this)[0].activeElement;
			const cedula_cliente = $(cedula).attr('id');
			
			var getUrl = window.location;
			var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
			
			$("#botton").text("Modificar");

			var btnCancelar = $("#cancelarOP");
			btnCancelar.css("display","block");
			
			$("#cedula").attr('disabled',true);
	 	
		 $.ajax({
			type:"GET",
			url: "http://52.14.249.159:8080/microservicioClientes/clientes/listar/"+cedula_cliente,																																																		
			success: function(response){
				
				const cliente = response[0];
				
				$("#cedula").val(cliente.cedulaCliente);
			 	$("#direccion").val(cliente.direccionCliente);
			  	$("#email").val(cliente.emailCliente);
			 	$("#nombre").val(cliente.nombreCliente);
			 	$("#telefono").val(cliente.telefonoCliente);
			
				flag = true;
			}
		});
		
	});
	
	$(document).on('click','.cancelar',(response)=> {	
		
		limpiadoCampos();
		
		flag = false;
		
		$("#botton").text("Crear");

		var btnCancelar = $("#cancelarOP");
		btnCancelar.css("display","none");
		
		$("#cedula").removeAttr('disabled');
	});
	
	$(document).on('click','.ver',(response)=> {
		const cedula = $(this)[0].activeElement;
		const cedula_usuario = $(cedula).attr('id');
			
		var getUrl = window.location;
		var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
			 	
		 $.ajax({
			type:"GET",
			url: "http://52.14.249.159:8080/microservicioClientes/clientes/listar/"+cedula_usuario,
			success: function(response){
				 
				const cliente = response[0];
				console.log(cliente);
				$("#cedula_modal").html(cliente.cedulaCliente);
			 	$("#email_modal").html(cliente.emailCliente);
			  	$("#nombre_modal").html(cliente.nombreCliente);
			 	$("#telefono_modal").html(cliente.telefonoCliente);
			 	$("#direccion_modal").html(cliente.direccionCliente);
				
			}
		});
	});
	
	$("#cerrar").on("click",(response)=>{
		limpiadoCamposModal();
	});
	
	function limpiadoCamposModal(){
		       $("#cedula_modal").html("");
			 	$("#email_modal").html("");
			  	$("#nombre_modal").html("");
			 	$("#telefono_modal").html("");
			 	$("#direccion_modal").html("");
	}
	
});