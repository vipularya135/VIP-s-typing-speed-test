const paragraphs = [
    "Nandamuri Taraka Rama Rao Jr. (born 20 May 1983), also known as Jr. N.T.R. or Tarak, is an Indian actor who primarily works in Telugu cinema.",
    " One of the highest paid Telugu film actors, Rama Rao Jr. has won several accolades, including two Filmfare Awards, two state Nandi Awards,",
    " and four CineMAA Awards. Since 2012, he has been featured in Forbes India Celebrity 100 list. Grandson of Indian matinee idol, N. T. Rama Rao Sr.",
    " who was also the former Chief Minister of the Indian state of Andhra Pradesh, Rao appeared as a child actor in works such as Brahmarshi Viswamitra,",
     "and Ramayanam, the latter winning the National Film Award for Best Children's Film for that year. He made his debut as a lead actor with Ninnu Choodalani (2001).",
    " Rama Rao was born on 20 May 1983 to film actor and politician, Nandamuri Harikrishna and Shalini Bhaskar Rao. His father is of Telugu descent",
    "nd was born and raised at Nimmakuru, in Krishna district of Andhra Pradesh. His mother is a Kannadiga, who hails from Kundapur, ",
    "Karnataka. He is the grandson of Telugu actor and former Chief Minister of Andhra Pradesh, N. T. Rama Rao. Initially named Tarak, ",
    "he was renamed as N. T. Rama Rao on the suggestion of his grandfather. Rama Rao did his schooling at Vidyaranya High School, Hyderabad, and completed his",
    " intermediate education at St. Mary's College, Hyderabad He also studied in Krishna district of Andhra Pradesh for some time.",
    "Rama Rao is a trained Kuchipudi dancer. He is the half-brother of actor and producer, Nandamuri Kalyan Ram, the nephew of actor and politician",
    " Nandamuri Balakrishna and former Chief Minister of Andhra Pradesh, N. Chandrababu Naidu, and the cousin of actors Taraka Ratna and politician Nara Lokesh.",
   " Rama Rao made his debut in the film Brahmarshi Vishwamitra  as a child artiste at the age of seven. Written and directed by his grandfather ",
   "N. T. Rama Rao, he played the role of Bharata. After a long gap, he then played the titular role of Rama in the Gunasekhar-directed mythological film ",
   "Ramayanam , which won the National Film Award for Best Children's Film. His performance in the film received critical appreciation.Director K.",
   " Raghavendra Rao recommended Rama Rao to S. S. Rajamouli for his directorial debut Student No. 1  during mid-2000 after being impressed with his ",
   "performance in the auditions and his previous film Ramayanam, however, the film went under production for too long. He was later signed by ",
   "producer Ramoji Rao, and decided to work on the romantic drama Ninnu Choodalani which marked his debut as a lead actor. By that time, he was ",
   "only 17. Student No. 1, which released later, went onto be successful while Subbu  was a commercial failure."
];

const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);