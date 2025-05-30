import { createClient } from '@/utils/supabase/server';
import './myenterprise.scss';

interface ContactEnterprise {
  id: string;
  id_enterprise: string;
  contact_name: string;
  telephone: string;
  cellphone: string;
  email: string;
}

async function getContactData(id: string): Promise<ContactEnterprise | null> {
  const supabase = await createClient();

  // Realizando a consulta sem tipar diretamente no `.from()`
  const { data, error } = await supabase
    .from('contact_enterprise')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro ao buscar dados:', error.message);
    return null;
  }

  return data;
}

async function Empreendimentos() {
  const idContato = '1';

  // Buscando os dados do contato
  const contactData = await getContactData(idContato);

  if (!contactData) {
    return <div>Contato não encontrado.</div>;
  }

  const { contact_name, telephone, cellphone, email } = contactData;

  return (
    <div className="empreendimento-container">
      <h1>Empreendimentos</h1>
      <table className="empreendimento-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Celular</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{contact_name}</td>
            <td>{telephone}</td>
            <td>{cellphone}</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Empreendimentos;
