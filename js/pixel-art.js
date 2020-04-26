var nombreColores = ['White', 'LightYellow',
	'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
	'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
	'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
	'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
	'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
	'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
	'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
	'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
	'LightGreen', 'PaleGreen', 'PaleTurquoise',
	'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
	'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
	'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
	'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
	'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
	'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
	'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
	'BlueViolet', 'DarkViolet', 'DarkOrchid',
	'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
	'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var paleta = document.getElementById("paleta");
var grillaPixeles = document.getElementById("grilla-pixeles");
var mousePresionado = false;


//Ejecutamos las funciones que necesitamos activar al momento de cargar la pagina
document.addEventListener("DOMContentLoaded", load);

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change',
	(function () {
		// Se guarda el color de la rueda en colorActual
		colorActual = colorPersonalizado.value;
		// Completar para que cambie el indicador-de-color al colorActual
		e=undefined;
		cambiarColorPincel(e, colorActual);
	})
);

function load() {
	//Activamos los colores a la paleta de colores
	paletaDinamica(nombreColores);
	
	//dibujamos y activamos los pixeles de la grilla
	grillaDePixeles();
	
	//Activamos los eventos para saber si el boton del mouse es presionado o liberado.
	document.addEventListener("mousedown", ()=>{mousePresionado=true});
	document.addEventListener("mouseup", ()=>{mousePresionado=false});
	
	//activamos el boton BorrarTodo
	$("#borrar").click(borrarTodo);
	
	//activmos las zonas clicleables de las imagenes de nuestros superheroes
	$("ul.imgs li img").click((e)=>{cargarSuperheroe(e.target.id);});
	
	//activamos el boton de guardar
	$("#guardar").click(guardarPixelArt);
	
	//agrandamos el tamaño de letra de los titulos indicadores de pincel y color
	let indicadorP = document.querySelectorAll("p");
	for (let i = 0; i < indicadorP.length; i++) {
		indicadorP[i].style.fontSize = "1em";
	}
}


//Creamos la Paleta de colores
function paletaDinamica(nombreColores) {
	for (let i = 0; i < nombreColores.length; i++) {
		//creamos los <div> para la paleta
		let elementoDiv = document.createElement("div");

		//le asignamos los atributos correspondientes;
		elementoDiv.style.backgroundColor = nombreColores[i];
		elementoDiv.className = "color-paleta";
		
		//agregamos el evento click para que cambie de color el pincel al ser clickeado
		elementoDiv.addEventListener("click", cambiarColorPincel);
		
		//los agrega al elemento padre
		paleta.appendChild(elementoDiv);

	}
}


//dibujamos y activamos la grilla de pixeles
function grillaDePixeles() {
	for (let i = 0; i < 1750; i++) {
		//definimos los elementos de la grilla commo divs
		let elementoGrilla = document.createElement("div");
		
		//agregamos el evento click a cada unos de los elementos de la grilla creado
		elementoGrilla.addEventListener("click", pintarPixel);
		
		//agregamos el evento hover para permitir pintar en movimiento --Guia 2 Paso 5
		elementoGrilla.addEventListener("mouseover", pintarPixel);
		
		//agregamos el elemento creado a la grilla
		grillaPixeles.appendChild(elementoGrilla);
	}

}


//definimos la funcion para cambiar el color del pincel
function cambiarColorPincel(e, colorActual) {
	//comprobamos si e viene definido --> vendrá definido si el evento click en la paleta de colores es activado
	if (!e){
		//Color de fondo del indicador-de-color = Color devuelto por el seleccionador de color
		document.getElementById("indicador-de-color").style.backgroundColor = colorActual;
	}else{
		//Color de fondo del indicador-de-color = Color de Fondo del elemento de paleta cliqueado
		document.getElementById("indicador-de-color").style.backgroundColor = e.target.style.backgroundColor;
	}
}


//definimos la funcion para pintar el pixel seleccionado con el color del indicador de color
function pintarPixel(e) {
	//determinamos si se realizo un click o se esta pintando en movimiento --Guia 2 Paso 5
	if(mousePresionado){
		cambiarColorPixel();
	}
	//Color de fondo del elemento cliqueado = color de fondo del indicador de color
	if (e.type=="click"){
		cambiarColorPixel();
	}
	
	function cambiarColorPixel(){
		e.target.style.backgroundColor = document.getElementById("indicador-de-color").style.backgroundColor;
	}
}

function borrarTodo() {
	//Pedimos la confirmación para borrar la grilla
	if (confirm("Estas seguro de borrar todo?")){
		//Seleccionamos y borramos los pixeles de la grilla
		let pixeles = $("#grilla-pixeles div");
		pixeles.animate({"background-color":"withe"}, 1500);
	}	
}