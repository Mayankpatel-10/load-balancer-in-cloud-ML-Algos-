document.addEventListener('DOMContentLoaded', function() {
    const clickMeBtn = document.getElementById('clickMeBtn');
    const initialScreen = document.getElementById('initialScreen');
    const surpriseScreen = document.getElementById('surpriseScreen');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    clickMeBtn.addEventListener('click', function() {
        // Hide initial screen
        initialScreen.style.display = 'none';
        
        // Show surprise screen
        surpriseScreen.style.display = 'block';
        
        // Play melodious music
        playMusic();
        
        // Add extra animations
        createConfetti();
        animatePhotos();
        
        // Add floating hearts effect
        startFloatingHearts();
    });
    
    function playMusic() {
        backgroundMusic.volume = 0.5;
        backgroundMusic.play().catch(function(error) {
            console.log('Audio play failed:', error);
            // Fallback: create a simple sound using Web Audio API
            playMelody();
        });
    }
    
    function playMelody() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
        let noteIndex = 0;
        
        function playNote() {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = notes[noteIndex % notes.length];
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            noteIndex++;
            
            if (noteIndex < 16) {
                setTimeout(playNote, 300);
            } else {
                // Repeat the melody
                setTimeout(() => {
                    noteIndex = 0;
                    playNote();
                }, 1000);
            }
        }
        
        playNote();
    }
    
    function createConfetti() {
        const colors = ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
        const confettiCount = 50;
        
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.zIndex = '1000';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                // Animate confetti
                let position = -10;
                const fallSpeed = Math.random() * 3 + 2;
                const horizontalSpeed = (Math.random() - 0.5) * 2;
                
                const animateConfetti = setInterval(() => {
                    position += fallSpeed;
                    confetti.style.top = position + 'px';
                    confetti.style.left = parseFloat(confetti.style.left) + horizontalSpeed + '%';
                    
                    if (position > window.innerHeight) {
                        clearInterval(animateConfetti);
                        confetti.remove();
                    }
                }, 20);
            }, i * 50);
        }
    }
    
    function animatePhotos() {
        const photos = document.querySelectorAll('.photo-frame');
        photos.forEach((photo, index) => {
            setTimeout(() => {
                photo.style.animation = 'photoFloat 3s ease-in-out infinite';
                photo.style.animationDelay = (index * 0.5) + 's';
            }, index * 200);
        });
    }
    
    function startFloatingHearts() {
        setInterval(() => {
            createFloatingHeart();
        }, 2000);
    }
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        const hearts = ['❤️', '💖', '💕', '💗', '💝'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatHeart 6s ease-in-out';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    // Add interactive hover effects
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 20px 50px rgba(0,0,0,0.3)';
        });
        
        frame.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            if (initialScreen.style.display !== 'none') {
                clickMeBtn.click();
            }
        }
    });
    
    // Add touch support for mobile with better feedback
    clickMeBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        // Add visual feedback
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
            this.click();
        }, 100);
    });
    
    // Prevent double-tap zoom on the main button
    clickMeBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
    });

    // Add enhanced photo interactions
    addPhotoInteractions();
    addMischievousEffects();
    addEasterEggs();
});

// Enhanced Photo Interactions
function addPhotoInteractions() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    const giftBoxes = document.querySelectorAll('.gift-box');
    
    // Gift box opening interactions
    giftBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            e.stopPropagation();
            openGiftBox(this);
        });
        
        // Touch support for mobile with better handling
        box.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Add visual feedback for touch
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
                openGiftBox(this);
            }, 100);
        });
        
        // Prevent double-tap zoom on mobile
        box.addEventListener('touchend', function(e) {
            e.preventDefault();
        });
    });
    
    // Photo interactions (only for revealed photos)
    photoFrames.forEach(frame => {
        frame.addEventListener('click', function(e) {
            const photo = this.querySelector('.photo');
            if (photo && photo.classList.contains('revealed')) {
                // Add special effect when revealed photo is clicked
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'photoFloat 3s ease-in-out infinite, photoSpin 0.6s ease';
                }, 10);
                
                // Create hearts around the photo
                const rect = this.getBoundingClientRect();
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const heart = document.createElement('div');
                        heart.textContent = ['💕', '😜', '😏', '🤪', '😈'][Math.floor(Math.random() * 5)];
                        heart.style.position = 'fixed';
                        heart.style.left = rect.left + Math.random() * rect.width + 'px';
                        heart.style.top = rect.top + rect.height / 2 + 'px';
                        heart.style.fontSize = '1.5rem';
                        heart.style.pointerEvents = 'none';
                        heart.style.animation = 'floatUp 2s ease-out forwards';
                        heart.style.zIndex = '1000';
                        
                        document.body.appendChild(heart);
                        setTimeout(() => heart.remove(), 2000);
                    }, i * 100);
                }
            }
        });
    });
}

