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
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);
  const stopped = paused || reduced;
  return <>
    {/* LOCKED: homepage animation/hero is visual-only. All copy and controls are siblings BELOW this canvas. */}
    {/* SOURCE LOCK: animation derives from ICONIC HOMESCREEN ANI(1).mp4; never substitute the concert animation here. */}
    <div className={s.homeCanvas} data-testid="home-canvas" data-motion={stopped ? 'paused' : 'playing'} data-animation-source="ICONIC HOMESCREEN ANI(1).mp4">
      <img src={stopped ? ART.homePoster : ART.hero} width={960} height={540} alt="ICONIC homescreen animation" loading="eager" fetchPriority="high" decoding="async" />
    </div>
    <div className={s.motionBar}>
      <span>Music. People. Culture.</span>
      <button type="button" data-testid="motion-toggle" aria-pressed={stopped} disabled={reduced} onClick={() => setPaused(!paused)}>{reduced ? 'Reduced motion enabled' : paused ? 'Play motion' : 'Pause motion'}</button>
    </div>
  </>;
}
