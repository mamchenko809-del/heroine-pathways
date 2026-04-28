import { Stage } from "@/data/stages";

type Props = {
  stage: Stage;
  onPrev: () => void;
  onNext: () => void;
};

export const StagePanel = ({ stage, onPrev, onNext }: Props) => {
  return (
    <article
      key={stage.id}
      className="relative bg-card/70 backdrop-blur-sm border border-sage/20 rounded-2xl p-8 md:p-10 shadow-soft animate-fade-up grain"
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="font-serif italic text-5xl md:text-6xl text-rose leading-none">
          {stage.roman}
        </span>
        <div className="h-px flex-1 bg-sage/30" />
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          этап {stage.id} из 10
        </span>
      </div>

      <h2 className="font-serif text-3xl md:text-5xl text-ink leading-tight text-balance">
        {stage.title}
      </h2>
      <p className="font-serif italic text-xl md:text-2xl text-rose mt-2">
        {stage.subtitle}
      </p>

      <p className="font-serif italic text-lg md:text-xl text-foreground/80 mt-6 text-pretty border-l-2 border-rose/50 pl-5">
        {stage.essence}
      </p>

      <p className="text-base md:text-[17px] leading-relaxed text-foreground/85 mt-6 text-pretty">
        {stage.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-sage font-medium mb-3">
            Как это проявляется
          </h3>
          <ul className="space-y-2">
            {stage.signs.map((s) => (
              <li key={s} className="flex gap-3 text-sm text-foreground/80">
                <span className="text-rose mt-1.5 h-1 w-1 rounded-full bg-rose flex-shrink-0" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-secondary/60 rounded-xl p-5 border border-sage/20">
          <h3 className="text-xs uppercase tracking-[0.2em] text-sage font-medium mb-3">
            Вопрос для встречи с собой
          </h3>
          <p className="font-serif italic text-xl text-ink leading-snug text-pretty">
            «{stage.question}»
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-sage/20">
        <button
          onClick={onPrev}
          className="group flex items-center gap-2 text-sm text-foreground/70 hover:text-rose transition-colors"
        >
          <span className="font-serif italic text-2xl group-hover:-translate-x-1 transition-transform">←</span>
          предыдущий
        </button>
        <button
          onClick={onNext}
          className="group flex items-center gap-2 text-sm text-foreground/70 hover:text-rose transition-colors"
        >
          следующий
          <span className="font-serif italic text-2xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </article>
  );
};
