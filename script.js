async function analyze() {

    const text = document.getElementById("inputText").value;

    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    document.getElementById("loader").style.display = "block";
    document.getElementById("result").innerHTML = "";

    try {

        const response = await fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        const data = await response.json();

        document.getElementById("loader").style.display = "none";

        // -----------------------------
        // Create Slang HTML
        // -----------------------------
        let slangHTML = "";

        if (Object.keys(data.slang_detected).length > 0) {

            for (const word in data.slang_detected) {

                slangHTML += `
                <div class="card">

                    <h4>🔹 ${word}</h4>

                    <p><strong>Meaning:</strong><br>
                    ${data.slang_detected[word].meaning}</p>

                    <p><strong>Category:</strong>
                    ${data.slang_detected[word].category}</p>

                    <p><strong>Language:</strong>
                    ${data.slang_detected[word].language}</p>

                </div>
                `;
            }

        } else {

            slangHTML = "<p>No slang detected.</p>";

        }

        // -----------------------------
        // Create Cultural HTML
        // -----------------------------
        let culturalHTML = "";

        if (Object.keys(data.cultural_meaning).length > 0) {

            for (const key in data.cultural_meaning) {

                const item = data.cultural_meaning[key];

                culturalHTML += `
                <div class="card">

                    <h4>${item.expression ?? key}</h4>

                    <p><strong>Meaning:</strong><br>
                    ${item.meaning ?? item.actual_meaning ?? "N/A"}</p>

                    <p><strong>Tone:</strong>
                    ${item.tone ?? "N/A"}</p>

                </div>
                `;
            }

        } else {

            culturalHTML = "<p>No cultural expression detected.</p>";

        }

        // -----------------------------
        // Display Everything
        // -----------------------------
        document.getElementById("result").innerHTML = `

        <div class="card">
            <h3>🌍 Language</h3>
            <p>${data.language}</p>
        </div>

        <div class="card">
            <h3>😊 Tone</h3>
            <p>${data.tone}</p>
        </div>

        <div class="card">
            <h3>💬 Slang</h3>
            ${slangHTML}
        </div>

        <div class="card">
            <h3>🌏 Cultural Meaning</h3>
            ${culturalHTML}
        </div>

        `;

    }
    catch (error) {

        document.getElementById("loader").style.display = "none";

        document.getElementById("result").innerHTML = `
        <div class="card">
            <h3>❌ Error</h3>
            <p>Cannot connect to the backend. Make sure Flask is running.</p>
        </div>
        `;

        console.error(error);
    }
}