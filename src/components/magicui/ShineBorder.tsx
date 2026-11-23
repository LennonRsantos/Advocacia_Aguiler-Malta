// Adaptado do Shine Border (Magic UI, MIT). Sobrepõe a borda de 1px do pai e herda o raio dele.
// O gradiente fica num filho 3x maior que se move por transform (composto), em vez de animar background-position.
export function ShineBorder({ color }: { color: string }) {
  return (
    <div
      style={{
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
      className="pointer-events-none absolute -inset-px overflow-hidden rounded-[inherit] p-px"
    >
      <div
        style={{ backgroundImage: `radial-gradient(transparent, transparent, ${color}, transparent, transparent)` }}
        className="absolute left-0 top-0 size-[300%] motion-safe:animate-shine"
      />
    </div>
  );
}
