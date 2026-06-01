const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};

const displayLevelWord = (words) => {
  // get the container
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  // 2 get into every word
  words.forEach((word) => {
    console.log(word);
    // create card
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="bg-white text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-xl">${word.word}</h2>
        <p class="text-gray-600" font-semibold>Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
        <div class="flex justify-between items-center">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
  `;
    // append into container
    wordContainer.appendChild(cardDiv);
  });
};

const displayLesson = (lessons) => {
  // 1. get the container
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2.get into every lessons
  for (let lesson of lessons) {
    // 3. create Element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onClick="loadLevelWord(${lesson.level_no})" class="btn  btn-outline btn-primary" href="">
    <i class="fa-solid text-xl fa-book-open"></i>Lesson =${lesson.level_no}
    </button>`;
    // 4. append into container
    levelContainer.appendChild(btnDiv);
  }
};
loadLessons();
