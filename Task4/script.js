// Navigation
function showSection(id) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Product Catalog Data
const products = [
  { name: "Traditional Kurta", img: "cloth1.png", price: 999, rating: 4, desc: "Elegant traditional wear for men." },
  { name: "Designer Saree", img: "cloth2.png", price: 2499, rating: 5, desc: "Beautiful saree for festive occasions." },
  { name: "Smartphone", img: "electronic1.png", price: 15999, rating: 4, desc: "Latest 5G-enabled smartphone." },
  { name: "Wireless Earbuds", img: "electronic2.png", price: 3499, rating: 5, desc: "Noise-cancelling earbuds." },
  { name: "Organic Honey", img: "food1.png", price: 499, rating: 5, desc: "Pure, organic honey from local farms." },
  { name: "Spicy Masala Mix", img: "food2.png", price: 249, rating: 4, desc: "Perfect blend of traditional spices." },
];

// Display Products
function displayProducts(productsToDisplay) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';
  productsToDisplay.forEach(product => {
    const card = `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>${product.desc}</p>
        <p><strong>₹${product.price}</strong></p>
        <p>${'⭐'.repeat(product.rating)}</p>
      </div>
    `;
    productGrid.innerHTML += card;
  });
}

displayProducts(products);

// Sorting
function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;
  let sortedProducts = [...products];

  if (sortValue === 'priceLowHigh') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'priceHighLow') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'ratingHighLow') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortValue === 'ratingLowHigh') {
    sortedProducts.sort((a, b) => a.rating - b.rating);
  }

  displayProducts(sortedProducts);
}

// To-Do App with LocalStorage
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(index);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const task = taskInput.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

loadTasks();
