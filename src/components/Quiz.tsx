import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExitIntentModal } from "./ExitIntentModal";
// Importação da imagem hero principal
import heroProductVisual from "@/assets/hero-product-visual.png";
// Importação do produto original
import produtoOriginal from "/lovable-uploads/314d3233-82fc-4b62-82b0-0e612948eef0.png";

interface QuizProps {
  onComplete: () => void;
}

export const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showStart, setShowStart] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [virileScore, setVirileScore] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const [hasShownExitModal, setHasShownExitModal] = useState(false);

  // Detectar tentativa de saída durante o quiz
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Só mostrar se estiver no quiz (não na tela inicial ou final) e ainda não mostrou
      if (!showStart && currentQuestion < questions.length && !hasShownExitModal && e.clientY <= 0) {
        setShowExitModal(true);
        setHasShownExitModal(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Só mostrar se estiver no quiz ativo
      if (!showStart && currentQuestion < questions.length && !hasShownExitModal) {
        e.preventDefault();
        e.returnValue = '';
        setShowExitModal(true);
        setHasShownExitModal(true);
        return '';
      }
    };

    if (!showStart && currentQuestion < questions.length) {
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showStart, currentQuestion, hasShownExitModal]);

  const handleExitModalClose = () => {
    setShowExitModal(false);
  };

  const handleContinueToVSL = () => {
    setShowExitModal(false);
    onComplete(); // Vai direto para a VSL
  };

  // EDITAR: Perguntas do quiz
  const questions = [
    {
      id: 1,
      question: "Você tem mais de 18 anos?",
      options: [
        { text: "✅ Sim", value: "yes", scoreType: "neutral" },
        { text: "❌ Não", value: "no", scoreType: "block" }
      ]
    },
    {
      id: 2,
      question: "Já perdeu a ereção no meio e ficou com vergonha de encarar a parceira depois?",
      options: [
        { text: "✅ Sim", value: "yes", scoreType: "weak" },
        { text: "❌ Não", value: "no", scoreType: "virile" }
      ]
    },
    {
      id: 3,
      question: "Costuma sentir dificuldade para manter ereção firme até o final?",
      options: [
        { text: "✅ Sim", value: "yes", scoreType: "weak" },
        { text: "❌ Não", value: "no", scoreType: "virile" }
      ]
    },
    {
      id: 4,
      question: "Você sabia que 90% das traições começam quando a mulher perde interesse pelo sexo com o marido?",
      options: [
        { text: "✅ Sim", value: "yes", scoreType: "virile" },
        { text: "❌ Não", value: "no", scoreType: "weak" }
      ]
    },
    {
      id: 5,
      question: "Se aprovado no programa, você topa testar o Tadalared Premium e dar um feedback?",
      options: [
        { text: "✅ Sim", value: "yes", scoreType: "neutral" },
        { text: "❌ Não", value: "no", scoreType: "neutral" }
      ]
    }
  ];

  const handleAnswer = (answer: string, scoreType: string) => {
    // Bloquear se menor de idade
    if (currentQuestion === 0 && answer === "no") {
      return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-destructive mb-4">
                Oferta exclusiva para maiores de idade.
              </h2>
              <p className="text-muted-foreground">
                Este produto é destinado apenas para pessoas acima de 18 anos.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Atualizar score de virilidade
    let newScore = virileScore;
    if (scoreType === "virile") newScore += 20;
    if (scoreType === "weak") newScore -= 10;
    setVirileScore(Math.max(0, Math.min(100, newScore)));

    setAnswers([...answers, answer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completo - sempre aprovar
      setTimeout(onComplete, 1000);
    }
  };

  const startQuiz = () => {
    setShowStart(false);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (showStart) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header sticky no topo */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full p-3 md:p-4 bg-black/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            {/* Barra de progresso inicial */}
            <div className="flex-1 flex items-center gap-2 md:gap-3">
              <span className="text-lg md:text-2xl">👎</span>
              <div className="flex-1 h-2 md:h-3 bg-muted rounded-full overflow-hidden min-w-[100px]">
                <div 
                  className="h-full bg-gradient-progress transition-all duration-500"
                  style={{ width: "0%" }}
                />
              </div>
              <span className="text-lg md:text-2xl">💪</span>
            </div>
          </div>
        </header>

        {/* Spacer para compensar o header fixo */}
        <div className="h-14 md:h-16"></div>

        {/* Hero section com imagem de impacto */}
        <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background com gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
              {/* Coluna do texto */}
              <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                    Descubra se você está apto a receber o 
                    <span className="text-primary block mt-2">TadalaRed Premium grátis</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-muted-foreground">
                    Responda 5 perguntas rápidas. Não precisa digitar nada.
                  </p>
                </div>

                <Button 
                  id="startQuizBtn"
                  onClick={startQuiz}
                  variant="cta"
                  size="xl"
                  className="text-xl px-12 py-6 shadow-premium hover:shadow-fire transition-all duration-300 hover:scale-105"
                >
                  Começar teste
                </Button>
              </div>

              {/* Coluna da imagem */}
              <div className="relative order-1 lg:order-2">
                <div className="relative group">
                  <img 
                    src={heroProductVisual}
                    alt="TadalaRed Premium - Conquiste sua melhor performance"
                    className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-fire transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Efeito de brilho */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  {/* Partículas animadas */}
                  <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full animate-ping opacity-30" />
                  <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-accent rounded-full animate-ping opacity-40 animation-delay-150" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Se menor de idade foi selecionado na primeira pergunta
  if (currentQuestion === 0 && answers.length > 0 && answers[0] === "no") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-card-premium">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Oferta exclusiva para maiores de idade.
            </h2>
            <p className="text-muted-foreground">
              Este produto é destinado apenas para pessoas acima de 18 anos.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz finalizado - tela de sucesso
  if (currentQuestion >= questions.length) {
    return (
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        {/* Header sticky no topo com progresso completo */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full p-3 md:p-4 bg-black/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3">
              <span className="text-2xl">👎</span>
              <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-progress w-full transition-all duration-500" />
              </div>
              <span className="text-2xl">💪</span>
            </div>
          </div>
        </header>

        {/* Spacer para compensar o header fixo */}
        <div className="h-14 md:h-16"></div>

        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-card-premium">
            <CardContent className="p-8 text-center">
              <h1 className="text-4xl font-bold text-primary mb-6">
                Parabéns! 🎉
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Com base nas suas respostas, você está apto a receber{" "}
                <span className="text-primary font-bold">1 frasco grátis do Tadalared Premium</span>, 
                nossa nova fórmula 10x mais potente.
                <br /><br />
                Clique no botão abaixo para ver como garantir.
              </p>
              <Button 
                variant="cta" 
                size="xl" 
                onClick={onComplete}
                className="w-full md:w-auto animate-pulse"
              >
                Ver como garantir meu frasco grátis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <>
      <div className="min-h-screen bg-gradient-hero flex flex-col">
        {/* Header sticky no topo com barra de progresso */}
        <header className="fixed top-0 left-0 right-0 z-50 w-full p-3 md:p-4 bg-black/80 backdrop-blur-md border-b border-border/50">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            {/* Barra de progresso que avança */}
            <div id="progressBar" className="flex-1 flex items-center gap-2 md:gap-3">
              <span className="text-lg md:text-2xl">👎</span>
              <div className="flex-1 h-2 md:h-3 bg-muted rounded-full overflow-hidden min-w-[100px]">
                <div 
                  className="h-full bg-gradient-progress transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="text-lg md:text-2xl">💪</span>
            </div>
          </div>
        </header>

        {/* Spacer para compensar o header fixo */}
        <div className="h-14 md:h-16"></div>

        {/* Pergunta atual */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl shadow-card-premium">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="text-sm text-muted-foreground mb-2">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {currentQ.question}
                </h2>
              </div>
              
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="quiz"
                    onClick={() => handleAnswer(option.value, option.scoreType)}
                    className="w-full justify-start text-left"
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de intenção de saída */}
      <ExitIntentModal 
        isOpen={showExitModal}
        onClose={handleExitModalClose}
        onContinueToVSL={handleContinueToVSL}
      />
    </>
  );
};
