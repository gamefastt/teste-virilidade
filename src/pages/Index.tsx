import { useState } from "react";
import { Quiz } from "@/components/Quiz";
import { VSL } from "@/components/VSL";

const Index = () => {
  const [showVSL, setShowVSL] = useState(false);

  const handleQuizComplete = () => {
    setShowVSL(true);
  };

  if (showVSL) {
    return <VSL />;
  }

  return <Quiz onComplete={handleQuizComplete} />;
};

export default Index;
