export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-58px)] overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/hero/hero-video.webm" type="video/webm" />
      </video>
    </section>
  );
}
