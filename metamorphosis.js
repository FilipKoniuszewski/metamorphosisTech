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
    initDropzone(ui.mixedCardsContainer);
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
    if (e.currentTarget !== ui.mixedCardsContainer) {
        if (dom.isEmpty(e.currentTarget)) {
            e.currentTarget.classList.add("over-zone");
        }
    }
    else {
        e.currentTarget.classList.add("back-deck-over-zone")
    }
    console.log("Drag enter of", e.currentTarget);
}

function handleDragLeave(e) {
    if (e.dataTransfer.types.includes('type/dragged-box') &&
        e.relatedTarget !== null &&
        e.currentTarget !== e.relatedTarget.closest('.card-slot') ||
        e.currentTarget !== e.relatedTarget.closest('.mixed-cards'))
         {
        this.classList.remove("over-zone");
        this.classList.remove("back-deck-over-zone")
    }
    console.log("Drag leave of", e.currentTarget);
}

function handleDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    console.log("Drop of", dropzone);
    if (dom.hasClass(dropzone, "card-slot")) {
        if (dom.isEmpty(dropzone)) {
            dropzone.appendChild(game.dragged);
            return;
        }
    }
    else if (dom.hasClass(dropzone, "mixed-cards")) {
        dropzone.appendChild(game.dragged);
            return;
    }
}

function setDropZonesHighlight(highlight = true) {
    const dropZones = ui.slots;
    const backZone = ui.mixedCardsContainer
    for (const dropZone of dropZones) {
        if (highlight) {
            dropZone.classList.add("active-zone");
        } else {
            dropZone.classList.remove("active-zone");
            dropZone.classList.remove("over-zone");
        }
    }
    if (highlight) {
        backZone.classList.add("back-deck-highlight")
    }
    else {
        backZone.classList.remove("back-deck-highlight")
        backZone.classList.remove("back-deck-over-zone")
        // backZone.classList.remove("over-zone");
    }
}

initDragAndDrop();

