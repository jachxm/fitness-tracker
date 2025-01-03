let counter = 1;

document.getElementById('save-excercise').addEventListener('click', function (){
  alert('curaku');
})

document.getElementById('add-set').addEventListener('click', function () {
  // Odebrání tlačítka "Uložit sérii", pokud existuje
  document.getElementById('save-excercise')?.remove();

  const outerGroup = document.createElement('div');
  outerGroup.classList.add('outer-div');
  outerGroup.setAttribute('id', 'set' + counter);

  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');

  const repsInput = document.createElement('input');
  repsInput.setAttribute('type', 'number');
  repsInput.setAttribute('placeholder', 'Počet opakování');
  repsInput.setAttribute('id', 'reps' + counter);

  const weightInput = document.createElement('input');
  weightInput.setAttribute('type', 'number');
  weightInput.setAttribute('placeholder', 'Váha');
  weightInput.setAttribute('id', 'weight' + counter);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '-';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', function () {
    outerGroup.remove();
    counter--; // Snížení counteru, pokud dojde k odstranění setu
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
      const exerciseName = document.getElementById('exercise-name')?.value || 'Neznámý cvik';
      const sets = [];

      // Použití for smyčky k iteraci přes jednotlivé sety
      for (let i = 1; i < counter; i++) {
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

      console.log('Cvik:', exerciseName);
      console.log('Série:', sets);
    });

    document.getElementById('workout-form').appendChild(addWorkout);
  }

  counter++;
});
