

contract Passport {
    address public passportOffice; //owner

    string public name;
    string public dateCreated;
    string public dateExpires;
    string public residentialAddress;
    uint8  public age;

    string public countryOfOrigin;
    // list for everytime someone uses the passport
    // string[] entries;

    function Passport(string _name, string _dateCreated, string _dateExpires,
                      string _residentialAddress, uint8 _age, string _countryOfOrigin) {

        // store the owner's address (i.e. passport office)
        passportOffice = msg.sender;

        name = _name;
        dateCreated = _dateCreated;
        dateExpires = _dateExpires;
        residentialAddress = _residentialAddress;
        age = _age;
        countryOfOrigin = _countryOfOrigin;
    }

    function edit() returns (bool) {
        return true;
    }

    function renew(string _dateExpires) returns (bool) {
        // make sure only the passportOffice (i.e. passport office) can access
        if(passportOffice != msg.sender) {
            return false;
        }

        // update the expires date
        dateExpires = _dateExpires;
        return true;


    }

    function nullify() returns (bool) {
      return false
    }
}
