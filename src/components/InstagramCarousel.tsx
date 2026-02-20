import { useRef, useCallback, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import sunflowerImg from "@/assets/sunflower-micro.jpg";

const SLIDE_SIZE = 1080;

interface SlideData {
  id: number;
  title: string;
  render: () => JSX.Element;
}

/* ─── Nutrient comparison data (Sunflower microgreens specific) ─── */
const comparisons = {
  rucula: {
    name: "Rúcula",
    emoji: "🥬",
    nutrients: [
      { label: "Vitamina E", micro: "9.7×", microVal: "2.9mg", otherVal: "0.3mg", icon: "✨" },
      { label: "Proteínas", micro: "2.5×", microVal: "4.0g", otherVal: "1.6g", icon: "💪" },
      { label: "Zinco", micro: "2.3×", microVal: "0.9mg", otherVal: "0.4mg", icon: "🛡️" },
    ],
  },
  alface: {
    name: "Alface",
    emoji: "🥗",
    nutrients: [
      { label: "Vitamina E", micro: "9.7×", microVal: "2.9mg", otherVal: "0.3mg", icon: "✨" },
      { label: "Proteínas", micro: "2.8×", microVal: "4.0g", otherVal: "1.4g", icon: "💪" },
      { label: "Vitamina C", micro: "2.4×", microVal: "22mg", otherVal: "9mg", icon: "🍊" },
    ],
  },
  espinafre: {
    name: "Espinafre",
    emoji: "🌿",
    nutrients: [
      { label: "Vitamina E", micro: "1.5×", microVal: "2.9mg", otherVal: "2.0mg", icon: "✨" },
      { label: "Zinco", micro: "1.7×", microVal: "0.9mg", otherVal: "0.5mg", icon: "🛡️" },
      { label: "Folato", micro: "1.3×", microVal: "80µg", otherVal: "58µg", icon: "🧬" },
    ],
  },
};

/* ─── Shared slide wrapper with sleeve-style cream background ─── */
function SlideBase({ children, variant = "cream" }: { children: React.ReactNode; variant?: "cream" | "dark" }) {
  if (variant === "dark") {
    return (
      <div className="flex flex-col h-full w-full relative overflow-hidden" style={{ background: "hsl(142,52%,16%)" }}>
        {/* Diagonal stripe texture like sleeve */}
        <div className="absolute inset-0" style={{
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, hsl(142,52%,20% / 0.3) 8px, hsl(142,52%,20% / 0.3) 16px)",
        }} />
        <div className="relative z-10 flex flex-col h-full w-full">{children}</div>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full w-full relative overflow-hidden" style={{ background: "hsl(55,60%,95%)" }}>
      {/* Diagonal stripe texture like sleeve */}
      <div className="absolute inset-0" style={{
        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 8px, hsl(42,95%,52% / 0.06) 8px, hsl(42,95%,52% / 0.06) 16px)",
      }} />
      <div className="relative z-10 flex flex-col h-full w-full">{children}</div>
    </div>
  );
}

/* ─── Green header bar (like sleeve top bar) ─── */
function SlideHeader({ showSubtitle = true }: { showSubtitle?: boolean }) {
  return (
    <>
      <div className="px-16 py-8 flex items-center gap-4" style={{ background: "linear-gradient(180deg, hsl(142,52%,16%), hsl(142,45%,28%))" }}>
        <div className="flex flex-col">
          <span className="font-cursive text-[36px]" style={{ color: "hsl(48,100%,78%)" }}>
            Fazenda Princezinha
          </span>
          {showSubtitle && (
            <span className="font-body uppercase tracking-[0.18em] text-[18px] mt-1" style={{ color: "hsl(42,95%,52% / 0.8)" }}>
              microverdes de girassol
            </span>
          )}
        </div>
      </div>
      {/* Gold accent line like sleeve */}
      <div className="h-[4px]" style={{ background: "linear-gradient(135deg, hsl(42,95%,52%), hsl(38,80%,42%))" }} />
    </>
  );
}

/* ─── Slide components ─── */

