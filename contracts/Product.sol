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
