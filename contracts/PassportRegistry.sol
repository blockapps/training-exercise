
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

contract PassportRegistry {
    mapping (address => Passport) public registry;

    address[] public registerAddresses;

    function createPassport(string  name, uint dateCreated, uint dateExpires,
                            string residentialAddress, uint8 age, string countryOfOrigin) returns (bool) {
        // check if passport exists
        if(senderHasPassport()) {
            return false;
        }

        // create pssport
        Passport passport = new Passport(
                name,
                dateCreated,
                dateExpires,
                residentialAddress,
                age,
                countryOfOrigin
            );


        // TODO: add the sender to registerAddresses
        registerAddresses.push(msg.sender);

        // TODO: register that passport with the sender
        registry[msg.sender] = passport;


        return true;

    }


    function renewPassport(uint dateExpires) returns (bool) {
        // TODO: make sure the sender has a passport
        address passportOwner = msg.sender;

        if(!senderHasPassport()) {
            return false;
        }

        // TODO: renew senders passport
        Passport passport = registry[passportOwner];

        return passport.renew(dateExpires);
    }

    function senderHasPassport() returns (bool) {
        // check if passport exists
        uint i = 0;
        for(i; i < registerAddresses.length; i++) {
            if(registerAddresses[i] == msg.sender) {
                return true;
            }
        }

        // return false if sender is not found
        return false;
    }

    function nullifyPassport() returns (bool) {
        if(!senderHasPassport()) {
            return false;
        }

        Passport passport = registry[msg.sender];

        return passport.nullify();
    }
}
