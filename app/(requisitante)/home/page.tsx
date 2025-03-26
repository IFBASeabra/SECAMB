// Em algum arquivo como AreaDoRequisitante.tsx ou outra página
import { CarouselDefault } from '@/components/ui/Carousel'; // Ajuste o caminho conforme necessário

export default function AreaDoRequisitante() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center my-8">
          Área do Requisitante
        </h1>
        <CarouselDefault />
      </div>
    </div>
  );
}
