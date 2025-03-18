import { client } from "./client";

export const getCabins = async () => {
  const { data } = await client.get("/api/cabins");
  return data;
};

export const getCabin = async (id) => {
  const { data } = await client.get(`/api/cabins/${id}`);
  return data;
};

export const createCabin = async (cabin) => {
  const form = new FormData();
  form.append("name", cabin.name);
  form.append("location", cabin.location);
  form.append("regularPrice", cabin.regularPrice);
  form.append("discount", cabin.discount);
  form.append("image", cabin.image);
  form.append("bedroom", cabin.bedroom);
  [...cabin.images].map((e) => {
    form.append("images", e);
  });

  const { data } = await client.post("/api/cabins", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const duplicateCabin = async (id) => {
  const { data } = await client.post(`/api/cabins/${id}/duplicate`);
  return data;
};

export const updateCabin = async (cabin, id) => {
  console.log(cabin);
  const form = new FormData();
  form.append("name", cabin.name);
  form.append("location", cabin.location);
  form.append("regularPrice", cabin.regularPrice);
  form.append("discount", cabin.discount);
  form.append("image", cabin.image);
  form.append("bedroom", cabin.bedroom);

  [...cabin.images].map((e) => {
    form.append("images", e);
  });

  if (!cabin.image && ![...cabin.images].length) {
    form.delete("image");
    form.delete("images");

    const { data } = await client.patch(`/api/cabins/without-image/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  const { data } = await client.patch(`/api/cabins/${id}`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteCabin = async (id) => {
  const { data } = await client.delete(`/api/cabins/${id}`);
  return data;
};
