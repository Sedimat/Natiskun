
// лічильник повідомлень
var count = 0;


function dodavannya(user, text, time, side, place, img, link) {
    count++
    console.log(count)
    // Отримуємо батьківський елемент, до якого будемо додавати новий контент
    var parentElement = document.querySelector('.div_messeg');

    // Створюємо новий елемент div
    var newDivElement = document.createElement('div');

    if(side === "r"){
    newDivElement.classList.add('messeg_r');
    }else{
    newDivElement.classList.add('messeg_l');
    }

    // Створюємо три нових елементи p для виведення інформації
    var userElement = document.createElement('p');
    userElement.id = 'mess';
    userElement.textContent = user;
    newDivElement.appendChild(userElement);

    if (img.length > 0) {
        for (let i = 0; i < img.length; i++) {

            var imgElement = document.createElement('img');
            imgElement.id = 'img_post';
            imgElement.src = img[i];
            imgElement.alt = 'Image';

            // Додаємо imgElement до нового div
            newDivElement.appendChild(imgElement);
        }
    }

    if (link.length > 0) {
        for (let i = 0; i < link.length; i++) {
            var link_name = link[i]
            if (link[i].length > 50){
                link_name = link[i].slice(0, 50) + "..."
            }
            var linkElement = document.createElement('a');
            linkElement.href = link[i];
            linkElement.id = 'link'; // Додаємо клас, якщо потрібно
            linkElement.textContent = link_name;
            linkElement.style.display = "block";

            newDivElement.appendChild(linkElement);
        }
    }

    var messageElement = document.createElement('p');
    messageElement.id = 'mess';
    messageElement.textContent = text;

    newDivElement.appendChild(messageElement);

    var timeElement = document.createElement('p');
    timeElement.id = 'time';
    timeElement.textContent = time;

    newDivElement.appendChild(timeElement);

    if(place === "up"){
    parentElement.appendChild(newDivElement);
    }else{
    parentElement.insertBefore(newDivElement, parentElement.firstChild);
    }

}


function add_cont(list_c, user) {
  // Отримання елементу <div class="navigation">
  var navigationDiv = document.querySelector('.navigation');

  // Створення елемента <a>
  var link = document.createElement('a');
  link.href = list_c[4];
  link.style.textDecoration = 'none';
  var numb = ""
  var messeg = ""
  if (list_c[2].length > 25) {
        messeg = list_c[2].slice(0, 25) + "..."
  }else{
        messeg = list_c[2]
  }

  if (list_c[3] > 0) {
    var numb = list_c[3]
  }

  if (user === list_c[1]) {
  // Створення структури HTML та додавання її в елемент <a>
  link.innerHTML = `
    <div class="group" style="background-color: #49337d;">
        <table>
            <tr id="test">
                <td width="60"><img class="avatar" src="/media/${list_c[0]}" style="width:60px;"></td>
                <td>
                    <table  width="250">
                        <tr id="test">
                            <td height="15"><p id="mess">${list_c[1]}</p></td>
                        </tr>
                        <tr id="test">
                            <td height="20"><p id="mess1">${messeg}</p></td>
                        </tr>
                    </table>
                </td>
                <td height="15"><p id="mess" class="${list_c[1]}">${numb}</p></td>
            </tr>
        </table>
    </div>
  `;
} else {
    // Створення структури HTML та додавання її в елемент <a>
  link.innerHTML = `
    <div class="group">
        <table>
            <tr id="test">
                <td width="60"><img class="avatar" src="/media/${list_c[0]}" style="width:60px;"></td>
                <td>
                    <table  width="250">
                        <tr id="test">
                            <td height="15"><p id="mess">${list_c[1]}</p></td>
                        </tr>
                        <tr id="test">
                            <td height="20"><p id="mess1">${messeg}</p></td>
                        </tr>
                    </table>
                </td>
                <td height="15"><p id="mess" class="${list_c[1]}">${numb}</p></td>
            </tr>
        </table>
    </div>
  `;

}

  // Додавання елемента <a> в <div class="navigation">
  navigationDiv.appendChild(link);
};


function dell_messeg() {
    var divMesseg = document.querySelector('.div_messeg');
    divMesseg.innerHTML = '';
}


// виводить контакти та повідомленя
function knopka(name, link) {

    if (link === "contact") {
        fetch(`/get_data/${name}/0`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {
        for(let i = 0; i < data.list_cont.length; i++){
            add_cont(data.list_cont[i], name)
        }
        for(let i = 0; i < data.messegs.length; i++){

            if (data.messegs[i][0][0] === data.username) {
            dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2],"r","up",data.messegs[i][1],data.messegs[i][2])
            }
            else {
            dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2],"","up",data.messegs[i][1],data.messegs[i][2])
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
    return [name, link, currentPath]
}


// видалення та додавання елементів
//var globalList_contact = [];
//globalList_contact.splice(0);
//globalList_contact.push(data.list_cont[i][3]);


// асинхрона функція
async function asyncFunction() {
    // змінюємо розмір контенту
    edit_height()

    fetch(`/new_mess_js`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.list_meseg_new.length; i++) {
                    if (data.list_meseg_new[i][1] > 0 ) {
                          var currentPath = window.location.pathname;
                          var a = currentPath.lastIndexOf("/");
                          var name = currentPath.slice(a + 1);
                          var link = currentPath.slice(1, a);

                          if (link === "contact" && name === data.list_meseg_new[i][0]) {

                              fetch(`/get_data0/${name}/${data.list_meseg_new[i][1]}`)
                              // Вказуємо URL для вашого Django view
                              .then(response => response.json())
                              .then(data => {
                              for(let i = 0; i < data.messegs.length; i++){
                                  if (data.messegs[i][0][0] === data.username) {
                                  dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2],"r","",
                                  data.messegs[i][1],data.messegs[i][2])
                                  }
                                  else {
                                  dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2],"","",
                                  data.messegs[i][1],data.messegs[i][2])
                                  }
                              }

                              })
                          }else{
                              // Отримання всіх елементів з вказаним класом className, newText
                              var elements = document.querySelectorAll('.' + data.list_meseg_new[i][0]);
                              // Зміна текстового вмісту у всіх елементах
                              elements.forEach(function(element) {
                                element.textContent = data.list_meseg_new[i][1];
                              });
                          }
                    }
                }
        });

}

