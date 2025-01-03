let setCounter = 1;
let excerciseCounter = 1;

document.getElementById('save-excercise').addEventListener('click', function (){
  alert('nemas zadnou serii');
})

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
            alert('chybí ti počet opakování na sérii '+ i)
            return null;
          }
          else{
          alert('chybí ti váha na sérii '+ i)
          return null;
          }
        }
      }

      if (!exerciseName){
        alert('chybi nazev cviku')
        return null;
      }

      if (sets.length < 1){
        alert('nemas zadnou serii')
        return null;
      }

      console.log('Cvik:', exerciseName);
      console.log('Série:', sets);
      saveExcercise(exerciseName, sets)
    });

    document.getElementById('workout-form').appendChild(addWorkout);
  }

  setCounter++;
});



function saveExcercise(excerciseName, sets)
{
  if (document.getElementById(excerciseName + excerciseCounter)) {
    alert(excerciseName + ' si dnes uz cvicil!!!')
    return null;
  }
  const workoutList = document.getElementById('workout-list')

  document.createElement('section')


  const title = document.createElement("div")
  title.setAttribute('id', excerciseName + excerciseCounter)
  title.classList.add('outer-div')

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '-';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener("click", function (){
    title.remove();
  })

  const excercise = document.createElement('h1')
  excercise.textContent = excerciseName;
  excercise.style.margin = '0 auto';

  title.appendChild(excercise)
  title.appendChild(deleteButton)

  sets.forEach((set, index) => {
    const setDetails = document.createElement('p');
    setDetails.textContent = `Série ${index + 1}: Opakování - ${set.reps}, Váha - ${set.weight} kg`;
    title.appendChild(setDetails);
  });

  workoutList.appendChild(title)
}



