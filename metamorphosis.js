const dom = {
    isEmpty: function (el) {
        return el.children.length === 0;
    },
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
};

const ui = {
    mixedCardsContainer: null,
    slots: null,
    cards: null,
};

const game = {
    dragged: null,
};

function initDragAndDrop() {
    initElements();
    shuffleCards();
    initDragEvents();
}

function initElements() {
    ui.cards = document.querySelectorAll(".card");
    ui.slots = document.querySelectorAll(".card-slot");
    ui.mixedCardsContainer = document.querySelector(".mixed-cards");

    ui.cards.forEach(function (card) {
        card.setAttribute("draggable", true);
    });
}

function shuffleCards() {
    const mixedCards = ui.mixedCardsContainer.children;

    for (let i = mixedCards.length; i >= 0; i--) {
        ui.mixedCardsContainer.appendChild(mixedCards[(Math.random() * i) | 0]);
    }
}

function initDragEvents() {
    ui.cards.forEach(function (card) {
        initDraggable(card);
    });

    ui.slots.forEach(function (slot) {
        initDropzone(slot);
    });
}

function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
}

function initDropzone(dropzone) {
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
    setDropZonesHighlight();
    this.classList.add('dragged');
    game.dragged = e.currentTarget;
    console.log("Drag start of", game.dragged);
}

function handleDragEnd() {
    setDropZonesHighlight(false);
    this.classList.remove('dragged');
    console.log("Drag end of", game.dragged);
    game.dragged = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    console.log("Drag enter of", e.currentTarget);
}

function handleDragLeave(e) {
    console.log("Drag leave of", e.currentTarget);
}

function handleDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    console.log("Drop of", dropzone);

    if (dom.hasClass(dropzone, "card-slot") || dom.hasClass(dropzone, "active-zone")) {
        if (dom.isEmpty(dropzone)) {
            dropzone.appendChild(game.dragged);
            return;
        }
    }
}

function setDropZonesHighlight(highlight = true) {
    const dropZones = document.querySelectorAll(".card-slot");
    for (const dropZone of dropZones) {
        if (highlight) {
            dropZone.classList.add("active-zone");
        } else {
            dropZone.classList.remove("active-zone");
        }
    }
}

initDragAndDrop();

