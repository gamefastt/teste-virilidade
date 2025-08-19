import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StickyOfferBar } from "@/components/StickyOfferBar";

// (sem import de /lovable-uploads aqui)
import heroVisual from "@/assets/hero-visual.png";
import fireBackground from "@/assets/fire-background.png";
import garantiaImage from "@/assets/garantia-90.png";

export const VSL = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const unlockedSectionRef = useRef<HTMLDivElement>(null);

  // ========================================
  // TEMPORIZADOR - EDITAR AQUI O TEMPO
  // ========================================
  // Tempo em segundos para liberar a seção de baixo
  const VSL_UNLOCK_SECONDS = 77; // 1:17 minutos

  useEffect(() => {
    setTimeLeft(VSL_UNLOCK_SECONDS);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsUnlocked(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Scroll listener para mostrar barra fixa após 25% da seção liberada
  useEffect(() => {
    if (!isUnlocked) return;

    const handleScroll = () => {
      if (!unlockedSectionRef.current) return;

      const sectionTop = unlockedSectionRef.current.offsetTop;
      const sectionHeight = unlockedSectionRef.current.offsetHeight;
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      // Calcula se rolou 25% da seção liberada
      const sectionScrolled = scrollTop + windowHeight - sectionTop;
      const scrollPercentage = sectionScrolled / sectionHeight;

      if (scrollPercentage >= 0.25 && !showStickyBar) {
        setShowStickyBar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isUnlocked, showStickyBar]);

  // useEffect para carregar o script do vturb
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/a76bece8-1841-4b3c-a0e7-616fe0020fc1/players/689e46f2d9373647d501cc64/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

    const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header sticky no topo */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full p-3 md:p-4 bg-black/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#FFD700] leading-tight drop-shadow-lg">
            Parabéns, você foi selecionado para receber o Tadalared Premium
          </h1>
        </div>
      </header>

      {/* Spacer para compensar o header fixo */}
      <div className="h-16 md:h-20"></div>

      <div className="max-w-6xl mx-auto p-4 space-y-8">
        {/* Seção do vídeo */}
        <section className="text-center py-8">
          <div className="relative inline-block w-full max-w-4xl mx-auto shadow-card-premium rounded-xl overflow-hidden">
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <div 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{
                  __html: '<vturb-smartplayer id="vid-689e46f2d9373647d501cc64" style="display: block; margin: 0 auto; width: 100%; height: 100%;"></vturb-smartplayer>'
                }}
              />
            </div>
          </div>
        </section>

        {/* Seção que aparece após o timer */}
        {isUnlocked && (
          <div ref={unlockedSectionRef} className="space-y-12 animate-fade-in">
            {/* Imagem do produto */}
            <section className="text-center">
              <div className="relative max-w-md mx-auto">
                <div className="relative group">
                  <img
                    src="/lovable-uploads/8128bebb-ec8f-436e-b562-cae99627a5b7.png"
                    alt="Tadalared Premium - Fórmula 10x mais potente"
                    className="w-full h-auto rounded-xl shadow-premium group-hover:shadow-fire transition-all duration-500 transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-ping opacity-20" />
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-ping opacity-30 animation-delay-150" />
                </div>
              </div>
            </section>

            {/* Botão de compra principal */}
             <section className="text-center pb-8">
              <Button
                variant="cta"
                size="xl"
                className="w-full max-w-md mx-auto animate-pulse"
                onClick={() => {
                  window.location.href =
                    "https://pay.comprasmarketplace.com/checkout/bcc9ce31-d52b-4847-b776-c787a44c6135";
                }}
              >
                Garantir meu Tadalared Premium GRÁTIS
              </Button>
            </section>
            {/* Depoimentos */}
            <section>
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">
                Veja o que nossos clientes dizem
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-card-premium">
                  <CardContent className="p-4">
                    <img src="/imagem/dep1.jpg" alt="Depoimento WhatsApp 1" className="w-full h-auto rounded-lg" />
                  </CardContent>
                </Card>

                <Card className="shadow-card-premium">
                  <CardContent className="p-4">
                    <img src="/imagem/dep2.jpg" alt="Depoimento WhatsApp 2" className="w-full h-auto rounded-lg" />
                  </CardContent>
                </Card>

                <Card className="shadow-card-premium">
                  <CardContent className="p-4">
                    <img src="/imagem/dep3.jpg" alt="Depoimento WhatsApp 3" className="w-full h-auto rounded-lg" />
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Segundo botão */}
             <section className="text-center pb-8">
              <Button
                variant="cta"
                size="xl"
                className="w-full max-w-md mx-auto animate-pulse"
                onClick={() => {
                  window.location.href =
                    "https://pay.comprasmarketplace.com/checkout/bcc9ce31-d52b-4847-b776-c787a44c6135";
                }}
              >
                Garantir meu Tadalared Premium GRÁTIS
              </Button>
            </section>

            {/* Garantia */}
            <section className="text-center">
              <div className="max-w-lg mx-auto bg-card rounded-xl p-6 shadow-card-premium">
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16">
                    <img src={garantiaImage} alt="Garantia 90 dias" className="w-full h-full object-contain" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-foreground">Garantia incondicional de 90 dias.</h3>
                    <p className="text-muted-foreground">Se não funcionar, devolvemos o seu dinheiro.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">Perguntas Frequentes</h2>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="tempo" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Quanto tempo demora para chegar?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    De <strong>3 a 10 dias</strong>, dependendo do envio e da sua região.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="alcool" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Pode consumir com bebida alcoólica?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Sim.</strong> A fórmula do Tadalared é natural.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="garantia" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">Tem garantia?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Sim, 90 dias.</strong> Se não funcionar, devolvemos seu dinheiro.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="uso" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">Como usar?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Tome <strong>1 cápsula até 20 minutos antes</strong> da relação. <strong>Duração: até 24h.</strong>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="composicao" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Qual a composição do Tadalared Premium?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    O Tadalared Premium é formulado com ingredientes 100% naturais e de alta performance, incluindo:
                    <br /><br />
                    <strong>Tribulus Terrestris (95% saponinas)</strong> – Aumenta a produção natural de testosterona e melhora o desempenho sexual.
                    <br /><br />
                    <strong>Maca Peruana</strong> – Potente estimulante natural, melhora libido e energia.
                    <br /><br />
                    <strong>Ginseng Panax</strong> – Favorece a circulação sanguínea, ajudando na ereção firme e duradoura.
                    <br /><br />
                    <strong>L-Arginina</strong> – Aminoácido que promove vasodilatação, melhorando fluxo sanguíneo peniano.
                    <br /><br />
                    <strong>Catuaba</strong> – Estimulante afrodisíaco tradicional, auxilia no controle da ejaculação precoce.
                    <br /><br />
                    <strong>Zinco Quelato</strong> – Mineral essencial para a saúde sexual e produção hormonal.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="anvisa" className="bg-card rounded-lg px-6 shadow-card-premium">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    O Tadalared Premium tem liberação da Anvisa?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <strong>Sim.</strong> O Tadalared Premium é registrado como suplemento natural, seguindo todas as normas e regulamentações da Anvisa para segurança e qualidade.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Botão final */}
            <section className="text-center pb-8">
              <Button
                variant="cta"
                size="xl"
                className="w-full max-w-md mx-auto animate-pulse"
                onClick={() => {
                  window.location.href =
                    "https://pay.comprasmarketplace.com/checkout/bcc9ce31-d52b-4847-b776-c787a44c6135";
                }}
              >
                Garantir meu Tadalared Premium GRÁTIS
              </Button>
            </section>
          </div>
        )}
      </div>

      {/* Barra fixa inferior */}
      <StickyOfferBar 
        isVisible={showStickyBar} 
        onShow={() => {}} 
      />
    </div>
  );
};
