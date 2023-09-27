document.addEventListener("DOMContentLoaded", function () {
    let url = 'https://opentdb.com/api.php?amount=1';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showQuestions(data);
        });

    function showQuestions(data) {
        let container = document.getElementById('container');

        // Suponiendo que data.results[0] contiene la primera pregunta y sus opciones
        let category = data.results[0].category;
        let difficulty = data.results[0].difficulty;
        let question = data.results[0].question;
        let options = data.results[0].incorrect_answers.concat(data.results[0].correct_answer);

        // Aquí puedes construir una lista de opciones
        let optionsHTML = '';
        options.forEach((opcion, index) => {
            optionsHTML += `<div class="options" data-correct="${index === options.length - 1}">${opcion}</div>`;
        });

        // Agrega la question y options al elemento en el DOM
        container.innerHTML = `
            <div class="info">
                <p class="capsula categoria">${category}</p>
                <p class="capsula dificultad">${difficulty}</p>
            </div>
            <div class="question">
                <h4>${question}</h4>
                ${optionsHTML}<br>
                <button id="verify">VERIFY</button>
            </div>
            <button id="next">Next question ➜</button>
        `;

        // Botones
        let verifyButton = document.getElementById('verify');
        verifyButton.addEventListener('click', verifyRespuesta);

        let nextbtn = document.getElementById('next');
        nextbtn.addEventListener('click', () => {
            window.location.reload();
        });

        // Agrega un evento de clic a cada opción
        let opciones = document.querySelectorAll('.options');
        opciones.forEach(opcion => {
            opcion.addEventListener('click', () => {
                // Deselecciona todas las opciones
                opciones.forEach(op => {
                    op.classList.remove('selected');
                });

                // Selecciona la opción actual
                opcion.classList.add('selected');
            });
        });

        let difficultyColor = document.getElementsByClassName('dificultad')[0]; // Acceder al primer elemento (asumiendo que solo hay uno)
        if (difficulty === 'hard') {
            difficultyColor.textContent = 'HARD';
            difficultyColor.classList.add('hard'); // Agrega la clase 'hard' al elemento contenedor
        } else if (difficulty === 'medium') {
            difficultyColor.textContent = 'MEDIUM';
            difficultyColor.classList.add('medium'); // Agrega la clase 'medium' al elemento contenedor
        } else if (difficulty === 'easy') {
            difficultyColor.textContent = 'EASY';
            difficultyColor.classList.add('easy'); // Agrega la clase 'easy' al elemento contenedor
        }

    }

    function verifyRespuesta() {
        // Obtén todas las opciones de respuesta
        let opciones = document.querySelectorAll('.options');

        // Encuentra la opción seleccionada por el usuario
        let opcionSeleccionada;
        opciones.forEach(opcion => {
            if (opcion.classList.contains('selected')) {
                opcionSeleccionada = opcion;
            }
        });

        // Verifica si la opción seleccionada es correcta o incorrecta
        if (opcionSeleccionada && opcionSeleccionada.getAttribute('data-correct') === "true") {
            alert('¡Respuesta Correcta!');
            window.location.reload();
        } else {
            alert('Respuesta Incorrecta. Inténtalo de nuevo.');
        }
    }
});