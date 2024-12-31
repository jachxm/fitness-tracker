let counter = 0;


document.getElementById('add-workout').addEventListener('click', function (){
  const excersiceName = document.getElementById('exercise-name').value;
  const sets = document.getElementById('sets').value;
  const reps = document.getElementById('reps').value;

  const cvik = [excersiceName, sets, reps];

  console.log(cvik);
})


document.getElementById('add-set').addEventListener('click', function() {
  document.getElementById("add-workout").remove();

  const outerGroup = document.createElement('div');
  outerGroup.classList.add('outer-div')
  outerGroup.setAttribute('id', "set"+counter);

  const inputGroup = document.createElement('div');
  inputGroup.classList.add('input-group');

  const repsInput = document.createElement('input');
  repsInput.setAttribute('type', 'number');
  repsInput.setAttribute('placeholder', 'Počet opakování');
  repsInput.setAttribute('id', 'reps-' + counter); // Unikátní ID pro reps input

  const weightInput = document.createElement('input');
  weightInput.setAttribute('type', 'number');
  weightInput.setAttribute('placeholder', 'Váha');
  weightInput.setAttribute('id', 'weight-' + counter); // Unikátní ID pro weight input

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '-';
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('delete-button')

  deleteButton.addEventListener('click', function() {
    outerGroup.remove();
  });

  inputGroup.appendChild(repsInput);
  inputGroup.appendChild(weightInput);

  outerGroup.appendChild(inputGroup);
  outerGroup.appendChild(deleteButton);

  const addWorkout = document.createElement("button")
  addWorkout.setAttribute('type', 'button')
  addWorkout.setAttribute('id', 'add-workout')
  addWorkout.textContent='Přidat';

  document.getElementById('workout-form').appendChild(outerGroup);
  document.getElementById('workout-form').appendChild(addWorkout);

  counter++;
});

