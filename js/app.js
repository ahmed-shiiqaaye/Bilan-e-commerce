let imgContainer = document.querySelector('.img-side');
let images = document.querySelectorAll('.img-container img');
let act = 0;

images.forEach((img,i)=>{
    img.addEventListener('click',function(){
        images[act].classList.remove('active');
        imgContainer.style.background = `url(${img.src}) center center/cover`
        img.classList.add('active')
         act = i
    })
})


let sizes = document.querySelectorAll('.size');
let currentSize = 0;
sizes.forEach((size,i)=>{
    size.addEventListener('click',()=>{
        sizes[currentSize].classList.remove('active');
        size.classList.add('active');
        currentSize = i;
    })
})


//  sliders
let nexBtn = document.querySelector('.next')
let prevBn = document.querySelector('.prev')
let containerScroll = document.querySelector('.product-containers') 

// let containerDimension = item.getBoundingClientRect();
// let containerWidth = containerDimension.width;

let containerDimension = containerScroll.getBoundingClientRect();
    let containerWidth = containerDimension.width;


    nexBtn.addEventListener('click',function(){
    containerScroll.scrollLeft +=  containerWidth
    })
    prevBn.addEventListener('click',function(){
    containerScroll.scrollLeft -=  containerWidth
    })
    if(containerDimension === containerWidth){
        nexBtn.style.display = none
    }



    // fixed nav
let settings = document.querySelector('.fixed-seting');
let sideBar = document.querySelector('.sideBar');
let closeBtn = document.getElementById('close')
settings.addEventListener('click',function(){
    sideBar.classList.add('show')
})
closeBtn.addEventListener('click',function(){
    sideBar.classList.toggle('show')
})


if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    let removeBtn = document.querySelectorAll('.removeBtn');
    removeBtn.forEach((remBtn,i)=>{
        remBtn.addEventListener('click',removingCarRow)
    })

    // quantity changed
    let quantityInputs = document.getElementsByClassName('input');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', inputChanged)
    }

    // adding to the cart
    let addToCart = document.getElementsByClassName('addToCart');
    for (let i = 0; i < addToCart.length; i++) {
        let addToCartBtn = addToCart[i]
        addToCartBtn.addEventListener('click',addingToCart)
    }
}


// remove functon
function removingCarRow(e){
    let parentRow = e.target.parentElement
    parentRow.remove();
    updateTotal()
}

// quantityChanged
function inputChanged(e){
    let input = e.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

// adding the items to the cart
function addingToCart(e){
    let button = e.target;
    let btnParent = e.target.parentElement.parentElement
    let productCard = btnParent.parentElement;
    let nameItem = productCard.getElementsByClassName('name')[0].innerText; 
    let priceItem = productCard.getElementsByClassName('price')[0].innerText; 
    let imgItem = productCard.querySelectorAll('.img img')[0].src; 
    let price = parseFloat(priceItem.replace('$',""))


    pushToCart(nameItem,price,imgItem)
    updateTotal()
}
function pushToCart(nameItem,price,imgItem){
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('row');

    let mySideBars = document.getElementsByClassName('sideBar')[0];
    let cardItemsName = mySideBars.getElementsByClassName('name')[0]
}

// updateTotal
function updateTotal(){
    let mySideBar = document.getElementsByClassName('sideBar')[0];
    let sideBarRows = mySideBar.getElementsByClassName('row');
    let total = 0;
    for (let i = 0; i < sideBarRows.length; i++) {
        let row = sideBarRows[i];
        let priceElement = row.getElementsByClassName('price')[0];
        let quantityElement = row.getElementsByClassName('input')[0];

        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantityValue = quantityElement.value;

        total = total + (price * quantityValue)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-no')[0].innerText = '$'+total
}








