pragma solidity ^0.4.4;

contract HelloWorld {
  string private message;
  address public owner;
  function HelloWorld() {
    // constructor
    message = "hello world";
    owner = msg.sender;
  }

  function setMessage (string newMessage) {
    message = newMessage;
  }

  function getMessage () constant returns (string) {
    return message;
  }
}
