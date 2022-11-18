import selfAssessment from "./self-assessment.js"; //Самооценка
import songDataRu from "./songRu.js";
import songDataEn from "./songEn.js";

let currenLang = getLangLocalStorage(); //Получение значения из localStorage

let score = 0; //текущий счет
let questionIndex = 0; //индекс текущего вопроса

//---SCORE---///
const scoreHTML = document.querySelector(".score");

//---MUSIC LIST---///
const currentMusicItem = document.querySelectorAll(".music-list__item");
//------PLAYER CONST---////
const musicPlayerTop = document.querySelector(".music-player");
const volumeSlider = document.querySelector(".volume-slider");
const audioPlayerTop = document.querySelector(".music-player__audio");
const playButtonPlayerTop = document.querySelector(
  ".music-player__player-icon"
);
const progressContainerPlayerTop = document.querySelector(
  ".music-player__progress-container"
);
const progressLinePlayerTop = document.querySelector(
  ".music-player__progress-line"
);
const titleSongPlayerTop = document.querySelector(".music-player__title");
const avatarPlayerTop = document.querySelector(".current-music__ava_img");
const currentTimePlayerTop = document.querySelector(
  ".music-player__audio-time"
);
const durationTimePlayerTop = document.querySelector(
  ".music-player__audio-duration"
);
const logoHeader = document.querySelector(".logo__img");

const btnNext = document.querySelector(".btn-next");
const bntResult = document.querySelector(".btn-result");
bntResult.style.display = "none";

//----CHOISE CONTAINER CONNST----//
const musicList = document.querySelector(".choise-music__list");

//----SMALL PLAYER CONST-----//
const descriptionTextPlayer = document.querySelector(".description");
const smallPlayerContainer = document.querySelector(".music-about");
const avatarSmallPlayer = document.querySelector(".music-about__ava_img");
const nickSmallPlayer = document.querySelector(".music-about__nick");
const nameSmallPlayer = document.querySelector(".music-about__name");
const titleSmallPlayer = document.querySelector(".music-about__title");
const descSmallPlayer = document.querySelector(".music-about__description");

const audioSmallPlayer = document.querySelector(".music-about-player__audio");
const playerSmallPlayer = document.querySelector(".music-about");
const playBtnSmallPlayer = document.querySelector(".music-about-player__icon");
const progressContainerSmallPlayer = document.querySelector(
  ".music-about__progress-container"
);
const progressLineSmallPlayer = document.querySelector(
  ".music-about__progress-line"
);
const currentTimeSmallPlayer = document.querySelector(
  ".music-about__audio-time"
);
const durationTimeSmallPlayer = document.querySelector(
  ".music-about__audio-duration"
);
const volumeSliderSmallPlayer = document.querySelector(
  ".music-about__volume-slider"
);
let indexSong = getRandomNum(0, 5); //На каждом раунде рандомная песня для отгадывания
clearHTML();
showQuestion();

//------PLAYER TOP------//
//Получить рандомное число и подставить в качестве индекса массива для получения рандомной песни каждый раз;
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Инициализируем песню и выводим ее в плеер
function loadMainSong() {
  audioPlayerTop.src = `${songDataRu[questionIndex][indexSong].audio}`;
}
loadMainSong();

//Запуск песни главного плеера
function playMainSong() {
  playButtonPlayerTop.style.backgroundImage = "url(./assets/img/pause.svg)";
  musicPlayerTop.classList.add("play");
  logoHeader.classList.add("logo__img_active");
  audioPlayerTop.play();
}

//Пауза песни главного плеера
function pauseMainSong() {
  playButtonPlayerTop.style.backgroundImage = "url(./assets/img/play.svg)";
  musicPlayerTop.classList.remove("play");
  logoHeader.classList.remove("logo__img_active");
  audioPlayerTop.pause();
}

//Плей и пауза по клику, и смена иконки;
playButtonPlayerTop.addEventListener("click", () => {
  const isPlaying = musicPlayerTop.classList.contains("play");
  if (isPlaying) {
    pauseMainSong();
  } else {
    playMainSong();
  }
});

