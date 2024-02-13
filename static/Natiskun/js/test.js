function square(x, y, color){
    var newDiv = document.createElement('div');
    newDiv.style.width = '10px';
    newDiv.style.height = '10px';
    newDiv.style.backgroundColor = color;
    newDiv.style.borderRadius = '5px';
    newDiv.style.position = 'absolute';
    newDiv.style.left = x + 'px';
    newDiv.style.top = y + 'px';
    newDiv.style.boxShadow = '0 0 20px rgba(255, 255, 255, 1)';  // Додаємо напівпрозору тінь
    newDiv.id = 'id_' + x;
    newDiv.onmouseover = function() {
        console.log('id_' + x)
        print('id_' + x);
    };
    document.body.appendChild(newDiv);
}

function square1(x, y, color){
    var newDiv = document.createElement('div');
    newDiv.style.width = '10px';
    newDiv.style.height = '10px';
    newDiv.style.backgroundColor = color;
    newDiv.style.borderRadius = '5px';
    newDiv.style.position = 'absolute';
    newDiv.style.left = x + 'px'; // Додаємо 300 пікселів до кожної позиції
    newDiv.style.top = y + 'px';
    // Додавання нового елемента в DOM
    document.body.appendChild(newDiv);
}


for (let i = 0; i < 600; i += 20) {
    square(100 + i, 100, '#ff0505')
}

function print(id) {
    var element = document.getElementById(id);
    var currentPosition = parseInt(element.style.top); // отримуємо позицію елемента
    var x = parseInt(element.style.left); // отримуємо позицію елемента
    var rN = Math.floor(Math.random() * (300 - 100 + 1)) + 100;

    var targetPosition = currentPosition + rN;
    var interval = setInterval(function() {
        if (currentPosition >= targetPosition) {
            clearInterval(interval);
        } else {
            currentPosition += 2;  // Швидкість опускання
            if (currentPosition % 10 === 0){
                square1(x, currentPosition, 'green')
            }
            element.style.top = currentPosition + 10 + 'px';
        }
    }, 10);  // Інтервал зміни позиції (кожні 10 мілісекунд)
}