contract Product {
  uint public id;
  string public name;
  string public category;
  uint public price;

  function Product(uint _id, string _name, string _category, uint _price) {
    id = _id;
    name = _name;
    category = _category;
    price = _price;
  }

  function changeProduct(string _name, string _category, uint _price)  {
    name = _name;
    category = _category;
    price = _price;
  }
}

contract ProductManager {
  Product[] products;

  function createProduct(uint _id, string _name, string _category, uint _price) {
    products.push(new Product(_id,  _name,  _category,  _price));
  }
  function changeProduct(uint _id, string _name, string _category, uint _price) {
    uint i = 0;
    for (i=0; i<products.length; i++) {
      if (products[i].id() == _id){
        break;
      }
    }
    products[i].changeProduct(_name,  _category,  _price);
  }
}
