function test1() {
    // Отримуємо батьківський елемент, до якого будемо додавати новий контент
    var parentElement = document.querySelector('.div_messeg');

    // Створюємо новий елемент div
    var newDivElement = document.createElement('div');
    newDivElement.classList.add('messeg_l');

    // Створюємо три нових елементи p для виведення інформації
    var userElement = document.createElement('p');
    userElement.id = 'mess';
    userElement.textContent = "test user";

    var messageElement = document.createElement('p');
    messageElement.id = 'mess';
    messageElement.textContent = "test повідомленя ліве";

    var timeElement = document.createElement('p');
    timeElement.id = 'time';
    timeElement.textContent = "00:00";

    // Додаємо нові елементи до нового div
    newDivElement.appendChild(userElement);
    newDivElement.appendChild(messageElement);
    newDivElement.appendChild(timeElement);

    // Додаємо новий div до батьківського елемента
    parentElement.insertBefore(newDivElement, parentElement.firstChild);
}

function test2() {
    // Отримуємо батьківський елемент, до якого будемо додавати новий контент
    var parentElement = document.querySelector('.div_messeg');

    // Створюємо новий елемент div
    var newDivElement = document.createElement('div');
    newDivElement.classList.add('messeg_r');

    // Створюємо три нових елементи p для виведення інформації
    var userElement = document.createElement('p');
    userElement.id = 'mess';
    userElement.textContent = "test user";

    var messageElement = document.createElement('p');
    messageElement.id = 'mess';
    messageElement.textContent = "test повідомленя праве";

    var timeElement = document.createElement('p');
    timeElement.id = 'time';
    timeElement.textContent = "00:00";

    // Додаємо нові елементи до нового div
    newDivElement.appendChild(userElement);
    newDivElement.appendChild(messageElement);
    newDivElement.appendChild(timeElement);

    // Додаємо новий div до батьківського елемента
    parentElement.insertBefore(newDivElement, parentElement.firstChild);
}


function dodavannya_r(user, text, time) {
    // Отримуємо батьківський елемент, до якого будемо додавати новий контент
    var parentElement = document.querySelector('.div_messeg');

    // Створюємо новий елемент div
    var newDivElement = document.createElement('div');
    newDivElement.classList.add('messeg_r');

    // Створюємо три нових елементи p для виведення інформації
    var userElement = document.createElement('p');
    userElement.id = 'mess';
    userElement.textContent = user;

    var messageElement = document.createElement('p');
    messageElement.id = 'mess';
    messageElement.textContent = text;

    var timeElement = document.createElement('p');
    timeElement.id = 'time';
    timeElement.textContent = time;

    // Додаємо нові елементи до нового div
    newDivElement.appendChild(userElement);
    newDivElement.appendChild(messageElement);
    newDivElement.appendChild(timeElement);

    // Додаємо новий div до батьківського елемента
    parentElement.appendChild(newDivElement);
}


function dodavannya_l(user, text, time) {
    // Отримуємо батьківський елемент, до якого будемо додавати новий контент
    var parentElement = document.querySelector('.div_messeg');

    // Створюємо новий елемент div
    var newDivElement = document.createElement('div');
    newDivElement.classList.add('messeg_l');

    // Створюємо три нових елементи p для виведення інформації
    var userElement = document.createElement('p');
    userElement.id = 'mess';
    userElement.textContent = user;

    var messageElement = document.createElement('p');
    messageElement.id = 'mess';
    messageElement.textContent = text;

    var timeElement = document.createElement('p');
    timeElement.id = 'time';
    timeElement.textContent = time;

    // Додаємо нові елементи до нового div
    newDivElement.appendChild(userElement);
    newDivElement.appendChild(messageElement);
    newDivElement.appendChild(timeElement);

    // Додаємо новий div до батьківського елемента
    parentElement.appendChild(newDivElement);
}

function dell_messeg() {
    var divMesseg = document.querySelector('.div_messeg');
    divMesseg.innerHTML = '';
}

function knopka(name, link) {

    if (link === "contact") {
        fetch(`/get_data/${name}`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {

        for(let i = 0; i < data.messegs.length; i++){

            if (data.messegs[i][0] === data.username) {
            dodavannya_r(data.messegs[i][0], data.messegs[i][1], data.messegs[i][2])

            }
            else {
            dodavannya_l(data.messegs[i][0], data.messegs[i][1], data.messegs[i][2])
            }

            }

        })

        .catch(error => {
        console.error('Помилка при отриманні даних:', error);
        });
    } else {

    }

}
function link_name(){
    var currentPath = window.location.pathname;
    var a = currentPath.lastIndexOf("/");
    var name = currentPath.slice(a + 1);
    var link = currentPath.slice(1, a);
    return [name, link]
}

// Додає повідомлення з бази даних
document.addEventListener("DOMContentLoaded", handler)

function handler(event) {
    var result = link_name();
    var name = result[0];
    var link = result[1];

    if (link === "contact") {
        dell_messeg()
        knopka(name, link)
    }
}



var divMesseg = document.querySelector('.div_messeg');

divMesseg.addEventListener('scroll', function() {
    // Функція, яка викличеться при скролінгу
    if (divMesseg.scrollTop === -(divMesseg.scrollHeight - divMesseg.clientHeight)) {
        // Досягнуто верхньої границі діву
        console.log('Досягнуто верхньої границі');

    }
});


// асинхрона функція



async function asyncFunction() {
    // Виконайте тут ваш асинхронний код
    console.log("хоп");

}

function runEverySecond() {
    setInterval(async () => {
        try {
            await asyncFunction();
            // Тут можна викликати інші функції або виконати інші дії
        } catch (error) {
            console.error(error);
        }
    }, 1000); // 1000 мілісекунд = 1 секунда
}

// Запустіть функцію
// runEverySecond();


//alert(data.list_user);