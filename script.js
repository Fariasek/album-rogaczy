/* =========================================================
   ALBUM ROGACZY
========================================================= */


/*
    KOLEJNOŚĆ ROZKŁADÓWEK

    Bez imion na stronie.
    Nazwy są tylko tutaj technicznie.
*/

const pages = [

    "./images/poznaj-nas.png",

    "./images/jez.png",

    "./images/alex.png",

    "./images/camila.png",

    "./images/bella.png",

    "./images/ros.png",

    "./images/alishia.png",

    "./images/OKŁADKATYLNE.PNG"

];



/* =========================================================
   ELEMENTY
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
   STAN
========================================================= */

let currentPage = 0;

let isAnimating = false;



/* =========================================================
   LICZNIK
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
   WCZYTYWANIE OBRAZÓW WCZEŚNIEJ
========================================================= */

function preloadImages() {

    pages.forEach((src) => {

        const img = new Image();

        img.src = src;

    });

}


preloadImages();



/* =========================================================
   OTWARCIE ALBUMU
========================================================= */

function showAlbum() {

    if (isAnimating)
        return;


    isAnimating = true;


    coverScreen.classList.add(
        "opening"
    );


    /*
        Album zaczyna pojawiać się
        jeszcze podczas otwierania okładki.
    */

    setTimeout(() => {

        albumScreen.classList.add(
            "active"
        );

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

    if (isAnimating)
        return;


    if (
        currentPage >=
        pages.length - 1
    )
        return;


    isAnimating = true;


    const nextIndex =
        currentPage + 1;


    /*
        rozpoczynamy efekt
    */

    book.classList.add(
        "switching"
    );


    turnSheet.classList.remove(
        "turn-prev"
    );


    void turnSheet.offsetWidth;


    turnSheet.classList.add(
        "turn-next"
    );


    /*
        Zmieniamy grafikę w chwili,
        gdy kartka jest prawie bokiem.
    */

    setTimeout(() => {

        currentPage =
            nextIndex;


        pageImage.src =
            pages[currentPage];


        updateNavigation();

    }, 340);


    /*
        koniec animacji
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

    if (isAnimating)
        return;


    if (currentPage <= 0)
        return;


    isAnimating = true;


    const previousIndex =
        currentPage - 1;


    book.classList.add(
        "switching"
    );


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
   KLAWIATURA
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {


        if (
            !albumScreen.classList.contains(
                "active"
            )
        )
            return;


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextPage();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

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
