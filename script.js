// document.addEventListener("DOMContentLoaded", loadHabits);


// // Load habits from localStorage and display them
// function loadHabits() {
//    let habits = JSON.parse(localStorage.getItem("habits")) || {};
//    let habitList = document.getElementById("habit-list");
//    habitList.innerHTML = ""; // Clear existing content before loading


//    for (let habit in habits) {
//        createHabitElement(habit, habits[habit].count, habits[habit].lastUpdated);
//    }
// }


// // Add a new habit
// function addHabit() {
//    let habitName = document.getElementById("habit-name").value.trim();
//    if (habitName === "") return;


//    let habits = JSON.parse(localStorage.getItem("habits")) || {};
//    if (!habits[habitName]) {
//        habits[habitName] = {
//            count: 0, // Initialize streak count
//            lastUpdated: null // Last update timestamp
//        };
//        localStorage.setItem("habits", JSON.stringify(habits));
//        createHabitElement(habitName, 0, null);
//    }


//    document.getElementById("habit-name").value = ""; // Clear input field
// }


// // Create a habit element in the UI
// function createHabitElement(name, count, lastUpdated) {
//    let habitList = document.getElementById("habit-list");


//    let habitDiv = document.createElement("div");
//    habitDiv.className = "habit border p-3 mb-2 d-flex justify-content-between align-items-center";
//    habitDiv.id = `habit-${name}`;


//    let lastUpdatedText = lastUpdated ? `Last updated: ${new Date(lastUpdated).toLocaleString()}` : "Not updated yet";


//    habitDiv.innerHTML = `
//        <div>
//            <h3>${name}</h3>
//            <p>Streak: <span id="counter-${name}">${count}</span> days</p>
//            <p id="last-updated-${name}" class="text-muted">${lastUpdatedText}</p>
//            <button class="btn btn-primary" onclick="increment('${name}')">+1 Day</button>
//        </div>
//        <button class="btn btn-danger" onclick="deleteHabit('${name}')"><i class="fas fa-trash"></i></button>
//    `;


//    habitList.appendChild(habitDiv);
// }


// // Increment habit streak (only if 24 hours have passed)
// function increment(habitName) {
//    let habits = JSON.parse(localStorage.getItem("habits")) || {};
//    let currentTime = new Date().getTime();


//    if (habits[habitName] !== undefined) {
//        let lastUpdated = habits[habitName].lastUpdated;
//        let timeDifference = lastUpdated ? (currentTime - lastUpdated) / (1000 * 60 * 60) : 24; // Convert ms to hours


//        if (timeDifference >= 24) {
//            habits[habitName].count += 1;
//            habits[habitName].lastUpdated = currentTime;
//            localStorage.setItem("habits", JSON.stringify(habits));


//            document.getElementById(`counter-${habitName}`).textContent = habits[habitName].count;
//            document.getElementById(`last-updated-${habitName}`).textContent = `Last updated: ${new Date(currentTime).toLocaleString()}`;
//        } else {
//            alert(`You can only update this habit after 24 hours. Try again later.`);
//        }
//    }
// }


// // Delete a habit
// function deleteHabit(habitName) {
//    let habits = JSON.parse(localStorage.getItem("habits")) || {};


//    if (habits[habitName] !== undefined) {
//        delete habits[habitName]; // Remove habit from storage
//        localStorage.setItem("habits", JSON.stringify(habits));


//        let habitDiv = document.getElementById(`habit-${habitName}`);
//        if (habitDiv) {
//            habitDiv.remove(); // Remove from UI
//        }
//    }
// }
document.addEventListener("DOMContentLoaded", () => {
    loadHabits();
    requestNotificationPermission();
    checkAndSendReminders(); // Run reminders when page loads
    setInterval(checkAndSendReminders, 60 * 60 * 1000); // Check every hour
});

// Load habits from localStorage and display them
function loadHabits() {
    let habits = JSON.parse(localStorage.getItem("habits")) || {};
    let habitList = document.getElementById("habit-list");
    habitList.innerHTML = ""; // Clear existing content before loading

    for (let habit in habits) {
        createHabitElement(habit, habits[habit].count, habits[habit].lastUpdated);
    }
}

// Request permission for notifications
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                console.log("Notification permission denied.");
            }
        });
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

// Check and send reminders for habits that haven't been updated in 24 hours
function checkAndSendReminders() {
    let habits = JSON.parse(localStorage.getItem("habits")) || {};
    let currentTime = new Date().getTime();

    for (let habit in habits) {
        let lastUpdated = habits[habit].lastUpdated;
        let timeDifference = lastUpdated ? (currentTime - lastUpdated) / (1000 * 60 * 60) : 24; // Convert ms to hours

        if (timeDifference >= 24) {
            sendReminder(habit);
        }
    }
}

// Function to send a curated notification
function sendReminder(habitName) {
    if (Notification.permission === "granted") {
        let messages = [
            `Hey! It's been 24 hours since you last worked on "${habitName}". Keep your streak alive! 🔥`,
            `Don't let your progress slip! Time to update your "${habitName}" habit. 🚀`,
            `Consistency is key! Give some attention to "${habitName}" and keep the momentum going! 💪`,
            `You're building something great! Keep "${habitName}" strong and update your progress. ✅`,
            `One small action today makes a big difference! Check in on "${habitName}" now. 🌟`
        ];

        let randomMessage = messages[Math.floor(Math.random() * messages.length)];

        new Notification("⏳ Streak Reminder!", {
            body: randomMessage,
            icon: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png", // Optional icon
        });
    }
}





















