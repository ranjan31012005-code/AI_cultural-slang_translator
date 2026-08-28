const analyzeButton = document.getElementById("analyzeBtn");
const textInput = document.getElementById("textInput");

const resultsSection = document.getElementById("resultsSection");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");


/* =========================================================
   ANALYZE BUTTON
========================================================= */

analyzeButton.addEventListener("click", analyzeText);


/* CTRL + ENTER SHORTCUT */

textInput.addEventListener("keydown", function (event) {

    if (event.ctrlKey && event.key === "Enter") {
        analyzeText();
    }

});


/* =========================================================
   MAIN ANALYSIS FUNCTION
========================================================= */

async function analyzeText() {

    const text = textInput.value.trim();


    /* EMPTY INPUT */

    if (!text) {

        showError("Please enter a word, slang expression, or sentence.");

        textInput.focus();

        return;
    }


    hideError();

    resultsSection.classList.remove("show");

    loading.classList.add("show");

    analyzeButton.disabled = true;

    analyzeButton.innerHTML = "Analyzing...";


    try {

        /*
        Change this URL if your Flask server
        is running on another port.
        */

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

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        const data = await response.json();


        console.log("Analysis Result:", data);


        displayResults(data);


    } catch (error) {

        console.error(error);

        showError(
            "Cannot connect to the AI backend. Make sure Flask is running on http://127.0.0.1:5000."
        );

    } finally {

        loading.classList.remove("show");

        analyzeButton.disabled = false;

        analyzeButton.innerHTML =
            `Analyze <span>⟶</span>`;

    }

}


/* =========================================================
   DISPLAY RESULTS
========================================================= */

function displayResults(data) {

    /*
    LANGUAGE
    */

    setText(
        "resultLanguage",
        capitalize(data.language || "Unknown")
    );


    /*
    TONE
    */

    setText(
        "resultTone",
        capitalize(data.tone || "Neutral")
    );


    /*
    SLANG
    */

    const slang = data.slang_detected;


    if (slang && Object.keys(slang).length > 0) {

        setText(
            "slangExpression",
            slang.expression || "Detected"
        );

        setText(
            "slangMeaning",
            slang.meaning || "Meaning unavailable"
        );


        setText(
            "slangCategory",
            slang.category || "General"
        );

        setText(
            "slangTone",
            slang.tone || "Context-dependent"
        );

        setText(
            "slangFormality",
            slang.formality || "Unknown"
        );

        setText(
            "slangRegion",
            slang.region || "General"
        );

        setText(
            "slangLanguage",
            slang.language || data.language || "Unknown"
        );

        setText(
            "slangExample",
            slang.example || "Not available"
        );

        setText(
            "slangContext",
            slang.cultural_context ||
            "Cultural context not available"
        );

    } else {

        setText(
            "slangExpression",
            "No slang detected"
        );

        setText(
            "slangMeaning",
            "The text does not contain a recognized slang expression."
        );

        setText("slangCategory", "—");
        setText("slangTone", "—");
        setText("slangFormality", "—");
        setText("slangRegion", "—");
        setText("slangLanguage", "—");
        setText("slangExample", "—");
        setText("slangContext", "—");

    }


    /*
    CULTURAL MEANING
    */

    const culture = data.cultural_meaning;


    if (culture && Object.keys(culture).length > 0) {

        setText(
            "cultureConcept",
            culture.concept || "Cultural Meaning"
        );

        setText(
            "cultureExpression",
            culture.expression || "—"
        );

        setText(
            "cultureMeaning",
            culture.meaning ||
            culture.cultural_note ||
            "Not available"
        );


        /*
        TAMIL EQUIVALENT
        */

        setText(
            "tamilEquivalent",
            getNestedValue(
                culture,
                "tamil.expression",
                "—"
            )
        );


        /*
        ENGLISH EQUIVALENT
        */

        setText(
            "englishEquivalent",
            getNestedValue(
                culture,
                "english.expression",
                "—"
            )
        );


    } else {

        setText("cultureConcept", "Not available");
        setText("cultureExpression", "—");
        setText("cultureMeaning", "—");
        setText("tamilEquivalent", "—");
        setText("englishEquivalent", "—");

    }


    /*
    TIMESTAMP
    */

    updateTimestamp();


    /*
    SHOW RESULT
    */

    resultsSection.classList.add("show");


    /*
    SCROLL TO RESULTS
    */

    setTimeout(() => {

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);

}


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {

        element.textContent =
            value !== undefined &&
            value !== null
                ? value
                : "—";

    }

}


function capitalize(value) {

    if (!value) return "Unknown";

    return value
        .toString()
        .replace(/_/g, " ")
        .replace(/\b\w/g, function (letter) {
            return letter.toUpperCase();
        });

}


/*
Read nested object values safely.

Example:
getNestedValue(data, "tamil.expression")
*/

function getNestedValue(
    object,
    path,
    fallback = "—"
) {

    try {

        const value = path
            .split(".")
            .reduce(
                (current, key) =>
                    current && current[key],
                object
            );

        return value || fallback;

    } catch {

        return fallback;

    }

}


/* =========================================================
   ERROR FUNCTIONS
========================================================= */

function showError(message) {

    if (!errorMessage) {

        alert(message);

        return;
    }

    errorMessage.textContent = message;

    errorMessage.classList.add("show");

}


function hideError() {

    if (errorMessage) {

        errorMessage.textContent = "";

        errorMessage.classList.remove("show");

    }

}


/* =========================================================
   TIMESTAMP
========================================================= */

function updateTimestamp() {

    const timestamp =
        document.getElementById("timestamp");


    if (!timestamp) return;


    const now = new Date();


    timestamp.textContent =
        now.toLocaleDateString(
            "en-US",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        )
        +
        " • "
        +
        now.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


/* =========================================================
   INPUT CHARACTER COUNTER (OPTIONAL)
========================================================= */

textInput.addEventListener(
    "input",
    function () {

        const count =
            document.getElementById("characterCount");


        if (count) {

            count.textContent =
                `${textInput.value.length} characters`;

        }

    }
);
