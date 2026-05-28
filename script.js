function showHeart() {
    const heart = document.getElementById("heart");
    heart.innerHTML = "";

    const amount = 80;

    for (let i = 0; i < amount; i++) {
        const t = (i / amount) * Math.PI * 2;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(
            10 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            1 * Math.cos(3 * t) -
            Math.cos(4 * t)
        );

        const word = document.createElement("div");
        word.className = "word";
        word.textContent = "I love u";

        word.style.left = 220 + x * 14 + "px";
        word.style.top = 250 + y * 16 + "px";
        word.style.animationDelay = `${i * 0.06}s`;

        heart.appendChild(word);
    }

    const starsContainer = document.querySelector(".stars");
    starsContainer.innerHTML = "";

    const starsCount = 420;

    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";

        const size = Math.random() * 3 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.animationDelay = Math.random() * 3 + "s";
        star.style.animationDuration = Math.random() * 2 + 1.5 + "s";

        starsContainer.appendChild(star);
    }
}


// второе сердце

const secondHeartBtn = document.getElementById("secondHeartBtn");
const backBtn = document.getElementById("backBtn");
const secondHeart = document.getElementById("secondHeart");
const ctx = secondHeart.getContext("2d");
const oldHeart = document.getElementById("heart");
const firstBtn = document.getElementById("firstBtn");
const thirdBtn = document.getElementById("thirdBtn");
const thirdPage = document.getElementById("thirdPage");
const backToSecondBtn = document.getElementById("backToSecondBtn");

secondHeart.width = 850;
secondHeart.height = 620;

let heartWords = [];
let printedCount = 0;
let animationId;
let frame = 0;

function isInsideHeart(x, y) {
    const a = x * x + y * y - 1;
    return a * a * a - x * x * y * y * y <= 0;
}

function createTypedHeart() {
    heartWords = [];
    printedCount = 0;
    frame = 0;

    const phrase = "love u";
    const fontSize = 16;

    ctx.font = `bold ${fontSize}px Courier New`;

    const phraseWidth = ctx.measureText(phrase).width;
    const gap = 13;
    const stepX = phraseWidth + gap;
    const stepY = 24;

    const centerX = secondHeart.width / 2;
    const startY = 80;

    // count = сколько фраз, gap = дырка между верхними половинками
    const rows = [
        { left: 2, gap: 3, right: 2 },
        { left: 3, gap: 2, right: 3 },
        { left: 4, gap: 1, right: 4 },
        { full: 10 },
        { full: 11 },
        { full: 12 },
        { full: 13 },
        { full: 14 },
        { full: 13 },
        { full: 12.5 },
        { full: 12 },
        { full: 11 },
        { full: 10 },
        { full: 9 },
        { full: 8 },
        { full: 7 },
        { full: 6 },
        { full: 5 },
        { full: 4 },
        { full: 3 },
        { full: 2 },
        { full: 1 },
    ];

    for (let row = 0; row < rows.length; row++) {
        const r = rows[row];
        const y = startY + row * stepY;

        if (r.full) {
            const count = r.full;
            const totalWidth = (count - 1) * stepX + phraseWidth;
            let x = centerX - totalWidth / 2;

            for (let i = 0; i < count; i++) {
                heartWords.push({
                    x: x,
                    y: y,
                    text: phrase,
                    alpha: 0
                });

                x += stepX;
            }
        } else {
            const totalCells = r.left + r.gap + r.right;
            const totalWidth = (totalCells - 1) * stepX + phraseWidth;
            let x = centerX - totalWidth / 2;

            for (let i = 0; i < r.left; i++) {
                heartWords.push({
                    x: x,
                    y: y,
                    text: phrase,
                    alpha: 0
                });

                x += stepX;
            }

            x += r.gap * stepX;

            for (let i = 0; i < r.right; i++) {
                heartWords.push({
                    x: x,
                    y: y,
                    text: phrase,
                    alpha: 0
                });

                x += stepX;
            }
        }
    }
}

