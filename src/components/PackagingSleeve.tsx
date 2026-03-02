import { useCallback, useRef, useState } from "react";
import html2canvas from "html2canvas";
import sunflowerImg from "@/assets/sunflower-micro.jpg";
import { Download } from "lucide-react";

const nutritionTable = [
  { nutrient: "Valor Energético", unit: "kcal", per100: 27, dv: "1%" },
  { nutrient: "Carboidratos", unit: "g", per100: 2.4, dv: "1%" },
  { nutrient: "Proteínas", unit: "g", per100: 4.0, dv: "5%" },
  { nutrient: "Gorduras Totais", unit: "g", per100: 0.8, dv: "1%" },
  { nutrient: "Fibras", unit: "g", per100: 2.1, dv: "8%" },
  { nutrient: "Vitamina E", unit: "mg", per100: 2.9, dv: "19%" },
  { nutrient: "Vitamina C", unit: "mg", per100: 22, dv: "24%" },
  { nutrient: "Ferro", unit: "mg", per100: 1.8, dv: "13%" },
  { nutrient: "Zinco", unit: "mg", per100: 0.9, dv: "9%" },
  { nutrient: "Folato", unit: "µg", per100: 80, dv: "20%" },
];

const comparisonData = [
  { label: "Proteínas", sunflower: 4.0, lettuce: 1.4, unit: "g" },
  { label: "Vitamina E", sunflower: 2.9, lettuce: 0.3, unit: "mg" },
  { label: "Vitamina C", sunflower: 22, lettuce: 9, unit: "mg" },
  { label: "Ferro", sunflower: 1.8, lettuce: 0.9, unit: "mg" },
  { label: "Folato", sunflower: 80, lettuce: 38, unit: "µg" },
  { label: "Zinco", sunflower: 0.9, lettuce: 0.2, unit: "mg" },
];

/* ── Dimensões físicas (vertical: 9cm larg × 33cm alt + sangria 3mm) ──────── */
const CANVAS_W_MM = 96;   // 90mm + 6mm sangria
const CANVAS_H_MM = 336;  // 330mm + 6mm sangria
const BLEED = 3;           // mm cada lado
const PANEL_W_MM = 90;    // largura útil

const ART_H_MM = 130;
const SIDE_H_MM = 35;
const NUTRI_H_MM = 130;

const ART_Y = BLEED;
const SIDE1_Y = ART_Y + ART_H_MM;
const NUTRI_Y = SIDE1_Y + SIDE_H_MM;
const SIDE2_Y = NUTRI_Y + NUTRI_H_MM;
const PX = BLEED; // panel X offset

const DPI = 300;
const pxFromMm = (mm: number) => Math.round((mm / 25.4) * DPI);

/* ── Sub-components (absolute, mm units) ──────────────────────────────────── */

function NutriRow({ nutrient, unit, per100, dv, topMm, last }: {
  nutrient: string; unit: string; per100: number; dv: string; topMm: number; last?: boolean;
}) {
  return (
    <div style={{
      position: "absolute", left: "3mm", top: `${topMm}mm`, width: "84mm", height: "5mm",
      borderBottom: last ? "none" : "0.2mm solid hsl(var(--green-deep) / 0.15)",
    }}>
      <span className="font-body" style={{ position: "absolute", left: 0, top: "1mm", fontSize: "8px", color: "hsl(var(--green-deep))" }}>
        {nutrient}
      </span>
      <span className="font-body" style={{ position: "absolute", left: "52mm", top: "1mm", fontSize: "8px", fontWeight: 600, color: "hsl(var(--green-deep))" }}>
        {per100} {unit}
      </span>
      <span className="font-body" style={{ position: "absolute", right: 0, top: "1mm", fontSize: "7px", color: "hsl(var(--muted-foreground))", width: "10mm", textAlign: "right" }}>
        {dv}
      </span>
    </div>
  );
}

