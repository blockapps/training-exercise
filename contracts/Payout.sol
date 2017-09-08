contract Payout {
  address alice;
  address bob;
  mapping (address => uint) ownershipDistribution;

  function Payout() {
    alice = 0x09f6211a6d59227686690c75ceaa0908fb9e1763;
    bob = 0x32abd094a7d4c474f0df1375fc297ebd64e551d7;
    ownershipDistribution[alice] = 75;
    ownershipDistribution[bob] = 25;
  }

  function Dividend() payable {
    uint bal = this.balance; // implicit global variable
    alice.send(bal * ownershipDistribution[alice] / 100);
    bob.send(bal * ownershipDistribution[bob] / 100);
  }
}
