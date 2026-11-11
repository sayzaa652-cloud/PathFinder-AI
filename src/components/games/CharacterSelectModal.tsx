import React, { useState } from 'react';
import { 
  Sparkles, Check, RefreshCw, UserCheck, Shield, Wand2, Play, Award, Volume2, Gamepad2, ArrowRight, X
} from 'lucide-react';
import { 
  CharacterAvatar, DEFAULT_MALE_AVATAR, DEFAULT_FEMALE_AVATAR,
  HAIR_STYLES, HAIR_COLORS, OUTFITS, ACCESSORIES, Gender
} from '../../types/characterTypes';
import { AnimeAvatarRenderer } from './AnimeAvatarRenderer';
import { audioService } from '../../data/audioService';

interface CharacterSelectModalProps {
  currentAvatar: CharacterAvatar;
  onSaveAvatar: (newAvatar: CharacterAvatar) => void;
  onClose: () => void;
  onStartGame?: () => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  currentAvatar,
  onSaveAvatar,
  onClose,
  onStartGame
}) => {
  const [avatar, setAvatar] = useState<CharacterAvatar>({ ...currentAvatar });
  const [previewPose, setPreviewPose] = useState<'idle' | 'walk' | 'jump' | 'celebrate'>('idle');

  const handleGenderChange = (gender: Gender) => {
    audioService.playClick();
    if (gender === 'male') {
      setAvatar({ ...DEFAULT_MALE_AVATAR });
    } else {
      setAvatar({ ...DEFAULT_FEMALE_AVATAR });
    }
  };

  const handleSave = () => {
    audioService.playLevelUpFanfare();
    onSaveAvatar(avatar);
    if (onStartGame) onStartGame();
    else onClose();
  };

  const hairOptions = avatar.gender === 'male' ? HAIR_STYLES.male : HAIR_STYLES.female;
  const outfitOptions = avatar.gender === 'male' ? OUTFITS.male : OUTFITS.female;
  const accessoryOptions = avatar.gender === 'male' ? ACCESSORIES.male : ACCESSORIES.female;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-4xl bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 border-4 border-amber-400/80 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 border-b border-white/15 pb-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 bg-black/40 px-3.5 py-1 rounded-full border border-amber-400/40 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Character Creation &amp; Anime Avatar Selection
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif-accent text-white">
            Choose &amp; Customize Your Pathfinder Adventurer
          </h2>
          <p className="text-xs text-white/80 max-w-lg mx-auto">
            Select your preferred anime avatar. Your customized hero will appear in all 5 MPC games!
          </p>
        </div>

        {/* Main Grid: Avatar 3D Preview (Left 5 Cols) vs Customization Controls (Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3D Preview Stage (5 Cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-linear-to-b from-purple-950/60 via-slate-900 to-black/80 border-2 border-amber-400/60 flex flex-col items-center space-y-5 shadow-inner relative overflow-hidden">
            
            {/* Gender Toggle Segmented Buttons */}
            <div className="w-full grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-black/60 border border-white/20">
              <button
                onClick={() => handleGenderChange('male')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  avatar.gender === 'male'
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Male (Sasuke Vibe)</span>
              </button>
              <button
                onClick={() => handleGenderChange('female')}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  avatar.gender === 'female'
                    ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Female (Hinata Vibe)</span>
              </button>
            </div>

            {/* Live Anime Avatar Renderer Stage */}
            <div className="w-48 h-56 rounded-2xl bg-gradient-to-t from-black/80 via-slate-900/60 to-purple-900/30 border border-white/20 flex flex-col items-center justify-center relative shadow-2xl">
              <AnimeAvatarRenderer avatar={avatar} pose={previewPose} size={150} />

              {/* Stage Spotlight Glow */}
              <div className="absolute bottom-2 w-32 h-6 bg-amber-400/20 rounded-full blur-md"></div>
            </div>

            {/* Pose Preview Selector */}
            <div className="space-y-1.5 text-center w-full">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                Preview Motion Poses:
              </span>
              <div className="flex items-center justify-center gap-1.5">
                {(['idle', 'walk', 'jump', 'celebrate'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      setPreviewPose(p);
                      audioService.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      previewPose === p
                        ? 'bg-amber-400 text-[#722F45] font-extrabold'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Customization Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                Adventurer Character Name:
              </label>
              <input
                type="text"
                value={avatar.name}
                onChange={(e) => setAvatar({ ...avatar, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/30 text-white font-bold text-sm focus:border-amber-400 focus:outline-none"
                placeholder="Enter Hero Name..."
              />
            </div>

            {/* Hairstyle Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                Anime Hairstyle:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {hairOptions.map(h => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setAvatar({ ...avatar, hairStyle: h.id });
                      audioService.playClick();
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      avatar.hairStyle === h.id
                        ? 'bg-amber-400 text-[#722F45] border-amber-300 shadow-sm'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Color Palette */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                Hair Color:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {HAIR_COLORS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setAvatar({ ...avatar, hairColor: c.hex });
                      audioService.playClick();
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      avatar.hairColor === c.hex ? 'scale-125 border-amber-400 ring-2 ring-white' : 'border-white/40'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Outfit Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                Adventure Outfit:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {outfitOptions.map(o => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setAvatar({ ...avatar, outfit: o.id });
                      audioService.playClick();
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      avatar.outfit === o.id
                        ? 'bg-amber-400 text-[#722F45] border-amber-300 shadow-sm'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessories Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block">
                Special Accessory:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {accessoryOptions.map(a => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setAvatar({ ...avatar, accessory: a.id });
                      audioService.playClick();
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                      avatar.accessory === a.id
                        ? 'bg-amber-400 text-[#722F45] border-amber-300 shadow-sm'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Action Button Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/15">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-amber-400 text-[#722F45] font-extrabold text-xs shadow-lg hover:bg-amber-300 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>CONFIRM &amp; SAVE CHARACTER</span>
          </button>
        </div>

      </div>
    </div>
  );
};
