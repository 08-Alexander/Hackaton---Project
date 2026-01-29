document.addEventListener("DOMContentLoaded", async function() {
    GetNextQuestions();
});

function displayQuestion() {
    const questionText = document.getElementById('question-text');
    if (!questionText || !questions[questionIndex]) return;

    let parts = questions[questionIndex].split(":::");
    
    currentQuestion = parts[0];
    currentAnswers = parts[1].split(",");
    currentExplanation = parts[2];

    questionText.innerText = currentQuestion;
}

async function GetNextQuestion(amount = "2", subject = "physics", level = "1c") {
    questionIndex++;

    if (questionIndex >= questions.length) {
        const newQuestions = await getAIResponse(amount, subject, level);
        questions = questions.concat(newQuestions);
    }

    displayQuestion();
}

async function getAIResponse(amount = "1", subject = "physics", level = "1c") {
    let prompt = `
        Generate ${amount} ${subject}tasks at ${subject} ${level} level (Swedish high school).

        Rules:
        - Each task should be unique.
        - Adapted for ${subject} ${level}.
        - Return EVERYTHING as a single text without extra comments.
        - Use EXACT separators as below.

        Separators:
        - Between TASK / ANSWER / EXPLANATION: :::
        - Between DIFFERENT TASKS: |||

        FORMAT (EXACT):
        <task>:::<answer>:::<short explanation>|||<task>:::<answer>:::<short explanation>

        Units and prefixes:
        - If the answer contains unit or SI prefix, ALL correct spellings should be listed.
        - Separate multiple correct answers with commas (,).

        Important:
        - DO NOT use ::: or ||| anywhere other than as separators.
        - No markdown, no headings, no emojis.
        - Each explanation should be 1–3 sentences.
    `;

    try {
        const response = await puter.ai.chat(prompt);
        const AIresponse = response.message.content;
        
        return AIresponse.split("|||"); 
    } catch (error) {
        console.error("AI Fetch failed:", error);
        return [];
    }
}