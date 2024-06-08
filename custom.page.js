 
  



const messages = {
  saving: "Saving.....",
  saved: "All changes are saved",
  saveButton: "Save",
  saveFailed: "Failed to save changes",
};

document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("saveButton");
  const saveMessage = document.querySelector(".save-message");
  const savedInputsDiv = document.getElementById("savedInputs");

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    saveButton.textContent = messages.saving;

    const formData = {
      name: document.getElementById("name").value,
      focus: document.getElementById("focus").value,
      break: document.getElementById("break").value,
      cycles: document.getElementById("cycles").value,
    };

    localStorage.setItem(
      formData.name,
      JSON.stringify({
        focus: formData.focus,
        break: formData.break,
        cycles: formData.cycles,
      })
    );

    try {
      console.log({ [formData.name]: formData });
      saveButton.textContent = messages.saveButton;
      saveMessage.textContent = messages.saved;
      savedInputsDiv.textContent = `Name: ${formData.name}, Focus: ${formData.focus}, Break: ${formData.break}, Cycles: ${formData.cycles}, `;
    } catch (error) {
      console.error(
        "There has been a problem with your operation:",
        error
      );
      saveButton.textContent = messages.saveButton;
      saveMessage.textContent = messages.saveFailed;
    }
  })

  
  function saveSelectedTimes(section) {
    const categIcon = section.querySelector('.categicon').textContent.trim();
    const focusOption = section.querySelector('.genre-container:nth-child(1) .option-text').textContent.trim();
    const breakOption = section.querySelector('.genre-container:nth-child(2) .option-text').textContent.trim();
    const cyclesOption = section.querySelector('.genre-container:nth-child(3) .option-text').textContent.trim();

    const selectedTimes = {
      focus: focusOption,
      break: breakOption,
      cycles: cyclesOption,
    };

    localStorage.setItem(categIcon, JSON.stringify(selectedTimes));
    console.log(  categIcon+ ':', selectedTimes);
  }

  function loadSelectedTimes(section) {
    const categIcon = section.querySelector('.categicon').textContent.trim();
    const storedTimes = localStorage.getItem(categIcon);

    if (storedTimes) {
      const { focus, break: breakTime, cycles } = JSON.parse(storedTimes);

      section.querySelectorAll('.option-text').forEach(option => {
        const text = option.textContent.trim();
        if (text === focus || text === breakTime || text === cycles) {
          option.closest('.genre-option').querySelector('.option').classList.add('active');
        }
      });
    }
  }

  document.querySelectorAll('.select-genre').forEach((item) => {
    item.addEventListener('click', function () {
      this.parentElement.classList.toggle('active');
    });
  });

  document.querySelectorAll('.categ').forEach((item) => {
    item.addEventListener('click', function () {
      this.closest('.mtts').classList.toggle('active');
      saveSelectedTimes(this.closest('.mtts'));
    });
  });

  document.querySelectorAll('.option').forEach((item) => {
    item.addEventListener('click', function () {
      this.parentElement.querySelectorAll('.option').forEach(option => option.classList.remove('active'));
      this.classList.add('active');
    });
  });

  document.querySelectorAll('.mtts').forEach((section) => {
    loadSelectedTimes(section);
  });
localStorage.setItem(categIcon, JSON.stringify(selectedTimes));
});