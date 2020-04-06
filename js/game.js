const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let misses = 0;
function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером
  $(divSelector).text(hits+1);

  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
    firstHitTime = getTimestamp();
  }
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-fields").addClass("visible");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-misses").text(misses);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  let target = $(event.target);
  if (target.hasClass("target")) {
    hits = hits + 1;
    target.removeClass("target");
    target.text("");
    if ($(".miss")) {
      $(".miss").removeClass("miss");
    }
    round();
  } else {
    target.addClass("miss");
    misses++;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}
function startGame() {
  $(".game-fields").removeClass("visible");
  $("#button-reload").removeClass("visible");
  $("#button-start").addClass("visible");
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(startGame);
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
