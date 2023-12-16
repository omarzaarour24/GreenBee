<script lang="ts">
  import { onMount } from 'svelte';
  import Grid from "gridjs-svelte";
  import { h, html } from 'gridjs';
  import { Drawer, Modal } from 'flowbite'
  import type { DrawerInterface, DrawerOptions, ModalInterface  } from 'flowbite'
	import { getConverters, addConverter, updateConverter, deleteConverter, getCustomerConverters } from '../../api/ConverterApi'
	import { getTicketByConveterID, createTicket, updateTicket, deleteTicket } from '../../api/TicketApi'
  import TabPanel from '../../components/TabPanel.svelte';
  import Tabs from '../../components/Tabs.svelte';
	import { getCustomers, getCustomersByCompany } from '../../api/CustomerApi'
  import {getUserSession} from '../../lib/supabaseSession'
  import moment from 'moment';

    let userSession: any;
    let addingTicket: boolean = false;
    let isUpdate: boolean = true;
    let modalElement: any;
    let modal: ModalInterface;
    let selectedConverter: any = {};
    let selectedId: any = "converter";
    let selectedTicket: any = {};
    let drawerElement: any = {};
    let drawer: DrawerInterface;
    let dataSet: any[] | null = [];
    let tickets: any[] | null = [];
    let customers: any[] = [];
    let addStatusSelect: any;
    let addCustomerSelect: any;
    let ticketStatusSelect: any;
    let ticketCustomerSelect: any;
    let converterCustomerSelect: any;
    let converterStatusSelect: any;
    let ticketStatusOptions: any[] = [
      'Open',
      'Closed'
    ]
    let converterStatusOptions: any[] = [
      'Online',
      'Offline',
      'Error'
    ]
    const options: DrawerOptions = {
      placement: 'right',
      backdrop: true,
      bodyScrolling: false,
      edge: false,
      edgeOffset: '',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30',
    };

    const showModal = () => {
      modal.show();
    }

    const hideModal = () => {
      modal.hide();
    }

    const showAddModal = () => {
      isUpdate = false;
      selectedConverter = {};
      showModal();
    }

    const showDrawer = () => {
      drawer.show();
    }

    const hideDrawer = () => {
      drawer.hide();

    }

    const loadData = async () => {
      if(userSession.app_metadata.role == "admin") {
        await getConverters().then((_) => {
          dataSet = _.data;
        });
        await getCustomers().then((_) => {
        customers = _.data ?? [];
      });
      } else if (userSession.app_metadata.role == "company admin") {
        await getConverters().then((_) => {
          dataSet = _.data;
        });
        await getCustomersByCompany(userSession.app_metadata.customer.id).then((_) => {
          customers = _.data ?? [];
        });
      }else {
        await getCustomerConverters(userSession.app_metadata.customer.id).then((_) => {
          dataSet = _.data;
        });
        await getCustomersByCompany(userSession.app_metadata.customer.company_id).then((_) => {
          customers = _.data ?? [];
        });
      }
    }

    const showTickets = async (id: any) => {
      await getTicketByConveterID(id).then((response) =>{
        tickets = response.data;
      })
    }

    const addTicket = async () => {
      addingTicket = true;
      selectedTicket = {};
      selectedId = "ticket"
    }

    
    const addTicketToConverter = async () => {
      selectedTicket.status = ticketStatusSelect.value;
      selectedTicket.customer = ticketCustomerSelect.value;
      selectedTicket.converter_id = selectedConverter.id;
      await createTicket(selectedTicket).then((_) => {
          showTickets(selectedConverter.id).then(() => {
            selectedId = "converter";
            selectedTicket = {};
          });
      });
    }

    const editTicket = async () => {
      selectedTicket.status = ticketStatusSelect.value;
      selectedTicket.customer = ticketCustomerSelect.value;
      selectedTicket.converter_id = selectedConverter.id;
      await updateTicket(selectedTicket).then((_) => {
        showTickets(selectedConverter.id).then(() => {
            selectedId = "converter";
            selectedTicket = {};
          });
      });
    }

    const delTicket = async () => {
      await deleteTicket(selectedTicket.id).then((_) => {
        showTickets(selectedConverter.id).then(() => {
            selectedId = "converter";
            selectedTicket = {};
          });
      });
    }

    const createConv= async () => {
      selectedConverter.status = addStatusSelect.value;
      selectedConverter.customer_id = addCustomerSelect.value;
      await addConverter(selectedConverter).then((_) => {
        loadData();
        modal.hide();
      }) 
    }

    const updateConv = async () => {
      selectedConverter.customer_id = converterCustomerSelect.value;
      selectedConverter.status = converterStatusSelect.value;
      delete selectedConverter.customer;
      await updateConverter(selectedConverter).then(() => {
        loadData();
        drawer.hide();
      })
    }

    const deleteConv = async () => {
      await deleteConverter(selectedConverter.id).then(() => {
        loadData();
        drawer.hide();
      })
    }
    let columns = [
      { id: "id", name: "ID"},
      { id: "status", name: "Status",
        formatter: (cell: any) => {
          if (cell === 'Online') {
            return html(`<span><i class="fa-solid fa-circle-dot text-green-400 mr-1 fa-xs"></i>${cell}</span>`);
          } else if (cell === 'Offline') {
            return html(`<span><i class="fa-solid fa-circle-dot text-orange-400 mr-1 fa-xs"></i>${cell}</span>`);
          } else {
            return html(`<span><i class="fa-solid fa-circle-dot text-red-400 mr-1 fa-xs"></i>${cell}</span>`);
          }
        }},
      { id: "customer", name: "Customer",
        formatter: (cell: any) => html(`<span>${cell.name}</span>`)},
      {
        id: "actions",
        width: "10px",
        formatter: (cell: any, row: any) => {
          return h('span', {
            className: 'hover:bg-zinc-800 rounded custom-outter',
            onClick: () => {
              isUpdate = true;
              selectedConverter = dataSet?.find(item => item.id === row.cells[0].data);
              showTickets(selectedConverter.id);
              showDrawer();
            }
          },
          [
            h('i', {
              className: 'fa-solid fa-pencil cursor-pointer block',
            }),
          ])
        }
      }
    ]
    const ticketColumns = [
      {
        id: "converter_id",
        name:"Converter",
      },
      {
        id: "status",
        name: "Status"
      },
      {
        id: "customer",
        name: "Customer",
        formatter: (cell: any) => html(`<span>${cell.name}</span>`)},
      {
        id: "date",
        name: "Date",
        formatter: (cell: any) => html(`<span>${formatDate(cell)}</span>`)
      },
      {
        id: "id",
        width: "10px",
        formatter: (cell: any, row: any) => {
          return h('span', {
            className: 'hover:bg-zinc-800 rounded custom-outter',
            onClick: () => {
              addingTicket = false;
              selectedId="ticket";
              selectedTicket = tickets?.find(item => item.id === cell);
            }
          },
          [
            h('i', {
              className: 'fa-solid fa-arrow-right cursor-pointer block',
            }),
          ])
        }
      }
    ]
    const converterPagination = {
      enabled: true,
      limit: 6
    }
    const ticketPagination = {
      enabled: true,
      limit: 5
    };
    const formatDate = (date: any) => {
      return moment(date).format("YYYY-MM-DD");
    }
    onMount(async () => {
      drawer = new Drawer(drawerElement, options);
      modal = new Modal(modalElement);
      drawer.hide();
      await getUserSession().then((_) => {
        userSession = _.data.user;
        loadData();
      });
      
    });
  </script>
  
  <div class="flex flex-col px-10">
      <div class="flex justify-between"><h3 class="font-bold mt-8 ml-2 text-white">Converters List</h3>
        <img on:click="{showAddModal}" class="w-9 h-9 relative my-3 mx-4 hover:bg-zinc-900 cursor-pointer rounded p-1" style="top: 77px;z-index: 40;" src="src/assets/Add.svg" alt=""></div>
      <div class="flex rounded over">
        <Grid columns={columns} data={dataSet} pagination={converterPagination} search/>
      </div>
  </div>
  
