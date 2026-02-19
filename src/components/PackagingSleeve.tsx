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
    <div className="mb-1.5">
      <div className="flex justify-between items-baseline mb-0.5">
        <span className="text-[7px] font-semibold text-green-deep uppercase tracking-wide">{label}</span>
        <span className="text-[6px] text-gold-dark font-bold">{ratio}×</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex-1 h-[5px] rounded-full bg-cream-dark overflow-hidden">
          <div
            className="h-full rounded-full pkg-gold-gradient"
            style={{ width: `${sfPct}%` }}
          />
        </div>
        <span className="text-[5.5px] text-green-deep w-8 text-right">
          {sunflower}{unit}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex-1 h-[5px] rounded-full bg-cream-dark overflow-hidden">
          <div
            className="h-full rounded-full bg-muted-foreground/40"
            style={{ width: `${ltPct}%` }}
          />
        </div>
        <span className="text-[5.5px] text-muted-foreground w-8 text-right">
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
      className={`flex justify-between items-center py-[2px] ${
        !last ? "border-b border-green-deep/10" : ""
      }`}
    >
      <span className="text-[6.5px] text-green-deep">{nutrient}</span>
      <div className="flex gap-2 items-center">
        <span className="text-[6.5px] font-semibold text-green-deep">
          {per100} {unit}
        </span>
        <span className="text-[5.5px] text-muted-foreground w-5 text-right">{dv}</span>
      </div>
    </div>
  );
}

// ─── Panel: Arte (topo da caixa) ─────────────────────────────────────────────

function ArtPanel() {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{ width: "9cm", height: "13cm" }}
    >
      {/* Full bleed image */}
      <img
        src={sunflowerImg}
        alt="Microverdes de girassol"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, hsl(142 52% 12% / 0.1) 0%, hsl(142 52% 12% / 0.5) 50%, hsl(142 52% 10% / 0.9) 100%)",
        }}
      />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 pb-4 pt-2 px-4 text-center">
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

// ─── Panel: Informações Nutricionais (fundo da caixa) ────────────────────────

