import { useRef, useState } from 'react';
import { effectiveStreak, type AppState, type ProgressMap } from '../storage/db';
import { exportBackup, importBackup } from '../storage/backup';
import { isMastered } from '../srs/sm2';
import { speakJapanese, ttsDiagnostic } from '../audio/tts';

interface Props {
  app: AppState;
  progress: ProgressMap;
  onToggleTts: () => void;
  onToggleSfx: () => void;
  onImported: () => void;
  onBack: () => void;
}

export default function StatsScreen({
  app,
  progress,
  onToggleTts,
  onToggleSfx,
  onImported,
  onBack,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<string | null>(null);

  const testVoice = () => {
    const diag = ttsDiagnostic();
    if (!diag.supported) {
      setVoiceStatus("❌ La synthèse vocale n'est pas disponible sur ce navigateur.");
      return;
    }
    speakJapanese('こんにちは');
    if (diag.voiceName) {
      setVoiceStatus(
        `✅ Voix japonaise : ${diag.voiceName}. Si tu n'entends rien : désactive le mode silencieux (interrupteur orange) et monte le volume.`,
      );
    } else {
      setVoiceStatus(
        '⚠️ Aucune voix japonaise installée. Sur iPhone : Réglages ▸ Accessibilité ▸ Contenu énoncé ▸ Voix ▸ Japonais ▸ télécharge « Kyoko », puis relance l’app.',
      );
    }
  };

  const entries = Object.values(progress);
  const mastered = entries.filter(isMastered).length;

  const handleImport = async (file: File | undefined) => {
    if (!file) return;
    try {
      await importBackup(file);
      setMessage('Sauvegarde restaurée ✓');
      onImported();
    } catch {
      setMessage("Ce fichier n'est pas une sauvegarde NanoLingo valide.");
    }
  };

  return (
    <div className="screen">
      <div className="screen-header">
        <button className="quit-btn" aria-label="Retour" onClick={onBack}>
          ←
        </button>
        <h1 className="screen-title">Statistiques</h1>
      </div>

      <div className="stats-grid">
        <div className="stats-cell">
          <div className="stats-value">🔥 {effectiveStreak(app.streak)}</div>
          <div className="stats-label">série (record : {app.streak.best})</div>
        </div>
        <div className="stats-cell">
          <div className="stats-value">⭐ {app.xp}</div>
          <div className="stats-label">XP total</div>
        </div>
        <div className="stats-cell">
          <div className="stats-value">{entries.length}</div>
          <div className="stats-label">caractères appris</div>
        </div>
        <div className="stats-cell">
          <div className="stats-value">{mastered}</div>
          <div className="stats-label">acquis (≥ 21 j)</div>
        </div>
      </div>

      <div className="settings-row">
        <span>🔊 Prononciation (voix japonaise)</span>
        <button className="btn btn-ghost" style={{ width: 'auto', padding: '8px 14px' }} onClick={onToggleTts}>
          {app.settings.ttsEnabled ? 'Activée' : 'Coupée'}
        </button>
      </div>

      <div className="settings-row">
        <span>🎵 Sons de réponse</span>
        <button className="btn btn-ghost" style={{ width: 'auto', padding: '8px 14px' }} onClick={onToggleSfx}>
          {app.settings.sfxEnabled ? 'Activés' : 'Coupés'}
        </button>
      </div>

      <div className="settings-row">
        <span>🗣️ Voix japonaise</span>
        <button className="btn btn-ghost" style={{ width: 'auto', padding: '8px 14px' }} onClick={testVoice}>
          Tester
        </button>
      </div>
      {voiceStatus && (
        <p style={{ color: 'var(--muted)', fontWeight: 600, fontSize: 14, marginTop: -4 }}>{voiceStatus}</p>
      )}

      <div className="settings-row">
        <span>💾 Sauvegarde de la progression</span>
        <span style={{ display: 'flex', gap: 8 }}>
          <button
            className="btn btn-ghost"
            style={{ width: 'auto', padding: '8px 14px' }}
            onClick={() => exportBackup()}
          >
            Exporter
          </button>
          <button
            className="btn btn-ghost"
            style={{ width: 'auto', padding: '8px 14px' }}
            onClick={() => fileRef.current?.click()}
          >
            Importer
          </button>
        </span>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={(e) => handleImport(e.target.files?.[0])}
      />

      {message && <p style={{ color: 'var(--muted)', fontWeight: 700 }}>{message}</p>}
    </div>
  );
}
