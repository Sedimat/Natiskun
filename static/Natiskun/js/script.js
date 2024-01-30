

function knopka() {
    var currentPath = window.location.pathname;
    var a = currentPath.lastIndexOf("/");
    var name = currentPath.slice(a + 1);
    var link = currentPath.slice(1, a);
    console.log("Шлях поточної сторінки:", currentPath.slice(1, a), currentPath.slice(a+1));

    var b = ""

    if (link === "contact") {
        fetch(`/get_data/${name}`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {

        console.log(data.list_user);
        b = data.messegs[data.messegs.length - 1][data.messegs[data.messegs.length - 1].length - 1];
        console.log(b);
        //alert(data.list_user);
        })


        .catch(error => {
        console.error('Помилка при отриманні даних:', error);
        });
    } else {

    }
    console.log(b)
    // Отримуємо батьківський елемент, до якого будемо додавати новий контент
    var parentElement = document.querySelector('.div_messeg');

    // Створюємо новий елемент div
    var newDivElement = document.createElement('div');
    newDivElement.classList.add('messeg_l');

    // Створюємо три нових елементи p для виведення інформації
    var userElement = document.createElement('p');
    userElement.id = 'mess';
    userElement.textContent = 'TEST_USER'; // Замініть на своє значення

    var messageElement = document.createElement('p');
    messageElement.id = 'mess';
    messageElement.textContent = 'Тестове повідомлення'; // Замініть на своє значення

    var timeElement = document.createElement('p');
    timeElement.id = 'time';
    timeElement.textContent = '1234567'; // Замініть на своє значення

    // Додаємо нові елементи до нового div
    newDivElement.appendChild(userElement);
    newDivElement.appendChild(messageElement);
    newDivElement.appendChild(timeElement);

    // Додаємо новий div до батьківського елемента
    parentElement.insertBefore(newDivElement, parentElement.firstChild);

}

