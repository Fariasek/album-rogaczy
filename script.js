const views = [...document.querySelectorAll(".album-view")];

const prevButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
const pageName = document.getElementById("pageName");
const openAlbumButton = document.getElementById("openAlbum");

const pageTurn = document.getElementById("pageTurn");

let currentPage = 0;
let isTurning = false;


/* =========================================================
   AKTUALIZACJA NAWIGACJI
========================================================= */

function updateNavigation() {

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === views.length - 1;

    const title = views[currentPage].dataset.title || "";

    if (currentPage >= 2) {
        pageName.textContent = `Karta ${currentPage - 1} — ???`;
    } else {
        pageName.textContent = title;
    }

}


/* =========================================================
   ZMIANA WIDOKU
========================================================= */

function activatePage(index) {

    views.forEach((view) => {
        view.classList.remove("active");
    });

    views[index].classList.add("active");

    currentPage = index;

    updateNavigation();

}


/* =========================================================
   ANIMACJA DO PRZODU
========================================================= */

function turnNext() {

    if (isTurning) return;

    if (currentPage >= views.length - 1) return;

    isTurning = true;

    const nextIndex = currentPage + 1;

    pageTurn.classList.remove("turn-prev");
    pageTurn.classList.remove("turn-next");

    /*
       Najpierw pokazujemy następną stronę pod przewracaną kartką.
    */

    views[nextIndex].classList.add("active");

    /*
       Wymuszamy przeliczenie stylu,
       żeby animacja zawsze odpaliła od początku.
    */

    void pageTurn.offsetWidth;

    pageTurn.classList.add("turn-next");


    /*
       W połowie animacji chowamy starą stronę.
    */

    setTimeout(() => {

        views[currentPage].classList.remove("active");

    }, 470);


    /*
       Po zakończeniu animacji ustawiamy nową stronę
       jako aktualną.
    */

    setTimeout(() => {

        currentPage = nextIndex;

        pageTurn.classList.remove("turn-next");

        updateNavigation();

        isTurning = false;

    }, 980);

}


/* =========================================================
   ANIMACJA DO TYŁU
========================================================= */

function turnPrev() {

    if (isTurning) return;

    if (currentPage <= 0) return;

    isTurning = true;

    const previousIndex = currentPage - 1;

    pageTurn.classList.remove("turn-next");
    pageTurn.classList.remove("turn-prev");


    /*
       Poprzednia strona pojawia się pod kartką.
    */

    views[previousIndex].classList.add("active");


    void pageTurn.offsetWidth;

    pageTurn.classList.add("turn-prev");


    /*
       W połowie przewracania chowamy obecną stronę.
    */

    setTimeout(() => {

        views[currentPage].classList.remove("active");

    }, 470);


    /*
       Kończymy animację.
    */

    setTimeout(() => {

        currentPage = previousIndex;

        pageTurn.classList.remove("turn-prev");

        updateNavigation();

        isTurning = false;

    }, 980);

}


/* =========================================================
   OTWARCIE OKŁADKI
========================================================= */

function openAlbum() {

    if (currentPage !== 0) return;

    turnNext();

}


/* =========================================================
   PRZYCISKI
========================================================= */

nextButton.addEventListener("click", () => {

    turnNext();

});


prevButton.addEventListener("click", () => {

    turnPrev();

});


openAlbumButton.addEventListener("click", () => {

    openAlbum();

});


/* =========================================================
   KLAWIATURA
========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        turnNext();
    }

    if (event.key === "ArrowLeft") {
        turnPrev();
    }

});


/* =========================================================
   START
========================================================= */

activatePage(0);
