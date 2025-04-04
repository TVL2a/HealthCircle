// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
}

// Load Saved Data
let lastReset = localStorage.getItem("lastReset") ? parseInt(localStorage.getItem("lastReset")) : 0;
let waterCount = parseInt(localStorage.getItem("waterCount")) || 0;
let mealCount = parseInt(localStorage.getItem("mealCount")) || 0;
let activityCount = parseInt(localStorage.getItem("activityCount")) || 0;
let weeklyWater = parseInt(localStorage.getItem("weeklyWater")) || 0;
let weeklyMeals = parseInt(localStorage.getItem("weeklyMeals")) || 0;
let weeklyActivities = parseInt(localStorage.getItem("weeklyActivities")) || 0;

// Check if New Day
let today = new Date();
let todayTimestamp = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

if (lastReset < todayTimestamp) {
    // It's a new day → Reset daily counts
    lastReset = todayTimestamp;
    localStorage.setItem("lastReset", lastReset);
    waterCount = 0;
    mealCount = 0;
    activityCount = 0;
    localStorage.setItem("waterCount", waterCount);
    localStorage.setItem("mealCount", mealCount);
    localStorage.setItem("activityCount", activityCount);
}

// Update UI
document.getElementById("water-count").textContent = waterCount;
document.getElementById("weekly-water").textContent = weeklyWater;
document.getElementById("meal-list").textContent = mealCount;
document.getElementById("weekly-meals").textContent = weeklyMeals;
document.getElementById("activity-list").textContent = activityCount;
document.getElementById("weekly-activities").textContent = weeklyActivities;

function addWater() {
    waterCount++;
    weeklyWater++;
    document.getElementById("water-count").textContent = waterCount;
    document.getElementById("weekly-water").textContent = weeklyWater;
    localStorage.setItem("waterCount", waterCount);
    localStorage.setItem("weeklyWater", weeklyWater);
}

function logMeal() {
    let meal = document.getElementById("meal-input").value;
    if (meal.trim() !== "") {
        let listItem = document.createElement("li");
        listItem.textContent = meal + " - " + new Date().toLocaleTimeString();
        document.getElementById("meal-list").appendChild(listItem);
        mealCount++;
        weeklyMeals++;
        document.getElementById("weekly-meals").textContent = weeklyMeals;
        localStorage.setItem("mealCount", mealCount);
        localStorage.setItem("weeklyMeals", weeklyMeals);
        document.getElementById("meal-input").value = "";
    }
}

function logActivity() {
    let activity = document.getElementById("activity-input").value;
    if (activity.trim() !== "") {
        let listItem = document.createElement("li");
        listItem.textContent = activity + " - " + new Date().toLocaleTimeString();
        document.getElementById("activity-list").appendChild(listItem);
        activityCount++;
        weeklyActivities++;
        document.getElementById("weekly-activities").textContent = weeklyActivities;
        localStorage.setItem("activityCount", activityCount);
        localStorage.setItem("weeklyActivities", weeklyActivities);
        document.getElementById("activity-input").value = "";
    }
}

// Custom Nudge System
let customNudge = localStorage.getItem("customNudge") || "Stay on track! 😊";
document.getElementById("nudge-message").textContent = customNudge;

function setCustomNudge() {
    let nudgeInput = document.getElementById("custom-nudge").value;
    if (nudgeInput.trim() !== "") {
        customNudge = nudgeInput;
        document.getElementById("nudge-message").textContent = customNudge;
        localStorage.setItem("customNudge", customNudge);
        document.getElementById("custom-nudge").value = "";
    }
}

// Show Popup & Play Sound for Nudge
function triggerNudge() {
    let notification = document.getElementById("notification");
    document.getElementById("notification-message").textContent = customNudge;
    notification.style.display = "block";
    document.getElementById("nudge-sound").play();
    
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}
