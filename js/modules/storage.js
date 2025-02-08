import {getButton, getInput, getDiv, getP} from './ui.js';

//vsechny workouty z localStorage

// inicializace historie workoutů
//insertFakeWorkouts();

export function getWorkoutHistory(dateFrom, dateTo) {
  const allWorkout = [];  
  if (dateFrom && dateTo) {
      for (let i = 0; i < localStorage.length; i++) {
        let date = localStorage.key(i);
        if (date >= dateFrom && date <= dateTo) {
          let excercise = JSON.parse(localStorage.getItem(date))
          let workout = {date: date, session: excercise}
          if (!allWorkout.find(day => day.date === workout.date)){
            allWorkout.push(workout);
          }
        }
      }
    }
    else if (dateFrom && !dateTo) {
      localStorage.getItem(dateFrom);
      allWorkout.push({date: dateFrom, session: JSON.parse(localStorage.getItem(dateFrom))});
    }
    else if(!dateFrom && !dateTo){    
    for (let i = 0; i < localStorage.length; i++) {
    let date = localStorage.key(i);
    let excercise = JSON.parse(localStorage.getItem(date))
    let workout = {date: date, session: excercise}
    if (!allWorkout.find(day => day.date === workout.date)){
    allWorkout.push(workout); 
    }
    }
    }
  allWorkout.sort((a, b) => {
    const dateA = new Date(a.date);  
    const dateB = new Date(b.date);
    return dateB - dateA;});
  showHistory(allWorkout);
}

export function showHistory(allWorkout){
  const workoutList = document.getElementById('workout-list')
    
  allWorkout.forEach((day) => {
    let counter = 0;
    let updatedDay = {};
    const title = document.createElement('h3');

        const date = new Date(day.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('cs-CZ', options);

        title.textContent = formattedDate;
        const deleteButton = getButton('delete-button', null, '❌', 'smazat')
        deleteButton.style.marginTop = '0'
        const editButton = getButton('edit-button', null, '✏️', 'upravit')
        const buttonGroup = getDiv('button-container')
        buttonGroup.appendChild(editButton)
        buttonGroup.appendChild(deleteButton)
        const titleDiv = getDiv('outer-div')
        titleDiv.appendChild(title)
        titleDiv.appendChild(buttonGroup)
        
      //funkce pro smazání dne
      deleteButton.addEventListener('click', function () {
        if (confirm('Opravdu chcete smazat tento den?')) {
          localStorage.removeItem(day.date)
          workoutList.removeChild(listItem)
        }
      })

      const listItem = document.createElement('li')
        listItem.appendChild(titleDiv)
        workoutList.appendChild(listItem)
        day.session.forEach((ex)=>{
          const exName = document.createElement('h4')
          exName.textContent = `${ex.name}`
          exName.setAttribute('id', day.date + ex.name)
          listItem.appendChild(exName)
          ex.session.forEach((set) => {
            const setRow = document.createElement('p')
            setRow.setAttribute('id', day.date + ex.name + 'set')
            setRow.textContent = 'opakovani: ' + set.reps + ' vaha: ' + set.weight;
            listItem.appendChild(setRow);
          })
        })

        editButton.addEventListener('click', function () {
          if (editButton.textContent === '✏️') {
            editButton.textContent = '✔️';
            editButton.style.backgroundColor = '#90EE90';
            editButton.setAttribute('title', 'Uložit změny')
            
            const elementSet = document.querySelectorAll(`[id^="${day.date}"]`)
            elementSet.forEach((element)=>{
              listItem.removeChild(element)
            })

            day.session.forEach((ex)=>{
              const exName = getInput('string', 'název cviku', ex.name + 'editName', '200px', ex.name)
              listItem.appendChild(exName)
              ex.session.forEach((set) => {
                const inputGroup = getDiv('input-group')
                const repsInput = getInput('number', 'počet opakování', ex.name + 'editReps' + counter, '165px', set.reps)
                const weightInput = getInput('number', 'váha', ex.name + 'editWeight' + counter, '165px', set.weight)
                const lineGroup = getDiv('outer-div')
                const deleteButton = getButton('delete-button', null, '❌')
                deleteButton.addEventListener('click', function () {
                  lineGroup.remove();
                });
                inputGroup.appendChild(repsInput);
                inputGroup.appendChild(weightInput);
                lineGroup.appendChild(inputGroup)
                lineGroup.appendChild(deleteButton)
                listItem.appendChild(lineGroup);
              })
            })

          } else {
            editButton.textContent = '✏️';
            editButton.style.backgroundColor = '#f0f0f0';
            editButton.setAttribute('title', 'Upravit')
            const updatedSession = [];
            day.session.forEach((ex) => {
              const nameSet = document.querySelectorAll(`[id^="${ex.name}editName"]`);
              nameSet.forEach((name) => {
                const elementSet = document.querySelectorAll(`[id^="${ex.name}editReps"]`);
                const weightElements = document.querySelectorAll(`[id^="${ex.name}editWeight"]`);
                const updatedSets = [];
                elementSet.forEach((repsInput, index) => {
                  const reps = repsInput.value;
                  const weight = weightElements[index]?.value;
                  if (reps && weight) {
                    updatedSets.push({reps: reps, weight: weight});
                  }
                });
                updatedSession.push({name: name.value, session: updatedSets});
              });
            });
            if (updatedSession.length > 0) {
              
              updatedDay = {date: day.date, session: updatedSession}
            }
            localStorage.removeItem(updatedDay.date);
            localStorage.setItem(updatedDay.date, JSON.stringify(updatedDay.session));
            while (workoutList.firstChild) {
              workoutList.removeChild(workoutList.firstChild);
            }
            allWorkout.length = 0;
            getWorkoutHistory();
          }
        });

      })
};


//vlozenych falesnych dat pro test appky
function insertFakeWorkouts() {
  const fakeWorkouts = [
    {
      date: "2025-01-07",
      session: [
        {
          name: "drep",
          session: [
            { reps: 10, weight: 50 },
            { reps: 12, weight: 55 }
          ]
        },
        {
          name: "bench",
          session: [
            { reps: 8, weight: 40 },
            { reps: 10, weight: 45 }
          ]
        }
      ]
    },
    {
      date: "2025-01-08",
      session: [
        {
          name: "squat",
          session: [
            { reps: 10, weight: 60 },
            { reps: 8, weight: 65 }
          ]
        },
        {
          name: "deadlift",
          session: [
            { reps: 5, weight: 100 },
            { reps: 5, weight: 105 }
          ]
        }
      ]
    },
    {
      date: "2025-01-09",
      session: [
        {
          name: "pull-up",
          session: [
            { reps: 10, weight: 5 },
            { reps: 8, weight: 6 }
          ]
        },
        {
          name: "push-up",
          session: [
            { reps: 15, weight: 7 },
            { reps: 12, weight: 8 }
          ]
        }
      ]
    }
  ];

  // Uložení každého workoutu do localStorage
  fakeWorkouts.forEach(workout => {
    localStorage.setItem(workout.date, JSON.stringify(workout.session));
  });

  console.log("Falešné workouty byly úspěšně přidány do localStorage.");
}