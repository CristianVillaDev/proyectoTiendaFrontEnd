$(document).ready(function(){
    console.log('Funcionando');

	var btn3 = $("#nueva");
	btn3.css("display","none");

	var data=0;
	autenticacion();
	
	function autenticacion(){
		data = sessionStorage.getItem('usuario');
		
		if(data === null){
			window.location="index.html";
		}
		
		// 1 es el id asignado al administrador
		if(data==1){
			window.location="principal.html";
		}
	}
	
	$("#session").on("click",function(){
		sessionStorage.removeItem('usuario');
		sessionStorage.removeItem('ciudad');
		autenticacion();
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
	
    //buscar cliente por cedula
	$(document).on('click', '#buscarCliente', () => {
		let cedula_cliente = $('#cedula').val();

		$.ajax({
			type: "GET",
			url: "http://52.14.249.159:8080/microservicioClientes/clientes/listar/"+ cedula_cliente,
			success: function(response){ 
			console.log(response);
			
				let cliente = response[0];
				console.log(cliente);
				if (Object.keys(response).length === 0) {
					alert("El cliente no se encontro");
					return null
				};
				$("#nombreCliente").val(cliente.nombreCliente);
			}
		});
	})

	var iva1 = 0;
	var ivaVenta1 = 0
	var valorTotal1 = 0;
	var valorProducto1 = 0;


//Buscar producto 1 ingresando el codigo del producto
	$(document).on('click', '#buscarProducto1', () => {
		var codigo_producto1 = $("#CodProducto1").val();

		$.ajax({
			type: "GET",
			url: "http://52.14.249.159:8080/microservicioProductos/productos/listar/"+ codigo_producto1,
			success: function(response) {

				const producto1 = response[0];
				console.log(response[0]);
				if (Object.keys(response).length === 0) {
					alert("El producto no se encontro");
					return null;
				};

				$("#nombreProducto1").val(producto1.nombreProducto);
				valorProducto1 = producto1.precioCompra;
				iva1 = producto1.ivaCompra/ 100;
			}
		});
	});


//calcular valor de venta del producto1 de acuerdo con la cantidad ingresada
	$(document).on('change', '#Cantidad1', () => {

		document.getElementById("valorVenta1").value = $("#Cantidad1").val() * valorProducto1;
		ivaVenta1 = $("#valorVenta1").val() * iva1;
		valorTotal1 = parseFloat($("#valorVenta1").val()) + parseFloat(ivaVenta1);
	});

	var iva2 = 0;
	var ivaVenta2 = 0
	var valorTotal2 = 0;
	var valorProducto2 = 0;

//Buscar producto 2 ingresando el codigo del producto
	$(document).on('click', '#buscarProducto2', () => {
		var codigo_producto2 = $("#CodProducto2").val();

		$.ajax({
			type: "GET",
			url: "http://52.14.249.159:8080/microservicioProductos/productos/listar/" + codigo_producto2,
			success: function(response) {

				const producto2 = response[0];
				if (Object.keys(response).length === 0) {
					alert("El producto no se encontro");
					return null
				};

				$("#nombreProducto2").val(producto2.nombreProducto);
				valorProducto2 = producto2.precioCompra;
				iva2 = producto2.ivaCompra/ 100
			}
		});
	});

//Calcular valor de venta del producto2 de acuerdo con la cantidad ingresada
	$(document).on('change', '#Cantidad2', () => {

		document.getElementById('valorVenta2').value = $("#Cantidad2").val() * valorProducto2;
		ivaVenta2 = $("#valorVenta2").val() * iva2;
		valorTotal2 = parseFloat($("#valorVenta2").val()) + parseFloat(ivaVenta2);
	});

	var iva3 = 0;
	var ivaVenta3 = 0
	var valorTotal3 = 0;
	var valorProducto3 = 0;
	var codigo = 0;

//Buscar producto 3 ingresando el codigo del producto
	$(document).on('click', '#buscarProducto3', () => {
		var codigo_producto3 = $("#CodProducto3").val();
		
		$.ajax({
			type: "GET",
			url: "http://52.14.249.159:8080/microservicioProductos/productos/listar/"+ codigo_producto3,
			success: function(response) {

				const producto3 = response[0];
				if (Object.keys(response).length === 0) {
					alert("El producto no se encontro");
					return null
				};

				$("#nombreProducto3").val(producto3.nombreProducto);
				valorProducto3 = producto3.precioCompra;
				iva3 = producto3.ivaCompra / 100;
			}
		});
	});

//calcular valor de venta del producto3 de acuerdo con la cantidad ingresada
	$(document).on('change', '#Cantidad3', () => {

		document.getElementById('valorVenta3').value = $("#Cantidad3").val() * valorProducto3;
		ivaVenta3 = $("#valorVenta3").val() * iva3;
		valorTotal3 = parseFloat($("#valorVenta3").val()) + parseFloat(ivaVenta3);
	});


//Calcular valor venta total, iva total y total venta con iva
	$("#formulario").submit(e=>{
		e.preventDefault();

		if ($("#Cantidad1").val() <= 0) {
			alert("La cantidad de los productos es incorrecta");
			return null;
		};
		if ($("#Cantidad2").val() <= 0) {
			alert("La cantidad de los productos es incorrecta");
			return null;
		};
		if ($("#Cantidad3").val() <= 0) {
			alert("La cantidad de los productos es incorrecta");
			return null;
		};

		setTimeout(function(){
			$("#mensaje").html("Proceso ventas iniciado ... ");
		},1000);
		
		setTimeout(function(){
			$("#mensaje").html("Cargando ... ");
		},3000);

		setTimeout(function(){
			$("#mensaje").html("Validando datos ... ");
		},5000);

		document.getElementById("valorVenta").value = parseFloat($("#valorVenta1").val()) + parseFloat($("#valorVenta2").val()) + parseFloat($("#valorVenta3").val());
		document.getElementById("totalIVA").value = parseFloat(ivaVenta1) + parseFloat(ivaVenta2) + parseFloat(ivaVenta3);
		document.getElementById("totalVentaIVA").value = parseFloat($("#valorVenta").val()) + parseFloat($("#totalIVA").val());

		var cliente1 = $("#cedula").val();
		var usuario = sessionStorage.getItem('usuario');
		var valorVenta = $("#valorVenta").val();
		var iva = $("#totalIVA").val();
		var totalVenta = $("#totalVentaIVA").val(); 
		var cantidad1 = $("#Cantidad1").val();
		var cantidad2 = $("#Cantidad2").val();
		var cantidad3 = $("#Cantidad3").val();
		var valorVenta1= $("#valorVenta1").val();
		var valorVenta2= $("#valorVenta3").val();
		var valorVenta3= $("#valorVenta3").val();
		var codigo1 = $("#CodProducto1").val();
		var codigo2 = $("#CodProducto2").val();
		var codigo3 = $("#CodProducto3").val();
		var ciudad = sessionStorage.getItem('ciudad');

		venta = {
			cedulaCliente: cliente1,
			cedulaUsuario: usuario,
			valor_venta: valorVenta,
			ivaVenta: iva,
			total_venta: totalVenta,
			ciudad: ciudad,
			detalleVentas:[{
				cantidadProducto: cantidad1,
				codigoProducto: codigo1,
				valorTotal: valorTotal1,
				valorVenta: valorVenta1,
				ValorIva: ivaVenta1
			},{
				cantidadProducto: cantidad2,
				codigoProducto: codigo2,
				valorTotal: valorTotal2,
				valorVenta: valorVenta2,
				ValorIva: ivaVenta2
			},{
				cantidadProducto: cantidad3,
				codigoProducto: codigo3,
				valorTotal: valorTotal3,
				valorVenta: valorVenta3,
				ValorIva: ivaVenta3
			}]
		};

		setTimeout(function(){
			$("#mensaje").html("Ejecutando petición al servidor ... ");
		},7000);

		setTimeout(function(){
			$("#mensaje").html("Esperando confirmación ... ");
		},8000);

		$.ajax({
			type: "POST",
			url: "http://localhost:8086/ventas/crear",
			data: JSON.stringify(venta),
			success: function(response) {
				console.log("ventaAgregada");

				setTimeout(function(){
					$("#mensaje").html("Venta agregada satisfactoriamente ... ");
				},9000);

				setTimeout(function(){
					$("#mensaje").html("Transacción ejecutada con exito!");
				},10000);

				setTimeout(function(){
					var btn3 = $("#nueva");
					btn3.css("display","block");
				},12000);
	
			},
			contentType: "application/json"
		});

		setTimeout(function(){ consultaCodigo();},5000);
	});

	function consultaCodigo() {
		$.ajax({
			type: "GET",
			url: "http://localhost:8086/ventas/codigo",
			success: function(response) {
				codigo = response;
				console.log(codigo + "TraeCodigo");
				$("#consecutivo").val(codigo);

			}
		});
	}
});