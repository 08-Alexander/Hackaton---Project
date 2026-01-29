
document.addEventListener("DOMContentLoaded", async function() {
    await getAIResponse("2", "engelska", "1");
});

async function GetQuestions(){
    await getAIResponse();
}

async function getAIResponse(amount = "1", subject = "matte", level = "1c") {
    const test = document.getElementById('test-text');
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

    const response = await puter.ai.chat(prompt,
    ).then(response => {
        test.innerText = response;
        return response;
    });;
}