const modal = document.getElementsByClassName('modal')[0];
const close = document.getElementsByClassName('close')[0];
const submit = document.getElementById('submit');

submit.addEventListener('click', (e)=>{
    modal.style.display='block';
});

close.addEventListener('click', (e)=>{
    modal.style.display='none';
});