<div bind:this="{drawerElement}" id="drawer-js-example" style="width:42rem;"class="fixed z-40 h-screen p-4 overflow-y-auto custom-background dark:bg-gray-800" tabindex="-1" aria-labelledby="drawer-js-label">
  <h5 id="drawer-js-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"><svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    {#if selectedId == "converter"}
      Converter 
      {#if selectedConverter}
        {selectedConverter.id}
      {/if}
    {:else}
      Ticket  
    {/if}
  </h5>
  <button on:click="{hideDrawer}" id="drawer-hide-button" type="button" aria-controls="drawer-example" class="custom-text-color bg-transparent hover:custom-text-color hover:bg-zinc-800 hover:text-white rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center " >
     <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
     <span class="sr-only">Close menu</span>
  </button>
  <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">This a converter for {selectedConverter.customer?.name}, all the information below applies.</p>

  <Tabs {selectedId}>
    <TabPanel id="converter">
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label for="company" class="block mb-2 text-sm font-medium custom-text-color text-white">Converter Status</label>
          <select bind:this="{converterStatusSelect}" id="converterStatusSelect" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
            {#each converterStatusOptions as option}
            {#if selectedConverter.status == option}
              <option value="{option}" selected>{option}</option>
            {:else}   
              <option value="{option}">{option}</option>                 
            {/if}
            {/each}
          </select>
        </div> 
        <div>
          <label for="name" class="block mb-2 text-sm font-medium custom-text-color text-white">Converter Customer</label>
          <select bind:this="{converterCustomerSelect}" id="converterCustomerSelect" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
            {#each customers as customer}
              {#if customer.id == selectedConverter.customer?.id}
                <option value="{customer.id}" selected>{customer.name}</option>
              {:else}   
                <option value="{customer.id}">{customer.name}</option>                 
              {/if}
            {/each}
          </select>
        </div>
      </div>
      <div class="flex mt-12 custom-light-background p-2 rounded-lg">
        <h5 class="inline-flex items-center text-base font-semibold text-gray-500 ml-2 dark:text-gray-400 "><i class="fa-solid fa-ticket mr-2 "></i>Tickets </h5>
        <img on:click="{addTicket}" class="w-9 h-9 relative hover:bg-zinc-900 cursor-pointer rounded p-1" style="left: 31.5rem;z-index: 40;" src="src/assets/Add.svg" alt="">
      </div>
      <div class="flex">
        <div style="width: 40rem;">
          <Grid data={tickets} columns={ticketColumns} pagination={ticketPagination}/>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button on:click="{updateConv}" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
          Update
        </button>
        <button on:click={deleteConv} class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900">
          <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
          Delete
        </button>
      </div>
    </TabPanel>
    <TabPanel id="ticket">
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label for="company" class="block mb-2 text-sm font-medium custom-text-color text-white">Ticket Status</label>
          <select bind:this="{ticketStatusSelect}" id="ticketStatusSelect" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
            {#each ticketStatusOptions as option}
            {#if selectedTicket.status == option}
              <option value="{option}" selected>{option}</option>
            {:else}   
              <option value="{option}">{option}</option>                 
            {/if}
            {/each}
          </select>
        </div> 
        <div>
          <label for="name" class="block mb-2 text-sm font-medium custom-text-color text-white">Ticket Customer</label>
          <select bind:this="{ticketCustomerSelect}" id="ticketCustomerSelect" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
            {#each customers as customer}
              {#if customer.id == selectedTicket.customer?.id}
                <option value="{customer.id}" selected>{customer.name}</option>
              {:else}   
                <option value="{customer.id}">{customer.name}</option>                 
              {/if}
            {/each}
          </select>
        </div>
      </div>
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label for="notes" class="block mb-2 text-sm font-medium custom-text-color text-white">Notes</label>
          <textarea bind:value="{selectedTicket.note}" id="notes" rows="5" class="block p-2.5 w-full text-sm custom-text-color custom-light-background rounded-lg border  bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="Write a description..."></textarea>                    
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <button on:click="{() => selectedId = "converter"}" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
          <i class="fa-sharp fa-solid fa-arrow-left"></i>
        </button>
        {#if !addingTicket}
        <button on:click="{delTicket}" class="font-medium rounded-lg text-sm px-5 py-2.5 text-center text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900">
          <i class="fa-solid fa-trash"></i>
        </button>
        {/if}
        <button on:click="{addingTicket ? addTicketToConverter : editTicket}" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
          <i class="fa-solid fa-check"></i>
        </button>
      </div>
    </TabPanel>
  </Tabs>
</div>


<!-- Main modal -->
<div bind:this={modalElement} style="backdrop-filter: blur(2px);" id="updateProductModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
  <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 rounded-lg shadow custom-background sm:p-5 custom-border">
          <!-- Modal header -->
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 custom-border-bottom">
              <h3 class="text-lg font-semibold custom-text-color text-white">
                  Create Converter
              </h3>
              <button type="button" class="custom-text-color bg-transparent hover:custom-text-color rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-zinc-800 hover:text-white" on:click="{hideModal}">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
              </button>
          </div>
          <!-- Modal body -->
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label for="status" class="block mb-2 text-sm font-medium custom-text-color text-white">Converter Status</label>
                <select bind:this="{addStatusSelect}" id="addStatusSelect" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
                  {#each converterStatusOptions as option}
                      <option value="{option}">{option}</option>                 
                  {/each}
                </select>
              </div> 
              <div>
                <label for="customer" class="block mb-2 text-sm font-medium custom-text-color text-white">Converter Customer</label>
                <select bind:this="{addCustomerSelect}" id="addCustomerSelect" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
                  {#each customers as customer}
                      <option value="{customer.id}">{customer.name}</option> 
                  {/each}
                </select>
              </div> 
            </div>
            <div class="flex items-center space-x-4">
                <button on:click="{createConv}" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Create
                </button>
            </div>
      </div>
  </div>
</div>


  
  