//Прогресс бар для плеера
function updateProgressContainer(e) {
  const { duration, currentTime } = e.srcElement;
  const percentProgress = (currentTime / duration) * 100; //Текущий процент для отображения прогресса;
  progressLinePlayerTop.style.width = `${percentProgress}%`;
}
audioPlayerTop.addEventListener("timeupdate", updateProgressContainer);

//Функция для перемотки песни;
function setProgressSong(e) {
  const widthProgressContainer = this.clientWidth;
  const clickWidthX = e.offsetX;
  //const audioDuration = audioPlayerTop.duration;
  const audioDuration = audioPlayerTop.duration || 33;
  audioPlayerTop.currentTime =
    (clickWidthX / widthProgressContainer) * audioDuration;
}
progressContainerPlayerTop.addEventListener("click", setProgressSong);

//При окончании песни меняем кнопку на паузу, сбрасываем стиль прогресс-бара
audioPlayerTop.addEventListener("ended", function () {
  pauseMainSong();
  progressLinePlayerTop.style.width = "0.5px";
});

//Текущее и общее время
function audioTime() {
  setTimeout(() => {
    durationTimePlayerTop.textContent = formatTime(
      audioPlayerTop.duration || 29.988571
    );
    durationTimeSmallPlayer.textContent = formatTime(audioSmallPlayer.duration);
  }, 300);
}

setInterval(() => {
  progressLinePlayerTop.value = audioPlayerTop.currentTime;
  currentTimePlayerTop.textContent = `${formatTime(
    audioPlayerTop.currentTime
  )} / `;
  //Если текущее время больше продолжительности трека, трек заканчивается и текущее время сбрасывается
  if (currentTimePlayerTop.textContent > durationTimePlayerTop.textContent) {
    currentTimePlayerTop.textContent = `00:00 / `;
  }
}, 500);

//Приведение продолжительности трека в вид 00:00
const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};
audioTime();

//Регулятор громкости
function setVolume() {
  audioPlayerTop.volume = volumeSlider.value / 100;
}
volumeSlider.addEventListener("click", setVolume);

//----CHOISE CONTAINER FUNCTION---//

//Очищаем все элементы li от текста при каждом рендере нового вопроса;
function clearHTML() {
  titleSongPlayerTop.innerHTML = "";
  musicList.innerHTML = "";
  avatarPlayerTop.src = "";
  audioPlayerTop.src = "";
  durationTimePlayerTop.textContent = "";
  5;
  btnNext.setAttribute("disabled", "disabled");
  indexSong = getRandomNum(0, 5);
}

//Функция рендера заголовка и вариантов ответа
function showQuestion() {
  avatarPlayerTop.src = "./assets/img/ava-micro.jpg";
  titleSongPlayerTop.innerHTML = "*****";
  songDataRu[questionIndex].forEach((item, index) => {
    const questionTemplate = `<li class="choise-music__item" data-answer="${index}">
    <span class="choise-music__item-btn"></span>
   %answer%
  </li>`;
    const answerHTML = questionTemplate.replaceAll("%answer%", item["track"]);
    musicList.innerHTML += answerHTML;
  });
}

let errorScore = 0;
//Проверка верности ответа
function checkAnswer() {
  musicList.addEventListener("click", function (e) {
    const rightAnswer = e.target;
    const trackId = songDataRu[questionIndex][indexSong].id; //Определяем ID трека
    const dataAnswer = Number(rightAnswer.getAttribute("data-answer")); //Если номер атрибута совпадает с индексом трека, то ответ верный;
    showSmallPlayer();
    if (trackId === dataAnswer) {
      if (musicList.classList.contains("right")) {
        renderSmallPlayer();
        return false;
      }
      score += 5 - errorScore;
      pauseMainSong();
      btnNext.removeAttribute("disabled");
      bntResult.removeAttribute("disabled");
      renderMainPlayer();
      renderSmallPlayer();
      playRightAnswer(); //Звуковой сопровождение правильного ответа
      colorRightAnswer(e);
      checkColorAnswer(e);
      renderTrackSmallPlayer(e);
      renderTrackSmallPlayerEn(e);
      selectLang();
      loadSmallPlayerSong(e);
    } else {
      if (rightAnswer.classList.contains("error-score")) {
        errorScore--;
      }
      errorScore++;
      if (musicList.classList.contains("right")) {
        loadSmallPlayerSong(e);
        renderTrackSmallPlayer(e);
        checkColorAnswer(e);
        renderTrackSmallPlayerEn(e);
        return false;
      }
      renderTrackSmallPlayer(e);
      renderTrackSmallPlayerEn(e);
      loadSmallPlayerSong(e);
      checkColorAnswer(e);
      playWrongAnswer(); //Звуковой сопровождение НЕправильного ответа
      colorWrongAnswer(e);
    }
    setLocalStorage();
    scoreHTML.textContent = `СЧЕТ: ${score}`;
    if (currenLang === "songDataEn") {
      scoreHTML.textContent = `SCORE: ${score}`;
    }
  });
}
checkAnswer();
//Счет сохраняется в local storage

