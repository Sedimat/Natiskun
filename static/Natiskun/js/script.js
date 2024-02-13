
// лічильник повідомлень
var count = 0;

// додає повідомлення
function dodavannya(user, text, time, side, place, img, link) {
    count++
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

// Виводить пост в групу

function add_messeg_group(poss,list_post) {
  // Отримання елементу <div class="div_messeg">
  var link0 = "/user"
  var messeg = list_post[0]
  var time = list_post[3]
  var img = list_post[1]
  var l_link = list_post[2]


  var div_messeg = document.querySelector('.div_messeg');

    // Створення елемента <div> з класом "group_messeg"
    var group_messeg = document.createElement('div');
    group_messeg.classList.add('group_messeg');

    // Створення елементів <img> для кожного зображення в масиві img
    if(img.length > 1){
    img.forEach(function(imageUrl) {
        var imgElement = document.createElement('img');
        imgElement.classList.add('img_group');
        imgElement.src = imageUrl;
        group_messeg.appendChild(imgElement); // Додавання <img> до елемента <div>
    });
    }else{
        var imgElement = document.createElement('img');
            imgElement.classList.add('img_group1');
            imgElement.src = img[0];
            imgElement.alt = 'Image';

            // Додаємо imgElement до нового div
            group_messeg.appendChild(imgElement);
    }

    l_link.forEach(function(link_url) {
        var linkElement = document.createElement('a');
        linkElement.href = link_url;
        linkElement.id = 'link'; // Додаємо клас, якщо потрібно
        linkElement.textContent = link_url;
        linkElement.style.display = "block";
        group_messeg.appendChild(linkElement);
    });


    // Створення елементів <p> для тексту повідомлення та часу
    var messElement = document.createElement('p');
    messElement.id = 'mess';
    messElement.textContent = messeg;
    group_messeg.appendChild(messElement);

    var timeElement = document.createElement('p');
    timeElement.id = 'time_g';
    timeElement.textContent = time;

    // Додавання тексту повідомлення та часу до елемента <div>
    group_messeg.appendChild(timeElement);

    // Створення елемента <a> з посиланням
    var linkElement = document.createElement('a');
    linkElement.href = '/user';
    linkElement.textContent = 'Коментарі:';
    linkElement.classList.add('link_group');

    // Додавання елемента <a> до елемента <div class="group_messeg">
    group_messeg.appendChild(linkElement);

  // Додавання елемента <a> в <div class="navigation">
  if(poss === 1){
  div_messeg.insertBefore(group_messeg, div_messeg.firstChild);
  }else{
  div_messeg.appendChild(group_messeg);
  }
};

// виводе контакти
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
                <td height="15"><a href="#" onclick="test_func(${list_c[5]})" class="head_a">💢</a><p id="mess" class="${list_c[1]}">${numb}</p></td>
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
                <td height="15"><a href="#" onclick="test_func(${list_c[5]})" class="head_a">💢</a><p id="mess" class="${list_c[1]}">${numb}</p></td>
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

                          var result = link_name();
                          var name = result[0];
                          var link = result[1];
                          var link0 = result[2];

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
    //console.log(link, name)

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

    if (link === "group" && name > 0) {

        fetch(`/group_js/${name}`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {
            if (data.list_messegs.length > 0) {
                for (let i = 0; i < data.list_messegs.length; i++) {
                    //console.log(data.list_messegs[i]);
                    add_messeg_group(1, data.list_messegs[i])
                }
            }
        });


        fetch(`/index_js`)  // Вказуємо URL для вашого Django view
        .then(response => response.json())
        .then(data => {
            if (data.list_cont.length > 0) {
                for (let i = 0; i < data.list_cont.length; i++) {
                    add_cont(data.list_cont[i], name);
                }
            }
        });

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


// додаемо повідомленя в групі
var group_form = document.getElementById('group_form');
if (group_form){
    group_form.addEventListener('keydown', function(a) {
    if (a.key === 'Enter' && !a.shiftKey) {
        a.preventDefault();  // Заборона вставляння нового рядка
        var textarea = document.getElementById('group_form');
        //console.log(textarea.value)
        var csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;

        var result = link_name();
        var id = result[0];
        var link = result[1];
        var link0 = result[2];
        //console.log(name)

        var data = {
            messeg: textarea.value,
            id: id,
        };

        var formData = new URLSearchParams();

        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }

        fetch('/group_messeg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken,
            },

            body: formData.toString(),
        })
        .then(response => response.json())
        .then(data => {
                //console.log(data.username)
                //console.log(data.post)
                add_messeg_group(1,data.post)
        });
        textarea.value = '';  // Після відправлення очистіть поле
    }
    });
}


