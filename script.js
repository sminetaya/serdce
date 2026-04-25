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
    word.style.top = 250 + y * 16+ "px";

    word.style.animationDelay = i * 0.06 + "s";

    heart.appendChild(word);
  }

  const starsContainer = document.querySelector('.stars');
const starsCount = 120;

for (let i = 0; i < starsCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';

    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';

    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = Math.random() * 2 + 1.5 + 's';

    starsContainer.appendChild(star);
}
}