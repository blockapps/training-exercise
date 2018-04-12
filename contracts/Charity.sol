pragma solidity ^0.4.8;

contract Charity {
    address owner;
    address boardMember1;
    address boardMember2;
    address recipient;
    bool registeredYet;
    mapping(address => bool) signatures;

    struct Donation {
        address donor;
        uint value;
    }

    Donation[] donations;

    function Charity() {
        owner = msg.sender;
        registeredYet = false;
    }

    function addBoardMembers(address bm1, address bm2) returns (string) {
        if (msg.sender == owner && !registeredYet) {
            boardMember1 = bm1;
            boardMember2 = bm2;
            registeredYet = true;
            return "Board members successfully registered!";
        }
        else if (registeredYet) {
            return "You already registered! You can't register twice!";
        }
        else return "You're not the owner! Get outta here!";
    }

    function donate() payable returns (string) {
        donations.push(Donation(msg.sender, msg.value));
        return "Thanks for donating!";
    }
    
    function addSignature() returns (string) {
        if (msg.sender == owner) {
            signatures[owner] = true;
        } else if (msg.sender == boardMember1) {
            signatures[boardMember1] = true;
        } else if (msg.sender == boardMember2) {
            signatures[boardMember2] = true;
        } else return "You're not allowed to sign! Get outta here!";

        return "Thanks for signing!";
    }

    function addRecipient(address recip) returns (string) {
        if (msg.sender == owner) {
            recipient = recip;
            return "Thanks, owner!";
        }

        return "You're not the owner!";
    }

    function withdraw() returns (string) {
        if (msg.sender == boardMember1 || msg.sender == boardMember2) {
           uint numSignatures = 0;
           if (signatures[owner] == true) {
               numSignatures++;
           }
           if (signatures[boardMember1] == true) {
               numSignatures++;
           }
           if (signatures[boardMember2] == true) {
               numSignatures++;
           }

           if(numSignatures >= 2) {
               recipient.send(this.balance);
               signatures[owner] = false;
               signatures[boardMember1] = false;
               signatures[boardMember2] = false;
               return "Money withdrawn!";
           }
           else return "Not enough signatures! Come back later!";
        }
        else return "You're not on the board! Get outta here!";
    }


}
