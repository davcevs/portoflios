import { memo } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

const MusicWidget = memo(() => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-black/50 backdrop-blur-md rounded-lg p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Music className="h-4 w-4" />
        <span className="text-sm">Now Playing</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">
          <Music className="h-6 w-6" />
        </div>
        <div>
          <h4 className="text-sm font-medium">Lofi Hip Hop Radio</h4>
          <p className="text-xs text-white/60">Beats to Relax/Study To</p>
        </div>
      </div>
      {/* YouTube Embed */}
      <div className="mt-4">
        <iframe
          width="100%"
          height="80"
          src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1"
          title="lofi hip hop radio 📚 beats to relax/study to"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </motion.div>
  );
});

export default MusicWidget;
