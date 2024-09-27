const items = [
  {
    "sku": "BGLO",
    "price": "0.49",
    "name": "Bagel",
    "variant": "Onion"
  },
  {
    "sku": "BGLP",
    "price": "0.39",
    "name": "Bagel",
    "variant": "Plain"
  },
  {
    "sku": "BGLE",
    "price": "0.49",
    "name": "Bagel",
    "variant": "Everything"
  }
];

// Function to calculate total price
function calculateTotalPrice(itemArray) {
  let totalPrice = 0;

  itemArray.forEach(item => {
      totalPrice += parseFloat(item.price);
  });

  return totalPrice.toFixed(2); // Return the total price rounded to 2 decimal places
}

// Call the function and log the total price
const totalPrice = calculateTotalPrice(items);
console.log("Total Price: $" + totalPrice);
