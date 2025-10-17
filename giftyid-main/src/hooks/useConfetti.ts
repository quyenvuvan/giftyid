import { useCallback } from 'react';
import confetti, { Shape } from 'canvas-confetti';

// Type definition cho WebKit AudioContext
interface WindowWithWebkitAudioContext extends Window {
  webkitAudioContext?: typeof AudioContext;
}

// Type cho confetti options
interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  colors?: string[];
  shapes?: Shape[];
  origin?: { x?: number; y?: number };
  angle?: number;
  ticks?: number;
  zIndex?: number;
}

export const useConfetti = () => {
  // Hàm tạo âm thanh đơn giản
  const playSuccessSound = useCallback(() => {
    // Tạo âm thanh thành công đơn giản bằng Web Audio API
    const windowWithWebkit = window as WindowWithWebkitAudioContext;
    const AudioContextClass = window.AudioContext || windowWithWebkit.webkitAudioContext;
    
    if (!AudioContextClass) {
      console.log('AudioContext not supported');
      return;
    }
    
    const audioContext = new AudioContextClass();
    
    // Tạo nốt nhạc thành công (C-E-G chord)
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    // C-E-G chord (Do-Mi-Sol)
    playNote(523.25, now, 0.3); // C5
    playNote(659.25, now + 0.1, 0.3); // E5  
    playNote(783.99, now + 0.2, 0.4); // G5
  }, []);

  // Hiệu ứng confetti cơ bản
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Hiệu ứng confetti pháo hoa
  const fireFireworks = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Bắn từ nhiều vị trí khác nhau
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  // Hiệu ứng confetti rơi từ trên
  const fireRainbow = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 160,
      angle: 60,
      origin: { x: 0, y: 0.5 }
    });
    confetti({
      particleCount: 100,
      spread: 160,
      angle: 120,
      origin: { x: 1, y: 0.5 }
    });
  }, []);

  // Hiệu ứng confetti thành công cho form
  const fireSuccessConfetti = useCallback(() => {
    // Phát âm thanh trước
    try {
      playSuccessSound();
    } catch {
      // Bỏ qua lỗi âm thanh (có thể do browser policy)
      console.log('Audio context requires user interaction');
    }

    // Tạo hiệu ứng đa tầng
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: ConfettiOptions) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    // Tầng 1: confetti lớn
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A']
    });

    // Tầng 2: confetti nhỏ hơn
    fire(0.2, {
      spread: 60,
      colors: ['#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471']
    });

    // Tầng 3: confetti tỏa rộng
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43']
    });

    // Tầng 4: confetti rơi chậm
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#6C5CE7', '#A29BFE', '#FD79A8', '#FDCB6E', '#6C5CE7']
    });

    // Tầng 5: hiệu ứng sao
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      shapes: ['star' as Shape],
      colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#9370DB']
    });
  }, [playSuccessSound]);

  return {
    fireConfetti,
    fireFireworks,
    fireRainbow,
    fireSuccessConfetti
  };
}; 