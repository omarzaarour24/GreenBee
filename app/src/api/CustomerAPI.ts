import {supabaseClient} from "$lib/supabaseClient";

export async function getCustomers(){
    return supabaseClient.from('customer').select(`
    id,
    name,
    email,
    address,
    phone_number,
    company (
        id,
      name
    )
  `).order('id',{ascending:true});
}

export async function getCustomerByID(id:number){
    return supabaseClient.from('customer').select('*').eq('id', id);
}

export async function getCustomerByName(name:string){
    return supabaseClient.from('customer').select('*').eq('name',name);
}

export async function getCustomersByCompany(company_id:string){
    return supabaseClient.from('customer').select(`
    id,
    name,
    email,
    address,
    phone_number,
    company (
        id,
      name
    )
  `).eq('company_id',company_id);
}
/**
 * Will update customer by taking the customer id as a param and the data.
 * Data passed needs to be a JSON format, example below
 * {
 *     <Column name>:<value>
 * }
 * @param id
 * @param data
 */
export async function updateCustomer(id: number, data: any){
    return supabaseClient.from('customer').update(data).eq('id',id).select();
}

/**
 * Will add customer to the table with provided data in json format
 * Example below:
 * {
 *     <Colum name>:<value>
 * }
 * @param data
 */
export async function addCustomer(data:any){
    return supabaseClient.from('customer').insert(data).select();
}

export async function deleteCustomer(id: number){
    return supabaseClient.from('customer').delete().eq('id', id);
}


