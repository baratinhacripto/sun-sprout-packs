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

const CANVAS_WIDTH_MM = 336;
const CANVAS_HEIGHT_MM = 96;
const BLEED_MM = 3;
const SAFE_HEIGHT_MM = 90;

const ART_WIDTH_MM = 130;
const SIDE_WIDTH_MM = 35;
const NUTRITION_WIDTH_MM = 130;

const ART_X_MM = BLEED_MM;
const SIDE_TOP_X_MM = ART_X_MM + ART_WIDTH_MM;
const NUTRITION_X_MM = SIDE_TOP_X_MM + SIDE_WIDTH_MM;
const SIDE_BOTTOM_X_MM = NUTRITION_X_MM + NUTRITION_WIDTH_MM;
const PANEL_Y_MM = BLEED_MM;

const DPI = 300;
const pxFromMm = (mm: number) => Math.round((mm / 25.4) * DPI);

function NutritionRowAbsolute({
  nutrient,
  unit,
  per100,
  dv,
  topMm,
  last,
}: {
  nutrient: string;
  unit: string;
  per100: number;
  dv: string;
  topMm: number;
  last?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "2mm",
        top: `${topMm}mm`,
        width: "58mm",
        height: "4.6mm",
        borderBottom: last ? "none" : "0.2mm solid hsl(var(--green-deep) / 0.15)",
      }}
    >
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "0mm",
          top: "0.8mm",
          fontSize: "8px",
          color: "hsl(var(--green-deep))",
        }}
      >
        {nutrient}
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "34mm",
          top: "0.8mm",
          fontSize: "8px",
          fontWeight: 600,
          color: "hsl(var(--green-deep))",
        }}
      >
        {per100} {unit}
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          right: "0mm",
          top: "0.8mm",
          fontSize: "7px",
          color: "hsl(var(--muted-foreground))",
          width: "7mm",
          textAlign: "right",
        }}
      >
        {dv}
      </span>
    </div>
  );
}

function ComparisonBarAbsolute({
  label,
  sunflower,
  lettuce,
  unit,
  topMm,
}: {
  label: string;
  sunflower: number;
  lettuce: number;
  unit: string;
  topMm: number;
}) {
  const trackWidthMm = 32;
  const max = Math.max(sunflower, lettuce) * 1.15;
  const sunflowerWidthMm = Number(((sunflower / max) * trackWidthMm).toFixed(2));
  const lettuceWidthMm = Number(((lettuce / max) * trackWidthMm).toFixed(2));
  const ratio = Math.round((sunflower / lettuce) * 10) / 10;

  return (
    <div
      style={{
        position: "absolute",
        left: "2mm",
        top: `${topMm}mm`,
        width: "58mm",
        height: "9.2mm",
      }}
    >
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "0mm",
          top: "0mm",
          fontSize: "7px",
          fontWeight: 700,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          color: "hsl(var(--green-deep))",
        }}
      >
        {label}
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          right: "0mm",
          top: "0mm",
          fontSize: "7px",
          fontWeight: 700,
          color: "hsl(var(--gold-dark))",
        }}
      >
        {ratio}×
      </span>

      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: "3.4mm",
          width: `${trackWidthMm}mm`,
          height: "1.8mm",
          borderRadius: "999px",
          background: "hsl(var(--cream-dark))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0mm",
            top: "0mm",
            width: `${sunflowerWidthMm}mm`,
            height: "1.8mm",
            borderRadius: "999px",
            background: "var(--pkg-gold-gradient)",
          }}
        />
      </div>
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "34mm",
          top: "2.6mm",
          fontSize: "6px",
          color: "hsl(var(--green-deep))",
          width: "9mm",
          textAlign: "right",
        }}
      >
        {sunflower}
        {unit}
      </span>

      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: "6.4mm",
          width: `${trackWidthMm}mm`,
          height: "1.8mm",
          borderRadius: "999px",
          background: "hsl(var(--cream-dark))",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "0mm",
            top: "0mm",
            width: `${lettuceWidthMm}mm`,
            height: "1.8mm",
            borderRadius: "999px",
            background: "hsl(var(--muted-foreground) / 0.45)",
          }}
        />
      </div>
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "34mm",
          top: "5.6mm",
          fontSize: "6px",
          color: "hsl(var(--muted-foreground))",
          width: "9mm",
          textAlign: "right",
        }}
      >
        {lettuce}
        {unit}
      </span>
    </div>
  );
}

