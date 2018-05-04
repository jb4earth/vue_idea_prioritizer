

// Get Item from LocalStorage or products === []
var init_products = [{ name: 'bad idea', social: 0, environmental: 0, monetary: 0, ease: 0}]
var products = localStorage.getItem('products') || init_products;
// If the user has more points than the currently stored high score then
function saveProducts () {
  if (products != init_products) {
  // save products to local storage
  localStorage.setItem('products', products);
  }
}



// total the existing items from the above var
for (i = 0; i < products.length; i++) {
    products[i].total =  totalItems(products[i].social,products[i].environmental,products[i].monetary,products[i].ease)
    products[i].ID = Math.random()
}

// simple summation - TODO make multipliers exposed variable
function totalItems (social, environmental, monetary, ease) {
  return (social + environmental +  (monetary*2) +  (ease*3))
  saveProducts()
}

// sort by selected - TODO should sort in opposite direction on second click but does not.
function sortBy(arr, key) {
  return arr.sort(function (a, b) {
    if (a[key] < b[key]) return 1
    if (a[key] > b[key]) return -1
    return 0
  })
}

// where the magic happens
new Vue({
  el: '#products',
  data: {
    sort: products
  },
  methods: {
    sortBy: function(key) {
      sortBy(this.sort, key)
    },
    addItemByVue: function() {
      var iname = document.getElementById("iname").value
      var isocial = parseInt(document.getElementById("isocial").value)
      var ienvironmental = parseInt(document.getElementById("ienvironmental").value)
      var imonetary = parseInt(document.getElementById("imonetary").value)
      var iease = parseInt(document.getElementById("iease").value)
      if ((iname == "") || (isocial == 0 && ienvironmental == 0 && imonetary == 0 && isocial == 0 && iease == 0)) {
        if (iname == "") {
//           TODO - make a custom alert - browser alerts are ugly
            alert('add a name!')
            }
        else{
          alert('rate your idea')
        }
      } else {
      itotal = totalItems(isocial,ienvironmental,imonetary,iease)
      this.sort.push({ name: iname, social: isocial, environmental: ienvironmental, monetary: imonetary, ease: iease, total: itotal, ID: Math.random()})
      document.getElementById("iname").value = "";
      document.getElementById("isocial").value = "0";
      document.getElementById("ienvironmental").value = "0";
      document.getElementById("imonetary").value = "0";
      document.getElementById("iease").value = "0";
      saveProducts()
      }
    },
    deleteItemByVue: function(ID) {
      var index = this.sort.indexOf(ID);
      console.log(index)
      if (index !== -1) this.sort.splice(index, 1);
      saveProducts()
    },
    editItemByVue: function(ID) {
      var index = this.sort.indexOf(ID);
      console.log(index)
      document.getElementById("iname").value = ID.name;
      document.getElementById("isocial").value = ID.social;
      document.getElementById("ienvironmental").value = ID.environmental;
      document.getElementById("imonetary").value = ID.monetary;
      document.getElementById("iease").value = ID.ease;
      console.log(ID.iease)
      if (index !== -1) this.sort.splice(index, 1);
      saveProducts()
      }
    },
  mounted: function () {
    this.sortBy('total')
  }

})
