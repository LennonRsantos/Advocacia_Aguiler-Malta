// Adaptado do Shine Border (Magic UI, MIT). Sobrepõe a borda de 1px do pai e herda o raio dele.
export function ShineBorder({ color }: { color: string }) {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(transparent, transparent, ${color}, transparent, transparent)`,
        backgroundSize: "300% 300%",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
      className="pointer-events-none absolute -inset-px rounded-[inherit] p-px will-change-[background-position] motion-safe:animate-shine"
    />
  );
}
