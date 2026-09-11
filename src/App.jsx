import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      day: 'Monday',
      name: 'Chest & Triceps',
      exercises: 'Bench Press • Push-ups • Tricep Dips',
      completed: false
    },
    {
      id: 2,
      day: 'Wednesday',
      name: 'Back & Biceps',
      exercises: 'Pull-ups • Rows • Bicep Curls',
      completed: false
    }
  ])
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
  const savedWorkouts = localStorage.getItem('workouts')

  if (savedWorkouts) {
    setWorkouts(JSON.parse(savedWorkouts))
  }

  setIsLoaded(true)
}, [])

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem('workouts', JSON.stringify(workouts))
  }
}, [workouts, isLoaded])

const [day, setDay] = useState('')
const [name, setName] = useState('')
const [exercises, setExercises] = useState('')
const [sets, setSets] = useState('')
const [reps, setReps] = useState('')
const [duration, setDuration] = useState('')
const [calories, setCalories] = useState('')
const [protein, setProtein] = useState('')
const [carbs, setCarbs] = useState('')
const [fats, setFats] = useState('')
  function addWorkout() {

    if (day === '' || name === '' || exercises === '') {
      alert('Please fill in all fields')
      return
    }

    const newWorkout = {
  id: Date.now(),
  day: day,
  name: name,
  exercises: exercises,
  sets: sets,
  reps: reps,
  duration: duration,
  completed: false
}

    setWorkouts([...workouts, newWorkout])

    setDay('')
    setName('')
    setExercises('')
    setSets('')
    setReps('')
    setDuration('')
  }

  function toggleComplete(id) {
  const updatedWorkouts = workouts.map((workout) => {

    if (workout.id === id) {
      return {
        ...workout,
        completed: !workout.completed
      }
    }

    return workout
  })

  setWorkouts(updatedWorkouts)
}

function deleteWorkout(id) {
  const updatedWorkouts = workouts.filter(
    (workout) => workout.id !== id
  )

  setWorkouts(updatedWorkouts)
}


// Dashboard calculations

const totalWorkouts = workouts.length

const completedWorkouts = workouts.filter(
  (workout) => workout.completed
).length

const remainingWorkouts = totalWorkouts - completedWorkouts

const completionPercentage =
  totalWorkouts === 0
    ? 0
    : Math.round((completedWorkouts / totalWorkouts) * 100)
const calorieTarget = 2000
const proteinTarget = 100
const carbsTarget = 250
const fatsTarget = 60
const calorieProgress =
  calories === '' ? 0 : Math.min((Number(calories) / calorieTarget) * 100, 100)

const proteinProgress =
  protein === '' ? 0 : Math.min((Number(protein) / proteinTarget) * 100, 100)

const carbsProgress =
  carbs === '' ? 0 : Math.min((Number(carbs) / carbsTarget) * 100, 100)

const fatsProgress =
  fats === '' ? 0 : Math.min((Number(fats) / fatsTarget) * 100, 100)
  return (
    <div className="app">

      <header>
        <h1>Fitness Planner</h1>
        <p>Plan your workouts. Track your progress.</p>
      </header>
      <section className="dashboard">

  <h2>Dashboard</h2>

  <div className="stats">

    <div className="stat-card">
      <h3>{totalWorkouts}</h3>
      <p>Planned</p>
    </div>

    <div className="stat-card">
      <h3>{completedWorkouts}</h3>
      <p>Completed</p>
    </div>

    <div className="stat-card">
      <h3>{remainingWorkouts}</h3>
      <p>Remaining</p>
    </div>

    <div className="stat-card">
      <h3>{completionPercentage}%</h3>
      <p>Progress</p>
    </div>

  </div>
  <div className="progress-box">
  <h3>Weekly Progress</h3>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${completionPercentage}%` }}
    ></div>
  </div>

  <p>{completionPercentage}% of planned workouts completed</p>
</div>

</section>

<section className="form">
        <h2>Add a Workout</h2>

        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />

        <input
          type="text"
          placeholder="Workout name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Exercises"
          value={exercises}
          onChange={(e) => setExercises(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />

         <input
           type="number"
           placeholder="Reps"
           value={reps}
           onChange={(e) => setReps(e.target.value)}
        />

          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
        />

        <button onClick={addWorkout}>
          Add Workout
        </button>
      </section>

      <section className="workout-section">

        <h2>My Workouts</h2>

        {workouts.map((workout) => (

          <div
            className={`workout-card ${workout.completed ? 'completed' : ''}`}
            key={workout.id}
          >

            <h3>
              {workout.day} - {workout.name}
            </h3>

            <p>{workout.exercises}</p>
            <div className="workout-details">
              <span>Sets: {workout.sets}</span>
              <span>Reps: {workout.reps}</span>
              <span>Duration: {workout.duration} min</span>
            </div>

            <button onClick={() => toggleComplete(workout.id)}>
              {workout.completed ? 'Completed ✓' : 'Mark Complete'}
            </button>

            <button onClick={() => deleteWorkout(workout.id)}>
              Delete
            </button>

          </div>

        ))}

      </section>
      <section className="nutrition">

  <h2>Nutrition Tracker</h2>

  <div className="nutrition-form">

    <input
      type="number"
      placeholder="Calories"
      value={calories}
      onChange={(e) => setCalories(e.target.value)}
    />

    <input
      type="number"
      placeholder="Protein (g)"
      value={protein}
      onChange={(e) => setProtein(e.target.value)}
    />

    <input
      type="number"
      placeholder="Carbohydrates (g)"
      value={carbs}
      onChange={(e) => setCarbs(e.target.value)}
    />

    <input
      type="number"
      placeholder="Fats (g)"
      value={fats}
      onChange={(e) => setFats(e.target.value)}
    />

  </div>

  <div className="nutrition-summary">

    <p>
      Calories: {calories || 0} / {calorieTarget} kcal
    </p>

    <p>
      Protein: {protein || 0} / {proteinTarget} g
    </p>

    <p>
      Carbs: {carbs || 0} / {carbsTarget} g
    </p>

    <p>
      Fats: {fats || 0} / {fatsTarget} g
    </p>

  </div>

</section>
    </div>
  )
}

export default App