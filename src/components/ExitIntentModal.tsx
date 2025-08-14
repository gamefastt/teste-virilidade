import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import produtoOriginal from "/lovable-uploads/314d3233-82fc-4b62-82b0-0e612948eef0.png";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueToVSL: () => void;
}

export const ExitIntentModal = ({ isOpen, onClose, onContinueToVSL }: ExitIntentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm sm:max-w-md mx-auto p-0 bg-card border-border shadow-fire overflow-hidden">
        {/* Header com ícone de alerta */}
        <div className="bg-gradient-cta p-4 text-center">
          <div className="text-2xl md:text-3xl mb-2">⚠️</div>
          <h2 className="text-lg md:text-xl font-bold text-white">
            Espere! Não feche esta página
          </h2>
        </div>

        {/* Conteúdo principal */}
        <div className="p-6 space-y-4">
          {/* Imagem do produto e texto */}
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img 
                src={produtoOriginal}
                alt="TadalaRed Premium"
                className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg"
              />
            </div>
            <div className="flex-1">
              <p className="text-accent font-semibold text-sm md:text-base">
                Apenas 7 unidades disponíveis
              </p>
              <p className="text-muted-foreground text-xs md:text-sm mt-1">
                Garante agora sua amostra exclusiva antes que acabe!
              </p>
            </div>
          </div>

          {/* Urgência visual */}
          <div className="bg-muted/50 p-3 rounded-lg border border-accent/20">
            <div className="flex items-center justify-between text-xs md:text-sm">
              <span className="text-muted-foreground">Disponível:</span>
              <span className="text-accent font-bold">100 unidades</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-progress w-1/3 animate-pulse" />
            </div>
          </div>

          {/* Botões de ação */}
          <div className="space-y-3 pt-2">
            <Button 
              onClick={onContinueToVSL}
              variant="cta"
              size="lg"
              className="w-full text-sm md:text-base font-bold px-6 py-3 bg-gradient-cta hover:scale-105 transition-all duration-300 shadow-fire animate-pulse"
            >
              🎯 Quero minha amostra grátis
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              size="sm"
              className="w-full text-xs text-muted-foreground hover:text-foreground border-muted hover:border-border"
            >
              Continuar o teste
            </Button>
          </div>
        </div>

        {/* Rodapé com garantia */}
        <div className="bg-muted/30 px-4 py-2 text-center">
          <p className="text-xs text-muted-foreground">
            ✅ 100% seguro • 💯 Garantia total
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};