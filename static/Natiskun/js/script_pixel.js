
var contentDiv = document.querySelector('.content');

for (let i = 0; i < 15; i++) {
    var a = i * 100;

var newDiv = document.createElement('div');
   newDiv.classList.add('square');
   newDiv.id = 'div_' + i;
//   newDiv.style.left = 5 + a + 'px';
//   newDiv.style.top = 5 + 'px';
//   newDiv.style.position = 'absolute';

   contentDiv.appendChild(newDiv);
}

var newDiv = document.createElement('button');
newDiv.id = 'div_a';
newDiv.style.left = '100px';
newDiv.style.top = '100px';
newDiv.style.position = 'absolute';
newDiv.innerText = 'right';

newDiv.addEventListener('click', function() {
    var contentDiv = document.querySelector('.content');
    var scrollLeft = contentDiv.scrollLeft;
    var targetScrollLeft = scrollLeft + 100; // Збільшення на 50 пікселів

    var interval = setInterval(function() {
        if (scrollLeft < targetScrollLeft) {
            scrollLeft += 5; // Зміна значення scrollLeft
            contentDiv.scrollLeft = scrollLeft; // Оновлення скролу
        } else {
            clearInterval(interval); // Зупинка інтервалу, коли досягнуто цільове значення
        }
    }, 10); // Затримка в мілісекундах
});

contentDiv.appendChild(newDiv);

var newDiv = document.createElement('button');
newDiv.id = 'div_a';
newDiv.style.left = '70px';
newDiv.style.top = '100px';
newDiv.style.position = 'absolute';
newDiv.innerText = 'left';

newDiv.addEventListener('click', function() {
    var contentDiv = document.querySelector('.content');
    var scrollLeft = contentDiv.scrollLeft;
    var targetScrollLeft = scrollLeft - 100; // Збільшення на 50 пікселів

    var interval = setInterval(function() {
        if (scrollLeft > targetScrollLeft) {
            scrollLeft -= 5; // Зміна значення scrollLeft
            contentDiv.scrollLeft = scrollLeft; // Оновлення скролу
        } else {
            clearInterval(interval); // Зупинка інтервалу, коли досягнуто цільове значення
        }
    }, 10); // Затримка в мілісекундах
});

contentDiv.appendChild(newDiv);
