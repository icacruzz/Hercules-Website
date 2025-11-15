document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------
    // 1. Binary Rain Animation
    // ----------------------------------------------------------------
    const canvas = document.getElementById('binary-rain-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrixChars = '01';
        const font_size = 18;
        const columns = canvas.width / font_size;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function drawBinaryRain() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00FF41'; 
            ctx.font = font_size + 'px Roboto Mono';

            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));

                ctx.fillText(text, i * font_size, drops[i] * font_size);

                if (drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0; 
                }

                drops[i]++;
            }
        }

        setInterval(drawBinaryRain, 50);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ----------------------------------------------------------------
    // 2. Disruption Quotient (DQ) Quiz
    // ----------------------------------------------------------------
    const questions = [
        { q: "Seberapa cepat Anda mengadopsi platform/tool AI baru?", score: [1, 2, 3] },
        { q: "Dalam konflik ide, Anda cenderung mencari...?", score: [1, 3, 2] }, 
        { q: "Apa reaksi utama Anda saat target mendadak berubah 180°?", score: [3, 2, 1] } 
    ];
    const options = [
        ["Lambat & Hati-hati", "Cepat dengan sedikit riset", "Sangat cepat & Eksperimental"],
        ["Pendapat otoritas/senior", "Solusi baru & Belum pernah dicoba", "Konsensus tim yang sudah ada"],
        ["Bersemangat & melihat peluang", "Hati-hati, perlu rencana baru", "Merasa frustrasi dan menolak"]
    ];

    let currentQIndex = 0;
    let totalDQScore = 0;
    const qDisplay = document.getElementById('quiz-question-display');
    const qOptionsContainer = document.getElementById('quiz-options-container');
    const qFeedback = document.getElementById('quiz-feedback');
    const qResetButton = document.getElementById('quiz-reset');

    function renderDQQuestion() {
        if (currentQIndex < questions.length) {
            const q = questions[currentQIndex];
            const opts = options[currentQIndex];

            qDisplay.innerHTML = `<p class="question-title">[Q${currentQIndex + 1}/${questions.length}] ${q.q}</p>`;
            qOptionsContainer.innerHTML = opts.map((opt, i) => `
                <div class="quiz-option" data-score="${q.score[i]}">${opt}</div>
            `).join('');

            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', handleDQAnswer);
            });
        } else {
            showDQResult();
        }
    }

    function handleDQAnswer(event) {
        const score = parseInt(event.target.getAttribute('data-score'));
        totalDQScore += score;
        currentQIndex++;
        renderDQQuestion();
    }

    function showDQResult() {
        qOptionsContainer.innerHTML = '';
        qDisplay.innerHTML = `<h3>[DQ TEST COMPLETE]</h3>`;
        
        const maxScore = 9; 
        let feedbackText;
        
        if (totalDQScore >= 7) {
            feedbackText = `SKOR DQ ANDA: ${totalDQScore}/${maxScore}. CLASSIFICATION: DISRUPTOR. Pola pikir Anda siap memimpin perubahan. Tetaplah bereksperimen!`;
        } else if (totalDQScore >= 4) {
            feedbackText = `SKOR DQ ANDA: ${totalDQScore}/${maxScore}. CLASSIFICATION: ADAPTOR. Anda cepat menyesuaikan, namun perlu keberanian lebih untuk berinovasi dari nol.`;
        } else {
            feedbackText = `SKOR DQ ANDA: ${totalDQScore}/${maxScore}. CLASSIFICATION: OBSERVER. Fokus pada pengembangan literasi digital dan keterbukaan terhadap hal baru.`;
        }

        qFeedback.innerHTML = `<p style="color: var(--color-primary-neon); font-weight: bold;">${feedbackText}</p>`;
        qResetButton.style.display = 'block';
    }

    if (qResetButton) {
        qResetButton.addEventListener('click', () => {
            currentQIndex = 0;
            totalDQScore = 0;
            qFeedback.innerHTML = '';
            qResetButton.style.display = 'none';
            renderDQQuestion();
        });
        renderDQQuestion();
    }


    // ----------------------------------------------------------------
    // 3. Resource Filter (Data Library)
    // ----------------------------------------------------------------
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = e.target.getAttribute('data-filter');
            
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            document.querySelectorAll('.resource-item').forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // ----------------------------------------------------------------
    // 4. Typing Simulator (Code Sim)
    // ----------------------------------------------------------------
    const typingTextElement = document.getElementById('typing-text');
    const typingInputElement = document.getElementById('typing-input');
    const typingStatsElement = document.getElementById('typing-stats');
    const typingResetButton = document.getElementById('typing-reset');

    const codeSnippet = '// const nextEra = "Adapt or Die";\n// console.log(nextEra);\n\nclass Disruption {\n  constructor(youth) {\n    this.youth = youth;\n    this.ready = false;\n  }\n  upgrade() {\n    this.ready = true;\n    return "Youth is empowered";\n  }\n}';
    let startTime;
    let isStarted = false;
    let charactersTyped = 0;

    function resetTyping() {
        typingTextElement.textContent = codeSnippet;
        typingInputElement.value = '';
        typingInputElement.disabled = false;
        typingStatsElement.textContent = 'WPM: 0 | Akurasi: 0%';
        startTime = null;
        isStarted = false;
        charactersTyped = 0;
        renderTypedText('');
        if (typingInputElement) typingInputElement.focus();
    }

    function renderTypedText(typedText) {
        const fullText = codeSnippet;
        let html = '';
        let mistakes = 0;

        for (let i = 0; i < fullText.length; i++) {
            let char = fullText[i];
            let typedChar = typedText[i];

            if (i < typedText.length) {
                if (typedChar === char) {
                    html += `<span style="color: #4CAF50;">${char}</span>`; 
                } else {
                    html += `<span style="background-color: red; color: white;">${char}</span>`; 
                    mistakes++;
                }
            } else {
                html += char;
            }
        }
        typingTextElement.innerHTML = html;
        return mistakes;
    }

    if (typingInputElement) {
        typingInputElement.addEventListener('input', (e) => {
            if (!isStarted) {
                startTime = new Date().getTime();
                isStarted = true;
            }

            const typedText = typingInputElement.value;
            const mistakes = renderTypedText(typedText);
            charactersTyped = typedText.length;

            if (typedText === codeSnippet) {
                const endTime = new Date().getTime();
                const timeTakenSeconds = (endTime - startTime) / 1000;
                const totalChars = codeSnippet.length;
                const wpm = Math.round(((totalChars / 5) / timeTakenSeconds) * 60); // WPM = (Karakter/5)/Waktu(menit)
                
                typingStatsElement.textContent = `WPM: ${wpm} | Akurasi: ${100 - (mistakes / charactersTyped * 100).toFixed(2)}% - SIMULASI SELESAI!`;
                typingInputElement.disabled = true;
            } else {
                if (isStarted) {
                     // Hitung WPM real-time sederhana
                    const timeElapsedMinutes = (new Date().getTime() - startTime) / 60000;
                    if (timeElapsedMinutes > 0) {
                        const currentWPM = Math.round(((charactersTyped / 5) / timeElapsedMinutes));
                        const accuracy = 100 - (mistakes / charactersTyped * 100).toFixed(0);
                        typingStatsElement.textContent = `WPM: ${currentWPM} | Akurasi: ${accuracy}%`;
                    }
                }
            }
        });

        typingResetButton.addEventListener('click', resetTyping);
        resetTyping();
    }
    
    // Smooth Scroll untuk Navigasi Internal
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