function CompBar({ label, sunflower, lettuce, unit, topMm }: {
  label: string; sunflower: number; lettuce: number; unit: string; topMm: number;
}) {
  const trackW = 48;
  const mx = Math.max(sunflower, lettuce) * 1.15;
  const sfW = Number(((sunflower / mx) * trackW).toFixed(2));
  const ltW = Number(((lettuce / mx) * trackW).toFixed(2));
  const ratio = Math.round((sunflower / lettuce) * 10) / 10;

  return (
    <div style={{ position: "absolute", left: "3mm", top: `${topMm}mm`, width: "84mm", height: "10mm" }}>
      <span className="font-body" style={{ position: "absolute", left: 0, top: 0, fontSize: "7px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", color: "hsl(var(--green-deep))" }}>
        {label}
      </span>
      <span className="font-body" style={{ position: "absolute", right: 0, top: 0, fontSize: "7px", fontWeight: 700, color: "hsl(var(--gold-dark))" }}>
        {ratio}×
      </span>
      {/* Sunflower bar */}
      <div style={{ position: "absolute", left: 0, top: "3.6mm", width: `${trackW}mm`, height: "2mm", borderRadius: "999px", background: "hsl(var(--cream-dark))", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: `${sfW}mm`, height: "2mm", borderRadius: "999px", background: "var(--pkg-gold-gradient)" }} />
      </div>
      <span className="font-body" style={{ position: "absolute", left: `${trackW + 2}mm`, top: "3mm", fontSize: "6px", color: "hsl(var(--green-deep))" }}>
        {sunflower}{unit}
      </span>
      {/* Lettuce bar */}
      <div style={{ position: "absolute", left: 0, top: "6.8mm", width: `${trackW}mm`, height: "2mm", borderRadius: "999px", background: "hsl(var(--cream-dark))", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: `${ltW}mm`, height: "2mm", borderRadius: "999px", background: "hsl(var(--muted-foreground) / 0.45)" }} />
      </div>
      <span className="font-body" style={{ position: "absolute", left: `${trackW + 2}mm`, top: "6mm", fontSize: "6px", color: "hsl(var(--muted-foreground))" }}>
        {lettuce}{unit}
      </span>
    </div>
  );
}

/* ── Painéis ──────────────────────────────────────────────────────────────── */

function ArtPanel() {
  return (
    <div style={{ position: "absolute", left: `${PX}mm`, top: `${ART_Y}mm`, width: `${PANEL_W_MM}mm`, height: `${ART_H_MM}mm`, overflow: "hidden" }}>
      <img src={sunflowerImg} alt="Microverdes de girassol"
        style={{ position: "absolute", left: 0, top: 0, width: `${PANEL_W_MM}mm`, height: `${ART_H_MM}mm`, objectFit: "cover" }} />
      <div style={{
        position: "absolute", left: 0, top: 0, width: `${PANEL_W_MM}mm`, height: `${ART_H_MM}mm`,
        background: "linear-gradient(180deg, hsl(142 52% 12% / 0.1) 0%, hsl(142 52% 12% / 0.5) 50%, hsl(142 52% 10% / 0.9) 100%)",
      }} />
      <h2 className="font-cursive" style={{
        position: "absolute", left: 0, top: "8mm", width: `${PANEL_W_MM}mm`, textAlign: "center",
        fontSize: "28px", color: "hsl(var(--gold-light))", textShadow: "0 2px 8px hsl(142 52% 6% / 0.7)", margin: 0,
      }}>
        Fazenda Princesinha
      </h2>
      <h1 className="font-cursive" style={{
        position: "absolute", left: 0, top: "100mm", width: `${PANEL_W_MM}mm`, textAlign: "center",
        fontSize: "32px", lineHeight: "1", color: "hsl(var(--gold-light))", textShadow: "0 1px 6px hsl(142 52% 6% / 0.6)", margin: 0,
      }}>
        microverdes de girassol
      </h1>
      <p className="font-body" style={{
        position: "absolute", left: 0, top: "114mm", width: `${PANEL_W_MM}mm`, textAlign: "center",
        fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "hsl(var(--gold))", margin: 0,
      }}>
        sem agrotóxicos
      </p>
      <div style={{
        position: "absolute", left: "22mm", top: "120mm", width: "46mm", height: "5mm",
        borderRadius: "999px", border: "0.3mm solid hsl(var(--gold) / 0.5)", background: "hsl(var(--gold) / 0.12)",
        textAlign: "center",
      }}>
        <span style={{ fontSize: "7px", color: "hsl(var(--gold-light))", lineHeight: "5mm" }}>🌱 Cultivado com amor</span>
      </div>
    </div>
  );
}

function SidePanel({ yMm }: { yMm: number }) {
  return (
    <div style={{ position: "absolute", left: `${PX}mm`, top: `${yMm}mm`, width: `${PANEL_W_MM}mm`, height: `${SIDE_H_MM}mm`, background: "var(--pkg-green-gradient)", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: `${PANEL_W_MM}mm`, height: "0.4mm", background: "hsl(var(--gold) / 0.55)" }} />
      <div style={{ position: "absolute", left: 0, bottom: 0, width: `${PANEL_W_MM}mm`, height: "0.4mm", background: "hsl(var(--gold) / 0.55)" }} />
      <span className="font-cursive" style={{
        position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        fontSize: "16px", color: "hsl(var(--gold-light))", whiteSpace: "nowrap",
      }}>
        microverdes de girassol
      </span>
    </div>
  );
}