function setLocalStorage() {
  localStorage.setItem("ScoreFinalScore", score);
}

//При правильном ответе выводим информацию и фото в главный плеер;
function renderMainPlayer() {
  const trackTitle = songDataRu[questionIndex][indexSong].track;
  const trackAvatar = songDataRu[questionIndex][indexSong].image;
  titleSongPlayerTop.textContent = trackTitle;
  avatarPlayerTop.src = trackAvatar;
}

//Функция звукового индикатора правильного ответа
function playRightAnswer() {
  const rightAnswerSong = document.querySelector(".rigth-answer");
  rightAnswerSong.play();
}

//Функция звукового индикатора НЕправильного ответа
function playWrongAnswer() {
  const rightAnswerSong = document.querySelector(".wrong-answer");
  rightAnswerSong.play();
}

//Если правильный ответ дан, звуковой индикации неправильного ответа не будет;
function pauseWrongAnswer() {
  const rightAnswerSong = document.querySelector(".wrong-answer");
  rightAnswerSong.pause();
}

//Цветовая индикация правильного ответа
function colorRightAnswer(e) {
  const rightAnswer = e.target;
  const btnAnswer = rightAnswer.childNodes[1];
  btnAnswer.classList.add("bingo");
}

//Цветовая индикация НЕправильного ответа
function colorWrongAnswer(e) {
  const rightAnswer = e.target;
  const btnAnswer = rightAnswer.childNodes[1];
  btnAnswer.classList.add("error");
  rightAnswer.classList.add("error-score");
  //Если дан правильный ответ, на контейнер ответов накладывается класс, после этого ошибки не засчитываются и можно проверять остальные варианты
  if (musicList.classList.contains("right")) {
    btnAnswer.classList.remove("error");
    rightAnswer.classList.remove("error-score");
    pauseWrongAnswer();
  }
}

//Если дан правильный ответ на родителя накладывается класс right, который в дальнейшем проверяют функции ответа
function checkColorAnswer(e) {
  const colorBtnAnswer = e.path[0].lastElementChild;
  if (colorBtnAnswer.classList.contains("bingo")) {
    musicList.classList.add("right");
  }
}

//При выборе верного ответа информация о нем показывается на странице
function renderSmallPlayer() {
  const trackAvatar = songDataRu[questionIndex][indexSong].image;
  const nickSinger = songDataRu[questionIndex][indexSong].nick;
  const nameSinger = songDataRu[questionIndex][indexSong].name;
  const descTrack = songDataRu[questionIndex][indexSong].description;
  const titleTrack = songDataRu[questionIndex][indexSong].track;
  avatarSmallPlayer.src = trackAvatar;
  nickSmallPlayer.textContent = nickSinger;
  nameSmallPlayer.textContent = nameSinger;
  descSmallPlayer.textContent = descTrack;
  titleSmallPlayer.textContent = titleTrack;
}

