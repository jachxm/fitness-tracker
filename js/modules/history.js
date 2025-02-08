import {getButton, getInput, getDiv, getP} from './ui.js';
import { getWorkoutHistory, showHistory } from './storage.js';

// inicializace historie workoutů
//insertFakeWorkouts()
getWorkoutHistory();

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
    },
    {
      date: "2025-01-10",
      session: [
        {
          name: "overhead press",
          session: [
            { reps: 8, weight: 30 },
            { reps: 6, weight: 35 }
          ]
        },
        {
          name: "barbell row",
          session: [
            { reps: 10, weight: 50 },
            { reps: 8, weight: 55 }
          ]
        }
      ]
    },
    {
      date: "2025-01-11",
      session: [
        {
          name: "leg press",
          session: [
            { reps: 12, weight: 100 },
            { reps: 10, weight: 110 }
          ]
        },
        {
          name: "bicep curl",
          session: [
            { reps: 15, weight: 15 },
            { reps: 12, weight: 17.5 }
          ]
        }
      ]
    },
    {
      date: "2025-01-12",
      session: [
        {
          name: "tricep dips",
          session: [
            { reps: 12, weight: 5 },
            { reps: 10, weight: 10 }
          ]
        },
        {
          name: "plank hold",
          session: [
            { reps: 12, weight: 20 },
            { reps: 10, weight: 25 }
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
