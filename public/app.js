const API_URL = "/api";
let token = localStorage.getItem("token");

// Show Bootstrap alerts
function showAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} mt-3`;
  alert.innerText = message;
  document.body.prepend(alert);
  setTimeout(() => alert.remove(), 3000);
}

// Redirect to login if not authenticated
if (window.location.pathname.endsWith("books.html") && !token) {
  window.location.href = "index.html";
}

// Register
async function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) {
    showAlert("✅ Registered successfully! Please login.", "success");
  } else {
    showAlert("❌ Registration failed!", "danger");
  }
}

// Login
async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    localStorage.setItem("token", token);
    showAlert("✅ Logged in successfully!", "success");
  } else {
    showAlert("❌ Login failed!", "danger");
  }
}

// Load Books
async function loadBooks() {
  if (!document.getElementById("books-list")) return;
  const res = await fetch(`${API_URL}/books`);
  const books = await res.json();
  const list = document.getElementById("books-list");
  list.innerHTML = "";
  books.forEach(b => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${b.title}</td>
      <td>${b.author}</td>
      <td>${b.year}</td>
      <td>
        ${token ? `
          <button class="btn btn-sm btn-primary me-2" onclick="editBook('${b._id}', '${b.title}', '${b.author}', '${b.year}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBook('${b._id}')">Delete</button>
        ` : `<span class="text-muted">Login required</span>`}
      </td>
    `;
    list.appendChild(tr);
  });
}
loadBooks();

// Add Book
async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title, author, year }),
  });
  loadBooks();
}

// Delete Book
async function deleteBook(id) {
  await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  loadBooks();
}

// Edit Book
async function editBook(id, oldTitle, oldAuthor, oldYear) {
  const title = prompt("New title:", oldTitle);
  const author = prompt("New author:", oldAuthor);
  const year = prompt("New year:", oldYear);
  if (!title || !author || !year) return;
  await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title, author, year }),
  });
  loadBooks();
}

// Logout
function logout() {
  localStorage.removeItem("token");
  token = null;
  showAlert("🚪 Logged out successfully!", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}
