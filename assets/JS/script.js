// This is where the player name is stored
let playerName = "";

//Chapter Select
const chapters = {
    start: {
        title: "Chapter 1: Introduction",
        image: "assets/images/front-door.png",
        description: "Hello Adventurer! Before we get started on our journey, we’re going to need a name! So, What is your name, Adventurer?",
    },
    chapter1: {
        title: "Chapter 2: The Journey Begins",
        image: "assets/images/front-door.png",
        description: "After a lovely walk in the forest with your family, you've returned home to your small cottage, the front door which you’re sure you closed ajar. {playerName}, What do you do?",
        options: {
            a: "chapter2",
            b: "chapter1A"
        }
    },
    chapter1A: {
        title: "Chapter 2: Explore Outside",
        image: "assets/images/bedroom-window.png",
        description: "You’ve decided to walk around the cottage. As you walk around the cottage you notice sparkly shards on the grass floor, the bedroom window shattered. Sharp rectangular shards stick up around the edges of the frame, too perilous for someone of your size to climb through.",
        options: {
            a: "chapter1",
        }
    },


    // Add more chapters as needed
};

//Start Game Next button Function
document.getElementById("next-button").onclick = () => {
    const nameInput = document.getElementById("player-name");
    playerName = nameInput.value;
    if (nameInput.checkValidity()) {
        document.querySelector(".input-area").style.display = "none";
        document.getElementById("next-button").style.display = "none";
        document.querySelector(".choice-area.d-flex.justify-content-between").style.display = "flex";
        updateCard("chapter1");
    } else {
        nameInput.reportValidity();
    }
};

//Start Again Button Function
document.getElementById("start-again").onclick = () => {
    document.querySelector(".input-area").style.display = "flex";
    document.getElementById("next-button").style.display = "block";
    document.querySelector(".choice-area.d-flex.justify-content-between").style.display = "none";
    document.getElementById("player-name").value = "";
    updateCard("start");
};

// Function to update the card with the chapter image, description and options
function updateCard(chapter) {
    const cardImage = document.getElementById("card-image");
    const cardDescription = document.getElementById("card-description");
    const chapterTitle = document.getElementById("chapter-title");

    cardImage.src = chapters[chapter].image;
    cardDescription.textContent = chapters[chapter].description.replace("{playerName}", playerName);
    chapterTitle.textContent = chapters[chapter].title;

    const optionA = document.getElementById("option-a");
    const optionB = document.getElementById("option-b");

    if (chapter === "start") {
        optionA.style.display = "none";
        optionB.style.display = "none";
        document.querySelector(".input-area").style.display = "flex";
    } else {
        optionA.style.display = "block";
        optionB.style.display = "block";
        document.querySelector(".input-area").style.display = "none";
        optionA.onclick = () => updateCard(chapters[chapter].options.a);
        optionB.onclick = () => updateCard(chapters[chapter].options.b);

        //Per Chapter Button/Option Name Change
        if (chapter === "chapter1") {
            optionA.textContent = "Explore Inside";
            optionB.textContent = "Explore Outside";
        }
    }
}

// Initialize the game with the start chapter
updateCard("start");
