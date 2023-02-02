function search() {
    const content = document.querySelector("#content");
      content.innerHTML = "";
        const query = document.getElementById("query").value;
        fetch(`/search?query=${query}`)
          .then(response => response.json())
          .then(data => {
            const results = document.getElementById("results");
            results.innerHTML = "";
            data.forEach(item => {
              const card = document.createElement("div");
              card.className="card";
              card.setAttribute("data-product-id",item.id);
              document.body.appendChild(card);
              card.innerHTML = `
              <img src="${item.image}" alt="" style="width:100%">
                <h2 class="card_name" >${item.name}</h2>
                <p class="card_price">Price: $${item.price}</p>
                
              `;
              card.addEventListener("click", function() {
                const uniqueid = this.getAttribute("data-product-id");
                window.location.href = "/product/"+uniqueid;
            });
              results.appendChild(card);
            });
          })
          .catch(error => console.error(error));
      }
      
      
      function search2(element) {
        const content = document.querySelector("#content");
        content.innerHTML = "";
        const a = element.id;
        const array=a.split("-");
        // console.log(array);
        // console.log(array[0]);
        // console.log(array[1]);
        const query=array[1];
        const gender=array[0];
        // const query="tshirt"
        // console.log(query);
        fetch(`/search2/${gender}?query=${query}`)
        
          .then(response => response.json())
          .then(data => {
            const results = document.getElementById("results");
            results.innerHTML = "";
            data.forEach(item => {
              const card = document.createElement("div");
              card.className="card";
              card.setAttribute("data-product-id",item.id);
              document.body.appendChild(card);
              card.innerHTML = `
              <img src="${item.image}" alt="" style="width:100%">
                <h2 class="card_name" >${item.name}</h2>
                <p class="card_price">Price: $${item.price}</p>
                
              `;
              card.addEventListener("click", function() {
                const uniqueid = this.getAttribute("data-product-id");
                window.location.href = "/product/"+uniqueid;
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
  
  