// Додаваня нового повідомленя та повертаєм повідомлення
var myTextarea = document.getElementById('myTextarea');
if (myTextarea) {
// Запускаеться при нажаті ентеру та відправля повідомленя
    myTextarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();  // Заборона вставляння нового рядка
        var textarea = document.getElementById('myTextarea');
        var csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
        //console.log(textarea.value);

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
                //console.log(data.username)
                //console.log(data.messegs[i][0])

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
}

// додає нові повідомленя
function add_messeg(){
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



// реагує на кінець скролу повідомлень та додає старі повідомленя
var divMesseg = document.querySelector('.div_messeg');

divMesseg.addEventListener('scroll', function() {
    setTimeout(function(){
        var down = divMesseg.scrollHeight - divMesseg.clientHeight - 10;
//        console.log(divMesseg.scrollTop, -down);

        if (divMesseg.scrollTop < -down) {
            console.log('Досягнуто нижньої границі', count);
            var test = divMesseg.scrollTop;

            add_messeg()

        divMesseg.scrollTop = test;
        }
    }, 50);
});





// поверта дві латинські літери
function r_word() {
    var letters = 'abcdefghijklmnopqrstuvwxyz'; // Англійський алфавіт
    var randomLetter1 = letters.charAt(Math.floor(Math.random() * letters.length)); // Генеруємо першу букву
    var randomLetter2 = letters.charAt(Math.floor(Math.random() * letters.length)); // Генеруємо другу букву
    var randomLetters = randomLetter1 + randomLetter2; // Об'єднуємо обидві букви
    return randomLetters; // Повертаємо результат
}


function square1(x, y, color){
    var newDiv = document.createElement('div');
    newDiv.style.width = '100px';
    newDiv.style.height = '100px';
    newDiv.style.backgroundColor = color;
    newDiv.style.borderRadius = '5px';
    newDiv.style.position = 'absolute';
    newDiv.style.left = x + 'px';
    newDiv.style.top = y + 'px';
    var lett = 'id_' + r_word();
    newDiv.id = lett;

    // Додавання нового елемента в DOM
    document.body.appendChild(newDiv);

    var messageLink = document.createElement('a');
    messageLink.href = '#'; // Посилання на створений дів
    messageLink.innerText = 'Перейти1';
    messageLink.id = 'link_js'; // Додаємо id 'mess'
    newDiv.appendChild(messageLink); // Додавання посилання до body, а не нового діва

    messageLink.addEventListener('click', test); // Додаємо обробник події click

    var messageLink = document.createElement('a');
    messageLink.href = '#'; // Посилання на створений дів
    messageLink.innerText = 'Перейти2';
    messageLink.id = 'link_js'; // Додаємо id 'mess'
    newDiv.appendChild(messageLink); // Додавання посилання до body, а не нового діва

    messageLink.addEventListener('click', test); // Додаємо обробник події click

    var messageLink = document.createElement('a');
    messageLink.href = '#'; // Посилання на створений дів
    messageLink.innerText = 'Перейти3';
    messageLink.id = 'link_js'; // Додаємо id 'mess'
    newDiv.appendChild(messageLink); // Додавання посилання до body, а не нового діва

    messageLink.addEventListener('click', test); // Додаємо обробник події click

    setTimeout(function() {
        checkClickOnDiv(lett);
    }, 50);
}

function test(){
    console.log("Нажав 22")
}


function test_func(id){
    var x = event.clientX;
    var y = event.clientY;
    console.log(x, y)
    square1(x, y, "grey")


}

// Функція для видалення діва
function removeSquare(id) {
    var square = document.getElementById(id);
    if (square) {
        square.parentNode.removeChild(square);
    }
}

function checkClickOnDiv(id) {
    document.addEventListener('click', function(event) {
        if (event.target.id === id) {
            console.log('Клікнуто на елементі з id:', id);
        } else {
            console.log('Клікнуто на іншому елементі.');

            var square = document.getElementById(id);
            if (square) {
                square.parentNode.removeChild(square);
            }

        }
    });
}



//                divMesseg.style.overflow = 'hidden';
//
//        requestAnimationFrame(function() {
//            setTimeout(function() {
//                divMesseg.style.overflowY = 'auto';
//            }, 10);
//        });



//alert(data.list_user);