function NutritionPanel() {
  return (
    <div style={{ position: "absolute", left: `${PX}mm`, top: `${NUTRI_Y}mm`, width: `${PANEL_W_MM}mm`, height: `${NUTRI_H_MM}mm`, background: "hsl(var(--cream))", overflow: "hidden" }}>
      {/* Header bar */}
      <div style={{ position: "absolute", left: 0, top: 0, width: `${PANEL_W_MM}mm`, height: "10mm", background: "var(--pkg-green-gradient)" }} />
      <div style={{ position: "absolute", left: 0, top: "10mm", width: `${PANEL_W_MM}mm`, height: "0.6mm", background: "var(--pkg-gold-gradient)" }} />
      <span className="font-cursive" style={{ position: "absolute", left: "4mm", top: "2mm", fontSize: "16px", color: "hsl(var(--gold-light))" }}>
        microverdes de girassol
      </span>
      <span className="font-body" style={{ position: "absolute", left: "4mm", top: "7mm", fontSize: "6px", textTransform: "uppercase", letterSpacing: "0.18em", color: "hsl(var(--gold) / 0.85)" }}>
        sem agrotóxicos
      </span>

      {/* LEFT column: Nutrition table */}
      <span className="font-body" style={{ position: "absolute", left: "3mm", top: "13mm", fontSize: "8px", fontWeight: 700, textTransform: "uppercase", color: "hsl(var(--green-deep))", letterSpacing: "0.08em" }}>
        Informação Nutricional
      </span>
      <span className="font-body" style={{ position: "absolute", left: "3mm", top: "17.5mm", fontSize: "7px", color: "hsl(var(--muted-foreground))" }}>
        Porção de 100g
      </span>
      <span className="font-body" style={{ position: "absolute", left: "80mm", top: "17.5mm", width: "7mm", textAlign: "right", fontSize: "6px", color: "hsl(var(--muted-foreground))" }}>
        %VD*
      </span>

      {nutritionTable.map((row, i) => (
        <NutriRow key={row.nutrient} {...row} topMm={21 + i * 5.2} last={i === nutritionTable.length - 1} />
      ))}

      <span className="font-body" style={{ position: "absolute", left: "3mm", top: "74mm", width: "84mm", fontSize: "5.5px", color: "hsl(var(--muted-foreground))" }}>
        *% Valores Diários com base em uma dieta de 2.000 kcal.
      </span>

      {/* Divider */}
      <div style={{ position: "absolute", left: "3mm", top: "78mm", width: "84mm", height: "0.2mm", background: "hsl(var(--green-deep) / 0.16)" }} />

      {/* Comparison section */}
      <span className="font-body" style={{ position: "absolute", left: "3mm", top: "80mm", fontSize: "8px", fontWeight: 700, textTransform: "uppercase", color: "hsl(var(--green-deep))", letterSpacing: "0.08em" }}>
        Comparativo × Alface
      </span>

      {/* Legend */}
      <div style={{ position: "absolute", left: "3mm", top: "85mm", width: "84mm", height: "3mm" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: "4mm", height: "2mm", borderRadius: "1mm", background: "var(--pkg-gold-gradient)" }} />
        <span className="font-body" style={{ position: "absolute", left: "5mm", top: "0.2mm", fontSize: "6px", fontWeight: 600, color: "hsl(var(--green-deep))" }}>Microverdes</span>
        <div style={{ position: "absolute", left: "28mm", top: 0, width: "4mm", height: "2mm", borderRadius: "1mm", background: "hsl(var(--muted-foreground) / 0.4)" }} />
        <span className="font-body" style={{ position: "absolute", left: "33mm", top: "0.2mm", fontSize: "6px", color: "hsl(var(--muted-foreground))" }}>Alface</span>
      </div>

      {comparisonData.map((row, i) => (
        <CompBar key={row.label} {...row} topMm={89 + i * 6.3} />
      ))}

      {/* Bottom strip */}
      <div style={{ position: "absolute", left: 0, top: "122mm", width: `${PANEL_W_MM}mm`, height: "8mm", borderTop: "0.2mm solid hsl(var(--green-deep) / 0.12)", background: "hsl(var(--green-deep) / 0.08)" }} />
      <span className="font-body" style={{ position: "absolute", left: "3mm", top: "124mm", fontSize: "5.5px", color: "hsl(var(--muted-foreground))" }}>
        Conservar entre 2°C e 8°C
      </span>
      <span className="font-body" style={{ position: "absolute", left: "35mm", top: "124mm", fontSize: "5.5px", color: "hsl(var(--muted-foreground))" }}>
        🌱 Produto fresco · até 5 dias
      </span>
      <span className="font-body" style={{ position: "absolute", right: "3mm", top: "124mm", fontSize: "5.5px", color: "hsl(var(--muted-foreground))" }}>
        Val.: Ver embalagem
      </span>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────────── */

export default function PackagingSleeve() {
  const sleeveRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const handleExport = useCallback(async () => {
    if (!sleeveRef.current) return;
    setExporting(true);
    try {
      await document.fonts.ready;
      const el = sleeveRef.current;
      const rect = el.getBoundingClientRect();
      const targetW = pxFromMm(CANVAS_W_MM);
      const targetH = pxFromMm(CANVAS_H_MM);
      const scale = targetH / rect.height;

      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        x: 0, y: 0, scrollX: 0, scrollY: 0,
        windowWidth: Math.round(rect.width),
        windowHeight: Math.round(rect.height),
      });

      const out = document.createElement("canvas");
      out.width = targetW;
      out.height = targetH;
      const ctx = out.getContext("2d");
      if (!ctx) throw new Error("Canvas error");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(canvas, 0, 0, targetW, targetH);

      const link = document.createElement("a");
      link.download = "sleeve-microverdes-96x336mm-300dpi.png";
      link.href = out.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setExporting(false);
    }
  }, []);

  return (
    <div style={{
      background: "linear-gradient(135deg, hsl(var(--background)), hsl(var(--green-light) / 0.2), hsl(var(--cream-dark)))",
      padding: "24px 16px", minHeight: "100vh",
    }}>
      <div id="print-root" style={{ width: `${CANVAS_W_MM}mm`, margin: "0 auto" }}>
        {/* Screen-only header */}
        <div className="screen-only" style={{ marginBottom: "14px", textAlign: "center" }}>
          <p className="font-body" style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.25em", color: "hsl(var(--muted-foreground))", margin: "0 0 6px" }}>
            Mockup de Embalagem
          </p>
          <h2 className="font-cursive" style={{ fontSize: "38px", color: "hsl(var(--green-deep))", margin: "0 0 6px" }}>
            Sleeve · Microverdes de Girassol
          </h2>
          <p className="font-body" style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", margin: 0 }}>
            9,6 cm × 33,6 cm · 300 dpi · Orientação vertical
          </p>
        </div>

        <div className="screen-only" style={{ textAlign: "center", marginBottom: "16px" }}>
          <button onClick={handleExport} disabled={exporting} style={{
            display: "inline-block", border: "none", borderRadius: "999px", padding: "10px 18px",
            fontSize: "14px", fontWeight: 600, fontFamily: "Inter, sans-serif",
            color: "hsl(var(--gold-light))", background: "var(--pkg-green-gradient)",
            cursor: exporting ? "not-allowed" : "pointer", opacity: exporting ? 0.6 : 1,
          }}>
            <span style={{ display: "inline-block", width: "16px", height: "16px", verticalAlign: "-3px", marginRight: "8px" }}>
              <Download size={16} />
            </span>
            {exporting ? "Exportando…" : "Baixar PNG (300dpi)"}
          </button>
        </div>

        {/* Print canvas — vertical sleeve */}
        <div ref={sleeveRef} id="print-canvas" style={{
          position: "relative",
          width: `${CANVAS_W_MM}mm`,
          height: `${CANVAS_H_MM}mm`,
          background: "hsl(var(--cream))",
          overflow: "hidden",
          boxShadow: "var(--pkg-shadow)",
        }}>
          <ArtPanel />
          <SidePanel yMm={SIDE1_Y} />
          <NutritionPanel />
          <SidePanel yMm={SIDE2_Y} />

          {/* Fold lines */}
          {[SIDE1_Y, NUTRI_Y, SIDE2_Y].map((y) => (
            <div key={y} style={{ position: "absolute", left: 0, top: `${y}mm`, width: `${CANVAS_W_MM}mm`, height: "0.2mm", background: "hsl(var(--green-deep) / 0.2)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
