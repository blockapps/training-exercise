

contract Passport {
    address public passportOffice; //owner

    string public name;
    string public dateCreated;
    string public dateExpires;
    string public residentialAddress;
    uint8  public age;

    string public countryOfOrigin;

    function Passport(string _name, string _dateCreated, string _dateExpires,
                      string _residentialAddress, uint8 _age, string _countryOfOrigin) {

        // TODO: initialize contract storage=
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
      // BONUS: invalidate the passport
    }

    // BONUS: write a function to check if passport is valid

}
