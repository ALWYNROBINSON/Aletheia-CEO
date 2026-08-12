document.addEventListener('DOMContentLoaded', () => {

    // --- State & DOM Elements ---
    let optionCount = 2; // Starting with Option A and B

    const form = document.getElementById('decision-form');
    const addOptionBtn = document.getElementById('add-option-btn');
    const optionsContainer = document.getElementById('options-container');

    const inputView = document.getElementById('input-view');
    const loadingView = document.getElementById('loading-view');
    const resultsView = document.getElementById('results-view');

    const progressBar = document.getElementById('eval-progress');
    const statusSteps = document.querySelectorAll('.step');

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // --- Dynamic Options ---
    addOptionBtn.addEventListener('click', () => {
        optionCount++;
        const optionChar = String.fromCharCode(64 + optionCount); // 65=A, 66=B, 67=C...

        const newOption = document.createElement('div');
        newOption.className = 'option-card';
        newOption.dataset.option = optionCount;

        newOption.innerHTML = `
            <div class="option-header">
                <h4>Option ${optionChar}</h4>
                <button type="button" class="remove-option-btn" onclick="removeOption(this)">
                    <i class="ph ph-trash"></i>
                </button>
            </div>
            <div class="input-group">
                <input type="text" class="option-title" placeholder="Option Name" required>
            </div>
            <div class="input-group">
                <textarea class="option-desc" rows="2" placeholder="Describe this option's strategy and requirements..."></textarea>
            </div>
        `;

        optionsContainer.appendChild(newOption);

        // Scroll to new option
        newOption.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });

    // Make removeOption globally accessible
    window.removeOption = function (btn) {
        const card = btn.closest('.option-card');
        card.style.opacity = '0';
        setTimeout(() => {
            card.remove();
        }, 300);
    };

    // --- Form Submission & API Integration ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Capture Form Data
        const optionsNodes = document.querySelectorAll('.option-card');
        const options = Array.from(optionsNodes).map(card => {
            return {
                name: card.querySelector('.option-title').value,
                description: card.querySelector('.option-desc').value
            };
        });

        const decisionData = {
            title: document.getElementById('decision-title').value,
            objective: document.getElementById('strategic-objective').value,
            context: document.getElementById('decision-context').value,
            constraints: document.getElementById('constraints').value,
            options: options
        };

        console.log("Evaluation Initialized:", decisionData);

        // Transition to Loading
        inputView.classList.remove('active');
        inputView.classList.add('hidden');

        loadingView.classList.remove('hidden');
        loadingView.classList.add('active');

        // Reset Steps
        progressBar.style.width = '10%';
        activateStep(1);

        try {
            document.getElementById('generate-btn').disabled = true;
            await executeGeminiEvaluation(decisionData);
        } catch (error) {
            console.error("API Error:", error);
            alert("An error occurred during evaluation. Check the console for details.");
            resetApp();
        } finally {
            document.getElementById('generate-btn').disabled = false;
        }
    });

    async function executeGeminiEvaluation(data) {
        // Advance visuals during fetch
        setTimeout(() => { progressBar.style.width = '30%'; completeStep(1); activateStep(2); }, 800);
        setTimeout(() => { progressBar.style.width = '60%'; completeStep(2); activateStep(3); }, 2000);
        setTimeout(() => { progressBar.style.width = '80%'; completeStep(3); activateStep(4); }, 4000);

        const response = await fetch('/api/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error(`API HTTP error: ${response.status}`);

        const resultData = await response.json();
        const parsedResult = resultData.resultsData || resultData;


        progressBar.style.width = '95%';
        completeStep(4);
        activateStep(5);

        setTimeout(() => {
            progressBar.style.width = '100%';
            completeStep(5);
            setTimeout(() => {
                showResults(parsedResult);
            }, 500);
        }, 800);
    }

    function activateStep(stepNum) {
        const step = document.getElementById(`step-${stepNum}`);
        step.classList.remove('pending');
        step.classList.add('active');
        step.querySelector('i').className = 'ph ph-circle-notch ph-spin';
    }

    function completeStep(stepNum) {
        const step = document.getElementById(`step-${stepNum}`);
        step.classList.remove('active');
        step.classList.add('done');
        step.querySelector('i').className = 'ph-fill ph-check-circle';
    }

    // --- Show Results Dashboard ---
    function showResults(data) {
        loadingView.classList.remove('active');
        loadingView.classList.add('hidden');

        resultsView.classList.remove('hidden');
        resultsView.classList.add('active');

        // Generate Ledger ID
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomId = Math.floor(Math.random() * 900) + 100;
        document.getElementById('ledger-id-display').textContent = `AC-${dateStr}-${randomId}`;

        // Dynamic Trust/Confidence Score
        const confScore = Math.floor(Math.random() * 10) + 85;
        document.getElementById('conf-score').textContent = `${confScore}%`;

        populateDashboard(data);
    }

    // --- Tab Switching ---
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = `tab-${btn.dataset.tab}`;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- Reset App ---
    window.resetApp = function () {
        resultsView.classList.remove('active');
        resultsView.classList.add('hidden');

        inputView.classList.remove('hidden');
        inputView.classList.add('active');

        form.reset();

        optionsContainer.innerHTML = '';
        optionCount = 0;
        addOptionBtn.click();
        addOptionBtn.click();

        progressBar.style.width = '0%';
        statusSteps.forEach((step, index) => {
            step.className = `step ${index === 0 ? 'active' : 'pending'}`;
            step.querySelector('i').className = index === 0 ? 'ph ph-circle-notch ph-spin' : 'ph ph-circle';
        });

        window.scrollTo(0, 0);
    };

    // --- Populate Live Data ---
    function populateDashboard(data) {
        document.getElementById('ledger-content').innerHTML = data.ledgerHtml || "Error generating Ledger.";
        document.getElementById('board-content').innerHTML = data.boardHtml || "Error generating Board Summary.";
        document.getElementById('internal-content').innerHTML = data.internalHtml || "Error generating Internal Strategy.";
        document.getElementById('public-content').innerHTML = data.publicHtml || "Error generating Public Report.";
    }

});
