'use client';
import { Carousel } from '@material-tailwind/react';
import { useState } from 'react';

// tipando as setas
type ArrowProps = {
  handleClick: () => void;
  isDisabled: boolean;
};

//tipando os trenzinho que fica embaixo das páginas nos slides/navegação/indicadores de páginas
type NavigationProps = {
  setActiveIndex: (index: number) => void; //define o indice ativo
  activeIndex: number; // o indice que ele está no momento
  length: number;
};

//botão de anterir
const PrevArrow = ({ handleClick, isDisabled }: ArrowProps) => (
  <button
    onClick={handleClick}
    disabled={isDisabled}
    className="absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 h-12 text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
  >
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

//botão de proxima página
const NextArrow = ({ handleClick, isDisabled }: ArrowProps) => (
  <button
    onClick={handleClick}
    disabled={isDisabled}
    className="absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-12 h-12 text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
  >
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="h-7 w-7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

// n(no caso aqui três) pontinhos que ficam embaixo, indicando em qual pagina está, do total
const Navigation = ({
  setActiveIndex,
  activeIndex,
  length,
}: NavigationProps) => (
  <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
    {Array.from({ length }).map((_, i) => (
      <span
        key={i}
        className={`block h-3 w-3 cursor-pointer rounded-full transition-colors ${
          activeIndex === i ? 'bg-white' : 'bg-white/50'
        }`}
        onClick={() => setActiveIndex(i)}
      />
    ))}
  </div>
);

export function CarouselTransition() {
  const images = [
    'https://www.ideiasocioambiental.com.br/wp-content/uploads/2019/11/meioambiente34.png',

    'https://s2.glbimg.com/9wmrRKpH5JJS3mQkUTJ8-tyNG8A=/620x430/e.glbimg.com/og/ed/f/original/2016/06/06/thinkstockphotos-475628990.jpg',

    'https://i2.wp.com/vivagreen.com.br/wp-content/uploads/2015/10/tumblr_inline_nph1hnibZb1t00dcx_500.png?w=500&ssl=1',

    'https://tissueonline.com.br/novo/wp-content/uploads/2022/07/Cuidar-do-meio-ambiente-e-um-compromisso-de-365-dias-por-ano.jpg',
  ];

  //guarda o indice da pagina do slide que ta ativo, no caso aí 0, q é o primeiro
  const [activeIndex, setActiveIndex] = useState(0);

  //aqui é onde acontece o loop, tipo, se estiver na primeira pagina e quiser ir para a ultima, é só voltar
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  //aqui acontece outro loop, só que é o inverso, se estiver na última pagina e quiser ir para a primeira, clica no próximo denovo que vai dar certo
  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="absolute w-full h-[300px] lg:h-[400px]">
      {/* transição suave usando fade (opacidade) */}
      <div className="absolute w-full h-full">
        {/* Imagem ativa */}
        <img
          src={images[activeIndex]}
          alt={`Imagem ${activeIndex + 1}`}
          className="h-full w-full object-cover rounded-xl duration-[3000ms] ease-in-out"
        />
      </div>

      {/* Texto (esse texto e as imagens vou trocar ainda... não sei exatamente o que pôr)*/}
      <div className="absolute inset-0 flex justify-center items-left text-center p-4 bg-black/50 z-70">
        <div className="text-green-100">
          <h2 className="text-3xl font-medium mb-4">
            <strong>SECAMB</strong>
          </h2>
          <p className="text-lg font-medium">Secretaria de Meio Ambiente</p>
        </div>
      </div>

      {/*botões de navegação, as duas setas recebem as funções q declarei la em cima */}
      <PrevArrow handleClick={handlePrev} isDisabled={false} />
      <NextArrow handleClick={handleNext} isDisabled={false} />
      {/* as bolinhas, indicando em qual pagina de slide o carrosel ta*/}
      <Navigation
        setActiveIndex={setActiveIndex}
        activeIndex={activeIndex}
        length={images.length}
      />
    </div>
  );
}
