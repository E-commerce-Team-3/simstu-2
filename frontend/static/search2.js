// const params2 = new URLSearchParams(window.location.search);
// const query2 = params.get("query2");
// console.log(query2);

// window.onload = function() {
//   const array=query2.split("-");
//       // // console.log(array);
//       // // console.log(array[0]);
//       // // console.log(array[1]);
//       const query3=array[1];
//       const gender=array[0];
//       // // const query="tshirt"
//       // // console.log(query);
//       fetch(`/search2/${gender}/${query3}`)
//   // fetch(`/search/${query2}`)
//   .then(response => response.json())
//   .then(data => {
//     const results = document.getElementById("products");
//     results.innerHTML = "";
//     // Add a sort button
//     // const sortBtn = document.createElement("button");
//     // sortBtn.innerHTML = "Sort by Price";
//     // sortBtn.className="sortBtn";
//     // sortBtn.addEventListener("click", function() {
//     //   data.sort((a, b) => a.price - b.price);
//     //   results.innerHTML = "";
//     //   displayCards(data, 0);
//     // });
//     // results.appendChild(sortBtn);
//     // Display the cards
//     displayCards(data, 0);
//   })
//   .catch(error => console.error(error));
// }



// ///////////////////PAGINATION/////////////////////////////////////////

// function displayCards(data, page) {
//     const itemsPerPage = 20;
//     const startIndex = page * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const currentData = data.slice(startIndex, endIndex);
//     const results = document.getElementById("products");
//     currentData.forEach(item => {
//       const card = document.createElement("div");
//       card.className="card";
//       card.setAttribute("data-product-id",item.id);
//       document.body.appendChild(card);
//       card.innerHTML = `
//       <div class="imgBox">
//     <img src="${item.image}" alt="IMAGE" class="mouse">
//     </div>

//     <div class="contentBox">
//     <h3>${item.name}</h3>
//     <h2 class="price">${item.price} €</h2>
//     <a class="buy">Buy Now</a>
//     </div>


//       `;
//       card.addEventListener("click", function() {
//         const uniqueid = this.getAttribute("data-product-id");
//         displaycard(uniqueid);
//       });
//       results.appendChild(card);
//     });
    
//     const pagination = document.createElement("div");
//     pagination.className="pagination";
//     results.appendChild(pagination);
//     const numPages = Math.ceil(data.length / itemsPerPage);
//     for (let i = 0; i < numPages; i++) {
//       const btn = document.createElement("button");
//       btn.className='pagebtn'
//       btn.innerHTML = i + 1;
//       btn.addEventListener("click", function() {
//         results.innerHTML = "";
//         displayCards(data, i);
//       });
//       pagination.appendChild(btn);
//     }
//   };


//   function displaycard(uniqueid){
//     // window.location.href = `products?uniqueid=${uniqueid}`;
//     window.open(`products?uniqueid=${uniqueid}`, '_blank');
  
//   }

//   const select = document.querySelector('#sortby');

// select.addEventListener('change', (event) => {
//   const sortBy = event.target.value;

//   // Add your sorting logic here based on the value of sortBy
// });