function ArtPanelAbsolute() {
  return (
    <div
      style={{
        position: "absolute",
        left: `${ART_X_MM}mm`,
        top: `${PANEL_Y_MM}mm`,
        width: `${ART_WIDTH_MM}mm`,
        height: `${SAFE_HEIGHT_MM}mm`,
        overflow: "hidden",
      }}
    >
      <img
        src={sunflowerImg}
        alt="Microverdes de girassol"
        style={{
          position: "absolute",
          left: "0mm",
          top: "0mm",
          width: `${ART_WIDTH_MM}mm`,
          height: `${SAFE_HEIGHT_MM}mm`,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: "0mm",
          width: `${ART_WIDTH_MM}mm`,
          height: `${SAFE_HEIGHT_MM}mm`,
          background:
            "linear-gradient(180deg, hsl(142 52% 12% / 0.15), hsl(142 52% 12% / 0.52) 50%, hsl(142 52% 10% / 0.9))",
        }}
      />

      <h2
        className="font-cursive"
        style={{
          position: "absolute",
          left: "0mm",
          top: "5mm",
          width: `${ART_WIDTH_MM}mm`,
          textAlign: "center",
          fontSize: "31px",
          color: "hsl(var(--gold-light))",
          textShadow: "0 2px 8px hsl(142 52% 6% / 0.7)",
          margin: "0px",
        }}
      >
        Fazenda Princesinha
      </h2>

      <h1
        className="font-cursive"
        style={{
          position: "absolute",
          left: "0mm",
          top: "68mm",
          width: `${ART_WIDTH_MM}mm`,
          textAlign: "center",
          fontSize: "37px",
          lineHeight: "1",
          color: "hsl(var(--gold-light))",
          textShadow: "0 1px 6px hsl(142 52% 6% / 0.6)",
          margin: "0px",
        }}
      >
        microverdes de girassol
      </h1>

      <p
        className="font-body"
        style={{
          position: "absolute",
          left: "0mm",
          top: "82mm",
          width: `${ART_WIDTH_MM}mm`,
          textAlign: "center",
          fontSize: "10px",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "hsl(var(--gold))",
          margin: "0px",
        }}
      >
        sem agrotóxicos
      </p>
    </div>
  );
}

