const screens = [...document.querySelectorAll('.screen')];
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const title = document.getElementById('pageTitle');
const openAlbum = document.getElementById('openAlbum');

let current = 0;

function showPage(newIndex, direction = 1) {
  if (newIndex < 0 || newIndex >= screens.length || newIndex === current) return;

  const old = screens[current];
  old.classList.remove('active');

  if (direction > 0) {
    old.classList.add('leaving-left');
  }

  setTimeout(() => {
    old.classList.remove('leaving-left');
  }, 560);

  current = newIndex;
  screens[current].classList.add('active');

  updateControls();
}

function updateControls() {
  prev.disabled = current === 0;
  next.disabled = current === screens.length - 1;

  const visibleTitle = screens[current].dataset.title || '';

  if (current >= 2) {
    title.textContent = `Karta ${current - 1} — ???`;
  } else {
    title.textContent = visibleTitle;
  }
}

openAlbum.addEventListener('click', () => {
  showPage(1, 1);
});

prev.addEventListener('click', () => {
  showPage(current - 1, -1);
});

next.addEventListener('click', () => {
  showPage(current + 1, 1);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') {
    showPage(current + 1, 1);
  }

  if (event.key === 'ArrowLeft') {
    showPage(current - 1, -1);
  }
});

updateControls();
