document.addEventListener("DOMContentLoaded", loadHabits);


// Load habits from localStorage and display them
function loadHabits() {
   let habits = JSON.parse(localStorage.getItem("habits")) || {};
   let habitList = document.getElementById("habit-list");
   habitList.innerHTML = ""; // Clear existing content before loading


   for (let habit in habits) {
       createHabitElement(habit, habits[habit].count, habits[habit].lastUpdated);
   }
}


// Add a new habit
function addHabit() {
   let habitName = document.getElementById("habit-name").value.trim();
   if (habitName === "") return;


   let habits = JSON.parse(localStorage.getItem("habits")) || {};
   if (!habits[habitName]) {
       habits[habitName] = {
           count: 0, // Initialize streak count
           lastUpdated: null // Last update timestamp
       };
       localStorage.setItem("habits", JSON.stringify(habits));
       createHabitElement(habitName, 0, null);
   }


   document.getElementById("habit-name").value = ""; // Clear input field
}


// Create a habit element in the UI
function createHabitElement(name, count, lastUpdated) {
   let habitList = document.getElementById("habit-list");


   let habitDiv = document.createElement("div");
   habitDiv.className = "habit border p-3 mb-2 d-flex justify-content-between align-items-center";
   habitDiv.id = `habit-${name}`;


   let lastUpdatedText = lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleString()}` : "Not updated yet";


   habitDiv.innerHTML = `
       <div>
           <h3>${name}</h3>
           <p>Streak: <span id="counter-${name}">${count}</span> days</p>
           <p id="last-updated-${name}" class="text-muted">${lastUpdatedText}</p>
           <button class="btn btn-primary" onclick="increment('${name}')">+1 Day</button>
       </div>
       <button class="btn btn-danger" onclick="deleteHabit('${name}')"><i class="fas fa-trash"></i></button>
   `;


   habitList.appendChild(habitDiv);
}


// Increment habit streak (only if 24 hours have passed)
function increment(habitName) {
   let habits = JSON.parse(localStorage.getItem("habits")) || {};
   let currentTime = new Date().getTime();


   if (habits[habitName] !== undefined) {
       let lastUpdated = habits[habitName].lastUpdated;
       let timeDifference = lastUpdated ? (currentTime - lastUpdated) / (1000 * 60 * 60) : 24; // Convert ms to hours


       if (timeDifference >= 24) {
           habits[habitName].count += 1;
           habits[habitName].lastUpdated = currentTime;
           localStorage.setItem("habits", JSON.stringify(habits));


           document.getElementById(`counter-${habitName}`).textContent = habits[habitName].count;
           document.getElementById(`last-updated-${habitName}`).textContent = `Last updated: ${new Date(currentTime).toLocaleString()}`;
       } else {
           alert(`You can only update this habit after 24 hours. Try again later.`);
       }
   }
}


// Delete a habit
function deleteHabit(habitName) {
   let habits = JSON.parse(localStorage.getItem("habits")) || {};


   if (habits[habitName] !== undefined) {
       delete habits[habitName]; // Remove habit from storage
       localStorage.setItem("habits", JSON.stringify(habits));


       let habitDiv = document.getElementById(`habit-${habitName}`);
       if (habitDiv) {
           habitDiv.remove(); // Remove from UI
       }
   }
}





















