import { useRef, useState, useEffect } from "react";

export default function useAudioABTest(beforeSrc, afterSrc) {
  const beforeRef = useRef(null);
  const afterRef = useRef(null);

  const [current, setCurrent] = useState("before");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const getActiveAudio = () =>
    current === "before" ? beforeRef.current : afterRef.current;

  const handleToggle = (_, newValue) => {
    if (!newValue) return;
    const currentAudio = getActiveAudio();
    const nextAudio =
      newValue === "before" ? beforeRef.current : afterRef.current;

    if (currentAudio && nextAudio) {
      nextAudio.currentTime = currentAudio.currentTime;
      if (isPlaying) {
        nextAudio.play();
        currentAudio.pause();
      }
    }

    setCurrent(newValue);
  };

  const handlePlayPause = () => {
    const activeAudio = getActiveAudio();
    if (!activeAudio) return;

    if (isPlaying) {
      activeAudio.pause();
    } else {
      activeAudio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const activeAudio = getActiveAudio();
    if (!activeAudio || !activeAudio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * activeAudio.duration;
    activeAudio.currentTime = newTime;
    setProgress((newTime / activeAudio.duration) * 100);
  };

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
  }, [current]);

  return {
    beforeRef,
    afterRef,
    current,
    isPlaying,
    progress,
    handleToggle,
    handlePlayPause,
    handleSeek,
  };
}