//Функция показывает информацию о треке, при выборе неверного ответа
function renderTrackSmallPlayer(e) {
  const rightAnswer = e.target;
  const dataAnswer = Number(rightAnswer.getAttribute("data-answer"));
  const trackAvatar = songDataRu[questionIndex][dataAnswer].image; //Пути для получения данных
  const nickSinger = songDataRu[questionIndex][dataAnswer].nick;
  const nameSinger = songDataRu[questionIndex][dataAnswer].name;
  const descTrack = songDataRu[questionIndex][dataAnswer].description;
  const titleTrack = songDataRu[questionIndex][dataAnswer].track;
  avatarSmallPlayer.src = trackAvatar;
  nickSmallPlayer.textContent = nickSinger;
  nameSmallPlayer.textContent = nameSinger;
  descSmallPlayer.textContent = descTrack;
  titleSmallPlayer.textContent = titleTrack;
  playBtnSmallPlayer.style.backgroundImage = "url(./assets/img/play.svg)";
  progressLineSmallPlayer.style.width = "0.5px";
}

//Загружаем песню при клике на вариант ответа
function loadSmallPlayerSong(e) {
  const rightAnswer = e.target;
  const dataAnswer = Number(rightAnswer.getAttribute("data-answer"));
  audioSmallPlayer.src = `${songDataRu[questionIndex][dataAnswer].audio}`;
  audioTimeSmallPlayer();
  currentAudioSmallPlayer();
}

//Воспроизведение в маленьком плеере
function playSongSmallPlayer() {
  playBtnSmallPlayer.style.backgroundImage = "url(./assets/img/pause.svg)";
  playerSmallPlayer.classList.add("play");
  audioSmallPlayer.play();
}
//Пауза в маленьком плеере
function pauseSongSmallPlayer() {
  playBtnSmallPlayer.style.backgroundImage = "url(./assets/img/play.svg)";
  playerSmallPlayer.classList.remove("play");
  audioSmallPlayer.pause();
}

//Переключение паузы и плей в зависимости от состояния плеера
playBtnSmallPlayer.addEventListener("click", () => {
  const isPlaying = playerSmallPlayer.classList.contains("play");
  if (isPlaying) {
    pauseSongSmallPlayer();
  } else {
    playSongSmallPlayer();
  }
});

//Прогресс бар для маленького плеера
function updateSmallProgressContainer(e) {
  const { duration, currentTime } = e.srcElement;
  const percentProgress = (currentTime / duration) * 100; //Текущий процент для отображения прогресса;
  progressLineSmallPlayer.style.width = `${percentProgress}%`;
}
audioSmallPlayer.addEventListener("timeupdate", updateSmallProgressContainer);

//Функция для перемотки песни маленький плеер;
function setSmallPlayerProgressSong(e) {
  const widthProgressContainer = this.clientWidth;
  const clickWidthX = e.offsetX;
  const audioDuration = audioSmallPlayer.duration;

  audioSmallPlayer.currentTime =
    (clickWidthX / widthProgressContainer) * audioDuration;
}
progressContainerSmallPlayer.addEventListener(
  "click",
  setSmallPlayerProgressSong
);

//При окончании песни меняем кнопку на паузу, сбрасываем стиль прогресс-бара
audioSmallPlayer.addEventListener("ended", function () {
  pauseSongSmallPlayer();
  progressLineSmallPlayer.style.width = "0.5px";
});

//Общее время трека
function audioTimeSmallPlayer() {
  setTimeout(() => {
    durationTimeSmallPlayer.textContent = formatTime(
      audioSmallPlayer.duration || 29.988571
    );
  }, 300);
}

//Текущее время трека
function currentAudioSmallPlayer() {
  setInterval(() => {
    progressLineSmallPlayer.value = audioSmallPlayer.currentTime;
    currentTimeSmallPlayer.textContent = `${formatTime(
      audioSmallPlayer.currentTime
    )} / `;
    //Если текущее время больше продолжительности трека, трек заканчивается и текущее время сбрасывается
    if (
      currentTimeSmallPlayer.textContent > durationTimeSmallPlayer.textContent
    ) {
      currentTimeSmallPlayer.textContent = `00:00 / `;
    }
  }, 500);
}

//Регулятор громкости маленький плеер
function setVolumeSmallPlayer() {
  audioSmallPlayer.volume = volumeSliderSmallPlayer.value / 100;
}
volumeSliderSmallPlayer.addEventListener("click", setVolumeSmallPlayer);

