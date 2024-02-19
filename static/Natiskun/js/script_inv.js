

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


var mediaRecorder; // Глобальна змінна для об'єкта MediaRecorder
var chunks = []; // Масив для зберігання аудіоданих

function record() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            // Створити новий MediaRecorder об'єкт для запису аудіо
            mediaRecorder = new MediaRecorder(stream);

            // Додати обробник події для отримання аудіоданих
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            };

            // Почати запис аудіо
            mediaRecorder.start();
        })
        .catch(function(err) {
            console.error('Помилка отримання доступу до мікрофону:', err);
        });
}

function stop() {
    // Перевірка, чи об'єкт MediaRecorder існує
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        // Зупинити запис аудіо
        mediaRecorder.stop();

        // Додати обробник події для завершення запису
        mediaRecorder.onstop = function() {
            // Створити Blob з аудіоданих
            var blob = new Blob(chunks, { type: 'audio/wav' });

            // Очистити масив chunks
//            chunks = [];
//
//            // Зберегти запис аудіо як файл
//            var url = URL.createObjectURL(blob);
//            var a = document.createElement('a');
//            a.href = url;
//            a.download = 'audio.wav';
//            document.body.appendChild(a);
//            a.click();
//            window.URL.revokeObjectURL(url);
        };
    }
}

function play_r() {
    console.log(chunks)
    if (chunks.length === 0) {
        console.error('Немає записаного звуку для відтворення');
        return;
    }

    // Збираємо всі частини записаного звуку у Blob
    var audioBlob = new Blob(chunks, { type: 'audio/wav' });

    // Створюємо URL для відтворення аудіо
    var audioUrl = URL.createObjectURL(audioBlob);

    // Створюємо аудіоелемент та відтворюємо звук
    var audioElement = new Audio(audioUrl);
    console.log(audioElement)
    audioElement.play();
}

function send(){
    var blob = new Blob(chunks, { type: 'audio/mp3' });

    var csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    // Створення об'єкту FormData для відправки даних на сервер
    var formData = new FormData();
    formData.append('csrfmiddlewaretoken', csrftoken); // Додавання токена CSRF
    formData.append('audio_blob', blob, 'audio.mp3'); // Додавання аудіофайлу

    // Відправка запиту POST на сервер
    fetch('/load_sound', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
      .then(data => {
        // Тут ви можете отримати ваше повідомлення з JSON-відповіді
        console.log(data.message);
    })


}


