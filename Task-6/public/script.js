document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phoneCode = document.getElementById("phoneCode").value;
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const gender = document.getElementById("gender").value;

  const fullPhone = phoneCode + phoneNumber;
  const emailPattern = /^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/;

  if (!fullName || !email || !phoneNumber || !gender) return alert("Please fill all fields.");
  if (!emailPattern.test(email)) return alert("Invalid email address.");
  if (phoneCode === "+91" && phoneNumber.length !== 10) return alert("Indian phone must be 10 digits.");

  const userData = { fullName, email, phone: fullPhone, gender };

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

    const result = await res.json();
    if (res.ok) {
      window.location.href = "success.html";
    } else {
      alert(result.error || "Error occurred");
    }
  } catch (err) {
    alert("Server error.");
  }
});