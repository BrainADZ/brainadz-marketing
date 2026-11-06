export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black text-white lg:h-[calc(100vh-58px)]">
      <video
        className="block h-auto w-full lg:absolute lg:inset-0 lg:h-full lg:object-cover"
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
