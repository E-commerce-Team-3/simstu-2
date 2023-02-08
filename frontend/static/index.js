function search() {
  const content = document.querySelector("#second_section");
  content.innerHTML = "";
  const query = document.getElementById("query").value;
  fetch(`/search?query=${query}`)
    .then(response => response.json())
    .then(data => {
      const results = document.getElementById("results");
      results.innerHTML = "";
      // Add a sort button
      const sortBtn = document.createElement("button");
      sortBtn.innerHTML = "Sort by Price";
      sortBtn.className="sortBtn";
      sortBtn.addEventListener("click", function() {
        data.sort((a, b) => a.price - b.price);
        results.innerHTML = "";
        displayCards(data, 0);
      });
      results.appendChild(sortBtn);
      // Display the cards
      displayCards(data, 0);
    })
    .catch(error => console.error(error));
}

function displayCards(data, page) {
  const itemsPerPage = 9;
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const results = document.getElementById("results");
  currentData.forEach(item => {
    const card = document.createElement("div");
    card.className="card";
    card.setAttribute("data-product-id",item.id);
    document.body.appendChild(card);
    card.innerHTML = `
    <img src="${item.image}" alt="" style="width:100%">
      <h2 class="card_name" >${item.name}</h2>
      <p class="card_price">$${item.price}</p>
    `;
    card.addEventListener("click", function() {
      const uniqueid = this.getAttribute("data-product-id");
      displaycard(uniqueid);
    });
    results.appendChild(card);
  });
  
  const pagination = document.createElement("div");
  pagination.className="pagination";
  results.appendChild(pagination);
  const numPages = Math.ceil(data.length / itemsPerPage);
  for (let i = 0; i < numPages; i++) {
    const btn = document.createElement("button");
    btn.className='pagebtn'
    btn.innerHTML = i + 1;
    btn.addEventListener("click", function() {
      results.innerHTML = "";
      displayCards(data, i);
    });
    pagination.appendChild(btn);
  }
}
    
    function search2(element) {
      const content = document.querySelector("#second_section");
      content.innerHTML = "";
      const a = element.id;
      const array=a.split("-");
      // console.log(array);
      // console.log(array[0]);
      // console.log(array[1]);
      const query=array[1];
      console.log(query)
      const gender=array[0];
      console.log(gender)
      // const query="tshirt"
      // console.log(query);
      // fetch(`/search2/${gender}?query=${query}`)
      fetch(`/search2/${gender}/${query}`)
      
        .then(response => response.json())
        .then(data => {
          const results = document.getElementById("results");
          results.innerHTML = "";

          const sortBtn = document.createElement("button");
          sortBtn.innerHTML = "Sort by Price";
          sortBtn.className="sortBtn";
      

      sortBtn.addEventListener("click", function() {
        data.sort((a, b) => a.price - b.price);
        results.innerHTML = "";
        displayCards(data,0);


          data.forEach(item => {
            const card = document.createElement("div");
            card.className="card";
            card.setAttribute("data-product-id",item.id);
            document.body.appendChild(card);
            card.innerHTML = `
            <img src="${item.image}" alt="" style="width:100%">
              <h2 class="card_name" >${item.name}</h2>
              <p class="card_price"> $${item.price}</p>
              
            `;
            card.addEventListener("click", function() {
              const uniqueid = this.getAttribute("data-product-id");
              window.location.href = "/product/"+uniqueid;
              console.log(uniqueid)
          });
            results.appendChild(card);
          });
        })
        results.appendChild(sortBtn);
        displayCards(data,0)
      // Display the cards
      data.forEach(item => {
        const card = document.createElement("div");
        card.className="card";
        card.setAttribute("data-product-id",item.id);
        document.body.appendChild(card);
        card.innerHTML = `
        <img src="${item.image}" alt="" style="width:100%">
          <h2 class="card_name" >${item.name}</h2>
          <p class="card_price">$${item.price}</p>
        `;
        card.addEventListener("click", function() {
          const uniqueid = this.getAttribute("data-product-id");
          displaycard(uniqueid);
        });
        results.appendChild(card);
      });
    })
    
        .catch(error => console.error(error));
  }


// Attach click event listener to all product cards
// const productCards = document.querySelectorAll(".card");
// productCards.forEach(function(productCard) {
//   productCard.addEventListener("click", function() {
//     // Get the unique id of the clicked product card
//     const uniqueid = this.getAttribute("data-uniqueid");
//     // Redirect to the product description page
//     window.location.href = "/product/" + uniqueid;
//   });
// });


