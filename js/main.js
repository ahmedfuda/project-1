const body = document.body;
const btnBurger = document.getElementById("btn-burger");
const btnClose = document.getElementById("btn-close");
const asideMenu = document.getElementById("aside-menu");

btnBurger.onclick = function () {
  asideMenu.style.translate = "17rem";
  body.style.overflow = "hidden";
};

btnClose.onclick = function () {
  asideMenu.style.translate = "-16.5rem";
  body.style.overflow = "auto";
};

const data = JSON.parse(localStorage.getItem("msgList")) || [];

const send = document.getElementById("send");
const nameMSG = document.getElementById("name-msg");
const emailMSG = document.getElementById("email-msg");
const alertMSG = document.getElementById("alert-msg");

send.onclick = function (event) {
  event.preventDefault();

  const userName = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const msg = document.getElementById("msg").value.trim();

  nameMSG.innerHTML = "";
  emailMSG.innerHTML = "";

  let hasError = false;

  if (!/^[A-Za-z\s]+$/.test(userName)) {
    nameMSG.innerHTML = "The name must be in English only";
    hasError = true;
  }

  if (!email) {
    emailMSG.innerHTML = "Email is required";
    hasError = true;
  } else if (!isValidEmail(email)) {
    emailMSG.innerHTML = "Invalid email format";
    hasError = true;
  }

  if (hasError) return;

  const newMSG = {
    id: Date.now(),
    Name: userName,
    "E-mail": email,
    MSG: msg,
  };

  data.push(newMSG);
  localStorage.setItem("msgList", JSON.stringify(data));

  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("msg").value = "";

  nameMSG.innerHTML = "";
  emailMSG.innerHTML = "";
  alertMSG.style.cssText = `bottom:180px;
  `;
  setTimeout(() => {
    alertMSG.style.cssText = `bottom:-200px;
  `;
  }, 2000);
};

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
