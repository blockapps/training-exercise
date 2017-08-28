contract Passport {
    address public passportOffice; //owner

    string public name;
    uint public dateCreated;
    uint public dateExpires;
    string public residentialAddress;
    uint8  public age;

    string public countryOfOrigin;

    function Passport(string _name, uint _dateCreated, uint _dateExpires,
                      string _residentialAddress, uint8 _age, string _countryOfOrigin) {
        name = _name;
        dateCreated = _dateCreated;
        dateExpires = _dateExpires;
        residentialAddress = _residentialAddress;
        age = _age;
        countryOfOrigin = _countryOfOrigin;
        passportOffice = msg.sender;
    }


    function renew(uint _dateExpires) returns (bool) {
        // make sure only the passportOffice (i.e. passport office) can access
        if(passportOffice != msg.sender) {
            return false;
        }

        // update the expires date
        dateExpires = _dateExpires;
        return true;
    }

    function nullify() returns (bool) {
      if(passportOffice != msg.sender) {
          return false;
      }

      dateExpires = now;
      return true;
    }

    function isExpired() returns (bool) {
        return dateExpires <= now;
    }

}