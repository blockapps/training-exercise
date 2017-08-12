contract MasterContract {
  uint public storedData;

  function MasterContract() {
    storedData = 2;
  }

  function setToFour(){
    storedData = 4;
  }
}

contract Piggyback {
  //This is the address of an already deployed MasterContract
  address masterAddress = 0x9a6706d2c21f1b4e276351395eee19c124d69fbe;

  function doCall(){
    // get our reference to our MasterContract
    MasterContract master = MasterContract(masterAddress);
    master.setToFour();
  }
}
