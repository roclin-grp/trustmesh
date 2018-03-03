pragma solidity ^0.4.18;

contract BroadcastMessages {
  event Publish(address indexed userAddress, bytes signedMessage, uint timestamp);

  function publish(address userAddress, bytes signedMessage) public {
    Publish(userAddress, signedMessage, now);
  }
}
