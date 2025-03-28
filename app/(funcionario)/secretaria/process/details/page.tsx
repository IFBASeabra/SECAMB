import { createClient } from "@/utils/supabase/server";
import Details from "./Details";

export default async function page(props: {
    searchParams: Promise<{ protocol: string }>;
}) {
    const searchParams = await props.searchParams;
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("process")
        .select('*')
        .eq("protocol", searchParams.protocol)

    if (error) {
        return null
    }


    if (!data || data.length === 0) {
        return null
    }




    return (
        <Details data={data[0]} />
    )
}
