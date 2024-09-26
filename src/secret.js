class Entry {
  constructor(title, content, date) {
    this.title = title;
    this.content = content;
    this.date = date;
  }
}

class SecretDiary {
  constructor(entries = [], lock = new Lock(false)) {
    this.entries = entries;
    this.lock = lock;
  }

  addEntry(entry) {
    if (this.lock.isLocked) {
      return false;
    }

    this.entries.push(entry);
  }

  getEntries() {
    if (this.lock.isLocked) {
      return false;
    }

    return this.entries;
  }
}

class Lock {
  constructor(isLocked) {
    this.isLocked = isLocked;
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }
}

// an instance of SecretDiary using the default values from its constructor
const myOtherDiary = new SecretDiary();
console.log(myOtherDiary);

const myGreatMorning = new Entry(
  "My morning was great",
  "Despite being sick",
  "March 24th"
);
const myTerribleMorning = new Entry(
  "My morning was awful",
  "Especially because being sick",
  "March 23rd"
);

// another instance of SecretDiary, overwriting the default constructor values
const mySecretDiary = new SecretDiary(
  [myGreatMorning, myTerribleMorning],
  new Lock(true)
);
console.log(mySecretDiary);
