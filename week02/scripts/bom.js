// 1. Seleccionar los elementos del DOM
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list'); // Tu respuesta fue correcta

// 2. Crear los nuevos elementos y añadirles contenido
const li = document.createElement('li');
const deleteButton = document.createElement('button');

li.textContent = input.value; // Toma el texto del input
deleteButton.textContent = '❌'; // Pone la 'X' en el botón

// 3. Unir los elementos
li.append(deleteButton); // Pone el botón DENTRO del li
list.append(li);         // Pone el li DENTRO de la lista <ul>