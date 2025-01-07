//procházení všech uložených workoutů
const allWorkout = [];

document.getElementById('getHistory').addEventListener('click', function ()  {
  getWorkoutHistory()
  insertFakeWorkouts()
})

function getWorkoutHistory(){
  for (let i = 0; i < localStorage.length; i++) {
    let date = localStorage.key(i);
    let excercise = JSON.parse(localStorage.getItem(date))
    let workout = {date: date, session: excercise}
    if (!allWorkout.find(day => day.date === workout.date)){
    allWorkout.push(workout);
    console.log(allWorkout);
    }
    console.log(allWorkout)

  }
  allWorkout.sort((a, b) => {
    const dateA = new Date(a.date.split('.').reverse().join('-'));  // převod na format YYYY-MM-DD
    const dateB = new Date(b.date.split('.').reverse().join('-'));

    // Porovnejte je a seřaďte
    return dateA - dateB;  // Seřazení od nejstaršího po nejnovější
  });
  showHistory()
  document.getElementById('getHistory').remove();
}

function showHistory(){
  const workoutList = document.getElementById('workout-list')
  allWorkout.forEach((day) => {
        const title = document.createElement('h3')
        title.textContent = day.date;

        const listItem = document.createElement('li')
        listItem.setAttribute('id', day.date)
        listItem.appendChild(title)

        day.session.forEach((ex)=>{
          const exName = document.createElement('h4')
          exName.textContent = `${ex.name}`
          listItem.appendChild(exName)
          ex.session.forEach((set) => {
            const setRow = document.createElement('p')
            setRow.textContent = 'opakovani: ' + set.reps + ' vaha: ' + set.weight;
            listItem.appendChild(setRow);
          })
        })

        workoutList.appendChild(listItem);
  })


}

//vlozenych falesnych dat pro test appky
function insertFakeWorkouts() {
  // Vytvoření fiktivních workoutů
  const fakeWorkouts = [
    {
      date: "07.01.2025",
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
      date: "08.01.2025",
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
      date: "09.01.2025",
      session: [
        {
          name: "pull-up",
          session: [
            { reps: 10, weight: 0 },
            { reps: 8, weight: 0 }
          ]
        },
        {
          name: "push-up",
          session: [
            { reps: 15, weight: 0 },
            { reps: 12, weight: 0 }
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

// Zavolání funkce pro vložení falešných workoutů
insertFakeWorkouts();

