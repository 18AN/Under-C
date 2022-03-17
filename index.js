"use strict"
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    const popup = document.getElementById('popup');
    form.addEventListener('submit', formSend);
    const closePopup = document.getElementById('close');
    const cancelPopup = document.getElementById('cancel');
    const otherSiteLink = document.getElementById('link');

    otherSiteLink.addEventListener('click', () => {
        return location.href = 'http://www.yandex.ru/';
    })
    closePopup.addEventListener('click', onClick)
    cancelPopup.addEventListener('click', onClick)

    function onClick(){
        popup.classList.add('_hidden');
    }

    async function formSend(e){
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if(error===0){
            let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                popup.classList.remove('_hidden')//popup here
                form.reset();
            }else{
                alert('error');
            }

        }else{
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form){
        let error = 0;
        let formRequired = document.querySelectorAll('._required')

        for (let index = 0; index < formRequired.length; index++) {
            const input = formRequired[index];

            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)){
                    formAddError(input);
                    error++;
                }else if(input.value===""){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error
    }

    function formAddError(input){
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input){
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }

    function emailTest(input){
        return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value);
    }
    
})

let today = Date.now();
let date = new Date(2022,11,31);
let deadline = date.getTime();
let timer = deadline - today;
let timestampSeconds=  Math.floor((timer / 1000) )
let clockId = null

let days = document.getElementById('days')
let hours = document.getElementById('hours')
let minutes = document.getElementById('minutes')
let seconds = document.getElementById('seconds')

function clock(){
    --timestampSeconds;
    if (timestampSeconds < 0) return clearTimout(clockId)
    days.textContent = Math.floor(timestampSeconds / (60 * 60 * 24));
    hours.textContent =('0'+Math.floor((timestampSeconds / ( 60 * 60)) % 24)).slice(-2);
    minutes.textContent = ('0'+Math.floor((timestampSeconds / 60) % 60)).slice(-2);
    seconds.textContent = ('0'+(Math.floor(timestampSeconds % 60))).slice(-2);
}

function start(){
    clockId = setInterval(clock,1000);
}

start()







