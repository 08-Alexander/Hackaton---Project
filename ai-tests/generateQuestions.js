
document.addEventListener("DOMContentLoaded", async function() {
    await getAIResponse("2", "matte", "1c");
});

async function GetQuestions(){
    await getAIResponse();
}

async function getAIResponse(amount = "1", subject = "matte", level = "1c") {
    const test = document.getElementById('test-text');
    let prompt = `
            Generera ${amount} matematikuppgifter på ${subject} ${level} (svenskt gymnasium).

            Regler:
            - Varje uppgift ska vara unik.
            - Anpassad för ${subject} ${level}.
            - Returnera ALLT som en enda text utan extra kommentarer.
            - Använd EXAKTA separatorer enligt nedan.


            Separatorer:
            - Mellan UPPGIFT / SVAR / FÖRKLARING: :::
            - Mellan OLIKA UPPGIFTER: |||


            FORMAT (EXAKT):
            <uppgift>:::<svar>:::<kort förklaring>|||<uppgift>:::<svar>:::<kort förklaring>


            Enheter och prefix:
            - Om svaret innehåller enhet eller SI-prefix ska ALLA korrekta skrivsätt listas.
            - Separera flera korrekta svar med komma (,).


            Viktigt:
            - Använd INTE ::: eller ||| någon annanstans än som separatorer.
            - Ingen markdown, inga rubriker, inga emojis.
            - Varje förklaring ska vara 1–3 meningar.
    `;

    test
    const response = await puter.ai.chat(prompt,{
        model: 'gemini-2.5-flash-lite',
    }).then(response => {
        test.innerText = response;
        return response;
    });;
}