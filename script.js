/* =========================================================
   ALBUM ROGACZY
========================================================= */


/* =========================================================
   KOLEJNOŚĆ STRON
========================================================= */

const pages = [

    // 1 — Poznaj nas
    "images/poznajnas.png",

    // 2 — Jeż
    "images/jez.png",

    // 3 — Alex
    "images/alex.png",

    // 4 — Camila
    "images/camila.png",

    // 5 — Bella
    "images/bella.png",

    // 6 — Rosanna
    "images/ros.png",

    // 7 — Alishia
    "images/alishia.png",

    // 8 — Katrina
    "images/katrina.png",

    // 9 — tylna okładka
    "images/OKŁADKATYLNE.PNG"

];


/* =========================================================
   ELEMENTY STRONY
========================================================= */

const coverScreen =
    document.getElementById("coverScreen");

const albumScreen =
    document.getElementById("albumScreen");

const openAlbum =
    document.getElementById("openAlbum");

const book =
    document.getElementById("book");

const pageImage =
    document.getElementById("pageImage");

const turnSheet =
    document.getElementById("turnSheet");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const pageCounter =
    document.getElementById("pageCounter");


/* =========================================================
   USTAWIENIA
========================================================= */

let currentPage = 0;

let isAnimating = false;


/* =========================================================
   WCZYTANIE WSZYSTKICH GRAFIK
========================================================= */

function preloadImages() {

    pages.forEach((src) => {

        const img = new Image();

        img.src = src;

    });

}

preloadImages();


/* =========================================================
   AKTUALIZACJA LICZNIKA I PRZYCISKÓW
========================================================= */

function updateNavigation() {

    pageCounter.textContent =
        `${currentPage + 1} / ${pages.length}`;

    prevBtn.disabled =
        currentPage === 0;

    nextBtn.disabled =
        currentPage === pages.length - 1;

}


/* =========================================================
   OTWARCIE ALBUMU
========================================================= */

function showAlbum() {

    if (isAnimating) {
        return;
    }

    isAnimating = true;

    coverScreen.classList.add("opening");


    /*
        W trakcie otwierania okładki
        pokazujemy środek albumu.
    */

    setTimeout(() => {

        albumScreen.classList.add("active");

    }, 300);


    setTimeout(() => {

        coverScreen.classList.remove(
            "active",
            "opening"
        );

        pageImage.src =
            pages[currentPage];

        updateNavigation();

        isAnimating = false;

    }, 920);

}


/* =========================================================
   NASTĘPNA STRONA
========================================================= */

function nextPage() {

    if (isAnimating) {
        return;
    }

    if (currentPage >= pages.length - 1) {
        return;
    }

    isAnimating = true;

    const nextIndex =
        currentPage + 1;


    /* uruchamiamy animację */

    book.classList.add("switching");

    turnSheet.classList.remove(
        "turn-prev"
    );


    /*
        Reset animacji CSS,
        żeby działała przy każdym kliknięciu.
    */

    void turnSheet.offsetWidth;


    turnSheet.classList.add(
        "turn-next"
    );


    /*
        W połowie przewracania
        podmieniamy obraz.
    */

    setTimeout(() => {

        currentPage =
            nextIndex;

        pageImage.src =
            pages[currentPage];

        updateNavigation();

    }, 340);


    /*
        Koniec animacji.
    */

    setTimeout(() => {

        turnSheet.classList.remove(
            "turn-next"
        );

        book.classList.remove(
            "switching"
        );

        isAnimating = false;

    }, 750);

}


/* =========================================================
   POPRZEDNIA STRONA
========================================================= */

function previousPage() {

    if (isAnimating) {
        return;
    }

    if (currentPage <= 0) {
        return;
    }

    isAnimating = true;

    const previousIndex =
        currentPage - 1;


    book.classList.add("switching");

    turnSheet.classList.remove(
        "turn-next"
    );

    void turnSheet.offsetWidth;

    turnSheet.classList.add(
        "turn-prev"
    );


    setTimeout(() => {

        currentPage =
            previousIndex;

        pageImage.src =
            pages[currentPage];

        updateNavigation();

    }, 340);


    setTimeout(() => {

        turnSheet.classList.remove(
            "turn-prev"
        );

        book.classList.remove(
            "switching"
        );

        isAnimating = false;

    }, 750);

}


/* =========================================================
   KLIKNIĘCIA
========================================================= */

openAlbum.addEventListener(
    "click",
    showAlbum
);


nextBtn.addEventListener(
    "click",
    nextPage
);


prevBtn.addEventListener(
    "click",
    previousPage
);


/* =========================================================
   STRZAŁKI NA KLAWIATURZE
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        /*
            Klawiatura działa dopiero
            po otworzeniu albumu.
        */

        if (
            !albumScreen.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "ArrowRight") {

            nextPage();

        }


        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* =========================================================
   START
========================================================= */

pageImage.src =
    pages[0];

updateNavigation();
