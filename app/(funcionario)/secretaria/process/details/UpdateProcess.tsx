import { createClient } from "@/utils/supabase/server";
import Details from "./Details";

export default async function page(props: {
    searchParams: Promise<{ protocol: string, statusName: string  }>;
}) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();


    const { data, error } = await supabase
        .from("process")
        .update({status: searchParams.statusName})
        .match({ protocol: searchParams.protocol})

    if (error) {
        return null
    }


    if (!data ) {
        return null
    }

}
