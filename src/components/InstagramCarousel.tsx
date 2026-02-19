import { useRef, useCallback, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDE_SIZE = 1080;

interface SlideData {
  id: number;
  title: string;
  render: () => JSX.Element;
}

/* ─── Nutrient comparison data ─── */
const comparisons = {
  rucula: {
    name: "Rúcula",
    emoji: "🥬",
    nutrients: [
      { label: "Vitamina C", micro: "40x mais", icon: "🍊" },
      { label: "Vitamina E", micro: "10x mais", icon: "✨" },
      { label: "Betacaroteno", micro: "8x mais", icon: "🥕" },
    ],
  },
  alface: {
    name: "Alface",
    emoji: "🥗",
    nutrients: [
      { label: "Vitamina C", micro: "50x mais", icon: "🍊" },
      { label: "Vitamina K", micro: "20x mais", icon: "💚" },
      { label: "Antioxidantes", micro: "6x mais", icon: "🛡️" },
    ],
  },
  espinafre: {
    name: "Espinafre",
    emoji: "🌿",
    nutrients: [
      { label: "Vitamina C", micro: "5x mais", icon: "🍊" },
      { label: "Vitamina E", micro: "12x mais", icon: "✨" },
      { label: "Polifenóis", micro: "4x mais", icon: "💎" },
    ],
  },
};

/* ─── Slide components ─── */

function SlideCapa() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full p-16 text-center"
      style={{ background: "linear-gradient(180deg, hsl(142,52%,14%) 0%, hsl(142,52%,22%) 60%, hsl(142,45%,30%) 100%)" }}
    >
      <p className="font-cursive text-[52px] mb-4" style={{ color: "hsl(48,100%,78%)" }}>
        Fazenda Princezinha
      </p>
      <div className="w-24 h-1 rounded-full mb-10" style={{ background: "hsl(42,95%,52%)" }} />
      <h1 className="font-body font-semibold text-[72px] leading-tight mb-6" style={{ color: "hsl(60,20%,97%)" }}>
        Microverdes
      </h1>
      <p className="font-body text-[36px] leading-relaxed max-w-[700px]" style={{ color: "hsl(142,38%,78%)" }}>
        O superalimento que entrega <span style={{ color: "hsl(42,95%,52%)" }}>até 50x mais nutrientes</span> que as verduras tradicionais
      </p>
      <div className="mt-12 flex items-center gap-3">
        <span className="text-[28px]" style={{ color: "hsl(142,38%,78%)" }}>Deslize para saber mais →</span>
      </div>
    </div>
  );
}

