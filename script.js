
        let level = 1;
        let streak = 0;
        let currentAnswer = 0;

        const questionEl = document.getElementById('question');
        const inputEl = document.getElementById('answer-input');
        const levelEl = document.getElementById('level-display');
        const streakEl = document.getElementById('streak-display');
        const feedbackEl = document.getElementById('feedback');
        const containerEl = document.getElementById('game-container');

        function generateQuestion() {
            // Skalar upp svårighetsgraden baserat på nivå
            const maxNum = level * 5;
            const a = Math.floor(Math.random() * maxNum) + 1;
            const b = Math.floor(Math.random() * maxNum) + 1;
            currentAnswer = a + b;
            questionEl.innerText = `${a} + ${b}`;
            inputEl.value = '';
        }

        inputEl.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });

        function checkAnswer() {
            const userAnswer = parseInt(inputEl.value);

            if (userAnswer === currentAnswer) {
                // RÄTT SVAR - DOPAMIN KICK!
                streak++;
                if (streak % 3 === 0) level++; // Öka nivå var tredje rätt
                
                // Effekter
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                
                feedbackEl.innerText = "Snyggt! +10 XP";
                feedbackEl.style.color = "green";
                containerEl.classList.add('correct-hit');
                
                setTimeout(() => {
                    containerEl.classList.remove('correct-hit');
                    updateUI();
                    generateQuestion();
                }, 500);

            } else {
                // FEL SVAR
                streak = 0;
                feedbackEl.innerText = "Försök igen!";
                feedbackEl.style.color = "red";
                inputEl.value = '';
                updateUI();
            }
        }

        function updateUI() {
            levelEl.innerText = level;
            streakEl.innerText = streak;
        }

        // Starta spelet
        generateQuestion();
