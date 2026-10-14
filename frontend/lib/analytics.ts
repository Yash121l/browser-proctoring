import posthog from 'posthog-js';

// PostHog product analytics.
//
// Proctored quizzes are sensitive, so replays mask every input and every text
// node and never record <video>, <canvas>, <img> or <iframe>; autocapture does
// not collect element text or attributes; and replay is paused while a quiz
// attempt is being proctored so it never competes with proctoring capture.
//
// The phc_ key is a public client key committed in .env.production, and events
// go through the /ingest rewrite in next.config.js.

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
let enabled = false;

export function initAnalytics() {
  if (enabled || typeof window === 'undefined' || !KEY) return;
  const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
  if ((process.env.NODE_ENV !== 'production' || isLocal) && process.env.NEXT_PUBLIC_POSTHOG_DEV !== '1') return;

  posthog.init(KEY, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-08-30',
    person_profiles: 'identified_only',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    autocapture: true,
    mask_all_text: true,
    mask_all_element_attributes: true,
    enable_heatmaps: true,
    capture_dead_clicks: true,
    capture_exceptions: true,
    capture_performance: { web_vitals: true },
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '*',
      blockSelector: 'video, canvas, img, iframe, .ph-no-capture'
    }
  });
  posthog.register({ app: 'browser-proctoring' });
  enabled = true;
}

type Events = {
  quiz_attempt_started: { attempt_id: string };
  proctor_violation_detected: { attempt_id: string; violation_type: string };
};

export function track<E extends keyof Events>(event: E, props: Events[E]) {
  if (enabled) posthog.capture(event, props);
}

// Pause replay for the duration of a proctored attempt. Returns the resume fn.
// stopSessionRecording() sets disable_session_recording, so the recorder also
// stays off if it hadn't loaded yet; startSessionRecording() with no override
// still respects the project's replay settings and sampling.
export function pauseReplay() {
  if (!enabled) return () => {};
  posthog.stopSessionRecording();
  return () => posthog.startSessionRecording();
}
