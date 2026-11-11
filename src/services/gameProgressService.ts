/**
 * PathFinder AI — Student Game Progress & Rewards Service
 * Manages persistent XP, Level, Coins, Gems, Completed Missions, Badges,
 * and Subject Progress Charts across all 5 educational games.
 */

export interface StudentGameProgress {
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  gems: number;
  gamesPlayed: number;
  missionsCompleted: number;
  badgesEarnedCount: number;
  earnedBadges: string[];
  subjectProgress: {
    maths1A: number; // percentage 0 - 100
    maths1B: number;
    physics: number;
    chemistry: number;
  };
  gameLevels: {
    escape: number;
    match: number;
    lab: number;
    mystery: number;
    quest: number;
  };
}

const DEFAULT_PROGRESS: StudentGameProgress = {
  level: 1,
  xp: 120,
  maxXp: 500,
  coins: 450,
  gems: 25,
  gamesPlayed: 5,
  missionsCompleted: 12,
  badgesEarnedCount: 3,
  earnedBadges: [
    'Master of Set Algebra',
    'Vector Force Engineer',
    'Quantum Atomic Specialist'
  ],
  subjectProgress: {
    maths1A: 85,
    maths1B: 70,
    physics: 90,
    chemistry: 75
  },
  gameLevels: {
    escape: 1,
    match: 1,
    lab: 1,
    mystery: 1,
    quest: 1
  }
};

class GameProgressService {
  private progressKey = 'pathfinder_student_game_progress';

  public getProgress(): StudentGameProgress {
    try {
      const saved = localStorage.getItem(this.progressKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { ...DEFAULT_PROGRESS };
  }

  public saveProgress(progress: StudentGameProgress): void {
    try {
      localStorage.setItem(this.progressKey, JSON.stringify(progress));
    } catch (e) {}
  }

  public addXpAndCoins(xpAmount: number, coinsAmount: number, gameId?: string): StudentGameProgress {
    const current = this.getProgress();
    let newXp = current.xp + xpAmount;
    let newLevel = current.level;
    let newMaxXp = current.maxXp;

    while (newXp >= newMaxXp) {
      newXp -= newMaxXp;
      newLevel += 1;
      newMaxXp += 200;
    }

    const updated: StudentGameProgress = {
      ...current,
      level: newLevel,
      xp: newXp,
      maxXp: newMaxXp,
      coins: current.coins + coinsAmount,
      gamesPlayed: current.gamesPlayed + 1,
      missionsCompleted: current.missionsCompleted + 1
    };

    if (gameId && updated.gameLevels[gameId as keyof typeof updated.gameLevels] !== undefined) {
      updated.gameLevels[gameId as keyof typeof updated.gameLevels] += 1;
    }

    this.saveProgress(updated);
    return updated;
  }

  public awardBadge(badgeName: string): StudentGameProgress {
    const current = this.getProgress();
    if (!current.earnedBadges.includes(badgeName)) {
      const updated: StudentGameProgress = {
        ...current,
        earnedBadges: [...current.earnedBadges, badgeName],
        badgesEarnedCount: current.badgesEarnedCount + 1,
        gems: current.gems + 10
      };
      this.saveProgress(updated);
      return updated;
    }
    return current;
  }
}

export const gameProgressService = new GameProgressService();
