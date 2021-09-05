# Metamorphosis

## Story

We have a great idea: programming is really fun but breeding frogs and butterflies is even more fun! :)

So the decision is made, we want to start a new business line with some fancy frogs and beautiful butterflies. However we are not sure about the process, so **we need your help**. Can you create a small game where we can practice the correct metamorphosis order of these creatures?

We have some cards, each showing a stage in the process and we would like a drag-and-drop game so that we can practice.

## What are you going to learn?

- Drag and Drop in vanilla JavaScript.
- Use HTML data attributes.
- Use CSS styling.

## Tasks

1. All card elements can be dragged with the mouse.
    - All `.card` elements can be picked up and dragged around.
    - After picking up a card, the element that stays at the original position during the drag is differentiated visually.

2. Picked up cards can be dropped in the metamorphosis steps.
    - Cards can be dropped into the slots in the `.metamorphosis-slots` element.
    - All `.card-slot` elements are active and visually highlighted when picking up a card.
    - When holding an element over a drop zone, the highlight changes to show where the card is being dropped.

3. We should be able to drop the cards back to the `.mixed-cards` container.
    - Cards can be dropped back to the `.mixed-cards` container.
    - The `.mixed-cards` area is active and visually highlighted when you pick up a card.
    - When holding an element over the area, the highlight changes to show where the card is being dropped.

4. Cards can only be dropped on allowed places.
    - The card slots in the frog/butterfly metamorphosis-container only accepts correct (frog/butterfly) cards.
    - Any type of card can be dropped back to the `.mixed-cads` container.
    - When holding an element over a possible drop zone, there is a visual indication whether the card can be dropped there.
    - Only one card can be dropped in a `.card-slot`.
    - Only `.card` elements can be dropped in the in drop zones of the game. (For example, if a file is dragged
 over the browser tab of the game, it does not trigger the zones.)

5. We want to win the game when we get the correct order of the frog/butterfly metamorphosis.
    - When the last piece is dropped and every card is in the correct order, there is confirmation that the puzzle is finished.
    - Do some fancy CSS magic :)

6. [OPTIONAL] In the basic version, we have nine possible drop zones. Solve the task without using separate `.card-slot` elements so that cards can be dragged directly in the `.metamorphosis-slots` and reordered there.
    - There are only three possible drop zones (frog, butterfly, deck).
    - Cards can be reordered inside a metamorphosis drop zone.

## General requirements

None

## Hints

- Open the `index.html` by starting a small HTTP server. For details, see the Background materials section.
- See the correct order of the frog/butterfly metamorphosis in the file names, but do not rely on the
  filenames for the win condition. HTML data attributes may be a good choice instead.

## Background materials

- <i class="far fa-exclamation"></i> [MDN HTML Drag&Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)  (Event / On Event Handler pages are different)
- <i class="far fa-exclamation"></i> [MDN Drag operations documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations)
- <i class="far fa-exclamation"></i> [How to start a local HTTP server](project/curriculum/materials/pages/tools/serve-files.md)
- <i class="far fa-exclamation"></i> [Detailed example code for Vanilla JS Drag&Drop](https://codepen.io/szrudi/pen/gOpLyKd)
- [Vanilla JS Drag&Drop tutorial](https://code-boxx.com/javascript-drag-and-drop/)
- [Dragula JS Drag&Drop library](https://bevacqua.github.io/dragula)
- [Interact.js Drag&Drop library](https://interactjs.io/)
- <i class="far fa-book-open"></i> [CSS Flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