//Показать маленький плеер
function showSmallPlayer() {
  descriptionTextPlayer.classList.add("description_none");
  smallPlayerContainer.classList.add("music-about_active");
}

//Скрыть маленький плеер и показать дефолтное описание(с переводом)
function showDescriptionText() {
  const btnBackGreeting = document.querySelector(".menu__link");
  const descriptionText = document.querySelector(".description__text");
  const developContact = document.querySelector(".developer-contact");
  if (currenLang === "songDataEn") {
    descriptionText.textContent =
      "Listen to the song and choose an answer. After the correct option is selected, you can browse other songs and read information about them. Good luck!";
    btnBackGreeting.textContent = "Back to greeting page";
    btnNext.textContent = "Next question";
    bntResult.textContent = "Show results";
    developContact.textContent = "Artem Kamyshenkov";
    scoreHTML.textContent = `SCORE:`;
  }
  descriptionTextPlayer.classList.remove("description_none");
  smallPlayerContainer.classList.remove("music-about_active");
}
showDescriptionText();

//Перевод жанров музыки
function translateMusicList() {
  const musicItemArr = [
    "hip-hop 90s",
    "popular 00s",
    "charts 2010",
    "classical",
    "modern popular",
    "youtube charts",
  ];
  if (currenLang === "songDataEn") {
    for (let i = 0; i < musicItemArr.length; i++) {
      currentMusicItem[i].textContent = musicItemArr[i];
    }
  }
}
translateMusicList();

function selectCurrentList() {
  currentMusicItem.forEach((el) => {
    el.classList.remove("music-list__item_active");
    let dataItem = Number(el.getAttribute("data-item"));
    if (dataItem === questionIndex) {
      el.classList.add("music-list__item_active");
    }
  });
}
selectCurrentList();

//Переключение на следующий вопрос
function nextQuestion() {
  if (questionIndex !== songDataRu.length - 1) {
    questionIndex++;
    clearHTML();
    errorScore = 0;
    loadMainSong();
    showQuestion();
    audioTime();
    musicList.classList.remove("right");
    progressLinePlayerTop.style.width = "0.5px";
    showDescriptionText();
    selectCurrentList();
  }
  if (questionIndex === songDataRu.length - 1) {
    btnNext.style.display = "none";
    bntResult.removeAttribute("disabled");
    bntResult.style.display = "block";
  }
}
btnNext.addEventListener("click", nextQuestion);

//---LANG---//
function getLangLocalStorage() {
  return localStorage.getItem("currenLang");
}

//Функция перевода названия трека и описания
function renderTrackSmallPlayerEn(e) {
  if (currenLang === "songDataEn") {
    const rightAnswer = e.target;
    const dataAnswer = Number(rightAnswer.getAttribute("data-answer"));
    const trackAvatar = songDataEn[questionIndex][dataAnswer].image;
    const nickSinger = songDataEn[questionIndex][dataAnswer].nick;
    const nameSinger = songDataEn[questionIndex][dataAnswer].name;
    const descTrack = songDataEn[questionIndex][dataAnswer].description;
    const titleTrack = songDataEn[questionIndex][dataAnswer].track;
    avatarSmallPlayer.src = trackAvatar;
    nickSmallPlayer.textContent = nickSinger;
    nameSmallPlayer.textContent = nameSinger;
    descSmallPlayer.textContent = descTrack;
    titleSmallPlayer.textContent = titleTrack;
    playBtnSmallPlayer.style.backgroundImage = "url(./assets/img/play.svg)";
    progressLineSmallPlayer.style.width = "0.5px";
  }
}

function selectLang() {
  if (currenLang === "songDataEn") {
    const nickSinger = songDataEn[questionIndex][indexSong].nick;
    const nameSinger = songDataEn[questionIndex][indexSong].name;
    const descTrack = songDataEn[questionIndex][indexSong].description;

    nickSmallPlayer.textContent = nickSinger;
    nameSmallPlayer.textContent = nameSinger;
    descSmallPlayer.textContent = descTrack;
  }
}
