let currentPage = 1;
const limit = 5;

    function fetchContacts() {
  const sortBy = document.getElementById("sortBy").value;
  const order = document.getElementById("sortOrder").value;

  fetch(`/contacts?sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("contactList");
      list.innerHTML = "";

      data.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `${c.name} (${c.email}, ${c.phone}, ${c.address}, ${c.category}) 
          <button onclick="editContact(${c.id}, '${c.name}', '${c.email}', '${c.phone}', '${c.address}', '${c.category}')">Edit</button>
          <button onclick="deleteContact(${c.id})">Delete</button>`;
        list.appendChild(li);
      });

      document.getElementById("pageInfo").innerText = `Page ${currentPage}`;
    });
}



    function showMessage(msg, isError = true) {
    alert(msg); // Simple for now; can replace with toast later
  }

  function saveContact() {
    const id = document.getElementById("editId").value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // 🔒 Validations
    if (name === "") {
      showMessage("Name cannot be empty");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showMessage("Phone number must be exactly 10 digits and numeric");
      return;
    }

    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      showMessage("Enter a valid email (e.g., user@example.com)");
      return;
    }

    const address = document.getElementById("address").value.trim();
    const category = document.getElementById("category").value;

    const data = { name, email, phone, address, category };

    const method = id ? "PUT" : "POST";
    const url = id ? `/contacts/${id}` : "/contacts";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        resetForm();
        fetchContacts();
        showMessage(id ? "Contact updated!" : "Contact added!", false);
      } else {
        showMessage("Something went wrong. Try again!");
      }
    });
  }

  
  function editContact(id, name, email, phone, address, category) {
  document.getElementById("editId").value = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("address").value = address;
  document.getElementById("category").value = category;
}


    function deleteContact(id) {
      fetch(`/contacts/${id}`, {
        method: "DELETE",
      }).then(() => fetchContacts());
    }

    function resetForm() {
      document.getElementById("editId").value = "";
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
    }

    fetchContacts();

    function searchContacts() {
  const q = document.getElementById("searchBox").value;
  if (q.trim() === "") {
    fetchContacts(); // if search box is empty, show all contacts
    return;
  }

  fetch(`/search?q=${encodeURIComponent(q)}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("contactList");
      list.innerHTML = "";
      data.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `${c.name} (${c.email}, ${c.phone}, ${c.address}, ${c.category}) 
          <button onclick="editContact(${c.id}, '${c.name}', '${c.email}', '${c.phone}', '${c.address}', '${c.category}')">Edit</button>
          <button onclick="deleteContact(${c.id})">Delete</button>`;
        list.appendChild(li);
      });
    });
}

function nextPage() {
  currentPage++;
  fetchContacts();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchContacts();
  }
}