function SlideCapa() {
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      {/* Full bleed sunflower image like sleeve ArtPanel */}
      <img
        src={sunflowerImg}
        alt="Microverdes de girassol"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Light overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, hsl(55,60%,95% / 0.75) 0%, hsl(55,60%,95% / 0.85) 50%, hsl(55,60%,95% / 0.92) 100%)",
        }}
      />
      {/* Content */}
      <div className="absolute top-0 left-0 right-0 pt-12 px-16 text-center z-10">
        <p className="font-cursive text-[52px]" style={{ color: "hsl(142,52%,18%)", textShadow: "0 1px 4px hsl(55,60%,95% / 0.5)" }}>
          Fazenda Princezinha
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 pb-16 px-16 text-center z-10">
        <div className="mx-auto mb-6 rounded-full" style={{ width: "280px", height: "3px", background: "linear-gradient(135deg, hsl(42,95%,52%), hsl(38,80%,42%))" }} />
        <h1 className="font-cursive text-[64px] leading-none mb-3" style={{ color: "hsl(142,52%,18%)", textShadow: "0 1px 4px hsl(55,60%,95% / 0.5)" }}>
          microverdes de girassol
        </h1>
        <div className="mx-auto mb-6 rounded-full" style={{ width: "280px", height: "3px", background: "linear-gradient(135deg, hsl(42,95%,52%), hsl(38,80%,42%))" }} />
        <p className="font-body text-[32px] leading-relaxed max-w-[750px] mx-auto" style={{ color: "hsl(140,30%,16%)" }}>
          O superalimento que entrega <span style={{ color: "hsl(42,95%,42%)" }}>até 40× mais nutrientes</span> que as verduras tradicionais
        </p>
        <p className="font-body uppercase tracking-[0.22em] text-[20px] mt-8" style={{ color: "hsl(38,80%,38%)" }}>
          sem agrotóxicos
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="text-[24px]" style={{ color: "hsl(140,20%,35%)" }}>Deslize para saber mais →</span>
        </div>
      </div>
    </div>
  );
}

