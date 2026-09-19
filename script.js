const dpadButtons = document.querySelectorAll(".dpad-btn");
const rooms = document.querySelectorAll(".room");
const backButtons = document.querySelectorAll(".back-btn");
const inventoryPopup = document.getElementById("inventory-popup");
const inventoryPopupText = document.getElementById("inventory-popup-text");
const btnCircle = document.getElementById("btn-circle");
const bgAudio = document.getElementById("bg-audio");

// estado: qué habitaciones ya se completaron
const found = {
  listening: false,
  photo: false,
  speak: false,
};

function openRoom(roomId) {
  rooms.forEach(function (room) {
    room.classList.remove("active");
  });
  document.getElementById(roomId).classList.add("active");
}

function closeAllRooms() {
  rooms.forEach(function (room) {
    room.classList.remove("active");
  });
}

dpadButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (btn.disabled) return;
    openRoom(btn.dataset.room);
  });
});

backButtons.forEach(function (btn) {
  btn.addEventListener("click", closeAllRooms);
});

function showInventoryPopup(objectName) {
  inventoryPopupText.textContent = "guardado en inventario: " + objectName;
  inventoryPopup.classList.add("show");
  setTimeout(function () {
    inventoryPopup.classList.remove("show");
  }, 2200);
}

function markFound(key) {
  found[key] = true;
  const slot = document.getElementById("inv-" + key);
  slot.classList.add("found");
  slot.textContent = "✓";

  if (found.listening && found.photo && found.speak) {
    btnCircle.disabled = false;
  }
}

// ---------- LISTENING ----------
document.getElementById("object-listening").addEventListener("click", function () {
  showInventoryPopup(this.dataset.name);
  this.classList.add("collected");
  markFound("listening");
});

document.getElementById("object-player").addEventListener("click", function () {
  this.classList.add("collected");
  document.getElementById("retro-player").hidden = false;
});

document.getElementById("retro-toggle-btn").addEventListener("click", function () {
  const player = document.getElementById("retro-player");
  if (bgAudio.paused) {
    bgAudio.play();
    player.classList.add("playing");
    this.textContent = "⏸";
  } else {
    bgAudio.pause();
    player.classList.remove("playing");
    this.textContent = "▶";
  }
});

const retroVolume = document.getElementById("retro-volume");
bgAudio.volume = retroVolume.value;

retroVolume.addEventListener("input", function () {
  bgAudio.volume = retroVolume.value;
});

// ---------- PHOTO ----------
document.getElementById("object-photo").addEventListener("click", function () {
  showInventoryPopup(this.dataset.name);
  this.classList.add("collected");
  markFound("photo");
});

// ---------- SPEAK ----------
document.getElementById("object-speak").addEventListener("click", function () {
  showInventoryPopup(this.dataset.name);
  this.classList.add("collected");
  markFound("speak");
  document.getElementById("speak-message").hidden = false;
});

// ---------- PUERTA FINAL ----------
document.getElementById("open-door-btn").addEventListener("click", function () {
  const flash = document.getElementById("white-flash");
  flash.classList.add("flashing");

  setTimeout(function () {
    closeAllRooms();
    document.getElementById("final-screen").classList.add("active");
  }, 500);

  setTimeout(function () {
    flash.classList.remove("flashing");
  }, 1400);
});