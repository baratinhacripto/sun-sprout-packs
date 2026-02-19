import sunflowerImg from "@/assets/sunflower-micro.jpg";

// ─── Nutritional data ────────────────────────────────────────────────────────
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function ComparisonBar({
  label,
  sunflower,
  lettuce,
  unit,
}: {
  label: string;
  sunflower: number;
  lettuce: number;
  unit: string;
}) {
  const max = Math.max(sunflower, lettuce) * 1.15;
  const sfPct = (sunflower / max) * 100;
  const ltPct = (lettuce / max) * 100;
  const ratio = Math.round((sunflower / lettuce) * 10) / 10;

  return (
    <div className="mb-2">
      <div className="flex justify-between items-baseline mb-0.5">
        <span className="text-[7px] font-semibold text-green-deep uppercase tracking-wide">{label}</span>
        <span className="text-[6px] text-gold-dark font-bold">{ratio}×</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex-1 h-2 rounded-full bg-cream-dark overflow-hidden">
          <div
            className="h-full rounded-full pkg-gold-gradient"
            style={{ width: `${sfPct}%` }}
          />
        </div>
        <span className="text-[6px] text-green-deep w-10 text-right">
          {sunflower}{unit}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex-1 h-2 rounded-full bg-cream-dark overflow-hidden">
          <div
            className="h-full rounded-full bg-muted-foreground/40"
            style={{ width: `${ltPct}%` }}
          />
        </div>
        <span className="text-[6px] text-muted-foreground w-10 text-right">
          {lettuce}{unit}
        </span>
      </div>
    </div>
  );
}

