import {supabaseClient} from "$lib/supabaseClient";

export async function getCompanies(){
    return supabaseClient.from('company').select('*').order('id',{ascending:true});
}

export async function getCompany(name: string){
    return supabaseClient.from('company').select('*').ilike('name', name);
}

/**
 * Will update company by taking the company name as a param and the data.
 * Data passed needs to be a JSON format, example below
 * {
 *     <Column name>:<value>
 * }
 * @param name
 * @param data
 */
export async function updateCompany(id: string, data: any){
    return supabaseClient.from('company')
    .update(data)
    .eq('id', id)
    .select();
}

/**
 * Will add company to the table with provided data in json format
 * Example below:
 * {
 *     <Colum name>:<value>
 * }
 * @param data
 */
export async function addCompany(data:any){
   return supabaseClient.from('company').insert(data);
}

export async function deleteCompany(id: number){
   return supabaseClient.from('company').delete().eq('id', id);
}

export async function getSelectCompanies(){
    return supabaseClient.from('company').select('id, name').order('id',{ascending:true});
}

