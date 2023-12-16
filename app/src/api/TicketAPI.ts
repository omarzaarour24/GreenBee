import {supabaseClient} from "$lib/supabaseClient";

export async function getTickets(){
    return supabaseClient.from('ticket').select('*').order('id',{ascending:true});
}

export async function getTicketByID(id:number){
    return supabaseClient.from('ticket').select('*').eq('id', id);
}

export async function getTicketByConveterID(id:number){
    return supabaseClient.from('ticket').select(`
    id,
    status,
    date,
    note,
    converter_id,
    customer (
        id,
      name
    )
    `).eq('converter_id',id);
}

/**
 * Will update Ticket by taking the Ticket id as a param and the data.
 * Data passed needs to be a JSON format, example below
 * {
 *     <Column name>:<value>
 * }
 * @param id
 * @param data
 */
export async function updateTicket(ticket: any){
    await supabaseClient.from('ticket').update(ticket).eq('id',ticket.id);
}

/**
 * Will add ticket to the table with provided data in json format
 * Example below:
 * {
 *     <Colum name>:<value>
 * }
 * @param data
 */
export async function createTicket(data:any){
    return supabaseClient.from('ticket').insert(data);
}

export async function deleteTicket(id: number){
    return supabaseClient.from('ticket').delete().eq('id', id);
}


