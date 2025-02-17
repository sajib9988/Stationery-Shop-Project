import { Button } from "./button";
import { useNavigate } from "react-router-dom";

interface BackHomeProps {
  message: string;
}

export const BackHome = ({ message }: BackHomeProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{message}</h2>
        <Button 
          onClick={() => navigate("/")}
          variant="default"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}; 