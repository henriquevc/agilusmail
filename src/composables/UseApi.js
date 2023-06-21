import useSupabase from '../boot/supabase';
export default function useApi() {
  const { supabase } = useSupabase();

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) throw error;
    return data;
  };

  const listDependency = async (table, foreignKeyName, idDependency) => {
    const { data, error } = await supabase
      .from(table)
      .select()
      .eq(foreignKeyName, idDependency.toString());
    if (error) throw error;
    return data;
  };

  const getListsWithEmails = async () => {
    const { data, error } = await supabase.from('lists').select(
      `id, name, emails (
        email
      )`
    );
    if (error) throw error;
    return data;
  };

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select('*').eq('id', id);
    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
        },
      ])
      .select();
    if (error) throw error;
    return data;
  };

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        ...form,
      })
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id: id });
    if (error) throw error;
    return data;
  };

  return {
    list,
    listDependency,
    getListsWithEmails,
    getById,
    post,
    update,
    remove,
  };
}