function NutritionRow({
  nutrient,
  unit,
  per100,
  dv,
  last,
}: {
  nutrient: string;
  unit: string;
  per100: number;
  dv: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center py-[3px] ${
        !last ? "border-b border-green-deep/10" : ""
      }`}
    >
      <span className="text-[7px] text-green-deep">{nutrient}</span>
      <div className="flex gap-2 items-center">
        <span className="text-[7px] font-semibold text-green-deep">
          {per100} {unit}
        </span>
        <span className="text-[6px] text-muted-foreground w-6 text-right">{dv}</span>
      </div>
    </div>
  );
}

// ─── Panel: Top (visible from above the box) ─────────────────────────────────

function TopPanel() {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ width: "13cm", height: "10cm" }}
    >
      {/* Full bleed image */}
      <img
        src={sunflowerImg}
        alt="Microverdes de girassol"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(142 52% 12% / 0.15) 0%, hsl(142 52% 12% / 0.65) 55%, hsl(142 52% 10% / 0.92) 100%)",
        }}
      />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 pb-4 pt-2 px-4 text-center">
        {/* Gold accent line */}
        <div
          className="mx-auto mb-2 rounded-full pkg-gold-gradient"
          style={{ width: "3cm", height: "1.5px" }}
        />
        <h1
          className="font-cursive leading-none mb-1"
          style={{
            fontSize: "22pt",
            color: "hsl(var(--gold-light))",
            textShadow: "0 1px 8px hsl(142 52% 6% / 0.6)",
          }}
        >
          microverdes de girassol
        </h1>
        <div
          className="mx-auto mb-2 rounded-full pkg-gold-gradient"
          style={{ width: "3cm", height: "1.5px" }}
        />
        <p
          className="font-body tracking-widest uppercase"
          style={{
            fontSize: "7pt",
            letterSpacing: "0.22em",
            color: "hsl(var(--gold))",
          }}
        >
          sem agrotóxicos
        </p>
        {/* Small organic badge */}
        <div
          className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full border"
          style={{
            borderColor: "hsl(var(--gold) / 0.5)",
            background: "hsl(var(--gold) / 0.12)",
          }}
        >
          <span style={{ fontSize: "6pt", color: "hsl(var(--gold-light))" }}>
            🌱 Cultivado com amor
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Panel: Nutrition Info (front/back) ──────────────────────────────────────

function NutritionPanel({ side }: { side: "frente" | "verso" }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 flex flex-col"
      style={{
        width: "12cm",
        height: "10cm",
        background: "hsl(var(--cream))",
      }}
    >
      {/* Diagonal stripe texture */}
      <div className="absolute inset-0 diagonal-stripe opacity-60" />

      {/* Top header bar */}
      <div
        className="relative z-10 px-3 py-2 pkg-green-gradient flex items-center gap-2"
      >
        <div className="flex flex-col">
          <span
            className="font-cursive"
            style={{ fontSize: "11pt", color: "hsl(var(--gold-light))" }}
          >
            microverdes de girassol
          </span>
          <span
            className="font-body uppercase tracking-widest"
            style={{ fontSize: "5pt", color: "hsl(var(--gold) / 0.8)", letterSpacing: "0.18em" }}
          >
            sem agrotóxicos
          </span>
        </div>
        <div className="ml-auto text-right">
          <span
            className="font-body uppercase"
            style={{ fontSize: "5pt", color: "hsl(0 0% 100% / 0.5)" }}
          >
            {side === "frente" ? "PAINEL FRONTAL" : "PAINEL TRASEIRO"}
          </span>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="relative z-10 h-[2px] pkg-gold-gradient" />

      {/* Content body */}
      <div className="relative z-10 flex flex-1 gap-2 px-2 py-2 overflow-hidden">
        {side === "frente" ? (
          <>
            {/* Nutrition table */}
            <div className="flex-1">
              <div
                className="font-body font-bold uppercase text-green-deep mb-1 pb-0.5"
                style={{ fontSize: "7pt", letterSpacing: "0.08em", borderBottom: "1.5px solid hsl(var(--green-deep))" }}
              >
                Informação Nutricional
              </div>
              <div
                className="font-body text-muted-foreground mb-1"
                style={{ fontSize: "6pt" }}
              >
                Porção de 50g · Por 100g
              </div>
              <div
                className="font-body text-right text-muted-foreground mb-0.5"
                style={{ fontSize: "6pt" }}
              >
                %VD*
              </div>
              {nutritionTable.map((row, i) => (
                <NutritionRow
                  key={row.nutrient}
                  {...row}
                  last={i === nutritionTable.length - 1}
                />
              ))}
              <p
                className="font-body text-muted-foreground mt-1"
                style={{ fontSize: "5pt" }}
              >
                *% Valores Diários com base numa dieta de 2.000 kcal.
              </p>
            </div>

            {/* Vertical divider */}
            <div className="w-px bg-green-deep/15 mx-1" />

            {/* Highlights */}
            <div className="w-20 flex-shrink-0">
              <div
                className="font-body font-bold uppercase text-green-deep mb-2"
                style={{ fontSize: "6pt", letterSpacing: "0.08em" }}
              >
                Destaques
              </div>
              {[
                { icon: "💪", label: "Rico em Proteínas", val: "4g/100g" },
                { icon: "🌿", label: "Alto em Fibras", val: "2,1g/100g" },
                { icon: "✨", label: "Vit. E Potente", val: "19% VD" },
                { icon: "🩸", label: "Fonte de Ferro", val: "13% VD" },
                { icon: "🧬", label: "Folato Natural", val: "20% VD" },
              ].map((h) => (
                <div
                  key={h.label}
                  className="mb-1.5 p-1 rounded"
                  style={{ background: "hsl(var(--green-light) / 0.6)" }}
                >
                  <div className="flex items-center gap-1">
                    <span style={{ fontSize: "8pt" }}>{h.icon}</span>
                    <div>
                      <div
                        className="font-body font-semibold text-green-deep leading-tight"
                        style={{ fontSize: "5.5pt" }}
                      >
                        {h.label}
                      </div>
                      <div
                        className="font-body text-gold-dark font-bold"
                        style={{ fontSize: "5.5pt" }}
                      >
                        {h.val}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Comparison with lettuce */}
            <div className="flex-1">
              <div
                className="font-body font-bold uppercase text-green-deep mb-0.5 pb-0.5"
                style={{ fontSize: "7pt", letterSpacing: "0.08em", borderBottom: "1.5px solid hsl(var(--green-deep))" }}
              >
                Comparativo Nutricional
              </div>
              <div
                className="font-body text-muted-foreground mb-2"
                style={{ fontSize: "6pt" }}
              >
                por 100g
              </div>

              {/* Legend */}
              <div className="flex gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 rounded-sm pkg-gold-gradient" />
                  <span className="font-body font-semibold text-green-deep" style={{ fontSize: "6pt" }}>
                    Microverdes de Girassol
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 rounded-sm bg-muted-foreground/40" />
                  <span className="font-body text-muted-foreground" style={{ fontSize: "6pt" }}>
                    Alface
                  </span>
                </div>
              </div>

              {comparisonData.map((c) => (
                <ComparisonBar key={c.label} {...c} />
              ))}

              <div
                className="font-body text-muted-foreground mt-1"
                style={{ fontSize: "5pt" }}
              >
                Fontes: TACO/IBGE · USDA FoodData Central
              </div>
            </div>

            {/* Vertical divider */}
            <div className="w-px bg-green-deep/15 mx-1" />

            {/* Side info */}
            <div className="w-24 flex-shrink-0 flex flex-col gap-2">
              <div
                className="font-body font-bold uppercase text-green-deep mb-1"
                style={{ fontSize: "6pt", letterSpacing: "0.08em" }}
              >
                Por que escolher?
              </div>

              {[
                {
                  stat: "40×",
                  desc: "mais nutrientes que vegetais maduros",
                },
                {
                  stat: "2.8×",
                  desc: "mais proteínas que a alface",
                },
                {
                  stat: "9×",
                  desc: "mais vitamina E que a alface",
                },
              ].map((s) => (
                <div
                  key={s.stat}
                  className="p-1.5 rounded text-center"
                  style={{ background: "hsl(var(--primary) / 0.06)", border: "1px solid hsl(var(--green-deep) / 0.15)" }}
                >
                  <div
                    className="font-cursive text-gold-dark font-bold leading-tight"
                    style={{ fontSize: "16pt" }}
                  >
                    {s.stat}
                  </div>
                  <div
                    className="font-body text-green-deep leading-tight"
                    style={{ fontSize: "5.5pt" }}
                  >
                    {s.desc}
                  </div>
                </div>
              ))}

              <div
                className="mt-auto p-1 rounded text-center"
                style={{ background: "hsl(var(--gold) / 0.12)", border: "1px solid hsl(var(--gold) / 0.3)" }}
              >
                <div
                  className="font-body text-gold-dark"
                  style={{ fontSize: "5pt" }}
                >
                  🌱 Produto fresco
                </div>
                <div
                  className="font-body text-green-deep font-semibold"
                  style={{ fontSize: "5.5pt" }}
                >
                  Consumir em até 5 dias
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom strip */}
      <div
        className="relative z-10 flex justify-between items-center px-3 py-1"
        style={{ background: "hsl(var(--green-deep) / 0.08)", borderTop: "1px solid hsl(var(--green-deep) / 0.1)" }}
      >
        <span className="font-body text-muted-foreground" style={{ fontSize: "5pt" }}>
          Conservar refrigerado entre 2°C e 8°C
        </span>
        <span className="font-body text-muted-foreground" style={{ fontSize: "5pt" }}>
          Val.: Ver embalagem
        </span>
      </div>
    </div>
  );
}

// ─── Main Packaging Component ─────────────────────────────────────────────────

export default function PackagingSleeve() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-light/20 to-cream-dark flex flex-col items-center justify-center py-10 px-4 gap-10 overflow-x-hidden">
      {/* Header */}
      <div className="text-center animate-fade-up">
        <p
          className="font-body uppercase tracking-widest text-muted-foreground mb-1"
          style={{ fontSize: "9pt", letterSpacing: "0.25em" }}
        >
          Mockup de Embalagem · Vista da Prateleira
        </p>
        <h2 className="font-cursive text-green-deep" style={{ fontSize: "28pt" }}>
          Sleeve · Microverdes de Girassol
        </h2>
        <p className="font-body text-muted-foreground mt-1" style={{ fontSize: "8pt" }}>
          37 cm × 10 cm · Caixa plástica clamshell · girado 90° como na prateleira
        </p>
      </div>

      {/* Wrapper that rotates the entire sleeve 90° (como aparece na prateleira) */}
      <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
        {/* outer container sized to the ROTATED dimensions so it takes correct space */}
        <div
          style={{
            width: "10cm",   /* after rotation: height becomes width */
            height: "37cm",  /* after rotation: width becomes height */
            position: "relative",
          }}
        >
          {/* The strip, rotated -90deg around its own center */}
          <div
            className="pkg-shadow rounded overflow-hidden"
            style={{
              display: "flex",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              transformOrigin: "center center",
            }}
          >
            {/* LEFT: Painel Traseiro */}
            <div className="panel-fold-line">
              <NutritionPanel side="verso" />
            </div>

            {/* CENTER: Painel Superior (topo da caixa) */}
            <div className="relative">
              <div
                className="absolute top-0 bottom-0 left-0 w-px z-20"
                style={{ background: "hsl(var(--gold) / 0.6)", boxShadow: "0 0 4px hsl(var(--gold) / 0.4)" }}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-px z-20"
                style={{ background: "hsl(var(--gold) / 0.6)", boxShadow: "0 0 4px hsl(var(--gold) / 0.4)" }}
              />
              <TopPanel />
            </div>

            {/* RIGHT: Painel Frontal */}
            <div className="panel-fold-line">
              <NutritionPanel side="frente" />
            </div>
          </div>

          {/* Labels alongside the rotated strip */}
          {/* Left label (appears on top after rotation → Traseiro, i.e. bottom of shelf view) */}
          <div
            className="absolute flex items-center gap-1"
            style={{ left: "-5.5cm", top: "50%", transform: "translateY(-50%) rotate(-90deg)", transformOrigin: "center center", whiteSpace: "nowrap" }}
          >
            <div className="h-px bg-green-deep/20" style={{ width: "2cm" }} />
            <span className="font-body uppercase text-muted-foreground" style={{ fontSize: "5.5pt", letterSpacing: "0.12em" }}>
              Painel Traseiro (verso)
            </span>
            <div className="h-px bg-green-deep/20" style={{ width: "2cm" }} />
          </div>
        </div>
      </div>

      {/* Hint */}
      <div className="text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <p className="font-body text-muted-foreground" style={{ fontSize: "7pt" }}>
          As linhas douradas indicam as dobras. Escala real: 37cm × 10cm.
        </p>
      </div>
    </div>
  );
}

