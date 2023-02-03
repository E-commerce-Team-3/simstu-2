// function displayProductCards(productDetails) {
//     productDetails.forEach((product) => {
//         let productCard = document.createElement("div");
//         productCard.classList.add("product-card");

//         let productName = document.createElement("div");
//         productName.innerHTML = product.product_name;
//         productCard.appendChild(productName);

//         let productPrice = document.createElement("div");
//         productPrice.innerHTML = product.price;
//         productCard.appendChild(productPrice);

//         document.getElementById("product-container").appendChild(productCard);
//     });
// }







// const submitButton = document.getElementById('submit_button');
// const searchInput = document.getElementById('query');

// // submitButton.addEventListener('click', function (event) {
// //     event.preventDefault();
// //     const query = searchInput.value;
// //     const rows = "3"
// //     const endpoint = "https://search.unbxd.io/fb853e3332f2645fac9d71dc63e09ec1/demo-unbxd700181503576558/search"
// //     fetch(endpoint, {
// //         method: "GET",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         params: { 'q': query, 'rows': rows }
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //         const product_ids = [product["uniqueId"] for (product in data["response"]["products"][:10]])
// //         // send the product_ids to your Python server
// //         postData('/get_unid', {product_ids: product_ids})
// //     });
// // });

// // document.getElementById("searchmain").addEventListener("submit", function(event) {
// //     event.preventDefault();
// //     var searchQuery = document.getElementById("query").value;
// //     fetch(`https://search.unbxd.io/fb853e3332f2645fac9d71dc63e09ec1/demo-unbxd700181503576558/search?q=${searchQuery}&rows=10`)
// //         .then(response => response.json())
// //         .then(data => {
// //             // Do something with the data here
// //             console.log(data);
// //         })
// //         .catch(error => {
// //             console.error("Error:", error);
// //         });
// //         postData('/get_unid', {data})
// // });


// // async function postData(url = '', data = {}) {
// //     const res = await fetch(url, {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(data)
// //     });
// //     return await res.json();
// // }
  