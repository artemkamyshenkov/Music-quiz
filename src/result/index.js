const resultContainer = document.querySelector(".result__congrat");
const btnRestart = document.querySelector(".btn-restart");
let finalScore = getLocalStorage();
let currentLang = getLangLocalStorage();

function getLangLocalStorage() {
  return localStorage.getItem("currenLang");
}

function getLocalStorage() {
  return Number(localStorage.getItem("ScoreFinalScore"));
}

function translateResult() {
  const backGreetingPage = document.querySelector(".menu__link");
  if (currentLang === "songDataEn") {
    backGreetingPage.textContent = "Back to greeting page";
    if (finalScore < 30) {
      resultContainer.textContent = `Congratulations, you have successfully completed the quiz! You have reached ${finalScore} points out of 30 possible! Try to improve your score?`;
      btnRestart.textContent = "Take the quiz again?";
    } else {
      resultContainer.textContent = `Wow Wow Wow, you are a real connoisseur of music! You have reached ${finalScore} points! This is the maximum result! You can confirm your knowledge and go again`;
    }
  }
}
function showResult() {
  if (finalScore < 30) {
    console.log("test");
    if (finalScore === 1) {
      const resultTemp = `
      Поздравляю, вы успешно завершили викторину! Вы набрали ${finalScore}
      балл из 30 возможных! Попробуйте улучшить свой результат?
    `;
      resultContainer.textContent = resultTemp;
    }
    if (finalScore > 1 && finalScore < 5) {
      const resultTemp = `
      Поздравляю, вы успешно завершили викторину! Вы набрали ${finalScore}
      балла из 30 возможных! Попробуйте улучшить свой результат?
    `;
      resultContainer.textContent = resultTemp;
    }
    if (finalScore > 4 && finalScore < 21) {
      const resultTemp = `
      Поздравляю, вы успешно завершили викторину! Вы набрали ${finalScore}
      баллов из 30 возможных! Попробуйте улучшить свой результат?
    `;
      resultContainer.textContent = resultTemp;
    }
    if (finalScore === 21) {
      const resultTemp = `
      Поздравляю, вы успешно завершили викторину! Вы набрали ${finalScore}
      балл из 30 возможных! Попробуйте улучшить свой результат?
    `;
      resultContainer.textContent = resultTemp;
    }
    if (finalScore > 21 && finalScore < 25) {
      const resultTemp = `
      Поздравляю, вы успешно завершили викторину! Вы набрали ${finalScore}
      балла из 30 возможных! Попробуйте улучшить свой результат?
    `;
      resultContainer.textContent = resultTemp;
    }
    if (finalScore >= 25 && finalScore < 30) {
      const resultTemp = `
      Поздравляю, вы успешно завершили викторину! Вы набрали ${finalScore}
      баллов из 30 возможных! Попробуйте улучшить свой результат?
    `;
      resultContainer.textContent = resultTemp;
    }
  } else {
    const resultTemp = `
  Воу Воу Воу, вы настоящий знаток мызыки! Вы набрали ${finalScore}
  баллов! Это максимальный результат! Можете подвердить свои знания и пройти еще раз
`;
    resultContainer.textContent = resultTemp;
    btnRestart.style.display = "none";
  }
}
showResult();
translateResult();
