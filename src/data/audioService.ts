/**
 * PathFinder AI — Web Audio API Synthesizer & Sound Manager
 * 
 * Generates rich, original procedural audio (SFX and ambient music loops)
 * using the browser's native AudioContext API. No external audio files or API keys required.
 * 
 * Rules:
 * - Starts MUTED by default until user enables audio.
 * - Audio ON/OFF, Music ON/OFF, SFX ON/OFF, and Volume controls.
 */

class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isMusicEnabled: boolean = true;
  private isSfxEnabled: boolean = true;
  private masterGainNode: GainNode | null = null;
  private masterVolume: number = 0.5;
  private activeMusicNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private musicIntervalId: any = null;
  private currentMusicTheme: 'escape' | 'match' | 'lab' | 'mystery' | 'quest' | null = null;

  constructor() {
    // AudioContext is initialized lazily upon first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGainNode = this.ctx.createGain();
        this.masterGainNode.gain.value = this.isMuted ? 0 : this.masterVolume;
        this.masterGainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Audio Control Getters & Setters
  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsMusicEnabled(): boolean {
    return this.isMusicEnabled;
  }

  public getIsSfxEnabled(): boolean {
    return this.isSfxEnabled;
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      if (this.masterGainNode) this.masterGainNode.gain.value = 0;
      this.stopMusic();
    } else {
      this.initContext();
      if (this.masterGainNode) this.masterGainNode.gain.value = this.masterVolume;
      if (this.currentMusicTheme) {
        this.startMusic(this.currentMusicTheme);
      }
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.isMusicEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    } else if (!this.isMuted && this.currentMusicTheme) {
      this.startMusic(this.currentMusicTheme);
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.isSfxEnabled = enabled;
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.masterGainNode && !this.isMuted) {
      this.masterGainNode.gain.value = this.masterVolume;
    }
  }

  // =========================================================================
  // SOUND EFFECTS (SFX) PROCEDURAL GENERATORS
  // =========================================================================

  public playClick() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.masterGainNode);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  public playSuccessChime() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGainNode);
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  }

  public playErrorBuzz() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.masterGainNode);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  public playDoorUnlock() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    // Metallic click followed by rising sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGainNode);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  public playMatchSuccess() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880.00, this.ctx.currentTime + 0.1); // A5

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.masterGainNode);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  public playChemicalBubbles() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + i * 0.07;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 + Math.random() * 400, startTime);
      osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 400, startTime + 0.05);

      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGainNode);
      osc.start(startTime);
      osc.stop(startTime + 0.05);
    }
  }

  public playClueDiscovered() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const notes = [440, 554.37, 659.25]; // A4, C#5, E5
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGainNode);
      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  public playLevelUpFanfare() {
    if (this.isMuted || !this.isSfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    const notes = [392, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGainNode) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.connect(gain);
      gain.connect(this.masterGainNode);
      osc.start(startTime);
      osc.stop(startTime + 0.5);
    });
  }

  // =========================================================================
  // BACKGROUND MUSIC THEMES (PROCEDURAL LOOPS)
  // =========================================================================

  public startMusic(theme: 'escape' | 'match' | 'lab' | 'mystery' | 'quest') {
    this.currentMusicTheme = theme;
    if (this.isMuted || !this.isMusicEnabled) return;
    this.initContext();
    if (!this.ctx || !this.masterGainNode) return;

    this.stopMusic();

    let step = 0;
    let freqs: number[] = [];

    switch (theme) {
      case 'escape':
        freqs = [220, 261.63, 293.66, 329.63, 261.63, 220, 196, 220]; // Mysterious A minor pad
        break;
      case 'match':
        freqs = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 349.23]; // Playful C Major
        break;
      case 'lab':
        freqs = [196.00, 246.94, 293.66, 392.00, 293.66, 246.94, 220.00, 261.63]; // Ambient Synth G
        break;
      case 'mystery':
        freqs = [174.61, 220.00, 261.63, 329.63, 261.63, 220.00, 196.00, 174.61]; // Noir F minor
        break;
      case 'quest':
        freqs = [293.66, 369.99, 440.00, 587.33, 440.00, 369.99, 329.63, 293.66]; // Fantasy D Major
        break;
    }

    this.musicIntervalId = setInterval(() => {
      if (!this.ctx || !this.masterGainNode || this.isMuted || !this.isMusicEnabled) return;
      const freq = freqs[step % freqs.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGainNode);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    }, 450);
  }

  public stopMusic() {
    if (this.musicIntervalId) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }
}

export const audioService = new AudioService();
