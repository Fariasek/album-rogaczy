/* =========================================================
   ALBUM ROGACZY
   PRAWDZIWE PRZEWRACANIE GRAFIK
========================================================= */


const pages = [

    "./images/poznaj-nas.png",

    "./images/jez.png",

    "./images/alex.png"

];



/* =========================================================
   ELEMENTY
========================================================= */

const coverView =
    document.getElementById("coverView");

const bookView =
    document.getElementById("bookView");

const openAlbum =
    document.getElementById("openAlbum");


const book =
    document.getElementById("book");


const currentSpread =
    document.getElementById("currentSpread");

const underSpread =
    document.getElementById("underSpread");


const fixedHalf =
    document.getElementById("fixedHalf");


const flipPage =
    document.getElementById("flipPage");

const flipFront =
    document.getElementById("flipFront");

const flipBack =
    document.getElementById("flipBack");


const prevButton =
    document.getElementById("prevPage");

const nextButton =
    document.getElementById("nextPage");

const counter =
    document.getElementById("counter");



/* =========================================================
   ZMIENNE
========================================================= */

let currentIndex = 0;

let isTurning = false;



/* =========================================================
   POMOCNICZA FUNKCJA URL
========================================================= */

function imageURL(src) {

    return `url("${src}")`;

}



/* =========================================================
   LICZNIK
========================================================= */

function updateControls() {

    prevButton.disabled =
        currentIndex === 0;


    nextButton.disabled =
        currentIndex ===
        pages.length - 1;


    counter.textContent =
        `${currentIndex + 1} / ${pages.length}`;

}



/* =========================================================
   OTWIERANIE OKŁADKI
========================================================= */

function openBook() {

    coverView.classList.add(
        "opening"
    );


    /*
        Pod spodem od razu przygotowujemy
        "Poznaj nas".
    */

    currentSpread.src =
        pages[0];


    setTimeout(() => {

        bookView.classList.add(
            "active"
        );

    }, 350);


    setTimeout(() => {

        coverView.classList.remove(
            "active",
            "opening"
        );


        currentIndex = 0;

        updateControls();

    }, 1050);

}



/* =========================================================
   PRZEWRÓĆ DO PRZODU
========================================================= */

function nextPage() {

    if (isTurning)
        return;


    if (
        currentIndex >=
        pages.length - 1
    )
        return;


    isTurning = true;


    const current =
        pages[currentIndex];


    const next =
        pages[currentIndex + 1];


    /*
        POD SPODem =
        następna pełna rozkładówka
    */

    underSpread.src =
        next;


    /*
        LEWA POŁOWA OBECNEJ
        zostaje nieruchoma
    */

    fixedHalf.style.backgroundImage =
        imageURL(current);


    /*
        PRZÓD obracanej strony =
        prawa połowa obecnej
    */

    flipFront.style.backgroundImage =
        imageURL(current);


    /*
        TYŁ obracanej strony =
        lewa połowa następnej
    */

    flipBack.style.backgroundImage =
        imageURL(next);



    book.classList.remove(
        "turning-prev"
    );


    book.classList.add(
        "turning",
        "turning-next"
    );



    /*
        Po zakończeniu animacji
        pokazujemy już pełną
        nową rozkładówkę.
    */

    setTimeout(() => {

        currentIndex++;


        currentSpread.src =
            pages[currentIndex];


        underSpread.src =
            "";


        book.classList.remove(
            "turning",
            "turning-next"
        );


        updateControls();


        isTurning = false;

    }, 1120);

}



/* =========================================================
   PRZEWRÓĆ DO TYŁU
========================================================= */

function previousPage() {

    if (isTurning)
        return;


    if (currentIndex <= 0)
        return;


    isTurning = true;


    const current =
        pages[currentIndex];


    const previous =
        pages[currentIndex - 1];


    /*
        POPRZEDNIA pełna rozkładówka
        jest pod spodem.
    */

    underSpread.src =
        previous;


    /*
        PRAWA połowa obecnej
        pozostaje nieruchoma.
    */

    fixedHalf.style.backgroundImage =
        imageURL(current);


    /*
        PRZÓD =
        lewa połowa obecnej
    */

    flipFront.style.backgroundImage =
        imageURL(current);


    /*
        TYŁ =
        prawa połowa poprzedniej
    */

    flipBack.style.backgroundImage =
        imageURL(previous);



    book.classList.remove(
        "turning-next"
    );


    book.classList.add(
        "turning",
        "turning-prev"
    );



    setTimeout(() => {

        currentIndex--;


        currentSpread.src =
            pages[currentIndex];


        underSpread.src =
            "";


        book.classList.remove(
            "turning",
            "turning-prev"
        );


        updateControls();


        isTurning = false;

    }, 1120);

}



/* =========================================================
   KLIKNIĘCIA
========================================================= */

openAlbum.addEventListener(
    "click",
    openBook
);


nextButton.addEventListener(
    "click",
    nextPage
);


prevButton.addEventListener(
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
            !bookView.classList.contains(
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

currentSpread.src =
    pages[0];


updateControls();
