

console.log('Ширина екрану:', window.innerWidth, 'пікселів');
console.log('Висота екрану:', window.innerHeight, 'пікселів');

//document.addEventListener('mousemove', function(event) {
//    var mouseX = event.clientX;
//    var mouseY = event.clientY;
//    console.log('Положення курсора: X =', mouseX, 'Y =', mouseY);
//});


document.addEventListener('DOMContentLoaded', function() {
    // Створення зображення
    var img = document.createElement('img');
    img.style.position = 'absolute';
    img.style.left = '200px';
    img.style.top = window.innerHeight - 200 + 'px';
    img.style.width = '300px';
    img.id = 'dynamicImage';
    img.src = '/media/inv/hud1.png'; // Шлях до зображення
    img.alt = 'Dynamic Image'; // Альтернативний текст

    // Додавання зображення до сторінки
    document.body.appendChild(img);


});

function play(){
    var element = document.getElementById('dynamicImage');

    element.style.transition = 'left ' + 10 + 's linear'; // Плавний перехід з лінійною швидкістю
    element.style.left = 1000 + 'px'; // Переміщення на вказану позицію

}