// Function to open gift box and reveal photo
function openGiftBox(giftBox) {
    if (giftBox.classList.contains('opened') || giftBox.classList.contains('opening')) {
        return; // Already opened or currently opening
    }
    
    const photoFrame = giftBox.closest('.photo-frame');
    const photo = photoFrame.querySelector('.photo');
    const photoNumber = giftBox.dataset.photo;
    
    // Add opening animation
    giftBox.classList.add('opening');
    
    // Play unwrapping sound effect (using Web Audio API)
    playUnwrappingSound();
    
    // Create celebration effects
    createUnwrappingEffects(photoFrame);
    
    // After animation, reveal the photo
    setTimeout(() => {
        giftBox.classList.remove('opening');
        giftBox.classList.add('opened');
        photo.classList.remove('hidden');
        photo.classList.add('revealed');
        
        // Add special reveal message
        showRevealMessage(photoNumber);
    }, 800);
}

// Play unwrapping sound effect
function playUnwrappingSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create rustling paper sound
    const bufferSize = audioContext.sampleRate * 0.3; // 0.3 seconds
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() - 0.5) * 0.1 * Math.exp(-i / (bufferSize * 0.3));
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3;
    
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    source.start();
}

// Create unwrapping celebration effects
function createUnwrappingEffects(photoFrame) {
    const rect = photoFrame.getBoundingClientRect();
    
    // Create confetti
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = ['🎊', '🎉', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.left = rect.left + rect.width / 2 + 'px';
            confetti.style.top = rect.top + rect.height / 2 + 'px';
            confetti.style.fontSize = Math.random() * 1 + 0.8 + 'rem';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = 'confettiBurst 1s ease-out forwards';
            confetti.style.zIndex = '1000';
            
            // Set random burst direction
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = Math.random() * 100 + 50;
            confetti.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
            confetti.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 1000);
        }, i * 50);
    }
}

// Show reveal message
function showRevealMessage(photoNumber) {
    const messages = [
        'Surprise! Photo revealed! 🎁',
        'Look what we found! 📸',
        'Memory unlocked! 💭',
        'Another treasure! 💎',
        'Special moment! ✨',
        'Beautiful memory! 🌺',
        'Precious time! ⏰',
        'Love captured! ❤️'
    ];
    
    const message = document.createElement('div');
    message.textContent = messages[photoNumber - 1];
    message.style.position = 'fixed';
    message.style.top = '20%';
    message.style.left = '50%';
    message.style.transform = 'translateX(-50%)';
    message.style.background = 'linear-gradient(45deg, #ff6b9d, #feca57)';
    message.style.color = 'white';
    message.style.padding = '15px 25px';
    message.style.borderRadius = '25px';
    message.style.fontSize = '1.1rem';
    message.style.fontWeight = 'bold';
    message.style.zIndex = '10000';
    message.style.animation = 'messagePopup 2s ease-out forwards';
    message.style.boxShadow = '0 10px 30px rgba(255, 107, 157, 0.3)';
    
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
}

