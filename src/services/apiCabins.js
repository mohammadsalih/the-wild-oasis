import supabase, { supabaseUrl } from "./supabase";

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

export async function createOrEditCabin(newCabin, id) {
  // Example if newCabin.image is an object:
  const hasImagePath = String(newCabin.image)?.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${Math.random()}-${
    newCabin.image.name
  }`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
  const imageFile = newCabin.image;

  let query = supabase.from("cabins");

  // 1. create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);

    throw new Error("cabin could not be created ");
  }

  if (hasImagePath) return data;

  // 2. upload the image
  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, imageFile);

  // 3. delete cabin if image did not get uploaded
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(error);
    throw new Error(
      "cabin image could not be uploaded , and the cabin was not created"
    );
  }

  return data;
}
