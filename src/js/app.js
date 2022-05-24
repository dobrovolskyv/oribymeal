import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

import Swiper, { Navigation, Pagination } from "swiper";

const swiper = new Swiper();


const basketWrapper = document.querySelector('.basket__wrapper')

window.addEventListener('click', function (event) {

    let counterWrapper;
    let counter;

    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        counterWrapper = event.target.closest('.counter-wrapper')
        counter = counterWrapper.querySelector('[data-counter]');
    }


    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === 'minus') {

        if (parseInt(counter.innerText) > 1) {
            //изменяем тест в счетчике уменьшая его на 1
            counter.innerText = --counter.innerText;
        } else if (event.target.closest('.basket__wrapper') && parseInt(counter.innerText) === 1){
             //проверка на товар коорый находится в корзине
            event.target.closest('.card__item').remove();

             //отображения статуса корзины пустая/полная
        toggleCartStatus()
        //вызываем пересчет корзины
        calcCartPrice(); 
        }

       
          
    }

   
    if (event.target.hasAttribute('data-cart')) {

        const card = event.target.closest('.card__item')

        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.card__img').getAttribute('src'),
            name: card.querySelector('.card__name').innerText,
            price: card.querySelector('.card__price').innerText,
            counter: card.querySelector('[data-counter]').innerText,
            currency: card.querySelector('.price__currency').innerText
        }

        console.log(productInfo);
        //Проверям если ли уже такой товар в корзине
        const itemInCart = basketWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        //Если товар есть в корзине
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter)
        } else {
            // если товара нет в корзине

            const cardItemHtml = `  
        <div class="card__item" data-id="${productInfo.id}">
                <div class="card__inner">
                <img class="card__img" src="${productInfo.imgSrc}" alt="" />
                    <h3 class="card__name basket__name">${productInfo.name}</h3>
                   
                    <div class="details-wrapper">
                        <div class="items counter-wrapper">
                            <div class="items__control" data-action="minus">-</div>
                            <div class="items__current" data-counter>${productInfo.counter}</div>
                            <div class="items__control" data-action="plus">+</div>
                        </div>
                        <div class="price">
                            <p class="price__currency">${productInfo.currency}</p>
                        </div>
                    </div>
                </div>
            </div>
        `

            basketWrapper.insertAdjacentHTML('beforeend', cardItemHtml)

           
        }

        card.querySelector('[data-counter]').innerText = '1';

        //отображения статуса корзины пустая/полная
        toggleCartStatus();

        //вызываем пересчет корзины
        calcCartPrice(); 
    }

    if (event.target.hasAttribute('data-action') && event.target.closest('.basket__wrapper')){
        //вызываем пересчет корзины
        calcCartPrice(); 
    }

    

})


function toggleCartStatus(){
    const orderForm = document.querySelector('#order-form')
    const cartEmpty = document.querySelector('[data-cart-empty]');
    
    if (basketWrapper.children.length > 1){
        cartEmpty.classList.add('none')
        orderForm.classList.remove('none')
    } else {
        cartEmpty.classList.remove('none');
        orderForm.classList.add('none');
    }
    
}

function calcCartPrice(){
    const cartWrapper = document.querySelector('.basket__wrapper'); 
    const priceElements = cartWrapper.querySelectorAll('.price__currency')
    const totalPriceEl = document.querySelector('.total__price'); 
 
    let priceTotal = 0;

    priceElements.forEach( function (item){

        const amountEl = item.closest('.card__item').querySelector('[data-counter]')
        

        priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText)
        
        console.log('amount', amountEl)
       console.log('price', priceTotal)
    })
    console.log(priceTotal);
    // отображаем цену на странице

    totalPriceEl.innerText = priceTotal;
}


