let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem('data')) || []


let calculation = () => {
    let cartIcon = document.getElementById('cartAmount')
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((a,b) => a + b,0)
}

calculation()

let generateCartItems = () => {
    if(basket.length !== 0){
       return (shoppingCart.innerHTML = basket.map((x) => {
        let{item,id} = x
        let search  = shopItemsData.find((y) => y.id === id) || []
        return `
        <div class = "cart-item" >
            <img width = "100" src = ${search.img} />
            <div class = "details">
                <div class = "tittle-price-x">
                    <h4 class = "tittle-price">
                    <p>${search.name}</p>
                    <p class = "cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i onclick = "removeItem(${id})" class="bi bi-x-lg"></i>
                </div>

                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
              </div>

                <h3>$ ${item * search.price}</h3>
            </div>
        </div>
        `
       }).join(''))
    }
    else{
        shoppingCart.innerHTML = "";
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
          <button class="HomeBtn">Back to Home</button>
        </a>
        `;
    }
}

generateCartItems()

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) {
      basket.push({
        id: selectedItem.id,
        item: 1,
      });
    } else {
      search.item += 1;
    }
  
    generateCartItems()
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  };
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
  
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems()
    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount()
};
  

let removeItem = (id) => {
    let selectedItem = id
    // console.log(selectedItem.id)
    basket = basket.filter((x) => x.id !== selectedItem.id)
    generateCartItems()
    TotalAmount()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
    basket = []
    generateCartItems()
    calculation()
    localStorage.setItem("data", JSON.stringify(basket));
}

let TotalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) => {
            let {item,id} = x
            let search  = shopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((a,b) => a + b,0 )

        label.innerHTML = `
            <h2>Total Bill : $ ${amount}</h2>
            <button class = "checkout">CheckOut</button>
            <button onclick = "clearCart()" class = "removeAll">Remove All</button>
        `
    }
    else return
}

TotalAmount()