function NutritionPanel() {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0 flex flex-col"
      style={{
        width: "9cm",
        height: "13cm",
        background: "hsl(var(--cream))",
      }}
    >
      {/* Diagonal stripe texture */}
      <div className="absolute inset-0 diagonal-stripe opacity-60" />

      {/* Top header bar */}
      <div className="relative z-10 px-3 py-1.5 pkg-green-gradient flex items-center gap-2">
        <div className="flex flex-col">
          <span
            className="font-cursive"
            style={{ fontSize: "10pt", color: "hsl(var(--gold-light))" }}
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
      </div>

      {/* Gold accent line */}
      <div className="relative z-10 h-[2px] pkg-gold-gradient" />

      {/* Content body — two columns */}
      <div className="relative z-10 flex flex-1 gap-2 px-2 py-1.5 overflow-hidden">
        {/* LEFT: Nutrition table */}
        <div className="flex-1">
          <div
            className="font-body font-bold uppercase text-green-deep mb-0.5 pb-0.5"
            style={{ fontSize: "6.5pt", letterSpacing: "0.08em", borderBottom: "1.5px solid hsl(var(--green-deep))" }}
          >
            Informação Nutricional
          </div>
          <div
            className="font-body text-muted-foreground mb-0.5"
            style={{ fontSize: "5.5pt" }}
          >
            Porção de 50g · Por 100g
          </div>
          <div
            className="font-body text-right text-muted-foreground mb-0.5"
            style={{ fontSize: "5pt" }}
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
            className="font-body text-muted-foreground mt-0.5"
            style={{ fontSize: "4.5pt" }}
          >
            *% Valores Diários com base numa dieta de 2.000 kcal.
          </p>
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-green-deep/15" />

        {/* RIGHT: Comparison + highlights */}
        <div className="flex-1 flex flex-col">
          <div
            className="font-body font-bold uppercase text-green-deep mb-0.5 pb-0.5"
            style={{ fontSize: "6.5pt", letterSpacing: "0.08em", borderBottom: "1.5px solid hsl(var(--green-deep))" }}
          >
            Comparativo × Alface
          </div>

          {/* Legend */}
          <div className="flex gap-3 mb-1">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-1.5 rounded-sm pkg-gold-gradient" />
              <span className="font-body font-semibold text-green-deep" style={{ fontSize: "5pt" }}>
                Microverdes
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-1.5 rounded-sm bg-muted-foreground/40" />
              <span className="font-body text-muted-foreground" style={{ fontSize: "5pt" }}>
                Alface
              </span>
            </div>
          </div>

          {comparisonData.map((c) => (
            <ComparisonBar key={c.label} {...c} />
          ))}

          {/* Key stats */}
          <div className="mt-auto flex gap-1">
            {[
              { stat: "40×", desc: "mais nutrientes" },
              { stat: "2.8×", desc: "mais proteínas" },
              { stat: "9×", desc: "mais vit. E" },
            ].map((s) => (
              <div
                key={s.stat}
                className="flex-1 p-1 rounded text-center"
                style={{ background: "hsl(var(--primary) / 0.06)", border: "1px solid hsl(var(--green-deep) / 0.15)" }}
              >
                <div
                  className="font-cursive text-gold-dark font-bold leading-tight"
                  style={{ fontSize: "11pt" }}
                >
                  {s.stat}
                </div>
                <div
                  className="font-body text-green-deep leading-tight"
                  style={{ fontSize: "4.5pt" }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
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
          🌱 Produto fresco · Consumir em até 5 dias
        </span>
        <span className="font-body text-muted-foreground" style={{ fontSize: "5pt" }}>
          Val.: Ver embalagem
        </span>
      </div>
    </div>
  );
}

// ─── Side connector panel ─────────────────────────────────────────────────────

function SidePanel({ label }: { label: string }) {
  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center pkg-green-gradient"
      style={{ width: "9cm", height: "3.5cm" }}
    >
      <span
        className="font-cursive text-center"
        style={{
          fontSize: "9pt",
          color: "hsl(var(--gold-light))",
        }}
      >
        microverdes de girassol
      </span>
      {/* Gold edge lines */}
      <div
        className="absolute left-0 right-0 top-0 h-px"
        style={{ background: "hsl(var(--gold) / 0.5)" }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 h-px"
        style={{ background: "hsl(var(--gold) / 0.5)" }}
      />
    </div>
  );
}

// ─── Main Packaging Component ─────────────────────────────────────────────────

export default function PackagingSleeve() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-light/20 to-cream-dark flex flex-col items-center justify-center py-10 px-4 gap-8">
      {/* Header */}
      <div className="text-center animate-fade-up">
        <p
          className="font-body uppercase tracking-widest text-muted-foreground mb-1"
          style={{ fontSize: "9pt", letterSpacing: "0.25em" }}
        >
          Mockup de Embalagem
        </p>
        <h2 className="font-cursive text-green-deep" style={{ fontSize: "28pt" }}>
          Sleeve · Microverdes de Girassol
        </h2>
        <p className="font-body text-muted-foreground mt-1" style={{ fontSize: "8pt" }}>
          33 cm × 9 cm · Caixa plástica clamshell
        </p>
      </div>

      {/* Sleeve unfolded — vertical strip (like Mimo) */}
      <div
        className="pkg-shadow rounded overflow-hidden animate-fade-up flex flex-col"
        style={{ animationDelay: "0.15s" }}
      >
        {/* Art (top of box — visible face) */}
        <ArtPanel />

        {/* Top side connector */}
        <SidePanel label="lateral superior" />

        {/* Nutrition (bottom of box — flip 180°) */}
        <NutritionPanel />

        {/* Bottom side connector */}
        <SidePanel label="lateral inferior" />
      </div>

      {/* Fold guide labels */}
      <div
        className="flex flex-col items-center gap-0 animate-fade-up"
        style={{ animationDelay: "0.3s", width: "9cm" }}
      >
        <div className="flex items-center w-full" style={{ height: "13cm" }}>
          <span className="font-body uppercase text-gold-dark font-semibold" style={{ fontSize: "6pt", letterSpacing: "0.15em", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            ↑ Topo (arte principal) ↓
          </span>
        </div>
        <div className="flex items-center w-full" style={{ height: "3.5cm" }}>
          <span className="font-body uppercase text-gold-dark" style={{ fontSize: "5pt", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Lateral
          </span>
        </div>
        <div className="flex items-center w-full" style={{ height: "13cm" }}>
          <span className="font-body uppercase text-muted-foreground" style={{ fontSize: "6pt", letterSpacing: "0.15em", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            ↑ Fundo (info nutricional) ↓
          </span>
        </div>
        <div className="flex items-center w-full" style={{ height: "3.5cm" }}>
          <span className="font-body uppercase text-gold-dark" style={{ fontSize: "5pt", writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
            Lateral
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="text-center animate-fade-up" style={{ animationDelay: "0.45s" }}>
        <p className="font-body text-muted-foreground" style={{ fontSize: "7pt" }}>
          Arte no topo · Vire 180° na horizontal → Informações nutricionais no fundo
        </p>
      </div>
    </div>
  );
}
