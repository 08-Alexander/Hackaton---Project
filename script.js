
        let level = 1;
        let streak = 0;
        let currentAnswer = 0;

        const questionEl = document.getElementById('question');
        const inputEl = document.getElementById('answer-input');
        const levelEl = document.getElementById('level-display');
        const streakEl = document.getElementById('streak-display');
        const feedbackEl = document.getElementById('feedback');
        const containerEl = document.getElementById('game-container');

       

        function checkAnswer() {
            const userAnswer = parseInt(inputEl.value);

            if (userAnswer === currentAnswer) {
                
                streak++;
                if (streak % 3 === 0) level++; 
                
                
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

        
        generateQuestion();
