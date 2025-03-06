import { createClient } from "@/utils/supabase/server";

import "./usuarios.scss";
import Link from "next/link";

async function Usuarios() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_info")
    .select()
    .eq("id", "user");

  if (error) {
    return <>Houve um erro. {error.message}</>;
  }

  return (
    <div className="usuarios-container">
      <h1>Usuários</h1>
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>Editar</th>
            <th>Nome</th>
            <th>Documento</th>
            <th>Tipo de Registro</th>
            <th>Perfil</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d) => (
            <tr key={d.id}>
              <td>
                <Link href={`/admin/usuarios/edit?id=${d.id}`}>editar</Link>
              </td>
              <td>{d.name}</td>
              <td>{d.document}</td>
              <td>{d.register_type}</td>
              <td>{d.profile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;
