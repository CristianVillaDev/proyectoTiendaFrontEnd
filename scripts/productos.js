
$(document).ready(function(){
	console.log('Funcionando Jquery');
	
	var data=0;
	autenticacion();
	
	function autenticacion(){
		data = sessionStorage.getItem('usuario');
		
		if(data === null){
			window.location="index.html";
		}
		
		// 1 es el id asignado al administrador
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
		
		//Administrador - no puede acceder al boton editar
		var btn = $("#editar");
		btn.css("display","none");
		
	}

	$("#formulario").submit(e =>{
		e.preventDefault();
	
		var form_data = new FormData();
		var file_data = $("#file").prop("files")[0];
	
		var getUrl = window.location;
		//var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
		var baseUrl = getUrl.protocol + "//"+getUrl.host;
		
		form_data.append("file", file_data);
		
		$("#mensaje").html("Productos cargando, espere porfavor ...");

		$.ajax({
	            type: "POST",
				url:"http://52.14.249.159:8080/microservicioProductos/productos/guardar",
	            dataType: "html",
                data: form_data,
				contentType: false, 
              	processData: false, 
	            success: function (data) {
					console.log(data);
					$("#mensaje").html("Productos cargados. Cantidad: "+data);
	       		},
				error:function(){
					$("#mensaje").html("Ha ocurrido un error");
				}
	    });
	});
	
});