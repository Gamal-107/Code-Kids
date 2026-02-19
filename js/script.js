function showSection(sectionName) {
    document.querySelectorAll("section").forEach((sec) => {
        sec.style.display = "none";
        sec.classList.remove("active")
    })
    document.querySelector(`.${sectionName}`).style.display = "block";
    document.querySelector(`.${sectionName}`).classList.add("active")


}
// Display The Home Page Default
showSection("home")


// When Clicked On The Start Button Go To The Start Game Page
const start = document.querySelector(".start");
start.addEventListener("click", () => {
    showSection("ready")
})

// When Clicked On The Back Home Button Go To The Home Page
const backHome = document.querySelectorAll(".back-home");
backHome.forEach((back) => {
    if (back) {
        back.addEventListener("click", () => {
            showSection("home")
        })
    }
})

// When Clicked On The Start Game Button Go To The Start Game Page
const startGame = document.querySelector(".start-game")
startGame.addEventListener("click", () => {
    showSection("start-journey")
})

// When Clicked On The How To Play Button Go To The How Play Page
const howPlay = document.querySelector(".how-to-paly");
howPlay.addEventListener("click", () => {
    showSection("how-play")
})

// When Clicked On The Previous Button Go To The Ready Page
const prevJourney = document.querySelector(".previous.journey");
prevJourney.addEventListener("click", () => {
    showSection("ready")
})


// When Clicked On The Previous Button Of Challenge Page Go To The Start Journey Page
const prevsChallenges = document.querySelectorAll(".challenge .previous");
prevsChallenges.forEach((prev) => {
    prev.addEventListener("click", () => {
        showSection("start-journey")
    })
})

// Sing Up
const togglePassword = document.querySelector(".toggle-password");
const passwordInput = document.getElementById("password");

function togglePasswordVisibility() {
    togglePassword.addEventListener("click", function () {

        if (passwordInput.value) {
            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.classList = 'fa-solid fa-eye toggle-password';
            } else {

                passwordInput.type = "password";

                togglePassword.classList = 'fa-solid fa-eye-slash toggle-password';
            }
        }


    });
}
togglePasswordVisibility()

const signBtn = document.querySelector(".sign-btn");
signBtn.addEventListener("click", () => {
    showSection("signup")
})


// When Clicked On The Any Challenge Category Button Go To The Challenge Category Page
function showChallengeCategory(category) {
    const pythonBtn = document.querySelector(`.${category}-category`);
    pythonBtn.addEventListener("click", () => {
        showSection(`${category}.challenge`)
    })
}
showChallengeCategory("scratch")
showChallengeCategory("python")
showChallengeCategory("html")