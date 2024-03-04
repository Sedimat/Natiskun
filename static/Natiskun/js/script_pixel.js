console.log("{jgf")

var contentDiv = document.querySelector('.content');


for (let i = 0; i < 31; i++) {
    var a = i * 40;

var newDiv = document.createElement('div');
   newDiv.classList.add('square');
   newDiv.id = 'div_' + i;
   newDiv.style.left = 5 + a + 'px';
   newDiv.style.top = 100 + 'px';
   newDiv.style.position = 'absolute';

   contentDiv.appendChild(newDiv);
}