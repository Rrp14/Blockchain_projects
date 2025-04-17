// frontend/user/app.js
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "../firebase.js";

// Register user
async function registerUser() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPass").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Registration successful! Redirecting to login...");
    window.location.href = "index.html";
  } catch (err) {
    alert("Registration failed: " + err.message);
  }
}

// Login user
async function loginUser() {
  const email = document.getElementById("logEmail").value;
  const password = document.getElementById("logPass").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful! Redirecting to validation page...");
    window.location.href = "validate.html";
  } catch (err) {
    alert("Login failed: " + err.message);
  }
}

// Validate certificate by ID
async function validate() {
  const id = document.getElementById("searchId").value;
  const res = await fetch(`http://localhost:3000/validate/${id}`);
  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Certificate not found");
    document.getElementById("certificate").style.display = "none";
    return;
  }

  // Populate certificate data
  
  document.getElementById("certName").textContent = data[1];
  document.getElementById("certCourse").textContent = data[2];
  document.getElementById("certDate").textContent = data[3];
  document.getElementById("certId").textContent = data[0];


  // Show the certificate box
  document.getElementById("certificate").style.display = "block";
  document.getElementById("printBtn").style.display = "inline-block";
}

// Print certificate (opens print dialog)
// In app.js
function printCertificate() {
    const certHTML = document.getElementById("certificate").innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
  
    if (!printWindow) {
      alert("Popup blocked! Please allow popups for this site.");
      return;
    }
  
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Certificate</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background: #f2f2f2;
            }
            .certificate-box {
              background: #fff;
              padding: 20px;
              border: 2px solid #000;
              width: 80%;
              margin: 0 auto;
              text-align: center;
            }
            h2 {
              margin-bottom: 1rem;
            }
            p {
              font-size: 16px;
              margin: 8px 0;
            }
          </style>
        </head>
        <body>
          <div class="certificate-box">${certHTML}</div>
        </body>
      </html>
    `);
  
    printWindow.document.close();
  
    // Wait until the window has rendered before printing
    printWindow.onload = () => {
      // Delay 100ms just to be safe
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 100);
    };
  }
  
  
  

window.registerUser = registerUser;
window.loginUser = loginUser;
window.validate = validate;
window.printCertificate = printCertificate;
