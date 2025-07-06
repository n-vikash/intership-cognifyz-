const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userIdInput = document.getElementById("userId");
const userTableBody = document.getElementById("userTableBody");

const API_URL = "http://localhost:3000/users";

// Load all users on page load
window.onload = () => {
  loadUsers();
};

// Create or Update user
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const id = userIdInput.value;

  if (!name || !email) {
    alert("Please fill out all fields");
    return;
  }

  const user = { name, email };

  try {
    if (id) {
      // UPDATE
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } else {
      // CREATE
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    }

    resetForm();
    loadUsers();
  } catch (err) {
    alert("Error saving user");
    console.error(err);
  }
});

// Fetch all users
async function loadUsers() {
  userTableBody.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const users = await res.json();

    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>
          <button class="btn btn-sm btn-warning me-2" onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  } catch (err) {
    alert("Failed to load users");
    console.error(err);
  }
}

// Delete a user
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadUsers();
  } catch (err) {
    alert("Delete failed");
    console.error(err);
  }
}

// Edit a user (pre-fill form)
function editUser(id, name, email) {
  nameInput.value = name;
  emailInput.value = email;
  userIdInput.value = id;
}

// Reset the form
function resetForm() {
  nameInput.value = "";
  emailInput.value = "";
  userIdInput.value = "";
}
