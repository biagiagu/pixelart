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

let paleta = document.getElementById("paleta");
let grillaPixeles = document.getElementById("grilla-pixeles");

//Ejecutamos las funciones que necesitamos activar al momento de cargar la pagina
document.addEventListener("DOMContentLoaded", load);
function load() {
	//Activamos los colores a la paleta de colores
	paletaDinamica(nombreColores);
	//creamos los pixeles de la grilla
	grillaDePixeles();
	//Activamos el selector de colores
	seleccionaColorDePaleta();
	//Activamos la grilla de pixeles
	seleccionaPixelDeGrilla();

	//agrandamos el tamaño de letra de los titulos indicadores de pincel y color
	let indicadorP = document.querySelectorAll("p");
	for (let i = 0; i < indicadorP.length; i++) {
		indicadorP[i].style.fontSize = "1em";
	}
}

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

//Creamos la Paleta de colores
function paletaDinamica(nombreColores) {
	for (let i = 0; i < nombreColores.length; i++) {
		//creamos los <div> para la paleta
		let elementoDiv = document.createElement("div");

		//le asignamos los atributos correspondientes;
		elementoDiv.style.backgroundColor = nombreColores[i];
		elementoDiv.className = "color-paleta";

		//los agrega al elemento padre
		paleta.appendChild(elementoDiv);

	}
}


//Creamos la grilla de pixeles
function grillaDePixeles() {
	for (let i = 0; i < 1750; i++) {
		let elementoGrilla = document.createElement("div");
		grillaPixeles.appendChild(elementoGrilla);
	}
}


//selector de color de la paleta de color
function seleccionaColorDePaleta() {
	//seleccionamos todos los elementos que componen la paleta
	let elementosPaleta = document.querySelectorAll("#paleta div");


	//agregamos el evento click a cada elemento de la paleta
	for (let i = 0; i < elementosPaleta.length; i++) {
		elementosPaleta[i].addEventListener("click", cambiarColorPincel);
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

//Selector de Pixel a Pintar y pintura
function seleccionaPixelDeGrilla() {
	//seleccionamos todos los elementos que componen la grilla de pixeles
	let elementosGrilla = document.querySelectorAll("#grilla-pixeles div");

	//agregamos el evento click a cada unos de los elementos de la grilla
	for (let i = 0; i < elementosGrilla.length; i++) {
		elementosGrilla[i].addEventListener("click", pintarPixel);

	}

	//definimos la funcion para pintar el pixel seleccionado con el color del indicador de color
	function pintarPixel(e) {
		//Color de fondo del elemento cliqueado = color de fondo del indicador de color
		e.target.style.backgroundColor = document.getElementById("indicador-de-color").style.backgroundColor;

	}

}
