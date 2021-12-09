$(document).ready(function(){
	console.log("Funcionando jquery");
	
	var data=0;
	autenticacion();
	
	function autenticacion(){
		data = sessionStorage.getItem('usuario');
		
		if(data === null){
			window.location="index.html";
		}
		
		// 1 es el id asignado al administrador
		if(data != 1){
			consultaUsuario();
		}
		
	}
	
	if(data !=1){
		
		//Usuario - no puede acceder a productos, clientes y proveedores
		var btn = $("#accesoProductos");
		btn.css("display","none");
		
		var btn2 = $("#accesoClientes");
		btn2.css("display","none");
		
		var btn4 = $("#accesoUsuarios");
		btn4.css("display","none");
		
	}else{
		
		//Administrador - no puede
		var btn = $("#editar");
		btn.css("display","none");

		var btn = $("#accesoVentas");
		btn.css("display","none");
	}
	

	$("#session").on("click",function(){
		sessionStorage.removeItem('usuario');
		sessionStorage.removeItem('ciudad');
		autenticacion();
	});
	
	$("#editar").on("click",function(){
		window.location ="editarUsuario.html";
	});
	
	
	function consultaUsuario(){
		
		var getUrl = window.location;
		//var baseUrl = getUrl.protocol + "//"+getUrl.host+"/"+getUrl.pathname.split('/')[1];
		var baseUrl = getUrl.protocol + "//"+getUrl.host;
		
		$.ajax({
			type:"GET",
			url: "http://52.14.249.159:8080/microservicioProductos/usuarios/listar/"+data,
			contentType: "application/json",
			success: function(data){

				$("#nombre").html(data[0].nombreUsuario);
				
			}
		});
	}
});