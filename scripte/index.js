const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join("");
};

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
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (word) => {
  const detailsBox = document.getElementById("details-container");

  detailsBox.innerHTML = `
    <div class="border border-slate-200 rounded-xl p-6">

      <!-- Word -->
      <h2 class="text-3xl font-bold text-black mb-8">
        ${word.word}
        <span class="text-2xl font-medium">
          (<i class="fa-solid fa-microphone-lines"></i>
          : ${word.pronunciation || "N/A"})
        </span>
      </h2>

      <!-- Meaning -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold mb-3">
          Meaning
        </h3>
        <p class="text-xl text-gray-700">
          ${word.meaning || "Meaning not available"}
        </p>
      </div>

      <!-- Example -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold mb-3">
          Example
        </h3>
        <p class="text-xl text-gray-700">
          ${word.example || "Example not available"}
        </p>
      </div>

      <!-- Synonyms -->
      <div>
        <span
          class="inline-block border-2 border-sky-500 px-2 py-1 text-lg font-semibold"
        >
          সমার্থক শব্দ গুলো
        </span>

        <div class="flex flex-wrap gap-3 mt-4">
          ${
            word.synonyms?.length
              ? word.synonyms
                  .map(
                    (syn) => `
                    <span
                      class="bg-slate-100 border border-slate-200 px-4 py-2 rounded-md text-lg"
                    >
                      ${syn}
                    </span>
                  `,
                  )
                  .join("")
              : `<span class="text-gray-500">No synonyms available</span>`
          }
        </div>
      </div>
    </div>
  `;

  document.getElementById("word_modal").showModal();
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
          <button onClick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF90]">
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
