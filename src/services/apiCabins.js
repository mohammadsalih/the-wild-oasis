import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded ");
  }

  return data;
}

export async function deleteCabin(cabinId) {
  let { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);

  if (error) {
    console.log(error);
    throw new Error("cabins could not be loaded ");
  }

  return data;
}
