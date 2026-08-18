const cropForm = document.getElementById("cropForm");
const recommendationResults = document.getElementById("recommendationResults");
const resultStatus = document.getElementById("resultStatus");

cropForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const soilType = document.getElementById("soilType").value;
    const temperature = Number(
        document.getElementById("temperature").value
    );
    const rainfall = Number(
        document.getElementById("rainfall").value
    );
    const humidity = Number(
        document.getElementById("humidity").value || 0
    );
    const season = document.getElementById("season").value;

    resultStatus.textContent = "Analyzing...";
    recommendationResults.innerHTML = `
        <div class="results-empty">
            <div class="empty-icon">🤖</div>
            <h4>KrishiSetu AI is analyzing your farm...</h4>
            <p>Please wait while we generate your recommendations.</p>
        </div>
    `;

    try {
        const response = await fetch(
            "http://localhost:5000/api/crops/recommend",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    soilType,
                    temperature,
                    rainfall,
                    humidity,
                    season
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Recommendation failed");
        }

        resultStatus.textContent = "AI Ready";

        displayRecommendations(data.recommendations);

    } catch (error) {
        console.error(error);

        resultStatus.textContent = "Error";

        recommendationResults.innerHTML = `
            <div class="results-empty">
                <div class="empty-icon">⚠️</div>
                <h4>Unable to generate recommendation</h4>
                <p>${error.message}</p>
            </div>
        `;
    }
});


function displayRecommendations(recommendations) {

    if (!recommendations || recommendations.length === 0) {
        recommendationResults.innerHTML = `
            <div class="results-empty">
                <div class="empty-icon">🌱</div>
                <h4>No recommendations found</h4>
                <p>Try different farm conditions.</p>
            </div>
        `;

        return;
    }

    recommendationResults.innerHTML = `
        <div style="width:100%">
            ${recommendations.map(item => `
                <div class="result-item">

                    <div>
                        <h4>🌾 ${item.crop}</h4>
                        <p>${item.reason}</p>
                    </div>

                    <span class="suitability">
                        ${item.suitability}
                    </span>

                </div>
            `).join("")}
        </div>
    `;
}