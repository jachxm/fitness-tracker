//pokus git 4
let setCounter = 1;
let workout = []
const currentDate = new Date()
import {getButton, getInput, getDiv, getP} from "/js/modules/ui.js";

function getDate() {
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear()
  let date = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  return date;
}

// Funkce pro přidání setu
document.getElementById('add-set').addEventListener('click', function () {
  // Odebrání tlačítka "Uložit sérii", pokud existuje
  document.getElementById('save-excercise')?.remove();

  document.getElementById('workout-form').appendChild(createInput());

  // Přidání tlačítka "Uložit sérii" jen jednou
  if (!document.getElementById('save-excercise')) {
    const addWorkoutButton = getButton(null, 'save-excercise', 'Uložit cvik')

    addWorkoutButton.addEventListener('click', function () {
      const exerciseName = document.getElementById('exercise-name')?.value;
      const sets = [];
      let hasError = false; // Flag pro kontrolu chyby

      // Iterujeme přes všechny existující prvky s ID začínajícími na "reps"
      const setElements = document.querySelectorAll('[id^="reps"]');
      setElements.forEach((repsInput) => {
        if (hasError) return; // Pokud už byla chyba, ukončíme další kontrolu

        const id = repsInput.id.replace('reps', '');
        const weightInput = document.getElementById('weight' + id);

        const reps = repsInput.value;
        const weight = weightInput?.value;

        if (!reps) {
          alert('Chybí ti počet opakování na sérii ' + id);
          hasError = true; // Nastavíme chybu, aby se zabránilo dalšímu alertu
          return;
        }

        if (!weight) {
          alert('Chybí ti váha na sérii ' + id);
          hasError = true;
          return;
        }

        sets.push({reps: Number(reps), weight: Number(weight)});
      });

      if (hasError) return; // Pokud nastala chyba, ukončíme funkci

      if (!exerciseName) {
        alert('Chybí název cvičení');
        return; // Ukončíme funkci, pokud chybí název cvičení
      }

      if (sets.length < 1) {
        alert('Nemáš žádnou sérii');
        return;
      }

      let excercise = {
        name: exerciseName,
        session: sets
      };

      if (!saveExercise(excercise)) return;

      workout.push(excercise)
    });


    document.getElementById('workout-form').appendChild(addWorkoutButton);
  }

  setCounter++;
});

