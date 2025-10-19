import { useRef, useState, useEffect } from "react";

export default function useAudioABTest(tracks) {
  const beforeRef = useRef(null);
  const afterRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const [currentVersion, setCurrentVersion] = useState("before");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const getActiveAudio = () =>
    currentVersion === "before" ? beforeRef.current : afterRef.current;

  // 🔄 Handle A/B toggle — keep same position, do NOT reset
  const handleToggle = (_, newValue) => {
    if (!newValue) return;

    const currentAudio = getActiveAudio();
    const nextAudio =
      newValue === "before" ? beforeRef.current : afterRef.current;

    if (currentAudio && nextAudio) {
      // 👇 carry over currentTime for true A/B comparison
      nextAudio.currentTime = currentAudio.currentTime;

      // if currently playing, switch seamlessly
      if (isPlaying) {
        currentAudio.pause();
        nextAudio.play();
      }
    }

    setCurrentVersion(newValue);
  };

  // ▶️ / ⏸️ Play or pause
  const handlePlayPause = () => {
    const activeAudio = getActiveAudio();
    if (!activeAudio) return;

    if (isPlaying) {
      activeAudio.pause();
      setIsPlaying(false);
    } else {
      activeAudio.play();
      setIsPlaying(true);
    }
  };

  // ⏩ Seek in progress bar
  const handleSeek = (e) => {
    const activeAudio = getActiveAudio();
    if (!activeAudio || !activeAudio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * activeAudio.duration;

    activeAudio.currentTime = newTime;
    setProgress((newTime / activeAudio.duration) * 100);
  };

  // 🎵 Handle track change — fully reset playback
  const handleTrackChange = (track) => {
    // Pause both before switching
    beforeRef.current?.pause();
    afterRef.current?.pause();

    // Reset playback positions
    if (beforeRef.current) beforeRef.current.currentTime = 0;
    if (afterRef.current) afterRef.current.currentTime = 0;

    // Update state
    setCurrentTrack(track);
    setCurrentVersion("before");
    setIsPlaying(false);
    setProgress(0);
  };

  // Track playback progress
  useEffect(() => {
    const activeAudio = getActiveAudio();
    if (!activeAudio) return;

    const updateProgress = () => {
      if (activeAudio.duration) {
        setProgress((activeAudio.currentTime / activeAudio.duration) * 100);
      }
    };

    const handleEnd = () => setIsPlaying(false);

    activeAudio.addEventListener("timeupdate", updateProgress);
    activeAudio.addEventListener("ended", handleEnd);

    return () => {
      activeAudio.removeEventListener("timeupdate", updateProgress);
      activeAudio.removeEventListener("ended", handleEnd);
    };
  }, [currentVersion, currentTrack]);

  return {
    beforeRef,
    afterRef,
    currentTrack,
    currentVersion,
    isPlaying,
    progress,
    handleToggle,
    handlePlayPause,
    handleSeek,
    handleTrackChange,
  };
}
