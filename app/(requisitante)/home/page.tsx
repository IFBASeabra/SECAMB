import { CarouselTransition } from '@/components/ui/CarouselTransition';
import Link from 'next/link';

export default function AreaDoRequisitante() {
  return (
    <>
      <CarouselTransition />
      {/* essa div de baixo foi criada no mesmo tamanho que o component, que é pros textos não ficarem por baixo do carrossel */}
      <div className="h-[300px] lg:h-[400px]" />

      <div className=" text-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Sobre a Secretaria</h2>
            <p className="text-lg text-justify leading-relaxed">
              A{' '}
              <strong>
                Secretaria Municipal de Desenvolvimento, Turismo e Meio Ambiente
              </strong>{' '}
              atua promovendo o crescimento sustentável de Seabra. Suas
              principais ações envolvem o incentivo ao turismo, o controle
              ambiental e o apoio ao empreendedorismo. Trabalhamos para
              desenvolver o município de forma equilibrada, valorizando a
              natureza e criando oportunidades para todos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-8">Áreas de Atuação</h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Meio Ambiente',
                  desc: 'Controle e uso sustentável dos recursos naturais.',
                },
                {
                  title: 'Turismo Ecológico',
                  desc: 'Preservação e valorização dos atrativos turísticos.',
                },
                {
                  title: 'Serviços Urbanos',
                  desc: 'Limpeza pública e gestão de resíduos sólidos.',
                },
                {
                  title: 'Desenvolvimento Econômico',
                  desc: 'Apoio à microempresa e capacitação profissional.',
                },
                {
                  title: 'Agropecuária e Artesanato',
                  desc: 'Fomento à produção local e economia criativa.',
                },
              ].map((item, idx) => (
                <div key={idx} className="bg-blue-100 rounded-xl p-6 shadow">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-justify">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Acesso Rápido</h2>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/empreendimentos"
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
              >
                Minha Lista de Empreendimentos
              </Link>
              <Link
                href="/processos"
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
              >
                Consultar Processos
              </Link>
              <Link
                href="/processos/novo"
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
              >
                Abrir Novo Processo
              </Link>
            </div>
          </section>

          <section className="bg-blue-100 rounded-xl p-8 shadow-inner">
            <h2 className="text-2xl font-semibold mb-6">
              Fale com a Secretaria
            </h2>
            <ul className="text-gray-800 space-y-2 text-lg">
              <li>
                <strong>Responsável:</strong> João Evangelista de Souza
              </li>
              <li>
                <strong>Telefone:</strong> (75) 3331-1558
              </li>
              <li>
                <strong>E-mail:</strong> setur@seabra.ba.gov.br
              </li>
              <li>
                <strong>Endereço:</strong> Rua Boninal, 217 - 1º andar - Centro
              </li>
              <li>
                <strong>Funcionamento:</strong> das 07:30 às 13:30
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