function saveExercise(excercise) {
  const exerciseName = excercise.name;
  // Zkontrolujeme, jestli už cvičení existuje
  if (document.getElementById(exerciseName)) {
    alert(exerciseName + ' si dnes už cvičil!!!');
    return null;
  }

  // Najdeme seznam pro workout
  const workoutList = document.getElementById('workout-list');

  // Vytvoříme nový seznamový prvek (odrážku)
  const listItem = document.createElement('li');
  listItem.setAttribute('id', exerciseName);
  listItem.style.width = '450px'

  // Vytvoříme tlačítko pro smazání cvičení
  const deleteButton = getButton('delete-button', null, '❌', 'smazat')
  deleteButton.style.marginTop = '0'
  deleteButton.addEventListener('click', function () {
    workout.forEach((exercise, index) => {
      if (exercise.name === exerciseName) {
        workout.splice(index, 1);
      }
    })
    listItem.remove(); // Odstraní celý seznamový prvek (li) po kliknutí na tlačítko
  });

  // Vytvoříme nadpis cvičení jako h3
  const title = document.createElement('h3');
  title.textContent = exerciseName;

  const editButton = getButton('edit-button', null, '✏️', 'upravit')

  editButton.addEventListener('click', function () {
    if (editButton.textContent === '✏️') {
      editButton.textContent = '✔️';
      editButton.style.backgroundColor = '#90EE90';
      editButton.setAttribute('title', 'Uložit změny')
      // Odstranění všech existujících setů při editaci
      excercise.session.forEach((set, index) => {
        const setElement = document.getElementById(exerciseName + 'savedSet' + index);
        if (setElement) {
          setElement.remove();
        }
      })
      excercise.session.forEach((set, index) => {
        const inputGroup = getDiv('input-group')

        const repsInput = getInput('number', 'počet opakování', 'editReps' + index, '170px', set.reps)
        const weightInput = getInput('number', 'váha', 'editWeight' + index, '170px', set.weight)
        const lineGroup = getDiv('outer-div', 'set' + setCounter)
        const deleteButton = getButton('delete-button', null, '❌')
        deleteButton.addEventListener('click', function () {
          lineGroup.remove();
        });

        inputGroup.appendChild(repsInput);
        inputGroup.appendChild(weightInput);
        lineGroup.appendChild(inputGroup)
        lineGroup.appendChild(deleteButton)
        listItem.appendChild(lineGroup);
      });

    } else {
      editButton.textContent = '✏️';
      editButton.style.backgroundColor = 'white';
      editButton.setAttribute('title', 'Upravit')


      const updatedSets = [];
      excercise.session.forEach((set, index) => {
        const reps = document.getElementById('editReps' + index)?.value
        const weight = document.getElementById('editWeight' + index)?.value

        if (reps && weight) {
          updatedSets.push({reps: reps, weight: weight})
        }
      });

      if (updatedSets.length > 0) {
        excercise.session = updatedSets
        workout.forEach((excercise) => {
            if (excercise.name === exerciseName) {
              excercise.session = updatedSets;
              console.log('upraveny workout')
              console.log(workout)
            }
          }
        )
      }
      listItem.querySelectorAll('.outer-div').forEach((group) => {
        if (group.id === 'titleDiv') {
          return
        }
        group.remove()
      });
      excercise.session.forEach((set, index) => {
        const setDetails = getP(exerciseName + 'savedSet' + index, `Série ${index + 1}: Opakování - ${set.reps}, Váha - ${set.weight} kg`)
        listItem.appendChild(setDetails);
      })
    }
  })

  const buttonGroup = getDiv('button-container')
  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  const titleDiv = getDiv('outer-div', 'titleDiv')
  titleDiv.style.width = '440px'
  titleDiv.appendChild(title);
  titleDiv.appendChild(buttonGroup);

  listItem.appendChild(titleDiv);
  console.log('cvik nazev a objekty s reps a weight')
  console.log(excercise)

  // Přidáme jednotlivé sety jako odstavce
  excercise.session.forEach((set, index) => {
    const setDetails = getP(exerciseName + 'savedSet' + index, `Série ${index + 1}: Opakování - ${set.reps}, Váha - ${set.weight} kg`)
    listItem.appendChild(setDetails);
  });

  workoutList.appendChild(listItem);

  document.getElementById('exercise-name').value = '';

  return true;
}

function createInput() {
  const lineGroup = getDiv('outer-div', 'set' + setCounter)

  const inputGroup = getDiv('input-group')

  const repsInput = getInput('number', 'Počet opakování', 'reps' + setCounter, '180px')

  const weightInput = getInput('number', 'Váha', 'weight' + setCounter, '180px')

  const deleteButton = getButton('delete-button', null, '❌', 'smazat')
  deleteButton.addEventListener('click', function () {
    lineGroup.remove();
  });

  inputGroup.appendChild(repsInput);
  inputGroup.appendChild(weightInput);
  lineGroup.appendChild(inputGroup);
  lineGroup.appendChild(deleteButton);
  return lineGroup;
}

//uložení cvičení do localStorage
document.getElementById('saveWorkout').addEventListener('click', function () {
  if (confirm('Chceš vážně trénink uložit? Zatím není možnost ho zpetně upravit')) {
    if (localStorage.getItem(getDate())) {
      alert('dneska si uz cvicil')
      return
    }
    localStorage.setItem(getDate(), JSON.stringify(workout))
    console.log('workout byl ulozen')
  }
})
