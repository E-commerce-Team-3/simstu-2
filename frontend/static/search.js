let globaldata;


const params = new URLSearchParams(window.location.search);
const query = params.get("query");
console.log(query);
if(query){
window.onload = function() {
    fetch(`/search/${query}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const results = document.getElementById("products");
      results.innerHTML = "";
      const sortBtn = document.getElementById("sortprice");

      
      sortBtn.addEventListener("click", function() {
        data.sort((a, b) => a.price - b.price);
        results.innerHTML = "";
        displayCards(data, 0);
      });
      displayCards(data, 0);
    })
    .catch(error => console.error(error));
}
}

const params2 = new URLSearchParams(window.location.search);
const query2 = params.get("query2");
console.log(query2);
if(query2){
window.onload = function() {
  const array=query2.split("-");
      const query3=array[1];
      const gender=array[0];
      fetch(`/search2/${gender}/${query3}`)
  .then(response => response.json())
  .then(data => {
    const results = document.getElementById("products");
    results.innerHTML = "";
    globaldata=data;
    // Add a sort button
    const sortBtn = document.getElementById("sortprice");

    sortBtn.addEventListener("click", function() {
      data.sort((a, b) => a.price - b.price);
      results.innerHTML = "";
      displayCards(data, 0);
    });
    displayCards(data, 0);
  })
  .catch(error => console.error(error));
}
}


///////////////////PAGINATION/////////////////////////////////////////

function displayCards(data, page) {
    const itemsPerPage = 20;
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);
    const results = document.getElementById("products");
    currentData.forEach(item => {
      const card = document.createElement("div");
      card.className="card";
      card.setAttribute("data-product-id",item.id);
      document.body.appendChild(card);
      card.innerHTML = `
      <div class="imgBox">
    <img src="${item.image}" alt="IMAGE" class="mouse">
    </div>

    <div class="contentBox">
    <h3>${item.name}</h3>
    <h2 class="price">${item.price} €</h2>
    <a class="buy">Buy Now</a>
    </div>


      `;
      card.addEventListener("click", function() {
        const uniqueid = this.getAttribute("data-product-id");
        displaycard(uniqueid);
      });
      results.appendChild(card);
    });
    
    const pagination = document.getElementById("pagination");
    pagination.innerHTML="";
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
  };


  function displaycard(uniqueid){
    window.open(`products?uniqueid=${uniqueid}`, '_blank');
    // fetch(`/recommendation/${uniqueid}`)
    // .then(response => response.json())
    // .then(data => {
    //   console.log("Hello......................")
    //   const results = document.getElementById("products");
    //   results.innerHTML = "";
    //   const sortBtn = document.getElementById("sortprice");

      
    //   sortBtn.addEventListener("click", function() {
    //     data.sort((a, b) => a.price - b.price);
    //     results.innerHTML = "";
    //     displayCards(data, 0);
    //   });
    //   displayCards(data, 0);
    // })
  
  }

  