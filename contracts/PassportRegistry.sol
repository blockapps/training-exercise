import './Passport.sol';

contract PassportRegistry {
    mapping (address => Passport) public registry;
    address[] public registerAddresses;

    function createPassport(string  name, string dateCreated, string dateExpires,
                            string residentialAddress, uint8 age, string countryOfOrigin) returns (bool) {
        // get the address of the sender msg.sender
        address passportOwner = msg.sender;

        // make sure sender doesn't already have a passport
        for (uint i = 0; i < registerAddresses.length; i++) {
            if(registerAddresses[i] == passportOwner) {
                return false;
            }
        }

        // create a new passport for the sender
        Passport newPass = new Passport(name, dateCreated, dateExpires,
                                residentialAddress, age, countryOfOrigin);

        // add the sender to registerAddresses
        registerAddresses.push(passportOwner);

        // register that passport with the sender
        registry[passportOwner] = newPass;

        return true;

    }

    function renewPassport(string dateExpires) returns (bool) {
        // make sure the sender has a passport
        address passportOwner = msg.sender;

        for (uint i = 0; i < registerAddresses.length; i++) {
            if(registerAddresses[i] == passportOwner) {
                // retrieve the passport
                Passport pass = registry[passportOwner];

                // update the passport
                pass.renew(dateExpires);
                return true;
            }
        }

        return false;

    }

    function nullifyPassport() returns (bool) {
      return false
    }
}