function displaycard(uniqueid){
  const results=document.getElementById("results");
    results.innerHTML='';
fetch(`/product/${uniqueid}`)
  .then(response=>response.json())
  .then(data=>{
    // console.log(data);
    const prod_results=document.getElementById("prod_results");
    prod_results.innerHTML='';
    data.forEach(item => {
      console.log(data)
      const prod = document.createElement("div");
      prod.className = "prod";
      document.body.appendChild(prod);
    
      const leftColumn = document.createElement("div");
      leftColumn.className = "left-column";
      prod.appendChild(leftColumn);
    
      const img = document.createElement("img");
      // img.setAttribute("data-image", "red");
      // img.classList.add("active");
      img.className='imagemain';
      img.src = item.image;
      console.log(item.image);
      img.alt = "item.image";
      // prod.appendChild(img);
      leftColumn.appendChild(img);
    
      const rightColumn = document.createElement("div");
      rightColumn.className = "right-column";
      prod.appendChild(rightColumn);
    
      const productDescription = document.createElement("div");
      productDescription.className = "product-description";
      rightColumn.appendChild(productDescription);
    
      const productDescriptionSpan = document.createElement("span");
      productDescriptionSpan.innerText = item.category;
      productDescription.appendChild(productDescriptionSpan);
    
      const productDescriptionH1 = document.createElement("h1");
      productDescriptionH1.innerText = item.name;
      productDescription.appendChild(productDescriptionH1);
    
      const productDescriptionP = document.createElement("p");
      productDescriptionP.innerText = item.description;
      productDescription.appendChild(productDescriptionP);
    
      const productConfiguration = document.createElement("div");
      productConfiguration.className = "product-configuration";
      rightColumn.appendChild(productConfiguration);
    
      const productColor = document.createElement("div");
      productColor.className = "product-color";
      productConfiguration.appendChild(productColor);
    
      const colorSpan = document.createElement("span");
      colorSpan.innerText = "Color";
      productColor.appendChild(colorSpan);
    
      const colorChoose = document.createElement("div");
      colorChoose.className = "color-choose";
      productColor.appendChild(colorChoose);
    
      item.color.forEach(color => {
        console.log(color);
        const colorButton = document.createElement("button");
        colorButton.className = "color-button";
        colorButton.style.backgroundColor = color;
        colorChoose.appendChild(colorButton);
      });
    
      const cableConfig = document.createElement("div");
      cableConfig.className = "cable-config";
      rightColumn.appendChild(cableConfig);
    
      const sizeSpan = document.createElement("span");
      sizeSpan.innerText = "Sizes";
      cableConfig.appendChild(sizeSpan);
    
      const cableChoose = document.createElement("div");
      cableChoose.className = "cable-choose";
      cableConfig.appendChild(cableChoose);
    
      item.size.forEach(size => {
        const sizeButton = document.createElement("button");
        sizeButton.innerText = size;
        cableChoose.appendChild(sizeButton);
      });
    
      const productPrice = document.createElement("div");
      productPrice.className = "product-price";
      prod.appendChild(productPrice);

      const price = document.createElement("span");
      price.textContent = "$" + item.price;
      productPrice.appendChild(price);
      
      const cartButton = document.createElement("a");
      cartButton.className = "cart-btn";
      cartButton.href = "#";
      cartButton.textContent = "Add to cart";
      productPrice.appendChild(cartButton);
      
      prod_results.appendChild(prod);
  
  });
  
})

.catch(error => console.error(error));
}
    
  
//     data.forEach(item=> {
//       const prod=document.createElement("div");
//       prod.className="prod";
//       document.body.appendChild(prod);
    
//     prod.innerHTML+=`

//     <main class="container">
//     <div class="left-column">
//       <img data-image="red" class="active" src="${item.image}" alt="">
//     </div>

//     <div class="right-column">
  
//       <!-- Product Description -->
//       <div class="product-description">
//         <span>${item.category}</span>
//         <h1>${item.name}</h1>
//         <p>${item.description}</p>
//       </div>

//       <div class="product-configuration">
 
//       <!-- Product Color -->
//       <div class="product-color">
//         <span>Color</span>

//         <div class="color-choose">
//  `;


//  for(let col of item.color){
//   prod.innerHTML+=`<button class="color-button" style="background-color:${{col}}"></button>` ;
//  }

//   prod.innerHTML+=`
          
//     </div>
        

//   </div>
  

//     <div class="cable-config">
//       <span>Sizes</span>

//       <div class="cable-choose">`;
//       for(let size of item.size){
//         prod.innerHTML+=`<button>${size}</button>` ;
//        }
        
//        prod.innerHTML+=
//         `
//       </div>
//       </div>
//       </div>
      
      
//       <div class="product-price">
//         <span>${item.price}</span>
//         <a href="#" class="cart-btn">Add to cart</a>
//       </div>
//     </div>
//   </main>
//   `;
    











// {/* <p class="card_ID">ID:${item.id}</p> */}










// // const searchInput = document.querySelector("#query");
// // const searchButton = document.querySelector("#submit_button");
// // const productCards = document.querySelector("#productCards");
// // searchButton.addEventListener("click", () => {
// //   const query = searchInput.value;
// //   fetch(`http://localhost:5000/search?query=${query}`)
// //     .then(response => response.json())
// //     .then(data => {
// //       productCards.innerHTML = "";
// //       data.forEach(product => {
// //         const card = document.createElement("div");
// //         card.classList.add("card");
// //         card.innerHTML = `
// //           <h3>${product.name}</h3>
// //           <p>Price: ${product.price}</p>
// //         `;
// //         productCards.appendChild(card);
// //       });
// //     });
// // });

// // function search() {
// //     const query = document.getElementById("query").value;
// //     fetch(`/search?query=${query}`)
// //       .then(response => response.json())
// //       .then(data => {
// //         // handle the response data here
// //       })
// //       .catch(error => console.error(error));
// //   }

// // function search() {
// //   const query = document.getElementById("query").value;
// //   fetch(`/search?query=${query}`)
// //     .then(response => response.json())
// //     .then(data => {
// //       const results = document.getElementById("results");
// //       results.innerHTML = "";
// //       data.forEach(item => {
// //         const card = document.createElement("div");
// //         card.innerHTML = `
// //           <h2>${item.name}</h2>
// //           <p>Price: $${item.price}</p>
// //         `;
// //         results.appendChild(card);
// //       });
// //     })
// //     .catch(error => console.error(error));
// // }

