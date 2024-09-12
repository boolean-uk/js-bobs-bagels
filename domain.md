# Domain Model for the core exercis

![image](https://user-images.githubusercontent.com/97929409/199549066-848cf354-6e78-4c91-8504-239df39db4d3.png)

# Domain model for Extension 1
| function     | description                                                               | input             | output                                       |
|--------------|---------------------------------------------------------------------------|-------------------|----------------------------------------------|
| checkForDeal | should check if the item in basket warrants a saving                      | item              | boolean (true/false)                         |
| moneySaved   | should calculate the amount saved and add it as an attribute to the item  | boolean (hasDeal) | item with new price and moneySaved attribute |
