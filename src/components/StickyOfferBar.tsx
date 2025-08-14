import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import produtoOriginal from "/lovable-uploads/314d3233-82fc-4b62-82b0-0e612948eef0.png";

interface StickyOfferBarProps {
  isVisible: boolean;
  onShow: () => void;
}

export const StickyOfferBar = ({ isVisible, onShow }: StickyOfferBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [urgencyMode, setUrgencyMode] = useState<'time' | 'stock'>('time');
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 59); // 09:59
  const [stockLeft, setStockLeft] = useState(5);

  // Alternância do modo de urgência a cada visualização
  useEffect(() => {
    if (isVisible && !isOpen) {
      setIsOpen(true);
      // Alterna o modo de urgência
      setUrgencyMode(prev => prev === 'time' ? 'stock' : 'time');
      onShow();
    }
  }, [isVisible, isOpen, onShow]);

  // Timer para modo tempo
  useEffect(() => {
    if (urgencyMode === 'time' && isOpen && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [urgencyMode, isOpen, timeLeft]);

  // Simulação de diminuição de estoque
  useEffect(() => {
    if (urgencyMode === 'stock' && isOpen && stockLeft > 1) {
      const stockTimer = setInterval(() => {
        setStockLeft(prev => Math.max(1, prev - 1));
      }, 45000); // Diminui a cada 45 segundos
      return () => clearInterval(stockTimer);
    }
  }, [urgencyMode, isOpen, stockLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reaparece após 15 segundos
    setTimeout(() => {
      setIsOpen(true);
    }, 15000);
  };

  const handleCTAClick = () => {
    window.location.href = "https://pay.paguepaay.top/7vJOGY4k6zaZKXd";
  };

  if (!isVisible || !isOpen) return null;

  return (
    <div 
      id="sticky-offer-bar"
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-fire animate-slide-in-up"
    >
      <div className="max-w-sm sm:max-w-md mx-auto p-3 sm:p-4">
        {/* Botão fechar */}
        <button
          id="sticky-offer-close"
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Imagem do produto */}
          <div className="flex-shrink-0">
            <img 
              src={produtoOriginal}
              alt="TadalaRed Premium"
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-lg"
            />
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 min-w-0">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-foreground leading-tight">
                Pegue sua amostra grátis
              </h3>
              <p className="text-xs sm:text-sm text-accent font-medium">
                Versão Premium 10× mais potente
              </p>
              
              {/* Urgência */}
              <div className="text-xs text-muted-foreground">
                {urgencyMode === 'time' ? (
                  <span>⏰ Expira em {formatTime(timeLeft)}</span>
                ) : (
                  <span>📦 Restam {stockLeft} frascos</span>
                )}
              </div>
            </div>
          </div>

          {/* Botão CTA */}
          <div className="flex-shrink-0">
            <Button
              id="sticky-offer-cta"
              onClick={handleCTAClick}
              variant="cta"
              size="sm"
              className="text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 bg-gradient-cta hover:scale-105 transition-all duration-300 shadow-fire whitespace-nowrap"
            >
              Quero minha amostra
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};