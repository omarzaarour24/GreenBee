import {supabaseClient} from "$lib/supabaseClient";

export async function getConverters(){
    return supabaseClient.from('converter').select(`
    id,
    status,
    customer_id,
    customer (
        id,
      name
    )
  `).order('id',{ascending:true});
}

export async function getConverter(id:number){
    return supabaseClient.from('converter').select('*').eq('id', id);
}

export async function getCustomerConverters(customerID:number){
    return supabaseClient.from('converter').select(`
    id,
    status,
    customer_id,
    customer (
        id,
      name
    )
  `).eq('customer_id',customerID);
}


/**
 * Will update converter by taking the converter id as a param and the data.
 * Data passed needs to be a JSON format, example below
 * {
 *     <Column name>:<value>
 * }
 * @param id
 * @param data
 */
export async function updateConverter(converter: any){
    return supabaseClient.from('converter').update(converter).eq('id',converter.id);
}

/**
 * Will add converter to the table with provided data in json format
 * Example below:
 * {
 *     <Colum name>:<value>
 * }
 * @param data
 */
export async function addConverter(data:any){
    return supabaseClient.from('converter').insert(data);
}

export async function deleteConverter(id: number){
    return supabaseClient.from('converter').delete().eq('id', id);
}


