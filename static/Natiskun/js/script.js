
function dodavannya(user, text, time, side, place, img) {
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
        console.log(img);
        for (let i = 0; i < img.length; i++) {
            var imgElement = document.createElement('img');
            imgElement.id = 'img_post';
            imgElement.src = img[i];
            imgElement.alt = 'Image';

            // Додаємо imgElement до нового div
            newDivElement.appendChild(imgElement);
        }
    }

    var messageElement = document.createElement('p');
    messageElement.id = 'mess';
    messageElement.textContent = text;

    var timeElement = document.createElement('p');
    timeElement.id = 'time';
    timeElement.textContent = time;

    // Додаємо нові елементи до нового div
    newDivElement.appendChild(messageElement);
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
                            <td height="20"><p id="mess1">${list_c[2]}</p></td>
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
                            <td height="20"><p id="mess1">${list_c[2]}</p></td>
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
        fetch(`/get_data/${name}`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {
        for(let i = 0; i < data.list_cont.length; i++){
            add_cont(data.list_cont[i], name)
        }
        for(let i = 0; i < data.messegs.length; i++){

            if (data.messegs[i][0][0] === data.username) {
            dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2],"r","up",data.messegs[i][1])
            }
            else {
            dodavannya(data.messegs[i][0][0], data.messegs[i][0][1], data.messegs[i][0][2],"","up",data.messegs[i][1])
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

                              fetch(`/get_data0/${name}/${data.list_meseg_new[i][1]}`)  // Вказуємо URL для вашого Django view
                              .then(response => response.json())
                              .then(data => {
                              for(let i = 0; i < data.messegs.length; i++){
                                  if (data.messegs[i][0] === data.username) {
                                  dodavannya(data.messegs[i][0], data.messegs[i][1], data.messegs[i][2],"r","",data.messegs[i][1])
                                  }
                                  else {
                                  dodavannya(data.messegs[i][0], data.messegs[i][1], data.messegs[i][2],"","",data.messegs[i][1])
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
    content.style.height = (screenHeight - 70) + 'px';

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


// Запустіть функцію
// runEverySecond();


//alert(data.list_user);



//if (link === "contact") {
//
//} else {
//
//}