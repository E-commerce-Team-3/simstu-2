var searchForm = document.getElementById("search-form");
  searchForm.onsubmit = function(event) {
    event.preventDefault();
    var searchField = document.getElementById("search-field");
    var value = searchField.value;
    search(value);
  };


function search() {
  // const content = document.querySelector("#second_section");
  // content.innerHTML = "";
  const query = document.getElementById("search-field").value;
  window.location.href = `search?query=${query}`;
}







    
    
    function search2(element) {
      // const content = document.querySelector("#second_section");
      // content.innerHTML = "";
      const query2 = element.id;
      window.location.href = `search?query2=${query2}`;

      
    }

   
  
  
    function displaycard(uniqueid){
      // window.location.href = `products?uniqueid=${uniqueid}`;
      window.open(`products?uniqueid=${uniqueid}`, '_blank');
    
    }
  
  


function displaycard(uniqueid){
  // window.location.href = `products?uniqueid=${uniqueid}`;
  window.open(`products?uniqueid=${uniqueid}`, '_blank');

}


