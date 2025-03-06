import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type T = {
  name: string;
  register_type: string;
  profile: string;
  address: string;
};

export async function Data(id: number): Promise<T[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user_info")
    .select()
    .eq("id", id);
  return data || [];
}

async function EditData() {
  const dataUser: T[] = await Data(14);
  return (
    <form className="register">
      <h1 className="register__title">editar usuario</h1>
      {dataUser?.map((d) => (
        <div className="register__form">
          <div className="register__form-group">
            <Label htmlFor="name"></Label>
            <Input name="name" placeholder="Nome" value={d.name} required />
            <p>{d.address}</p>
          </div>
        </div>
      ))}
    </form>
  );
}

export default EditData;
