

console.log('Ширина екрану:', window.innerWidth, 'пікселів');
console.log('Висота екрану:', window.innerHeight, 'пікселів');

var x = window.innerWidth
var y = window.innerHeight

document.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    if (x / 2 > mouseX){
        play(1)
    }else{
        play(0)
    }

    console.log('Положення курсора: X =', mouseX, 'Y =', mouseY);
});




document.addEventListener('DOMContentLoaded', function() {
    // Створення зображення
    var img = document.createElement('img');
    img.style.position = 'absolute';
    img.style.left = x / 2 - 171 + 'px';
    img.style.top = 60 + 'px';
    img.style.width = '300px';
    img.id = 'dynamicImage';
    img.src = '/media/inv/hud1.png'; // Шлях до зображення
    img.alt = 'Dynamic Image'; // Альтернативний текст

    // Додавання зображення до сторінки
    document.body.appendChild(img);

    var newDiv = document.createElement('div');
    newDiv.style.width = '600px';
    newDiv.style.height = '600px';
    newDiv.style.backgroundColor = "#676d7520";
    newDiv.style.borderRadius = '5px';
    newDiv.style.position = 'absolute';
    newDiv.style.left = x / 2 - 343 + 'px';
    newDiv.style.top = 100 + 'px';
    newDiv.id = "test";
    // Додавання нового елемента в DOM
    document.body.appendChild(newDiv);

    var messageLink = document.createElement('a');
        messageLink.href = "#"; // Посилання на створений дів
        messageLink.innerText = "Посилання";
        messageLink.id = 'link_js'; // Додаємо id 'mess'
        newDiv.appendChild(messageLink);


});

function play(len){
    if(len === 0){
        var pos = x / 2 + 200
    }else{
        var pos = x / 2 - 400
    }

    var element = document.getElementById('dynamicImage');
    var currentPosition = parseInt(element.style.left)
    var newPosition = currentPosition + len;

    element.style.transition = 'left ' + 0.5 + 's linear'; // Плавний перехід з лінійною швидкістю
    element.style.left = pos + 'px'; // Переміщення на вказану позицію
}





