'use client';
import { useEffect, useState } from 'react';
import { ART } from './assets';
import s from './cinematic.module.css';

export default function MotionCanvas() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(query.matches);
    sync(); query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  return <>
    {/* LOCKED: homepage animation/hero is visual-only. All copy and controls are siblings BELOW this canvas. */}
    <div className={s.homeCanvas} data-testid="home-canvas" data-motion={paused || reduced ? 'paused' : 'playing'}>
      <img src={ART.hero} width={1648} height={928} alt="ICONIC campaign artwork: a microphone and runway facing a monumental concert stage" loading="eager" fetchPriority="high" decoding="async" />
    </div>
    <div className={s.motionBar}>
      <span>Music. People. Culture.</span>
      <button type="button" data-testid="motion-toggle" aria-pressed={paused || reduced} disabled={reduced} onClick={() => setPaused(!paused)}>{reduced ? 'Reduced motion enabled' : paused ? 'Play motion' : 'Pause motion'}</button>
    </div>
  </>;
}
