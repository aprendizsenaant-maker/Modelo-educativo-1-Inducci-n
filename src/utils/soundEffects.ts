// Web Audio API Synthesizer for SENA Anthem & Feedback Sound Effects

class SoundManager {
  private ctx: AudioContext | null = null;
  private isAnthemPlaying: boolean = false;
  private anthemTimeouts: number[] = [];
  private onNoteCallback: ((noteIndex: number, currentLyric: string) => void) | null = null;
  private onAnthemFinished: (() => void) | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a brief positive chime when completing an answer
  playSuccessSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.6);
    } catch {
      // Audio might be blocked by browser policy prior to gesture
    }
  }

  // Play error soft tone
  playErrorSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(190, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore audio policy
    }
  }

  // Play celebratory fanfare
  playFanfare() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [
        { f: 523.25, d: 0.15 }, // C5
        { f: 523.25, d: 0.15 }, // C5
        { f: 523.25, d: 0.15 }, // C5
        { f: 659.25, d: 0.3 },  // E5
        { f: 783.99, d: 0.2 },  // G5
        { f: 1046.50, d: 0.6 }, // C6
      ];

      let t = this.ctx.currentTime;
      notes.forEach((n) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, t);
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + n.d);
        t += n.d;
      });
    } catch {
      // Audio context exception safe
    }
  }

  // Synthesize musical melody of SENA Anthem
  // Coro: "Estudiantes del SENA, ¡adelante! Por Colombia luchad con amor..."
  playAnthem(
    onNote?: (noteIndex: number, currentLyric: string) => void,
    onFinished?: () => void
  ) {
    this.stopAnthem();
    this.initCtx();
    if (!this.ctx) return;

    this.isAnthemPlaying = true;
    this.onNoteCallback = onNote || null;
    this.onAnthemFinished = onFinished || null;

    // SENA Anthem notes arrangement (key of G / C major martial rhythm)
    // Notes: { note: Hz, dur: seconds, lyric: text }
    const melody: { f: number; d: number; lyric: string }[] = [
      { f: 392.00, d: 0.5, lyric: "¡Es-tu-" },      // G4
      { f: 523.25, d: 0.6, lyric: "dian-tes" },     // C5
      { f: 587.33, d: 0.4, lyric: "del" },          // D5
      { f: 659.25, d: 0.9, lyric: "SE-" },          // E5
      { f: 523.25, d: 0.7, lyric: "NA," },          // C5
      { f: 659.25, d: 0.5, lyric: "¡a-de-" },       // E5
      { f: 783.99, d: 1.1, lyric: "lan-te!" },      // G5

      { f: 659.25, d: 0.5, lyric: "Por" },          // E5
      { f: 587.33, d: 0.5, lyric: "Co-" },          // D5
      { f: 523.25, d: 0.5, lyric: "lom-" },         // C5
      { f: 440.00, d: 0.6, lyric: "bia" },          // A4
      { f: 392.00, d: 0.5, lyric: "lu-" },          // G4
      { f: 440.00, d: 0.5, lyric: "chad" },         // A4
      { f: 493.88, d: 0.6, lyric: "con" },          // B4
      { f: 523.25, d: 1.2, lyric: "a-mor!" },       // C5

      { f: 523.25, d: 0.5, lyric: "con" },          // C5
      { f: 659.25, d: 0.5, lyric: "el" },           // E5
      { f: 783.99, d: 0.7, lyric: "ánimo" },        // G5
      { f: 783.99, d: 0.5, lyric: "no-" },          // G5
      { f: 880.00, d: 0.8, lyric: "ble" },          // A5
      { f: 783.99, d: 0.7, lyric: "y" },            // G5
      { f: 659.25, d: 0.6, lyric: "ra-" },          // E5
      { f: 587.33, d: 1.0, lyric: "dian-te," },     // D5

      { f: 587.33, d: 0.5, lyric: "trans-for-" },   // D5
      { f: 659.25, d: 0.5, lyric: "me-mos" },       // E5
      { f: 587.33, d: 0.5, lyric: "la" },           // D5
      { f: 523.25, d: 0.7, lyric: "pa-tria" },      // C5
      { f: 440.00, d: 0.5, lyric: "en" },           // A4
      { f: 493.88, d: 0.5, lyric: "fer-" },         // B4
      { f: 523.25, d: 1.4, lyric: "vor." },         // C5
    ];

    let accumulatedDelay = 0;

    melody.forEach((note, index) => {
      const timeoutId = window.setTimeout(() => {
        if (!this.isAnthemPlaying || !this.ctx) return;

        // Play synthesized brass/lead tone
        const now = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        // Trumpet/Brass harmonic layering
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(note.f, now);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(note.f * 1.002, now); // slight detune for warmth

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(700, now + note.d);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
        gain.gain.setValueAtTime(0.18, now + note.d * 0.75);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.d);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + note.d);
        osc2.stop(now + note.d);

        if (this.onNoteCallback) {
          this.onNoteCallback(index, note.lyric);
        }

        // If it's the last note, trigger finish
        if (index === melody.length - 1) {
          const finishTimeout = window.setTimeout(() => {
            this.isAnthemPlaying = false;
            if (this.onAnthemFinished) this.onAnthemFinished();
          }, note.d * 1000 + 400);
          this.anthemTimeouts.push(finishTimeout);
        }
      }, accumulatedDelay * 1000);

      this.anthemTimeouts.push(timeoutId);
      accumulatedDelay += note.d * 0.95;
    });
  }

  stopAnthem() {
    this.isAnthemPlaying = false;
    this.anthemTimeouts.forEach((id) => clearTimeout(id));
    this.anthemTimeouts = [];
    if (this.onAnthemFinished) {
      this.onAnthemFinished();
    }
  }

  isPlaying() {
    return this.isAnthemPlaying;
  }
}

export const soundManager = new SoundManager();