function SlideOQueSao() {
  return (
    <div
      className="flex flex-col h-full w-full p-16"
      style={{ background: "hsl(55,60%,95%)" }}
    >
      <p className="font-cursive text-[32px] mb-2" style={{ color: "hsl(142,52%,22%)" }}>
        Fazenda Princezinha
      </p>
      <div className="w-16 h-1 rounded-full mb-10" style={{ background: "hsl(42,95%,52%)" }} />
      <h2 className="font-body font-semibold text-[56px] leading-tight mb-8" style={{ color: "hsl(142,52%,18%)" }}>
        O que são<br />Microverdes?
      </h2>
      <div className="flex-1 flex flex-col justify-center gap-8">
        {[
          { emoji: "🌱", text: "Plantas colhidas entre 7 a 14 dias após a germinação" },
          { emoji: "🔬", text: "Concentram até 40x mais nutrientes que a planta adulta" },
          { emoji: "🍽️", text: "Sabor intenso e textura delicada" },
          { emoji: "🌍", text: "Cultivo sustentável, sem agrotóxicos" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-5">
            <span className="text-[42px] shrink-0">{item.emoji}</span>
            <p className="font-body text-[30px] leading-snug" style={{ color: "hsl(140,30%,16%)" }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideComparison({ vegKey }: { vegKey: keyof typeof comparisons }) {
  const veg = comparisons[vegKey];
  return (
    <div
      className="flex flex-col h-full w-full p-16"
      style={{ background: "linear-gradient(180deg, hsl(142,52%,14%) 0%, hsl(142,52%,22%) 100%)" }}
    >
      <p className="font-cursive text-[32px] mb-2" style={{ color: "hsl(48,100%,78%)" }}>
        Fazenda Princezinha
      </p>
      <div className="w-16 h-1 rounded-full mb-8" style={{ background: "hsl(42,95%,52%)" }} />

      <h2 className="font-body font-semibold text-[48px] leading-tight mb-2" style={{ color: "hsl(60,20%,97%)" }}>
        Microverdes vs {veg.name} {veg.emoji}
      </h2>
      <p className="font-body text-[26px] mb-10" style={{ color: "hsl(142,38%,70%)" }}>
        Comparação por porção de 100g
      </p>

      <div className="flex-1 flex flex-col justify-center gap-8">
        {veg.nutrients.map((n, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 flex items-center gap-6"
            style={{ background: "hsl(142,52%,18% / 0.6)", border: "1px solid hsl(142,45%,32%)" }}
          >
            <span className="text-[48px] shrink-0">{n.icon}</span>
            <div className="flex-1">
              <p className="font-body font-medium text-[30px]" style={{ color: "hsl(60,20%,97%)" }}>
                {n.label}
              </p>
              <p className="font-body font-semibold text-[40px] mt-1" style={{ color: "hsl(42,95%,52%)" }}>
                {n.micro}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="font-body text-[22px] mt-6 text-center" style={{ color: "hsl(142,38%,60%)" }}>
        *Fonte: Journal of Agricultural and Food Chemistry
      </p>
    </div>
  );
}

function SlideResumo() {
  return (
    <div
      className="flex flex-col h-full w-full p-16"
      style={{ background: "hsl(55,60%,95%)" }}
    >
      <p className="font-cursive text-[32px] mb-2" style={{ color: "hsl(142,52%,22%)" }}>
        Fazenda Princezinha
      </p>
      <div className="w-16 h-1 rounded-full mb-8" style={{ background: "hsl(42,95%,52%)" }} />
      <h2 className="font-body font-semibold text-[48px] leading-tight mb-10" style={{ color: "hsl(142,52%,18%)" }}>
        Resumo: por que escolher Microverdes? 🌱
      </h2>
      <div className="flex-1 grid grid-cols-2 gap-6">
        {[
          { icon: "💪", title: "Mais nutritivos", desc: "Até 50x mais vitaminas e minerais" },
          { icon: "🌿", title: "100% natural", desc: "Sem agrotóxicos, sem aditivos" },
          { icon: "⚡", title: "Sabor intenso", desc: "Transformam qualquer prato" },
          { icon: "🌎", title: "Sustentáveis", desc: "Menos água, menos terra, menos tempo" },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-2xl p-8 flex flex-col items-center text-center"
            style={{ background: "hsl(0,0%,100%)", boxShadow: "0 4px 20px hsl(142,52%,12% / 0.08)" }}
          >
            <span className="text-[52px] mb-4">{item.icon}</span>
            <p className="font-body font-semibold text-[28px] mb-2" style={{ color: "hsl(142,52%,18%)" }}>
              {item.title}
            </p>
            <p className="font-body text-[22px]" style={{ color: "hsl(140,20%,40%)" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideCTA() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full w-full p-16 text-center"
      style={{ background: "linear-gradient(180deg, hsl(142,52%,14%) 0%, hsl(142,52%,22%) 60%, hsl(142,45%,30%) 100%)" }}
    >
      <p className="font-cursive text-[52px] mb-6" style={{ color: "hsl(48,100%,78%)" }}>
        Fazenda Princezinha
      </p>
      <div className="w-24 h-1 rounded-full mb-12" style={{ background: "hsl(42,95%,52%)" }} />

      <h2 className="font-body font-semibold text-[56px] leading-tight mb-6" style={{ color: "hsl(60,20%,97%)" }}>
        Experimente nossos<br />Microverdes! 🌱
      </h2>
      <p className="font-body text-[30px] mb-10 max-w-[700px]" style={{ color: "hsl(142,38%,78%)" }}>
        Direto da nossa fazenda para a sua mesa, com todo o cuidado e frescor que você merece.
      </p>

      <div
        className="rounded-2xl px-12 py-6 mb-8"
        style={{ background: "hsl(42,95%,52%)" }}
      >
        <p className="font-body font-semibold text-[32px]" style={{ color: "hsl(142,52%,14%)" }}>
          📩 Peça pelo nosso Instagram
        </p>
      </div>

      <p className="font-body text-[26px]" style={{ color: "hsl(142,38%,70%)" }}>
        @fazendaprincezinha
      </p>
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
            Carrossel Instagram · {slides.length} slides
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
