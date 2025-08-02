

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}



class LinkedList {  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  Append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  Prepend(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.length++;
  }

  Size() {
    return this.length;
  }

  At(index) {
    let current = this.head;
    for (let currentIndex = 0; currentIndex < this.length; currentIndex++) {
      if (currentIndex === index) {
        return current
      }
      else {
        current = current.next;
      }
    }
  }

  Join(arr){
    for (let i = 0; i < arr.length; i++){
      this.Append(arr[i]);
    }
  }

  Map(action) {
    let curr = this.head;
    while (curr !== null) {
      curr.value = action(curr.value);
      curr = curr.next;
    }
  }

  Filter(action){
    let curr = this.head;
    let arr = this.head;
    while (curr !== null) {
      if (action(curr.value)) {
        arr.next = curr.value;
      }
    }
  }

  Show() {
    let curr = this.head
    let result = ""
    while (curr !== null) {
      result += `${curr.value} -> `
      curr = curr.next
    }
    console.log(result)
  }
}


const ll = new LinkedList();
ll.Append(2);
ll.Append(3);
ll.Append(4);
ll.Append(5);
ll.Prepend(1);
ll.Show();

ll.Join([5, 6, 7]);
ll.Show();

console.log();

const square = x => x * x;
ll.Map(square);
ll.Show()

const even = x => (x % 2 === 0);
let ll_new = ll.Filter(even);
ll_new.Show()

// console.log(ll.Size())
//
// console.log(ll.tail.next)

// const arr = [1, 2, 3, 4]

// let arr1 = [...arr]
// for (let i = 0; i < arr.length; i++) {
//   console.log(i)
// }
// console.log()