// Add mischievous effects
function addMischievousEffects() {
    const clickMeBtn = document.getElementById('clickMeBtn');
    let clickCount = 0;
    
    clickMeBtn.addEventListener('click', function() {
        clickCount++;
        
        // Add cheeky messages after multiple clicks
        if (clickCount === 3) {
            const message = document.createElement('div');
            message.textContent = 'Hey! Stop clicking so much! 😏';
            message.style.position = 'fixed';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.background = '#ff6b9d';
            message.style.color = 'white';
            message.style.padding = '20px';
            message.style.borderRadius = '15px';
            message.style.fontSize = '1.2rem';
            message.style.zIndex = '10000';
            message.style.animation = 'fadeIn 0.5s ease';
            
            document.body.appendChild(message);
            setTimeout(() => message.remove(), 2000);
        }
        
        if (clickCount === 5) {
            clickMeBtn.textContent = 'Alright, alright! I get it! 🤣';
            setTimeout(() => {
                clickMeBtn.textContent = "Don't Tell Dad! 🤫💝";
            }, 3000);
        }
    });
    
    // Add random mischievous tooltips
    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            const messages = [
                'Looking good! 😎',
                'Who took this photo? 🤔',
                'Nice outfit! 👗',
                'Best mom ever! 👑',
                'Secret agent mode activated! 🕵️‍♀️'
            ];
            
            const tooltip = document.createElement('div');
            tooltip.textContent = messages[Math.floor(Math.random() * messages.length)];
            tooltip.style.position = 'fixed';
            tooltip.style.background = 'rgba(0,0,0,0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '8px 12px';
            tooltip.style.borderRadius = '8px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.animation = 'fadeIn 0.3s ease';
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - 50 + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
            
            document.body.appendChild(tooltip);
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Add Easter eggs
function addEasterEggs() {
    let konamiCode = [];
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);
        
        if (konamiCode.join(',') === secretCode.join(',')) {
            activateSecretMode();
        }
    });
    
    function activateSecretMode() {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const secretMessage = document.createElement('div');
        secretMessage.innerHTML = '🎉 SECRET MODE UNLOCKED! 🎉<br>You found the Easter egg!<br>Your sons are geniuses! 🧠✨';
        secretMessage.style.position = 'fixed';
        secretMessage.style.top = '50%';
        secretMessage.style.left = '50%';
        secretMessage.style.transform = 'translate(-50%, -50%)';
        secretMessage.style.background = 'linear-gradient(45deg, #ff6b9d, #feca57, #48dbfb, #ff9ff3)';
        secretMessage.style.color = 'white';
        secretMessage.style.padding = '30px';
        secretMessage.style.borderRadius = '20px';
        secretMessage.style.fontSize = '1.5rem';
        secretMessage.style.textAlign = 'center';
        secretMessage.style.zIndex = '10000';
        secretMessage.style.animation = 'pulse 1s infinite';
        
        document.body.appendChild(secretMessage);
        
        // Add rainbow text effect
        document.querySelectorAll('h1, h2, p').forEach(element => {
            element.style.animation = 'rainbowText 1s linear infinite';
        });
        
        setTimeout(() => {
            secretMessage.remove();
            document.body.style.animation = '';
            document.querySelectorAll('h1, h2, p').forEach(element => {
                element.style.animation = '';
            });
        }, 5000);
    }
}

// Add floating up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px);
        }
    }
    
    @keyframes photoSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.1); }
        100% { transform: rotate(360deg) scale(1); }
    }
    
    @keyframes rainbow {
        0% { background: linear-gradient(45deg, #ff6b9d, #feca57); }
        25% { background: linear-gradient(45deg, #feca57, #48dbfb); }
        50% { background: linear-gradient(45deg, #48dbfb, #ff9ff3); }
        75% { background: linear-gradient(45deg, #ff9ff3, #ff6b9d); }
        100% { background: linear-gradient(45deg, #ff6b9d, #feca57); }
    }
    
    @keyframes rainbowText {
        0% { color: #ff6b9d; }
        25% { color: #feca57; }
        50% { color: #48dbfb; }
        75% { color: #ff9ff3; }
        100% { color: #ff6b9d; }
    }
    
    @keyframes confettiBurst {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translate(var(--tx), var(--ty)) scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: translate(calc(var(--tx) * 2), calc(var(--ty) * 2)) scale(0.5) rotate(360deg);
        }
    }
    
    @keyframes messagePopup {
        0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px) scale(0.8);
        }
        20% {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1.1);
        }
        40% {
            transform: translateX(-50%) translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px) scale(0.9);
        }
    }
`;
document.head.appendChild(style);
