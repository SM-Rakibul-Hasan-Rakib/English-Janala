const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json()) //promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove active class from all buttons
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // section scroll into view
      // clickBtn.scrollIntoView({ behavior: "smooth" });
      // console.log(clickBtn);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const displayLevelWord = (words) => {
  // get the container
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = `<div
        class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
        <img class="mx-auto" src="/assets/alert-error.png" alt="" />
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
      </div>`;
    return;
  }

  // 2 get into every word
  words.forEach((word) => {
    console.log(word);
    // create card
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="bg-white text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-xl">${word.word ? word.word : "word is not available"}</h2>
        <p class="text-gray-600" font-semibold>Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "meaning is not available"} / ${word.pronunciation ? word.pronunciation : "pronunciation is not available"}"</div>
        <div class="flex justify-between items-center">
          <button onClick="my_modal_5.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
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
    <button id="lesson-btn-${lesson.level_no}"
     onClick="loadLevelWord(${lesson.level_no})"
      class="btn  btn-outline btn-primary lesson-btn href="">
    <i class="fa-solid text-xl fa-book-open">
    </i>Lesson =${lesson.level_no}
    </button>`;
    // 4. append into container
    levelContainer.appendChild(btnDiv);
  }
};
loadLessons();
