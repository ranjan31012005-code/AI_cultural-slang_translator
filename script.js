async function analyze() {

    const input = document.getElementById("inputText");
    const result = document.getElementById("result");
    const loader = document.getElementById("loader");
    const button = document.getElementById("analyzeButton");

    const text = input.value.trim();

    if (!text) {
        alert("Please enter a sentence.");
        return;
    }

    result.innerHTML = "";

    loader.style.display = "flex";
    button.disabled = true;
    button.style.opacity = "0.6";

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    text: text
                })
            }
        );

        if (!response.ok) {
            throw new Error("Backend error");
        }

        const data = await response.json();

        loader.style.display = "none";

        // -------------------------
        // SLANG
        // -------------------------

        let slangHTML = "";

        if (
            data.slang_detected &&
            Object.keys(data.slang_detected).length > 0
        ) {

            for (const word in data.slang_detected) {

                const item = data.slang_detected[word];

                slangHTML += `
                    <div class="slang-item">

                        <div class="slang-word">
                            ${word}
                        </div>

                        <div class="slang-meaning">
                            ${item.meaning || "Meaning unavailable"}
                        </div>

                        <div class="meta">
                            ${item.category || "General"}
                            ·
                            ${item.language || "Unknown"}
                        </div>

                    </div>
                `;
            }

        } else {

            slangHTML = `
                <p class="culture-meaning">
                    No slang detected.
                </p>
            `;

        }


        // -------------------------
        // CULTURAL MEANING
        // -------------------------

        let culturalHTML = "";

        if (
            data.cultural_meaning &&
            Object.keys(data.cultural_meaning).length > 0
        ) {

            for (
                const language in data.cultural_meaning
            ) {

                const item =
                    data.cultural_meaning[language];

                culturalHTML += `

                    <div class="slang-item">

                        <div class="culture-title">
                            ${item.expression || language}
                        </div>

                        <div class="culture-meaning">
                            ${item.meaning || "Cultural meaning unavailable."}
                        </div>

                        ${
                            item.concept
                            ?
                            `
                            <div class="meta">
                                Cultural concept:
                                ${item.concept}
                            </div>
                            `
                            :
                            ""
                        }

                    </div>

                `;

            }

        } else {

            culturalHTML = `
                <p class="culture-meaning">
                    No cultural expression detected.
                </p>
            `;

        }


        // -------------------------
        // DISPLAY RESULTS
        // -------------------------

        result.innerHTML = `

            <div class="result-card language-card">

                <div class="card-label">
                    <span class="card-icon">◉</span>
                    Language
                </div>

                <div class="card-value">
                    ${data.language || "Unknown"}
                </div>

            </div>


            <div class="result-card tone-card">

                <div class="card-label">
                    <span class="card-icon">◌</span>
                    Tone
                </div>

                <div class="card-value">
                    ${data.tone || "Unknown"}
                </div>

            </div>


            <div class="result-card culture-card">

                <div class="card-label">
                    <span class="card-icon">✦</span>
                    Cultural Context
                </div>

                ${culturalHTML}

            </div>


            <div class="result-card slang-card">

                <div class="card-label">
                    <span class="card-icon">◆</span>
                    Slang Intelligence
                </div>

                ${slangHTML}

            </div>


            <div class="result-card translation-card">

                <div class="card-label">
                    <span class="card-icon">↔</span>
                    AI Interpretation
                </div>

                <div class="culture-meaning">

                    Your message was analyzed for
                    language, tone, slang and cultural
                    context.

                </div>

            </div>

        `;

    }

    catch (error) {

        loader.style.display = "none";

        result.innerHTML = `

            <div class="result-card culture-card">

                <div class="card-label">
                    <span class="card-icon">!</span>
                    Connection Error
                </div>

                <div class="culture-meaning">

                    Cannot connect to the AI backend.
                    Make sure Flask is running on
                    <strong>127.0.0.1:5000</strong>.

                </div>

            </div>

        `;

        console.error(error);

    }

    finally {

        button.disabled = false;
        button.style.opacity = "1";

    }

}