function SidePanelAbsolute({ xMm }: { xMm: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${xMm}mm`,
        top: `${PANEL_Y_MM}mm`,
        width: `${SIDE_WIDTH_MM}mm`,
        height: `${SAFE_HEIGHT_MM}mm`,
        background: "var(--pkg-green-gradient)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: "0mm",
          width: `${SIDE_WIDTH_MM}mm`,
          height: "0.4mm",
          background: "hsl(var(--gold) / 0.55)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "0mm",
          bottom: "0mm",
          width: `${SIDE_WIDTH_MM}mm`,
          height: "0.4mm",
          background: "hsl(var(--gold) / 0.55)",
        }}
      />
      <span
        className="font-cursive"
        style={{
          position: "absolute",
          left: "17.5mm",
          top: "45mm",
          transform: "translate(-50%, -50%) rotate(-90deg)",
          fontSize: "23px",
          color: "hsl(var(--gold-light))",
          whiteSpace: "nowrap",
        }}
      >
        microverdes de girassol
      </span>
    </div>
  );
}

function NutritionPanelAbsolute() {
  return (
    <div
      style={{
        position: "absolute",
        left: `${NUTRITION_X_MM}mm`,
        top: `${PANEL_Y_MM}mm`,
        width: `${NUTRITION_WIDTH_MM}mm`,
        height: `${SAFE_HEIGHT_MM}mm`,
        background: "hsl(var(--cream))",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: "0mm",
          width: `${NUTRITION_WIDTH_MM}mm`,
          height: "12mm",
          background: "var(--pkg-green-gradient)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: "12mm",
          width: `${NUTRITION_WIDTH_MM}mm`,
          height: "0.6mm",
          background: "var(--pkg-gold-gradient)",
        }}
      />

      <span
        className="font-cursive"
        style={{
          position: "absolute",
          left: "3mm",
          top: "2.4mm",
          fontSize: "20px",
          color: "hsl(var(--gold-light))",
        }}
      >
        microverdes de girassol
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "3mm",
          top: "8.3mm",
          fontSize: "8px",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "hsl(var(--gold) / 0.85)",
        }}
      >
        sem agrotóxicos
      </span>

      <div
        style={{
          position: "absolute",
          left: "64mm",
          top: "14mm",
          width: "0.3mm",
          height: "66mm",
          background: "hsl(var(--green-deep) / 0.16)",
        }}
      />

      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "2mm",
          top: "14mm",
          fontSize: "8px",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "hsl(var(--green-deep))",
          letterSpacing: "0.08em",
        }}
      >
        Informação Nutricional
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "2mm",
          top: "18.8mm",
          fontSize: "7px",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        Porção de 100g
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "56mm",
          top: "18.8mm",
          width: "8mm",
          textAlign: "right",
          fontSize: "7px",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        %VD*
      </span>

      {nutritionTable.map((row, i) => (
        <NutritionRowAbsolute
          key={row.nutrient}
          nutrient={row.nutrient}
          unit={row.unit}
          per100={row.per100}
          dv={row.dv}
          topMm={22 + i * 5.1}
          last={i === nutritionTable.length - 1}
        />
      ))}

      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "2mm",
          top: "74mm",
          width: "60mm",
          fontSize: "6px",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        *% Valores Diários com base em uma dieta de 2.000 kcal.
      </span>

      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "67mm",
          top: "14mm",
          fontSize: "8px",
          fontWeight: 700,
          textTransform: "uppercase",
          color: "hsl(var(--green-deep))",
          letterSpacing: "0.08em",
        }}
      >
        Comparativo × Alface
      </span>

      {comparisonData.map((row, i) => (
        <ComparisonBarAbsolute
          key={row.label}
          label={row.label}
          sunflower={row.sunflower}
          lettuce={row.lettuce}
          unit={row.unit}
          topMm={19 + i * 8.8}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: "0mm",
          top: "82mm",
          width: `${NUTRITION_WIDTH_MM}mm`,
          height: "8mm",
          borderTop: "0.2mm solid hsl(var(--green-deep) / 0.12)",
          background: "hsl(var(--green-deep) / 0.08)",
        }}
      />
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "2mm",
          top: "84.5mm",
          fontSize: "6px",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        Conservar entre 2°C e 8°C
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          left: "47mm",
          top: "84.5mm",
          fontSize: "6px",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        🌱 Produto fresco · até 5 dias
      </span>
      <span
        className="font-body"
        style={{
          position: "absolute",
          right: "2mm",
          top: "84.5mm",
          fontSize: "6px",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        Val.: Ver embalagem
      </span>
    </div>
  );
}

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

      const targetWidthPx = pxFromMm(CANVAS_WIDTH_MM);
      const targetHeightPx = pxFromMm(CANVAS_HEIGHT_MM);
      const scale = targetWidthPx / rect.width;

      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        windowWidth: Math.round(rect.width),
        windowHeight: Math.round(rect.height),
      });

      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = targetWidthPx;
      outputCanvas.height = targetHeightPx;

      const ctx = outputCanvas.getContext("2d");
      if (!ctx) throw new Error("Não foi possível gerar o canvas final");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(canvas, 0, 0, targetWidthPx, targetHeightPx);

      const link = document.createElement("a");
      link.download = "sleeve-microverdes-girassol-336x96mm-300dpi.png";
      link.href = outputCanvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Falha ao exportar PNG:", error);
    } finally {
      setExporting(false);
    }
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, hsl(var(--background)), hsl(var(--green-light) / 0.2), hsl(var(--cream-dark)))",
        paddingTop: "24px",
        paddingBottom: "28px",
        paddingLeft: "16px",
        paddingRight: "16px",
      }}
    >
      <div id="print-root" style={{ width: "336mm", margin: "0px auto" }}>
        <div className="screen-only" style={{ marginBottom: "14px", textAlign: "center" }}>
          <p
            className="font-body"
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "hsl(var(--muted-foreground))",
              margin: "0px 0px 6px 0px",
            }}
          >
            Mockup de Embalagem
          </p>
          <h2
            className="font-cursive"
            style={{
              fontSize: "44px",
              color: "hsl(var(--green-deep))",
              margin: "0px 0px 6px 0px",
            }}
          >
            Sleeve · Microverdes de Girassol
          </h2>
          <p
            className="font-body"
            style={{
              fontSize: "12px",
              color: "hsl(var(--muted-foreground))",
              margin: "0px",
            }}
          >
            Arquivo fechado de impressão · 336mm × 96mm · 300dpi
          </p>
        </div>

        <div className="screen-only" style={{ textAlign: "center", marginBottom: "16px" }}>
          <button
            onClick={handleExport}
            disabled={exporting}
            style={{
              display: "inline-block",
              border: "0px",
              borderRadius: "999px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              color: "hsl(var(--gold-light))",
              background: "var(--pkg-green-gradient)",
              cursor: exporting ? "not-allowed" : "pointer",
              opacity: exporting ? 0.6 : 1,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                verticalAlign: "-3px",
                marginRight: "8px",
              }}
            >
              <Download size={16} />
            </span>
            {exporting ? "Exportando…" : "Baixar PNG (336×96mm · 300dpi)"}
          </button>
        </div>

        <div
          ref={sleeveRef}
          id="print-canvas"
          style={{
            position: "relative",
            width: "336mm",
            height: "96mm",
            background: "hsl(var(--cream))",
            overflow: "hidden",
            boxShadow: "var(--pkg-shadow)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "0mm",
              top: "0mm",
              width: "336mm",
              height: "96mm",
              border: "0.2mm solid hsl(var(--border))",
            }}
          />

          <ArtPanelAbsolute />
          <SidePanelAbsolute xMm={SIDE_TOP_X_MM} />
          <NutritionPanelAbsolute />
          <SidePanelAbsolute xMm={SIDE_BOTTOM_X_MM} />

          <div
            style={{
              position: "absolute",
              left: `${SIDE_TOP_X_MM}mm`,
              top: "0mm",
              width: "0.2mm",
              height: "96mm",
              background: "hsl(var(--green-deep) / 0.24)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${NUTRITION_X_MM}mm`,
              top: "0mm",
              width: "0.2mm",
              height: "96mm",
              background: "hsl(var(--green-deep) / 0.24)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${SIDE_BOTTOM_X_MM}mm`,
              top: "0mm",
              width: "0.2mm",
              height: "96mm",
              background: "hsl(var(--green-deep) / 0.24)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
