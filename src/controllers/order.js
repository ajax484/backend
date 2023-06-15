import supabase from "../../config/supabase.config.js";

const getOrders = async (request, response) => {
  const { data, error } = await supabase
    .from("products")
    .select(`*, vendor:vendors!inner(*)`)
    .order("rating", { ascending: false, nullsFirst: false })
    .order("name", { ascending: true })
    .order("created_at", { ascending: false });

  response.status(200).send(data);
};

export { getOrders };
