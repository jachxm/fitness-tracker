let setCounter = 1;
let workout =[]
import { editExcercise } from '/js/editExcercise.js'
let newWorkout;
// Funkce pro přidání setu
document.getElementById('add-set').addEventListener('click', function () {
  // Odebrání tlačítka "Uložit sérii", pokud existuje
  document.getElementById('save-excercise')?.remove();



  document.getElementById('workout-form').appendChild(createInput());

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
    });


    document.getElementById('workout-form').appendChild(addWorkout);
  }

  setCounter++; // Zvyšte counter po přidání nové série
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
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button');
  deleteButton.style.marginTop = '0'
  deleteButton.addEventListener('click', function () {
    workout.forEach((exercise, index) => {
      if (exercise.name === exerciseName){
        workout.splice(index, 1);}
    })
    listItem.remove(); // Odstraní celý seznamový prvek (li) po kliknutí na tlačítko
  });

  // Vytvoříme nadpis cvičení jako h3
  const title = document.createElement('h3');
  title.textContent = exerciseName;

  const editButton = document.createElement('button');
  editButton.classList.add('edit-button')
  editButton.textContent = '✏️'
  editButton.addEventListener('click', function () {
    if (editButton.textContent === '✏️') {
      editButton.textContent = '✔️';
      editButton.style.backgroundColor = '#90EE90';

      // Odstranění všech existujících setů při editaci
      excercise.session.forEach((set, index) => {
        const setElement = document.getElementById('savedSet' + index);
        if (setElement) {
          setElement.remove();
      }})
      excercise.session.forEach((set, index) => {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');

        const repsInput = document.createElement('input');
        repsInput.setAttribute('type', 'number');
        repsInput.setAttribute('id', 'editReps' + index);
        repsInput.value = set.reps;
        repsInput.style.width = '170px'

        const weightInput = document.createElement('input');
        weightInput.setAttribute('type', 'number');
        weightInput.setAttribute('id', 'editWeight' + index);
        weightInput.value = set.weight;
        repsInput.style.width = '170px'

        const outerGroup = document.createElement('div');
        outerGroup.classList.add('outer-div');
        outerGroup.setAttribute('id', 'set' + setCounter);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.setAttribute('type', 'button');
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', function () {
          outerGroup.remove();
        });

        inputGroup.appendChild(repsInput);
        inputGroup.appendChild(weightInput);
        outerGroup.appendChild(inputGroup)
        outerGroup.appendChild(deleteButton)
        listItem.appendChild(outerGroup);
      });

      }

     else {
      editButton.textContent = '✏️';
      editButton.style.backgroundColor = 'white';

      const updatedSets = [];
      excercise.session.forEach((set, index)=> {
        const reps = document.getElementById('editReps' + index)?.value
        const weight = document.getElementById('editWeight' + index)?.value

        if (reps && weight){
          updatedSets.push({reps: reps, weight: weight})
        }
      });

      if (updatedSets.length > 0) {
        excercise.session = updatedSets
        workout.forEach((excercise, index)=>{
          if (excercise.name === exerciseName){
            excercise.session = updatedSets;
            console.log('upraveny workout')
            console.log(workout)
          }}
        )
      }
      listItem.querySelectorAll('.outer-div').forEach((group) => {
        if(group.id === 'titleDiv') {return}
          group.remove()});
      excercise.session.forEach((set, index) => {
        const setDetails = document.createElement('p');
        setDetails.setAttribute('id', 'savedSet' + index)
        setDetails.textContent = `Série ${index + 1}: Opakování - ${set.reps}, Váha - ${set.weight} kg`;
        listItem.appendChild(setDetails);

    })}})

  const buttonGroup = document.createElement('div')
  buttonGroup.classList.add('button-container')

  buttonGroup.appendChild(editButton);
  buttonGroup.appendChild(deleteButton);

  const titleDiv = document.createElement('div');
  titleDiv.classList.add('outer-div');
  titleDiv.style.width = '440px'
  titleDiv.setAttribute('id', 'titleDiv')
  titleDiv.appendChild(title);
  titleDiv.appendChild(buttonGroup);

  listItem.appendChild(titleDiv);
  console.log('cvik nazev a objekty s reps a weight')
  console.log(excercise)
  // Přidáme jednotlivé sety jako odstavce
  excercise.session.forEach((set, index) => {
    const setDetails = document.createElement('p');
    setDetails.setAttribute('id', 'savedSet' + index)
    setDetails.textContent = `Série ${index + 1}: Opakování - ${set.reps}, Váha - ${set.weight} kg`;
    listItem.appendChild(setDetails);
  });

  workoutList.appendChild(listItem);

  document.getElementById('exercise-name').value = '';

  return true;
}



function saveWorkout(){
  const currentDate = new Date()
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear()
  let date = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  newWorkout = {
    date: date,
    excercise: workout
  };
}


function createInput(){
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
return outerGroup;
}

document.getElementById('saveWorkout').addEventListener('click', function (){
  saveWorkout();
  console.log(newWorkout)
})
