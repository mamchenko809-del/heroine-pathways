import { useEffect, useState } from "react";
import { stages } from "@/data/stages";
import { Spiral } from "@/components/journey/Spiral";
import { StagePanel } from "@/components/journey/StagePanel";

const Index = () => {
  const [active, setActive] = useState(1);

  const stage = stages.find((s) => s.id === active)!;

  const goPrev = () => setActive((id) => (id === 1 ? stages.length : id - 1));
  const goNext = () => setActive((id) => (id === stages.length ? 1 : id + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToJourney = () => {
    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-dawn">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dawn" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-rose-soft/30 blur-3xl animate-float-soft" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sage-soft/40 blur-3xl" />

        <nav className="relative container flex items-center justify-between py-6 text-sm">
          <div className="flex items-center gap-2 font-serif italic text-lg text-ink">
            <span className="h-2 w-2 rounded-full bg-rose animate-pulse-petal" />
            heroine&apos;s journey
          </div>
          <button
            onClick={scrollToJourney}
            className="text-foreground/70 hover:text-rose transition-colors uppercase tracking-[0.2em] text-xs"
          >
            начать путь ↓
          </button>
        </nav>

        <div className="relative container pt-16 pb-28 md:pt-28 md:pb-40 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-sage mb-8 animate-fade-up">
            по книге Морин Мёрдок · 1990
          </p>
          <h1 className="font-serif text-5xl md:text-8xl leading-[1.02] text-ink text-balance animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Путешествие <span className="italic text-rose">героини</span>
          </h1>
          <p className="font-serif italic text-2xl md:text-3xl text-foreground/70 mt-6 max-w-2xl text-pretty animate-fade-up" style={{ animationDelay: "0.2s" }}>
            десять этапов женского пути к целостности — не вверх, а вглубь, не наружу, а домой.
          </p>
          <p className="text-base md:text-lg text-foreground/75 mt-8 max-w-xl leading-relaxed text-pretty animate-fade-up" style={{ animationDelay: "0.3s" }}>
            В отличие от линейного «пути героя» Кэмпбелла, путь героини — это спираль. Она ведёт от
            отделения к спуску, от спуска — к воссоединению, и наконец — к священному союзу внутри
            себя. Этот сайт — карта десяти этапов.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <button
              onClick={scrollToJourney}
              className="group bg-ink text-cream px-7 py-4 rounded-full text-sm uppercase tracking-[0.2em] hover:bg-rose transition-colors shadow-petal"
            >
              войти в спираль
              <span className="ml-2 inline-block group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>
            <span className="text-sm text-muted-foreground font-serif italic">
              «Героиня должна вернуться домой — но домой к самой себе.»
            </span>
          </div>
        </div>
      </header>

      {/* Journey */}
      <section id="journey" className="relative py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.35em] text-sage mb-4">спираль пути</p>
            <h2 className="font-serif text-4xl md:text-6xl text-ink text-balance">
              Десять этапов <span className="italic text-rose">возвращения</span>
            </h2>
            <p className="text-foreground/70 mt-5 text-pretty">
              Нажмите на любую точку спирали — или используйте стрелки на клавиатуре. Путь не обязательно
              проходить по порядку: героиня может оказаться на любом этапе в любое время.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-10">
              <Spiral active={active} onSelect={setActive} />
            </div>
            <StagePanel stage={stage} onPrev={goPrev} onNext={goNext} />
          </div>
        </div>
      </section>

      {/* All stages overview */}
      <section className="py-20 md:py-28 bg-secondary/40 border-y border-sage/20">
        <div className="container">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-sage mb-4">карта пути</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ink text-balance">
              Весь путь <span className="italic text-rose">одним взглядом</span>
            </h2>
          </div>

          <ol className="grid md:grid-cols-2 gap-x-10 gap-y-2">
            {stages.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => {
                    setActive(s.id);
                    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left group flex items-baseline gap-5 py-5 border-b border-sage/20 hover:border-rose transition-colors"
                >
                  <span className="font-serif italic text-3xl text-rose w-10 flex-shrink-0">
                    {s.roman}
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-2xl text-ink group-hover:text-rose transition-colors text-balance">
                      {s.title}
                    </span>
                    <span className="block text-sm text-foreground/60 mt-1 italic font-serif">
                      {s.subtitle}
                    </span>
                  </span>
                  <span className="font-serif italic text-2xl text-sage opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing */}
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-sage mb-6">эпилог</p>
          <p className="font-serif italic text-3xl md:text-5xl text-ink leading-tight text-balance">
            «Целостность не достигается. Она вспоминается — как родной язык, на котором мы когда-то умели говорить.»
          </p>
          <p className="mt-8 text-sm text-muted-foreground font-serif italic">
            — по мотивам Морин Мёрдок, «Путешествие героини. Женский путь к целостности»
          </p>
        </div>
      </section>

      <footer className="py-10 border-t border-sage/20">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>Образовательный проект · по книге Maureen Murdock, 1990</span>
          <span className="font-serif italic">путь — это и есть дом</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
