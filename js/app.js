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

let nexBtn = document.querySelectorAll('.next')
let prevBn = document.querySelectorAll('.prev')
let productContainer = document.querySelectorAll('.product-containers') 

productContainer.forEach((item,i)=>{
    let containerDimension = item.getBoundingClientRect();
    let containerWidth = containerDimension.width;

    nexBtn[i].addEventListener('click',()=>{
        item.scrollLeft +=  containerWidth
    })
    prevBn[i].addEventListener('click',()=>{
        item.scrollLeft -=  containerWidth
    })
})

// header makin fixed
window.addEventListener('scroll',function(){
    let header = document.getElementsByClassName('header')[0];
    let headerHeight = header.getBoundingClientRect().height;
    let scrollHight = window.pageYOffset;

    if(scrollHight > headerHeight){
        header.classList.add('fixed-header')
    }else{
        header.classList.remove('fixed-header')
    }
})

    // fixed nav
let settings = document.querySelector('.social');
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

    // buy button
    let buyBtn = document.getElementsByClassName('clear-rows')[0];
    buyBtn.addEventListener('click',buyNow)

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
    let nameItem = btnParent.getElementsByClassName('name')[0].innerText; 
    let priceItem = btnParent.getElementsByClassName('price')[0].innerText; 
    let imgItem = btnParent.getElementsByClassName('image-product')[0].src; 
    // let nameItem = productCard.getElementsByClassName('name')[0].innerText; 
    // let priceItem = productCard.getElementsByClassName('price')[0].innerText; 
    // let imgItem = productCard.getElementsByClassName('image-product')[0].src; 
    let price = parseFloat(priceItem.replace('$',""))

    let imagePosition = imgItem.indexOf('img');
    let imgSrc = imgItem.slice(imagePosition)
    pushToCart(nameItem,price,imgSrc)
    updateTotal()
}
function pushToCart(nameItem,price,imgSrc){
    alert(` item is added to cart`)
    // content
    let content = document.querySelector('.content');
    // tottal 
    let sidebarsTotal = document.getElementById("total");
    // create div and add the class of your name
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('row');
    
    let innettext = `  <div class="img">
    <img src="${imgSrc}" alt="">
    </div>
    <div class="detail">
    <div class="flex">
    <p class="name">${nameItem}</p>
    <p class="price">$${price}</p>
    </div>
        <input type="number" class="input" value="1">
        </div>
        <button class="removeBtn">
        <i class="fa fa-trash "></i>
        </button>`
        
        cartShopBox.innerHTML = innettext
        let myLeftSideBar = document.getElementsByClassName('sideBar')[0];
    let leftSidebar = document.getElementsByClassName('sideBar')[0];
    leftSidebar.appendChild(cartShopBox);

    cartShopBox.getElementsByClassName('removeBtn')[0].addEventListener('click',removingCarRow)
    cartShopBox.getElementsByClassName('input')[0].addEventListener('click',inputChanged)
    content.appendChild(cartShopBox)
    updateTotal()
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
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-no')[0].innerText = '$'+total;
}

function buyNow(){
    alert('your order is plaaced')    
    let content = document.querySelectorAll('.content')[0];
    while(content.hasChildNodes()){
        content.removeChild(content.firstChild)
    }
    updateTotal()
}


// closeBtn
let linksaheader = document.querySelector('.links');

let menuBars = document.querySelector('.menu-bar');
menuBars.addEventListener('click',()=>{
linksaheader.classList.toggle('show')

});






let nowDate = new Date().getFullYear();
let copyRightDate = document.querySelector('.date');
copyRightDate.innerText = nowDate;