function animateTypedHeart() {
    ctx.clearRect(0, 0, secondHeart.width, secondHeart.height);

    frame++;

    if (frame % 2 === 0 && printedCount < heartWords.length) {
        printedCount += 1;
    }

    ctx.font = "bold 16px Courier New";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    for (let i = 0; i < printedCount && i < heartWords.length; i++) {
        const word = heartWords[i];

        if (word.alpha < 1) {
            word.alpha += 0.08;
        }

        const glow = i > printedCount - 10 ? 24 : 12;

        ctx.fillStyle = `rgba(255, 45, 90, ${word.alpha})`;
        ctx.shadowBlur = glow;
        ctx.shadowColor = "rgba(255, 40, 90, 1)";
        ctx.fillText(word.text, word.x, word.y);
    }

    if (printedCount < heartWords.length && printedCount > 0) {
        const last = heartWords[printedCount - 1];

        ctx.beginPath();
        ctx.arc(
            last.x + ctx.measureText(last.text).width + 6,
            last.y,
            3,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(255, 120, 150, 1)";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(255, 50, 90, 1)";
        ctx.fill();
    }

    if (printedCount >= heartWords.length) {
    for (let i = 0; i < heartWords.length; i++) {
        const word = heartWords[i];

        const pulse = 0.75 + Math.sin(frame * 0.04 + i * 0.2) * 0.25;

        // волна
        const waveY = Math.sin(frame * 0.035 + word.x * 0.018) * 2;
        const waveX = Math.sin(frame * 0.025 + word.y * 0.02) * 2;

        ctx.fillStyle = `rgba(255, 45, 90, ${pulse})`;
        ctx.shadowBlur = 14;
        ctx.shadowColor = "rgba(255, 40, 90, 1)";

        ctx.fillText(word.text, word.x + waveX, word.y + waveY);
    }
}

    animationId = requestAnimationFrame(animateTypedHeart);
}

secondHeartBtn.addEventListener("click", () => {
    oldHeart.classList.add("hidden");
    secondHeart.classList.remove("hidden");
    firstBtn.classList.add("hidden");


    secondHeartBtn.classList.add("hidden");
    backBtn.classList.remove("hidden");
    thirdBtn.classList.remove("hidden");

    cancelAnimationFrame(animationId);

    createTypedHeart();
    animateTypedHeart();
});

backBtn.addEventListener("click", () => {
    secondHeart.classList.add("hidden");
    oldHeart.classList.remove("hidden");

    backBtn.classList.add("hidden");
    thirdBtn.classList.add("hidden");
    secondHeartBtn.classList.remove("hidden");

    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, secondHeart.width, secondHeart.height);
});

thirdBtn.addEventListener("click", () => {
    secondHeart.classList.add("hidden");
    thirdPage.classList.remove("hidden");

    backBtn.classList.add("hidden");
    thirdBtn.classList.add("hidden");

    cancelAnimationFrame(animationId);

    startTypingText();
    startFallingHearts();
});

backToSecondBtn.addEventListener("click", () => {
    thirdPage.classList.add("hidden");
    secondHeart.classList.remove("hidden");

    backBtn.classList.remove("hidden");
    thirdBtn.classList.remove("hidden");

    clearInterval(typingInterval);
    clearInterval(heartsInterval);
    fallingHearts.innerHTML = "";

    createTypedHeart();
    animateTypedHeart();
});

const typedText = document.getElementById("typedText");
const finalHeartBtn = document.getElementById("finalHeartBtn");
const finalMessage = document.getElementById("finalMessage");
const fallingHearts = document.getElementById("fallingHearts");

let typingInterval;
let heartsInterval;

const textForThirdPage = 
    "я просто хотела сказать, что ты очень важный для меня человек.. спасибо, что ты есть ♡";

function startTypingText() {
    typedText.textContent = "";
    finalMessage.classList.add("hidden");

    let index = 0;

    clearInterval(typingInterval);

    typingInterval = setInterval(() => {
        typedText.textContent += textForThirdPage[index];
        index++;

        if (index >= textForThirdPage.length) {
            clearInterval(typingInterval);
        }
    }, 55);
}

function createFallingHeart() {
    const heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.textContent = "♡";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 18 + 16 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    fallingHearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

function startFallingHearts() {
    clearInterval(heartsInterval);
    fallingHearts.innerHTML = "";

    heartsInterval = setInterval(createFallingHeart, 250);
}

finalHeartBtn.addEventListener("click", () => {
    finalMessage.classList.remove("hidden");
});
