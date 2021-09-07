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
    this.classList.add('dragged');
    game.dragged = e.currentTarget;
    setDropZonesHighlight();
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
    if (game.dragged.getAttribute("data-animal")) {
        if (e.currentTarget !== ui.mixedCardsContainer) {
            if (e.currentTarget.parentNode.parentNode.classList[0] === game.dragged.getAttribute("data-animal") && !e.currentTarget.hasChildNodes()) {
                e.currentTarget.classList.add("over-zone");
            }
        } else {
            e.currentTarget.classList.add("back-deck-over-zone")
        }
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
    const dropzoneType = dropzone.parentNode.parentNode.classList[0];
    console.log("Drop of", dropzone);
    if (dom.hasClass(dropzone, "card-slot") && dropzoneType === game.dragged.getAttribute("data-animal")) {
        if (dom.isEmpty(dropzone)) {
            dropzone.appendChild(game.dragged);
            if (winCheck()) {
                document.getElementById("game-result").style.display = "flex";
            }
            return;
            }
        }
    else if (dom.hasClass(dropzone, "mixed-cards")) {
        dropzone.appendChild(game.dragged);
        if (winCheck()) {
            document.getElementById("game-result").style.display = "flex";
        }
        return;
    }
}

function setDropZonesHighlight(highlight = true) {
    const dropZones = ui.slots;
    const backZone = ui.mixedCardsContainer
    for (const dropZone of dropZones) {
        if (highlight) {
            if (dropZone.parentNode.parentNode.classList[0] === game.dragged.getAttribute("data-animal") && !dropZone.hasChildNodes()){
                dropZone.classList.add("active-zone");
            }
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
    }
}

function winCheck() {
    let placedCards = document.querySelectorAll('.card-slot > .card');
    if (placedCards.length < 8){
        return false;
    }
    let lastOrder = 0;
    for (const placedCard of placedCards) {
        if (placedCard.dataset.order <= lastOrder) {
            return false;
        }
        lastOrder = placedCard.dataset.order;
    }
    ui.cards.forEach(function (card) {
        card.removeEventListener('dragstart', handleDragStart)
    });
    return true;
}

initDragAndDrop();

