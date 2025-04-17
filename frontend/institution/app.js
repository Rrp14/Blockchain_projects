// frontend/institution/app.js

async function login() {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("user").value,
      password: document.getElementById("pass").value,
    }),
  });
  
  if (res.ok) {
    // On successful login, redirect to issue page.
    window.location.href = "issue.html";
  } else {
    alert("Invalid login");
  }
}

async function issue() {
  const res = await fetch("http://localhost:3000/issue", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: document.getElementById("certId").value,
      name: document.getElementById("name").value,
      course: document.getElementById("course").value,
      date: document.getElementById("date").value,
      issuer: document.getElementById("issuer").value,
    }),
  });

  const result = await res.json();
  if (res.ok && result.success) {
    alert("Certificate Issued!");
  } else {
    alert("Issue failed: " + (result.error || "Unknown error"));
  }
}

async function updateCredentials() {
  const newUsername = document.getElementById("newUser").value;
  const newPassword = document.getElementById("newPass").value;

  const res = await fetch("http://localhost:3000/change-institution-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newUsername, newPassword }),
  });

  const result = await res.json();
  if (res.ok && result.success) {
    alert("Credentials updated! Please login again.");
    window.location.href = "index.html";
  } else {
    alert("Update failed: " + (result.error || "Unknown error"));
  }
}

window.login = login;
window.issue = issue;
window.updateCredentials = updateCredentials;
