class Basket {
    constructor(capacity) {
      this.capacity = capacity; 
      this.items = []; 
    }
  
    addItem(bagel) {
      if (this.items.length < this.capacity) {
        this.items.push(bagel);
        return true;
      } else {
        return false; 
      }
    }
  
    removeItem(bagel) {
      const index = this.items.indexOf(bagel);
      if (index !== -1) {
        this.items.splice(index, 1);
        return true;
      } else {
        return false; 
      }
    }
  
    getTotalPrice() {
      let total = 0;
      for (const bagel of this.items) {
        total += bagel.price;
      }
      return total;
    }
  }
  