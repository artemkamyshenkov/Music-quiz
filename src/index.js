import songDataRu from "./quiz/songRu.js";
import songDataEn from "./quiz/songEn.js";

const langBtn = document.querySelectorAll(".btn-lang");
const langBtnRu = document.querySelector(".lang-ru");
const langBtnEn = document.querySelector(".lang-en");
const menuItemGreeting = document.querySelector(".menu__link_greeting");
const menuItemStart = document.querySelector(".menu__link_start");
const developApp = document.querySelector(".developer");
const galleryBtn = document.querySelector(".menu__link_gallery");
const greetingBtn = document.querySelector(".menu__link_greeting");
const mainPage = document.querySelector(".main");
let currenLang;

langBtnRu.addEventListener("click", () => {
  currenLang = "songDataRu";
  setLocalStorage();
  window.location.reload();
});

langBtnEn.addEventListener("click", () => {
  currenLang = "songDataEn";
  setLocalStorage();
  window.location.reload();
});

function setLocalStorage() {
  localStorage.setItem("currenLang", currenLang);
}

function changeLang() {
  let lang = localStorage.getItem("currenLang");

  if (lang === "songDataEn") {
    langBtnRu.classList.remove("active_lang");
    langBtnEn.classList.add("active_lang");
    menuItemGreeting.textContent = "Greeting page";
    menuItemStart.textContent = "Start quiz";
    developApp.textContent = "Artem Kamyshenkov";
    galleryBtn.textContent = "Hall of Fame";
  } else {
    langBtnRu.classList.add("active_lang");
    langBtnEn.classList.remove("active_lang");
  }
}
changeLang();

const galleryCards = document.createElement("div");
galleryCards.className = "gallery__cards";
const gallery = document.createElement("div");
gallery.className = "gallery";
const galleryContainer = document.createElement("div");
galleryContainer.className = "container";
galleryContainer.append(galleryCards);
gallery.append(galleryContainer);

function createGalleryCard(singer) {
  const galleryCard = document.createElement("div");
  galleryCard.className = "gallery__card";
  galleryContainer.append(galleryCard);

  const gallaryImg = document.createElement("img");
  const imgPath = singer.image.replace(".", "");
  gallaryImg.src = `./quiz${imgPath}`;
  gallaryImg.className = "card__img";

  const galleryNick = document.createElement("div");
  galleryNick.className = "gallary__nick";
  galleryNick.textContent = singer.nick;

  const galleryName = document.createElement("div");
  galleryName.className = "gallery__name";
  galleryName.textContent = singer.name;

  const galleryPlayer = document.createElement("div");
  galleryPlayer.className = "gallery__player";

  const galleryPlayBtn = document.createElement("button");
  galleryPlayBtn.className = "gallery__play";

  const galleryAudio = document.createElement("audio");
  const audioPath = singer.audio.replace(".", "");
  galleryAudio.src = `./quiz${audioPath}`;
  galleryAudio.className = "gallery__audio";

  const galleryProgressContainer = document.createElement("div");
  galleryProgressContainer.className = "gallery__progress_container";

  const galleryProgressLine = document.createElement("div");
  galleryProgressLine.className = "gallery__progress_line";

  galleryProgressContainer.append(galleryProgressLine);
  galleryPlayer.append(galleryPlayBtn, galleryAudio, galleryProgressContainer);

  const galleryDescription = document.createElement("div");
  galleryDescription.className = "gallery__description";
  galleryDescription.textContent = singer.description;

  galleryCard.append(
    gallaryImg,
    galleryNick,
    galleryName,
    galleryPlayer,
    galleryDescription
  );

  function playSong() {
    galleryPlayBtn.style.backgroundImage = "url(./quiz/assets/img/pause.svg)";
    gallery.classList.add("play");
    galleryAudio.play();
  }
  function pauseSong() {
    galleryPlayBtn.style.backgroundImage = "url(./quiz/assets/img/play.svg)";
    gallery.classList.remove("play");
    galleryAudio.pause();
  }
  galleryPlayBtn.addEventListener("click", () => {
    const isPlaying = gallery.classList.contains("play");
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  function updateProgressContainer(e) {
    const { duration, currentTime } = e.srcElement;
    const percentProgress = (currentTime / duration) * 100;
    galleryProgressLine.style.width = `${percentProgress}%`;
  }
  galleryAudio.addEventListener("timeupdate", updateProgressContainer);

  function setProgressSong(e) {
    const widthProgressContainer = this.clientWidth;
    const clickWidthX = e.offsetX;
    //const audioDuration = audioPlayerTop.duration;
    const audioDuration = galleryAudio.duration || 33;
    galleryAudio.currentTime =
      (clickWidthX / widthProgressContainer) * audioDuration;
  }
  galleryProgressContainer.addEventListener("click", setProgressSong);

  galleryAudio.addEventListener("ended", function () {
    pauseSong();
    galleryProgressLine.style.width = "0.5px";
  });

  return galleryCard;
}

function renderGallery() {
  songDataRu.forEach((el) => {
    el.forEach((singer) => {
      galleryCards.append(createGalleryCard(singer));
    });
  });
}

galleryBtn.addEventListener("click", function () {
  let lang = localStorage.getItem("currenLang");
  mainPage.innerHTML = "";
  mainPage.style.backgroundImage = "url(./assets/gallery.jpg)";
  greetingBtn.classList.remove("link_active");
  galleryBtn.classList.add("link_active");
  mainPage.append(gallery);
  if (lang === "songDataEn") {
    createGalleryEn();
  } else {
    renderGallery();
  }
});

function createGalleryEn() {
  let lang = localStorage.getItem("currenLang");
  if (lang === "songDataEn") {
    songDataEn.forEach((el) => {
      el.forEach((singer) => {
        galleryCards.append(createGalleryCard(singer));
      });
    });
  }
}
