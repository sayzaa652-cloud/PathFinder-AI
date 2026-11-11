import React from 'react';
import { CharacterAvatar } from '../../types/characterTypes';

interface AnimeAvatarRendererProps {
  avatar: CharacterAvatar;
  pose?: 'idle' | 'walk' | 'jump' | 'celebrate';
  className?: string;
  size?: number; // size in px, default 120
}

export const AnimeAvatarRenderer: React.FC<AnimeAvatarRendererProps> = ({
  avatar,
  pose = 'idle',
  className = '',
  size = 120
}) => {
  const isMale = avatar.gender === 'male';

  // Hair color fill
  const hairColor = avatar.hairColor || (isMale ? '#1e1b4b' : '#312e81');

  // Pose CSS transforms
  let poseClass = '';
  if (pose === 'idle') poseClass = 'animate-pulse';
  else if (pose === 'walk') poseClass = 'animate-bounce';
  else if (pose === 'jump') poseClass = '-translate-y-2 scale-105';
  else if (pose === 'celebrate') poseClass = 'scale-110';

  return (
    <div className={`relative inline-flex items-center justify-center ${poseClass} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="eyeGradMale" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="eyeGradFemale" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
          <linearGradient id="capeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>

        {/* Hero Cape (if accessory === 'hero_cape') */}
        {avatar.accessory === 'hero_cape' && (
          <path
            d="M 20 65 Q 10 95 15 115 Q 50 125 85 115 Q 90 95 80 65 Z"
            fill="url(#capeGrad)"
          />
        )}

        {/* Body & Outfit Base */}
        {isMale ? (
          /* Male Shinobi / Explorer Vest */
          <g id="male-body">
            {/* Legs */}
            <rect x="36" y="85" width="10" height="30" rx="3" fill="#1E1B4B" />
            <rect x="54" y="85" width="10" height="30" rx="3" fill="#1E1B4B" />
            {/* Shoes */}
            <ellipse cx="40" cy="113" rx="7" ry="4" fill="#0F172A" />
            <ellipse cx="60" cy="113" rx="7" ry="4" fill="#0F172A" />
            {/* High-Collar Outfit Jacket */}
            <path d="M 22 58 L 50 72 L 78 58 L 86 92 L 14 92 Z" fill={avatar.outfit === 'cyber_explorer' ? '#0284C7' : '#722F45'} />
            <path d="M 38 58 L 50 78 L 62 58" fill="#1E293B" />
            {/* High Shinobi Collar */}
            <path d="M 30 52 L 30 42 L 70 42 L 70 52 L 50 60 Z" fill="#1E1B4B" />
            {/* Arms */}
            <path d="M 14 60 L 22 82 L 28 80" stroke="#1E1B4B" strokeWidth="6" strokeLinecap="round" />
            <path d="M 86 60 L 78 82 L 72 80" stroke="#1E1B4B" strokeWidth="6" strokeLinecap="round" />
          </g>
        ) : (
          /* Female Scholar / Starlight Dress */
          <g id="female-body">
            {/* Legs */}
            <rect x="38" y="85" width="8" height="30" rx="2" fill="#FDE68A" />
            <rect x="54" y="85" width="8" height="30" rx="2" fill="#FDE68A" />
            {/* Boots */}
            <rect x="37" y="100" width="10" height="15" rx="3" fill="#4C1D95" />
            <rect x="53" y="100" width="10" height="15" rx="3" fill="#4C1D95" />
            {/* Elegant Skirt / Outfit */}
            <path d="M 26 58 L 50 70 L 74 58 L 82 92 L 18 92 Z" fill={avatar.outfit === 'starlight_adventurer' ? '#9333EA' : '#722F45'} />
            <path d="M 34 58 L 50 72 L 66 58" fill="#FCE7F3" />
            {/* High Collar / Ribbon */}
            <path d="M 32 50 Q 50 56 68 50" stroke="#F472B6" strokeWidth="3" fill="none" />
            {/* Arms */}
            <path d="M 20 60 L 26 80" stroke="#722F45" strokeWidth="5" strokeLinecap="round" />
            <path d="M 80 60 L 74 80" stroke="#722F45" strokeWidth="5" strokeLinecap="round" />
          </g>
        )}

        {/* Head & Neck */}
        <rect x="42" y="38" width="16" height="14" rx="4" fill="url(#skinGrad)" />
        {/* Face Structure */}
        <path d="M 28 26 C 28 10, 72 10, 72 26 L 72 38 C 72 52, 28 52, 28 38 Z" fill="url(#skinGrad)" />

        {/* Eyes & Facial Expression */}
        {isMale ? (
          /* Male Cool Mysterious Eyes (Sasuke-style intense gaze) */
          <g id="male-face">
            {/* Left Eye */}
            <path d="M 34 32 Q 40 28 46 32 Q 40 36 34 32 Z" fill="#0F172A" />
            <ellipse cx="40" cy="32" rx="3" ry="2.5" fill="url(#eyeGradMale)" />
            <circle cx="39" cy="31" r="1" fill="#FFFFFF" />
            {/* Right Eye */}
            <path d="M 54 32 Q 60 28 66 32 Q 60 36 54 32 Z" fill="#0F172A" />
            <ellipse cx="60" cy="32" rx="3" ry="2.5" fill="url(#eyeGradMale)" />
            <circle cx="59" cy="31" r="1" fill="#FFFFFF" />
            {/* Eyebrows (Intense slant) */}
            <line x1="33" y1="27" x2="47" y2="29" stroke={hairColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="67" y1="27" x2="53" y2="29" stroke={hairColor} strokeWidth="2" strokeLinecap="round" />
            {/* Confident Smile */}
            <path d="M 43 43 Q 50 47 57 43" stroke="#0F172A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        ) : (
          /* Female Gentle Expressive Eyes (Hinata-style sweet gaze) */
          <g id="female-face">
            {/* Left Eye */}
            <ellipse cx="38" cy="32" rx="5" ry="6" fill="#0F172A" />
            <ellipse cx="38" cy="33" rx="3.5" ry="4.5" fill="url(#eyeGradFemale)" />
            <circle cx="37" cy="30" r="1.5" fill="#FFFFFF" />
            <circle cx="40" cy="35" r="0.8" fill="#FFFFFF" />
            {/* Right Eye */}
            <ellipse cx="62" cy="32" rx="5" ry="6" fill="#0F172A" />
            <ellipse cx="62" cy="33" rx="3.5" ry="4.5" fill="url(#eyeGradFemale)" />
            <circle cx="61" cy="30" r="1.5" fill="#FFFFFF" />
            <circle cx="64" cy="35" r="0.8" fill="#FFFFFF" />
            {/* Soft Eyelashes */}
            <path d="M 32 28 Q 38 25 44 28" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 56 28 Q 62 25 68 28" stroke="#0F172A" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Soft Blush */}
            <ellipse cx="34" cy="38" rx="4" ry="2" fill="#F472B6" opacity="0.6" />
            <ellipse cx="66" cy="38" rx="4" ry="2" fill="#F472B6" opacity="0.6" />
            {/* Sweet Gentle Smile */}
            <path d="M 44 43 Q 50 47 56 43" stroke="#4C1D95" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* Hairstyle Render */}
        {isMale ? (
          /* Male Hairstyles */
          <g id="male-hair">
            {avatar.hairStyle === 'spiky_shadow' ? (
              /* Spiky Shadow Locks (Sasuke inspired spiky back & side bangs) */
              <g>
                <path d="M 22 26 Q 10 18 20 8 Q 35 15 32 4 Q 45 12 50 2 Q 55 12 68 4 Q 65 15 80 8 Q 90 18 78 26 Z" fill={hairColor} />
                <path d="M 25 24 Q 35 28 42 22 M 58 22 Q 65 28 75 24" stroke={hairColor} strokeWidth="6" strokeLinecap="round" />
              </g>
            ) : avatar.hairStyle === 'wind_swept' ? (
              /* Wind Swept Hawk */
              <path d="M 20 28 C 15 10, 40 2, 70 5 C 85 10, 80 25, 75 30 Q 50 15 20 28 Z" fill={hairColor} />
            ) : (
              /* Sleek Cyber Crop */
              <path d="M 24 24 C 24 10, 76 10, 76 24 C 76 30, 24 30, 24 24 Z" fill={hairColor} />
            )}
          </g>
        ) : (
          /* Female Hairstyles */
          <g id="female-hair">
            {avatar.hairStyle === 'hime_cut' ? (
              /* Hime Cut & Bangs (Hinata inspired long straight hair with hime side locks) */
              <g>
                {/* Back Long Hair */}
                <path d="M 20 25 Q 15 60 18 90 Q 50 95 82 90 Q 85 60 80 25 Z" fill={hairColor} />
                {/* Straight Hime Bangs */}
                <path d="M 26 24 Q 50 20 74 24 L 74 34 L 64 34 L 64 26 L 36 26 L 36 34 L 26 34 Z" fill={hairColor} />
              </g>
            ) : avatar.hairStyle === 'twin_tails' ? (
              /* Starlight Twin Tails */
              <g>
                <path d="M 26 22 C 26 12, 74 12, 74 22 Z" fill={hairColor} />
                <path d="M 20 24 C 5 45 10 80 22 75 C 25 50 24 30 20 24 Z" fill={hairColor} />
                <path d="M 80 24 C 95 45 90 80 78 75 C 75 50 76 30 80 24 Z" fill={hairColor} />
              </g>
            ) : (
              /* Gentle Soft Waves */
              <path d="M 22 22 C 15 45, 20 85, 30 80 C 40 75, 60 75, 70 80 C 80 85, 85 45, 78 22 Z" fill={hairColor} />
            )}
          </g>
        )}

        {/* Accessories Overlay */}
        {avatar.accessory === 'forehead_band' && (
          <g>
            <rect x="28" y="20" width="44" height="7" fill="#1E293B" rx="2" />
            <rect x="42" y="21" width="16" height="5" fill="#94A3B8" rx="1" />
          </g>
        )}

        {avatar.accessory === 'cyber_visor' && (
          <rect x="30" y="28" width="40" height="10" fill="#38BDF8" opacity="0.8" rx="3" />
        )}

        {avatar.accessory === 'lavender_ribbon' && (
          <path d="M 22 18 Q 30 12 38 18 Q 30 24 22 18 Z M 22 18 Q 14 12 6 18 Q 14 24 22 18 Z" fill="#C084FC" />
        )}

        {avatar.accessory === 'cat_ears' && (
          <g>
            <path d="M 24 16 L 34 2 L 40 18 Z" fill={hairColor} />
            <path d="M 28 14 L 34 6 L 38 16 Z" fill="#F472B6" />
            <path d="M 76 16 L 66 2 L 60 18 Z" fill={hairColor} />
            <path d="M 72 14 L 66 6 L 62 16 Z" fill="#F472B6" />
          </g>
        )}

        {/* Celebration Stars (if pose === 'celebrate') */}
        {pose === 'celebrate' && (
          <g>
            <polygon points="10,15 13,22 20,22 15,26 17,33 10,29 3,33 5,26 0,22 7,22" fill="#F59E0B" />
            <polygon points="90,15 93,22 100,22 95,26 97,33 90,29 83,33 85,26 80,22 87,22" fill="#F59E0B" />
          </g>
        )}
      </svg>
    </div>
  );
};
