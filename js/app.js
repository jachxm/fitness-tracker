let setCounter = 1;
let workout =[]
import { ahoj } from '/js/editExcercise.js'
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
  repsInput.style.width = '180px'


  const weightInput = document.createElement('input');
  weightInput.setAttribute('type', 'number');
  weightInput.setAttribute('placeholder', 'Váha');
  weightInput.setAttribute('id', 'weight' + setCounter);
  weightInput.style.width = '180px'

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', function () {
    outerGroup.remove();
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

        sets.push({ reps: Number(reps), weight: Number(weight) });
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
      console.log('workout')
      console.log(workout)
    });


    document.getElementById('workout-form').appendChild(addWorkout);
  }

  setCounter++; // Zvyšte counter po přidání nové série
});

function saveExercise(excercise) {
  const exerciseName = excercise.name;
  ahoj()
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
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button');
  deleteButton.style.marginTop = '0'
  deleteButton.addEventListener('click', function () {
    workout.forEach((exercise, index) => {
      if (exercise.name === exerciseName){
        workout.splice(index, 1)
        console.log('po smazani: ' + JSON.stringify(workout));}
        console.log(JSON.parse(JSON.stringify(workout)))
    })
    listItem.remove(); // Odstraní celý seznamový prvek (li) po kliknutí na tlačítko
  });

  // Vytvoříme nadpis cvičení jako h3
  const title = document.createElement('h3');
  title.textContent = exerciseName;

  const editButton = document.createElement('button');
  editButton.classList.add('edit-button')
  editButton.textContent = '✏️'

  const buttonGroup = document.createElement('div')
  buttonGroup.classList.add('button-container')

  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('outer-div');
  titleDiv.style.width = '440px'
  titleDiv.appendChild(title);
  titleDiv.appendChild(buttonGroup);

  listItem.appendChild(titleDiv);
  console.log(excercise)
  // Přidáme jednotlivé sety jako odstavce
  excercise.session.forEach((set, index) => {
    const setDetails = document.createElement('p');
    setDetails.textContent = `Série ${index + 1}: Opakování - ${set.reps}, Váha - ${set.weight} kg`;
    listItem.appendChild(setDetails);
  });

  workoutList.appendChild(listItem);

  document.getElementById('exercise-name').value = '';

  saveWorkout();
  return true;
}

function saveWorkout(){
  const currentDate = new Date()
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear()
  let date = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  let newWorkout = {
    date: date,
    excercise: workout
  };
  console.log('curaku')

  console.log(newWorkout)
}
