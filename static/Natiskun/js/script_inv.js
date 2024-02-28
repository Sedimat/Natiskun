

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

//    console.log('Положення курсора: X =', mouseX, 'Y =', mouseY);
});



var r_y = 30

document.addEventListener('DOMContentLoaded', function() {
//    var img = document.createElement('img');
//    img.style.position = 'absolute';
//    img.style.left = x / 2 - 171 + 'px';
//    img.style.top = 60 + 'px';
//    img.style.width = '300px';
//    img.id = 'dynamicImage';
//    img.src = '/media/inv/hud1.png'; // Шлях до зображення
//    img.alt = 'Dynamic Image'; // Альтернативний текст
//
//    // Додавання зображення до сторінки
//    document.body.appendChild(img);

    var contentDiv = document.querySelector('.content');
    for (let i = 0; i < 3; i++) {

        var img = document.createElement('img');
        img.id = 'map';
        img.classList.add('map0');
        img.style.width = '1240px';
        img.src = '/media/inv/map0.jpg'; // Шлях до зображення
        img.alt = 'Dynamic Image'; // Альтернативний текст
        contentDiv.appendChild(img);

    }

    for (let i = 0; i < 12; i++) {
        var r_x = Math.floor(Math.random() * (1100 - 20 + 1)) + 20;

        var link = document.createElement('a');
        link.href = "#";

        var newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.id = 'div_' + i;
        newDiv.style.left = r_x + 'px';
        newDiv.style.top = r_y + 'px';
        newDiv.style.position = 'absolute';

        var img = document.createElement('img');
        img.style.width = '90px';
        img.id = 'dynamicImage';
        img.src = '/media/inv/home0.png'; // Шлях до зображення
//        img.src = '/media/inv/obj0.png'; // Шлях до зображення
        img.alt = 'Dynamic Image'; // Альтернативний текст

        newDiv.appendChild(img);


        var paragraph = document.createElement('p');
        paragraph.innerText = "Будинок";
        paragraph.classList.add('name_loc');

        newDiv.appendChild(paragraph);


        link.appendChild(newDiv);

        r_y += 150;

        contentDiv.appendChild(link);


        }

//    var content = document.querySelector('.content');
//
//    for (let i = 0; i < 5; i++) {
//        var a1 = x / 2 - 620;
//
//        var a = a1 + i * 110;
//        var newDiv = document.createElement('div');
//        newDiv.classList.add('square');
//        newDiv.id = 'div_' + i;
//
//        newDiv.style.left = a + 'px';
//        newDiv.style.top = 300 + 'px';
//        newDiv.style.position = 'absolute';
//
//        content.appendChild(newDiv);
//    }





//    var newDiv = document.createElement('div');
//    newDiv.style.width = '600px';
//    newDiv.style.height = '600px';
//    newDiv.style.backgroundColor = "#676d7590";
//    newDiv.style.borderRadius = '5px';
//    newDiv.style.position = 'absolute';
//    newDiv.style.left = x / 2 - 343 + 'px';
//    newDiv.style.top = 100 + 'px';
//    newDiv.classList.add('inv');
//    newDiv.id = "test";
//    // Додавання нового елемента в DOM
//    document.body.appendChild(newDiv);

//    var messageLink = document.createElement('a');
//        messageLink.href = "#"; // Посилання на створений дів
//        messageLink.innerText = "Посилання";
//        messageLink.id = 'link_js'; // Додаємо id 'mess'
//        newDiv.appendChild(messageLink);

});

function r_word() {
    var letters = 'abcdefghijklmnopqrstuvwxyz'; // Англійський алфавіт
    var randomLetter1 = letters.charAt(Math.floor(Math.random() * letters.length)); // Генеруємо першу букву
    var randomLetter2 = letters.charAt(Math.floor(Math.random() * letters.length));
    var randomLetter3 = letters.charAt(Math.floor(Math.random() * letters.length));
    var randomLetters = randomLetter1 + randomLetter2 + randomLetter3;
    return randomLetters;
}


//function delay(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}
//
//async function add_div() {
//    var parentElement = document.querySelector('.inv');
//
//    for (let i = 0; i < 5; i++) {
//        var a = 0 + i * 110;
//
//        var newDiv = document.createElement('div');
//        var name = "id_" + r_word();
//        console.log(name)
//        newDiv.classList.add('square');
//        newDiv.id = 'div_' + i;
//
//        newDiv.style.left = a + 'px';
//        newDiv.style.top = 300 + 'px';
//        newDiv.style.position = 'absolute';
//        newDiv.style.cursor = 'pointer';
//
//        // Додаємо обробники подій для руху за курсором миші
//        newDiv.addEventListener('mousedown', function(event) {
//            // Перевіряємо, чи натиснута ліва кнопка миші
//            if (event.button === 0) {
//                // Додаємо обробник події mousemove після натискання лівої кнопки миші
//                document.addEventListener('mousemove', onMouseMove);
//            }
//        });
//
//        // Видаляємо обробник події mousemove після відпускання лівої кнопки миші
//        document.addEventListener('mouseup', function(event) {
//            // Перевіряємо, чи була відпущена ліва кнопка миші
//            if (event.button === 0) {
//                document.removeEventListener('mousemove', onMouseMove);
//            }
//        });
//
//        // Додаємо елемент в тіло сторінки
//        document.body.appendChild(newDiv);
//
//        // Функція для переміщення елемента за курсором миші
//        function onMouseMove(event) {
//            var mouseX = event.clientX;
//            var mouseY = event.clientY;
//            var currentDiv = document.getElementById('div_' + i); // Отримуємо елемент по його id
//            currentDiv.style.left = mouseX - (currentDiv.offsetWidth / 2) + 'px';
//            currentDiv.style.top = mouseY - (currentDiv.offsetHeight / 2) + 'px';
//            console.log(currentDiv.style.left, currentDiv.style.top, currentDiv.id)
//        }
//
//
//       await delay(50);
//    }
//}


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



