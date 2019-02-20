fetch("http://localhost:3000/hot-product")
    .then(function (response) {
        console.log("resonse", response);
        return response.json();
    })
    .then(function (result) {
        console.log("result", result);

        //element of product
        var img_product = document.getElementsByClassName("product__img");
        var brand_product = document.getElementsByClassName("product__detail__type");
        var name_product = document.getElementsByClassName("product__detail__name");
        var price_new_product = document.getElementsByClassName("product__detail__price__new");
        var price_old_product = document.getElementsByClassName("product__detail__price__old");
        var button_product = document.getElementsByClassName("product__detail__button__buy");

        //set value into each of product
        for(var i = 0; i<result.length;i++){
            console.log("product",result[i]);
            img_product[i].src = result[i].img;
            brand_product[i].innerText = result[i].brand;
            name_product[i].innerText = result[i].name_type;
            price_new_product[i].innerText = result[i].new_price;
            price_old_product[i].innerText = result[i].old_price;
            button_product[i].value = result[i].id;
            console.log('button',button_product[i]);
        }

    });

function fetchUri(uri) {
    fetch(uri)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            return result;
        });
}
//localstorage can save object
// Storage.prototype.setObject = function(key, value) {
//     this.setItem(key, JSON.stringify(value));
// }
//
// Storage.prototype.getObject = function(key) {
//     var value = this.getItem(key);
//     return value && JSON.parse(value);
// }

/*
add to cart, save into localstorage
@param value : value in button to click product
 */
function addToCart(value){
    console.log("id product added",value);

    fetch(`http://localhost:3000/hot-product/${value}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log("product added",result);
            var cart = localStorage.getItem(`cart_${value}`);
            console.log("cart before",cart);
            if(cart===null){
                var item = {"id":value,"img":result.img,"name":result.name_type,"price":result.new_price,"number":1};
                console.log("item",item);
                localStorage.setItem(`cart_${value}`,JSON.stringify(item));
            }
            else{
                var cartFormat = JSON.parse(cart);
                console.log(cartFormat);
                cartFormat.number = cartFormat.number+1;
                console.log("cart after",cartFormat);
                localStorage.setItem(`cart_${value}`,JSON.stringify(cartFormat));
            }
        });
    // var product = fetchUri(`http://localhost:3000/hot-product/${value}`);
    // console.log(product);
    // window.location.href="";
}

//show in cart
function showInCart(){
    var list_item = document.getElementsByClassName("list__item")[0];
    list_item.innerHTML ="";//đỡ xóa bên giao diện

    console.log(localStorage);
    var sumPriceInCart = 0;
    for(item in localStorage){
        if(item.includes("cart",0)){
            var cart_item = JSON.parse(localStorage.getItem(item));
            var id_product = cart_item.id;
            var img_product = cart_item.img;
            var name_product = cart_item.name;
            var price_product = cart_item.price;
            var number = cart_item.number;
            sumPriceInCart += price_product*number;
            var item = `<div class="cart__item">
                            <img class="cart__item__img" src=${img_product}>
                            <div class="cart__item__description">
                                <p class="cart__item__description__name">${name_product}</p>
                                <p class="cart__item__description__price">${price_product}<sup>đ</sup></p></div>
                            <button value="${id_product}" onclick="removeProductInCart(this.value)">x</button></div>`;
            /* tag a not pass value on event(this.value)*/
            console.log(item)
            // list_item.appendChild(document.createTextNode(item));
            console.log('list item',list_item);
            list_item.innerHTML += item;
        }
    }
    var sumPriceInCartTag = document.getElementsByClassName("cart__sum-price__value")[0];
    sumPriceInCartTag.innerText = sumPriceInCart;
}
showInCart();

/*
   @param: value: id product when click product
 */
function removeProductInCart(value){
    console.log(value);
    localStorage.removeItem(`cart_${value}`);
    window.location.href="";
}
