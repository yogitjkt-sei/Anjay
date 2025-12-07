document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('start-button');
    const messageDisplay = document.getElementById('message');

    let score = 0;
    let gameTimer;
    let starInterval;
    const GAME_DURATION = 15000; // Durasi permainan: 15 detik (dalam milidetik)

    // Array emoji bintang yang lucu dan berwarna
    const starEmojis = ['⭐', '🌟', '✨', '💫', '💖'];

    function createStar() {
        if (!gameArea.dataset.running) return; // Hentikan pembuatan jika game belum/sudah selesai

        const star = document.createElement('div');
        star.classList.add('star');

        // Pilih emoji bintang acak
        const randomEmoji = starEmojis[Math.floor(Math.random() * starEmojis.length)];
        star.textContent = randomEmoji;

        // Tentukan posisi acak di dalam game area
        const areaWidth = gameArea.clientWidth - 50; // Kurangi ukuran bintang
        const areaHeight = gameArea.clientHeight - 50;

        const randomX = Math.random() * areaWidth;
        const randomY = Math.random() * areaHeight;

        star.style.left = `${randomX}px`;
        star.style.top = `${randomY}px`;

        // Atur waktu hilangnya bintang (misalnya, 1.5 detik)
        const disappearTime = 1500; 

        // Tambahkan event click untuk menangkap bintang
        star.addEventListener('click', () => {
            if (gameArea.dataset.running) {
                score++;
                scoreDisplay.textContent = score;
                star.remove(); // Hapus bintang setelah diklik
            }
        });

        gameArea.appendChild(star);

        // Hapus bintang secara otomatis setelah beberapa waktu
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
            }
        }, disappearTime);
    }

    function startGame() {
        score = 0;
        scoreDisplay.textContent = score;
        gameArea.innerHTML = ''; // Hapus bintang lama
        messageDisplay.textContent = 'Ayo, Tangkap!';
        startButton.disabled = true;
        gameArea.dataset.running = 'true';

        // Mulai interval pembuatan bintang (misalnya, setiap 500ms)
        starInterval = setInterval(createStar, 500); 

        // Atur timer permainan
        gameTimer = setTimeout(endGame, GAME_DURATION);
    }

    function endGame() {
        clearInterval(starInterval);
        clearTimeout(gameTimer);
        gameArea.dataset.running = '';
        gameArea.innerHTML = ''; // Bersihkan bintang
        startButton.disabled = false;
        
        messageDisplay.textContent = `Waktu Habis! Skor Akhir Anda: ${score} 🎉`;
    }

    // Event listener untuk tombol mulai
    startButton.addEventListener('click', startGame);

    // Tampilkan pesan selamat datang di awal
    messageDisplay.textContent = 'Siap untuk menangkap bintang? Klik "Mulai Permainan!"';
});
