// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChainContract {
    struct Order {
        uint256 id;
        address buyer;
        address seller;
        uint256 amount;
        uint256 timestamp;
        bool isCompleted;
    }

    mapping(uint256 => Order) public orders;
    uint256 public orderCount;

    event OrderCreated(
        uint256 indexed orderId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        uint256 timestamp
    );

    event OrderCompleted(
        uint256 indexed orderId,
        uint256 timestamp
    );

    function createOrder(address seller, uint256 amount) external payable {
        require(msg.value == amount, "Payment amount must match order amount");
        require(seller != address(0), "Invalid seller address");

        orderCount++;
        orders[orderCount] = Order({
            id: orderCount,
            buyer: msg.sender,
            seller: seller,
            amount: amount,
            timestamp: block.timestamp,
            isCompleted: false
        });

        emit OrderCreated(
            orderCount,
            msg.sender,
            seller,
            amount,
            block.timestamp
        );
    }

    function completeOrder(uint256 orderId) external {
        Order storage order = orders[orderId];
        require(msg.sender == order.seller, "Only seller can complete order");
        require(!order.isCompleted, "Order already completed");

        order.isCompleted = true;
        payable(order.seller).transfer(order.amount);

        emit OrderCompleted(orderId, block.timestamp);
    }

    function getOrder(uint256 orderId) external view returns (
        uint256 id,
        address buyer,
        address seller,
        uint256 amount,
        uint256 timestamp,
        bool isCompleted
    ) {
        Order memory order = orders[orderId];
        return (
            order.id,
            order.buyer,
            order.seller,
            order.amount,
            order.timestamp,
            order.isCompleted
        );
    }
}