function runEverySecond() {
    setInterval(async () => {
        try {
            await asyncFunction();
            // Тут можна викликати інші функції або виконати інші дії
        } catch (error) {
            console.error(error);
        }
    }, 3000); // 1000 мілісекунд = 1 секунда
}

// змінює висоту контента під екран
function edit_height() {
    // var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // console.log("Ширина екрану: " + screenWidth);
    // console.log("Висота екрану: " + screenHeight);

    var content = document.querySelector('.content');
    // Встановити висоту для .content
    content.style.height = (screenHeight - 60) + 'px';

    var content = document.querySelector('.div_messeg');
    // Встановити висоту для .content
    content.style.height = (screenHeight - 140) + 'px';
    }


// Запускає код після завантаженя сторінки
document.addEventListener("DOMContentLoaded", handler)

function handler(event) {

    var result = link_name();
    var name = result[0];
    var link = result[1];
    var link0 = result[2];

    if (link0 === "/") {
        runEverySecond()
        fetch(`/index_js`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {
            if (data.list_cont.length > 0) {
                // console.log(data.list_cont.length);
                for (let i = 0; i < data.list_cont.length; i++) {
                    add_cont(data.list_cont[i], name);

                }
            }
        });
    }

    if (link === "contact") {
        runEverySecond()
        dell_messeg()
        knopka(name, link)

    }

}


//// функції скролу
//var divMesseg = document.querySelector('.div_messeg');
//
//divMesseg.addEventListener('wheel', function (e) {
//    // Швидкість прокрутки, можна налаштувати
//    var scrollSpeed = 0.5;
//
//    // Прокручуємо вгору або вниз відповідно до напрямку колеса миші
//    divMesseg.scrollTop += e.deltaY * scrollSpeed;
//
//    // Зупиняємо подальшу обробку події колеса миші
//    e.preventDefault();
//});


var divMesseg1 = document.querySelector('.navigation');

divMesseg1.addEventListener('wheel', function (e) {
    // Швидкість прокрутки, можна налаштувати
    var scrollSpeed = 0.5;

    // Прокручуємо вгору або вниз відповідно до напрямку колеса миші
    divMesseg1.scrollTop += e.deltaY * scrollSpeed;

    // Зупиняємо подальшу обробку події колеса миші
    e.preventDefault();
});


// Запускаеться при нажаті ентеру та відправля повідомленя
document.getElementById('myTextarea').addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();  // Заборона вставляння нового рядка
        var textarea = document.getElementById('myTextarea');
        var csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        console.log(textarea.value);

        var result = link_name();
        var name = result[0];
        var link = result[1];
        var link0 = result[2];

        var data = {
            messeg: textarea.value,
            name: name,
        };

        var formData = new URLSearchParams();

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        fetch('/post_mess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
            },

            body: formData.toString(),
        })
        .then(response => response.json())
        .then(data => {
            for(let i = 0; i < data.messegs.length; i++){
                console.log(data.username)
                console.log(data.messegs[i][0])

                if (data.messegs[i][0][0] === data.username) {
                dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2]
                ,"r","",data.messegs[i][1],data.messegs[i][2])
                }
                else {
                dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2]
                ,"","",data.messegs[i][1],data.messegs[i][2])
                }
        }

        });

        textarea.value = '';  // Після відправлення очистіть поле
    }
});



// реагує на кінець скролу повідомлень та додає старі повідомленя
var divMesseg = document.querySelector('.div_messeg');

divMesseg.addEventListener('scroll', function() {

    var down = divMesseg.scrollHeight - divMesseg.clientHeight - 50
//    console.log(divMesseg.scrollTop,-down);
    if (divMesseg.scrollTop < -down ) {
        console.log('Досягнуто нижньої границі', count);

        var result = link_name();
        var name = result[0];
        var link = result[1];
        var link0 = result[2];

        if (link === "contact") {
        fetch(`/get_data/${name}/${count}`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {
        for(let i = 0; i < data.messegs.length; i++){

            if (data.messegs[i][0][0] === data.username) {
            dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2]
            ,"r","up",data.messegs[i][1],data.messegs[i][2])
            }
            else {
            dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2]
            ,"","up",data.messegs[i][1],data.messegs[i][2])
            }
        }

        })

        .catch(error => {
        console.error('Помилка при отриманні даних:', error);
        });
        }
    }
});

//alert(data.list_user);
