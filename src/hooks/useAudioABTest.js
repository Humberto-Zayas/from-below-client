import { useState, useEffect } from "react";

export default function useAudioABTest(initialTracks) {
  const [trackStates, setTrackStates] = useState(
    initialTracks.map((t) => ({
      ...t,
      version: "before",
      isPlaying: false,
      progress: 0,
      beforeRef: null,
      afterRef: null,
    }))
  );

  // Stop all other tracks when one starts
  const stopAllExcept = (id) => {
    setTrackStates((prev) =>
      prev.map((t) => {
        if (t.id !== id) {
          t.beforeRef?.pause();
          t.afterRef?.pause();
          return { ...t, isPlaying: false };
        }
        return t;
      })
    );
  };

  // Toggle A/B version
  const handleToggleVersion = (id, newValue) => {
    if (!newValue) return;

    setTrackStates((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const currentAudio =
            t.version === "before" ? t.beforeRef : t.afterRef;
          const nextAudio =
            newValue === "before" ? t.beforeRef : t.afterRef;
          if (!currentAudio || !nextAudio) return t;

          nextAudio.currentTime = currentAudio.currentTime;
          if (t.isPlaying) {
            currentAudio.pause();
            nextAudio.play();
          }
          return { ...t, version: newValue };
        }
        return t;
      })
    );
  };

  // Play / Pause logic
  const handlePlayPause = (id) => {
    setTrackStates((prev) => {
      const clickedTrack = prev.find((t) => t.id === id);
      const isPlaying = clickedTrack?.isPlaying;

      return prev.map((t) => {
        const audio =
          t.version === "before" ? t.beforeRef : t.afterRef;

        if (t.id === id) {
          if (isPlaying) {
            audio?.pause();
            return { ...t, isPlaying: false };
          } else {
            prev.forEach((other) => {
              if (other.id !== id) {
                other.beforeRef?.pause();
                other.afterRef?.pause();
              }
            });
            if (audio) {
              audio.currentTime = audio.currentTime || 0;
              audio.play();
            }
            return { ...t, isPlaying: true };
          }
        }
        return { ...t, isPlaying: false };
      });
    });
  };

  // ✅ Fixed seek logic
  const handleSeek = (trackId, e) => {
    const track = trackStates.find((t) => t.id === trackId);
    if (!track) return;

    const audio =
      track.version === "before"
        ? track.beforeRef
        : track.afterRef;
    if (!audio) return;

    const progressBar = e.currentTarget;
    if (!progressBar) return;

    const rect = progressBar.getBoundingClientRect();
    if (!rect?.width) return;

    const clickX = e.clientX - rect.left;
    const seekRatio = Math.min(Math.max(clickX / rect.width, 0), 1);
    const seekTime = seekRatio * (audio.duration || 0);

    if (!isNaN(seekTime)) {
      audio.currentTime = seekTime;
    }

    setTrackStates((prev) =>
      prev.map((t) =>
        t.id === trackId ? { ...t, progress: seekRatio * 100 } : t
      )
    );
  };

  // Track progress
  useEffect(() => {
    const cleanups = trackStates.map((track) => {
      const audio =
        track.version === "before" ? track.beforeRef : track.afterRef;
      if (!audio) return null;

      const updateProgress = () => {
        setTrackStates((prev) =>
          prev.map((t) =>
            t.id === track.id
              ? {
                  ...t,
                  progress:
                    audio.duration > 0
                      ? (audio.currentTime / audio.duration) * 100
                      : 0,
                }
              : t
          )
        );
      };

      const handleEnd = () =>
        setTrackStates((prev) =>
          prev.map((t) =>
            t.id === track.id
              ? { ...t, isPlaying: false, progress: 0 }
              : t
          )
        );

      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", handleEnd);

      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnd);
      };
    });

    return () => cleanups.forEach((fn) => fn && fn());
  }, [trackStates]);

  return {
    trackStates,
    setTrackStates,
    handlePlayPause,
    handleToggleVersion,
    handleSeek,
    stopAllExcept,
  };
}