function SlideOQueSao() {
  return (
    <SlideBase variant="cream">
      <SlideHeader />
      <div className="flex-1 flex flex-col px-16 py-12">
        <h2 className="font-body font-semibold text-[52px] leading-tight mb-10" style={{ color: "hsl(142,52%,18%)" }}>
          O que são Microverdes<br />de Girassol? 🌻
        </h2>
        <div className="flex-1 flex flex-col justify-center gap-8">
          {[
            { emoji: "🌱", text: "Plantas de girassol colhidas entre 7 a 14 dias após a germinação" },
            { emoji: "🔬", text: "Concentram até 40× mais nutrientes que a planta adulta" },
            { emoji: "🥜", text: "Sabor suave e adocicado, lembra castanha fresca" },
            { emoji: "🌍", text: "Cultivo sustentável, sem agrotóxicos, direto da Fazenda Princezinha" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-5">
              <span className="text-[42px] shrink-0">{item.emoji}</span>
              <p className="font-body text-[28px] leading-snug" style={{ color: "hsl(140,30%,16%)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideBase>
  );
}

function SlideComparison({ vegKey }: { vegKey: keyof typeof comparisons }) {
  const veg = comparisons[vegKey];
  return (
    <SlideBase variant="cream">
      <SlideHeader />
      <div className="flex-1 flex flex-col px-16 py-10">
        <h2 className="font-body font-semibold text-[46px] leading-tight mb-2" style={{ color: "hsl(142,52%,18%)" }}>
          Microverde de Girassol 🌻 vs {veg.name} {veg.emoji}
        </h2>
        <p className="font-body text-[22px] mb-8" style={{ color: "hsl(140,20%,42%)" }}>
          Comparação por porção de 100g
        </p>

        <div className="flex-1 flex flex-col justify-center gap-7">
          {veg.nutrients.map((n, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 flex items-center gap-6"
              style={{ background: "hsl(0,0%,100%)", boxShadow: "0 4px 20px hsl(142,52%,12% / 0.08)", border: "1px solid hsl(140,20%,82%)" }}
            >
              <span className="text-[48px] shrink-0">{n.icon}</span>
              <div className="flex-1">
                <p className="font-body font-medium text-[28px]" style={{ color: "hsl(142,52%,18%)" }}>
                  {n.label}
                </p>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="font-body font-semibold text-[38px]" style={{ color: "hsl(42,95%,42%)" }}>
                    {n.micro}
                  </span>
                  <span className="font-body text-[20px]" style={{ color: "hsl(140,20%,42%)" }}>
                    ({n.microVal} vs {n.otherVal})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm" style={{ background: "linear-gradient(135deg, hsl(42,95%,52%), hsl(38,80%,42%))" }} />
            <span className="font-body font-semibold text-[18px]" style={{ color: "hsl(142,52%,18%)" }}>Microverde de Girassol</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-3 rounded-sm" style={{ background: "hsl(140,20%,70%)" }} />
            <span className="font-body text-[18px]" style={{ color: "hsl(140,20%,42%)" }}>{veg.name}</span>
          </div>
        </div>
      </div>
    </SlideBase>
  );
}

function SlideResumo() {
  return (
    <SlideBase variant="cream">
      <SlideHeader />
      <div className="flex-1 flex flex-col px-16 py-10">
        <h2 className="font-body font-semibold text-[44px] leading-tight mb-8" style={{ color: "hsl(142,52%,18%)" }}>
          Por que escolher Microverdes de Girassol? 🌻
        </h2>
        <div className="flex-1 grid grid-cols-2 gap-6">
          {[
            { icon: "💪", title: "Mais nutritivos", desc: "Até 40× mais vitaminas e minerais que verduras comuns" },
            { icon: "🌿", title: "100% natural", desc: "Sem agrotóxicos, cultivados na Fazenda Princezinha" },
            { icon: "🥜", title: "Sabor único", desc: "Suave e adocicado, lembra castanha fresca" },
            { icon: "🌎", title: "Sustentáveis", desc: "Menos água, menos terra, colheita em 7-14 dias" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 flex flex-col items-center text-center"
              style={{ background: "hsl(0,0%,100%)", boxShadow: "0 4px 20px hsl(142,52%,12% / 0.08)", border: "1px solid hsl(140,20%,82%)" }}
            >
              <span className="text-[52px] mb-4">{item.icon}</span>
              <p className="font-body font-semibold text-[26px] mb-2" style={{ color: "hsl(142,52%,18%)" }}>
                {item.title}
              </p>
              <p className="font-body text-[20px]" style={{ color: "hsl(140,20%,40%)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideBase>
  );
}

function SlideCTA() {
  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden">
      {/* Sunflower bg image */}
      <img
        src={sunflowerImg}
        alt="Microverdes de girassol"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, hsl(142,52%,12% / 0.6) 0%, hsl(142,52%,10% / 0.88) 50%, hsl(142,52%,10% / 0.95) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-16 text-center">
        <p className="font-cursive text-[52px] mb-6" style={{ color: "hsl(48,100%,78%)", textShadow: "0 2px 8px hsl(142,52%,6% / 0.5)" }}>
          Fazenda Princezinha
        </p>
        <div className="mx-auto mb-10 rounded-full" style={{ width: "280px", height: "3px", background: "linear-gradient(135deg, hsl(42,95%,52%), hsl(38,80%,42%))" }} />

        <h2 className="font-body font-semibold text-[52px] leading-tight mb-6" style={{ color: "hsl(60,20%,97%)" }}>
          Experimente nossos<br />Microverdes de Girassol! 🌻
        </h2>
        <p className="font-body text-[28px] mb-10 max-w-[700px]" style={{ color: "hsl(142,38%,78%)" }}>
          Direto da nossa fazenda para a sua mesa, com todo o cuidado e frescor que você merece.
        </p>

        <div
          className="rounded-2xl px-12 py-6 mb-8"
          style={{ background: "linear-gradient(135deg, hsl(42,95%,52%), hsl(38,80%,42%))" }}
        >
          <p className="font-body font-semibold text-[30px]" style={{ color: "hsl(142,52%,14%)" }}>
            📩 Peça pelo nosso Instagram
          </p>
        </div>

        <p className="font-body text-[24px]" style={{ color: "hsl(142,38%,70%)" }}>
          @fazendaprincezinha
        </p>
        <p className="font-body uppercase tracking-[0.22em] text-[16px] mt-6" style={{ color: "hsl(42,95%,52%)" }}>
          sem agrotóxicos · cultivado com amor 🌱
        </p>
      </div>
    </div>
  );
}

/* ─── Main carousel component ─── */

export default function InstagramCarousel() {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [downloading, setDownloading] = useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = useState(600);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setViewportWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const slides: SlideData[] = [
    { id: 1, title: "Capa", render: () => <SlideCapa /> },
    { id: 2, title: "O que são?", render: () => <SlideOQueSao /> },
    { id: 3, title: "vs Rúcula", render: () => <SlideComparison vegKey="rucula" /> },
    { id: 4, title: "vs Alface", render: () => <SlideComparison vegKey="alface" /> },
    { id: 5, title: "vs Espinafre", render: () => <SlideComparison vegKey="espinafre" /> },
    { id: 6, title: "Resumo", render: () => <SlideResumo /> },
    { id: 7, title: "CTA", render: () => <SlideCTA /> },
  ];

  const downloadSlide = useCallback(async (index: number) => {
    const el = slideRefs.current[index];
    if (!el) return;
    setDownloading(index);
    try {
      const canvas = await html2canvas(el, {
        width: SLIDE_SIZE,
        height: SLIDE_SIZE,
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `slide-${index + 1}-${slides[index].title.replace(/\s/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setDownloading(null);
    }
  }, [slides]);

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: "hsl(140,20%,96%)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-cursive text-3xl mb-1" style={{ color: "hsl(142,52%,22%)" }}>
            Fazenda Princezinha
          </h1>
          <p className="font-body text-sm" style={{ color: "hsl(140,20%,42%)" }}>
            Carrossel Instagram · {slides.length} slides · Microverdes de Girassol
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: i === currentSlide ? "hsl(42,95%,52%)" : "hsl(140,20%,80%)",
                  transform: i === currentSlide ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Slide title + download */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-body text-sm font-medium" style={{ color: "hsl(140,30%,16%)" }}>
            Slide {currentSlide + 1}: {slides[currentSlide].title}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => downloadSlide(currentSlide)}
            disabled={downloading === currentSlide}
          >
            <Download className="h-3.5 w-3.5" />
            {downloading === currentSlide ? "Baixando..." : "Baixar PNG"}
          </Button>
        </div>

        {/* Slide viewport */}
        <div ref={viewportRef} className="relative w-full" style={{ paddingBottom: "100%" }}>
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-pkg">
            {slides.map((slide, i) => (
              <div
                key={slide.id}
                ref={(el) => { slideRefs.current[i] = el; }}
                className="absolute top-0 left-0 transition-opacity duration-300"
                style={{
                  width: `${SLIDE_SIZE}px`,
                  height: `${SLIDE_SIZE}px`,
                  transform: `scale(${viewportWidth / SLIDE_SIZE})`,
                  transformOrigin: "top left",
                  opacity: i === currentSlide ? 1 : 0,
                  pointerEvents: i === currentSlide ? "auto" : "none",
                }}
              >
                {slide.render()}
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(i)}
              className="shrink-0 rounded-lg overflow-hidden transition-all"
              style={{
                width: 80,
                height: 80,
                border: i === currentSlide ? "2px solid hsl(42,95%,52%)" : "2px solid transparent",
                opacity: i === currentSlide ? 1 : 0.6,
              }}
            >
              <div
                style={{
                  width: `${SLIDE_SIZE}px`,
                  height: `${SLIDE_SIZE}px`,
                  transform: `scale(${80 / SLIDE_SIZE})`,
                  transformOrigin: "top left",
                }}
              >
                {slide.render()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
