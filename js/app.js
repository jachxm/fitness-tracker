let setCounter = 1;
let exerciseCounter = 1;

// Funkce pro přidání setu
document.getElementById('add-set').addEventListener('click', function () {
  // Odebrání tlačítka "Uložit sérii", pokud existuje
  document.getElementById('save-excercise')?.remove();

  const outerGroup = document.createElement('div');
  outerGroup.classList.add('outer-div');
  outerGroup.setAttribute('id', 'set' + setCounter);

  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');

  const repsInput = document.createElement('input');
  repsInput.setAttribute('type', 'number');
  repsInput.setAttribute('placeholder', 'Počet opakování');
  repsInput.setAttribute('id', 'reps' + setCounter);

  const weightInput = document.createElement('input');
  weightInput.setAttribute('type', 'number');
  weightInput.setAttribute('placeholder', 'Váha');
  weightInput.setAttribute('id', 'weight' + setCounter);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '-';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', function () {
    outerGroup.remove();
    setCounter--; // Snížení counteru, pokud dojde k odstranění setu
  });

  inputGroup.appendChild(repsInput);
  inputGroup.appendChild(weightInput);

  outerGroup.appendChild(inputGroup);
  outerGroup.appendChild(deleteButton);

  document.getElementById('workout-form').appendChild(outerGroup);

  // Přidání tlačítka "Uložit sérii" jen jednou
  if (!document.getElementById('save-excercise')) {
    const addWorkout = document.createElement('button');
    addWorkout.setAttribute('type', 'button');
    addWorkout.setAttribute('id', 'save-excercise');
    addWorkout.textContent = 'Uložit cvik';

    addWorkout.addEventListener('click', function () {
      const exerciseName = document.getElementById('exercise-name')?.value;
      const sets = [];

      // Použití for smyčky k iteraci přes jednotlivé sety
      for (let i = 1; i < setCounter; i++) {
        const reps = document.getElementById('reps' + i)?.value;
        const weight = document.getElementById('weight' + i)?.value;

        if (reps && weight) {
          sets.push({ reps: Number(reps), weight: Number(weight) });
        }
        else {
          if (!reps){
            alert('Chybí ti počet opakování na sérii ' + i);
            return null;
          }
          else{
            alert('Chybí ti váha na sérii ' + i);
            return null;
          }
        }
      }

      if (!exerciseName){
        alert('Chybí název cvičení');
        return null;
      }

      if (sets.length < 1){
        alert('Nemáš žádnou sérii');
        return null;
      }

      console.log('Cvik:', exerciseName);
      console.log('Série:', sets);
      saveExercise(exerciseName, sets);
    });

    document.getElementById('workout-form').appendChild(addWorkout);
  }

  setCounter++; // Zvyšte counter po přidání nové série
});



function saveExercise(exerciseName, sets) {
  // Zkontrolujeme, jestli už cvičení existuje
  if (document.getElementById(exerciseName + exerciseCounter)) {
    alert(exerciseName + ' si dnes už cvičil!!!');
    return null;
  }

  // Najdeme seznam pro workout
  const workoutList = document.getElementById('workout-list');

  // Vytvoříme nový seznamový prvek (odrážku)
  const listItem = document.createElement('li'); // Odrážka pro cvičení

  // Vytvoříme tlačítko pro smazání cvičení
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '-';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener("click", function () {
    listItem.remove(); // Odstraní celý seznamový prvek (li) po kliknutí na tlačítko
  });

  // Vytvoříme nadpis cvičení jako h3
  const title = document.createElement('h3');
  title.textContent = exerciseName;

  const titleDiv = document.createElement("div")
  titleDiv.classList.add('outer-div');
  titleDiv.appendChild(title);
  titleDiv.appendChild(deleteButton);

  listItem.appendChild(titleDiv); // Přidáme název cvičení do odrážky

  // Přidáme jednotlivé sety jako odstavce
  sets.forEach((set, index) => {
    const setDetails = document.createElement('p');
    setDetails.textContent = `Série ${index + 1}: Opakování - ${set.reps}, Váha - ${set.weight} kg`;
    listItem.appendChild(setDetails); // Přidáme detaily setu
  });

  // Přidáme odrážku (li) do seznamu (ul)
  workoutList.appendChild(listItem);

  // Zvyšte exerciseCounter pro další cvičení
  exerciseCounter++;

  // Reset formuláře
  document.getElementById('exercise-name').value = '';  // Vyprázdníme pole pro název cvičení
}


