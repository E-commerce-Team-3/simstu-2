const params = new URLSearchParams(window.location.search);
const uniqueid = params.get("uniqueid");
console.log(uniqueid);

window.onload = function() {
  fetch(`/product/${uniqueid}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // const prodResults = document.getElementById("prod_results");
      const container =document.getElementById("container");
      // prodResults.innerHTML = '';
      container.innerHTML = '';
      data.forEach(item => {
        // const prod = document.createElement("div");
        // prod.className = "prod";
      // document.body.appendChild(prod);
    
      const leftColumn = document.createElement("div");
      leftColumn.className = "left-column";
      container.appendChild(leftColumn);
    
      const img = document.createElement("img");
      // img.setAttribute("data-image", "red");
      // img.classList.add("active");
      img.className='imagemain';
      img.src = item.image;
      img.onerror = function() {
        console.error("Failed to load image");
        this.src = "default-image.png";
      };
      console.log(img.src);
      img.alt = "item.image";
      // prod.appendChild(img);
      leftColumn.appendChild(img);
      // rightColumn.appendChild(img);

      const rightColumn = document.createElement("div");
      rightColumn.className = "right-column";
      container.appendChild(rightColumn);
    
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
      rightColumn.appendChild(productPrice);

      const price = document.createElement("span");
      price.textContent = "$" + item.price;
      productPrice.appendChild(price);
      
      const cartButton = document.createElement("a");
      cartButton.className = "cart-btn";
      cartButton.href = "#";
      cartButton.textContent = "Add to cart";
      productPrice.appendChild(cartButton);
      
      // prodResults.appendChild(prod);
  
  });
  
})

.catch(error => console.error(error));
}
