<script lang="ts">
    import { onMount } from 'svelte';
    import Grid from "gridjs-svelte";
    import { h } from 'gridjs';
    import { Modal } from 'flowbite'
    import type { ModalInterface } from 'flowbite'
    import { getCompanies, updateCompany, addCompany,deleteCompany } from '../../api/CompanyApi'
    import type { Company } from '../../lib/types/types'

    let isUpdate: boolean = true;
    let modalElement: any;
    let modal: ModalInterface;
    let selectedItem: any = {};

    const showModal = () => {
      modal.show();
    }

    const hideModal = () => {
      modal.hide();
    }

    const showAddModal = () => {
      isUpdate = false;
      selectedItem = {};
      showModal();
    }

    const createComp = async () => {
      await addCompany(selectedItem).then(() => {
        loadCompanies();
        modal.hide();
      })
      
    }

    const updateComp = async () => {
      await updateCompany(selectedItem.id, selectedItem).then(() => {
        loadCompanies();
        modal.hide();
      })
    }

    const deleteComp = async () => {
      await deleteCompany(selectedItem.id).then(() => {
        loadCompanies();
        modal.hide();
      })
    }

    const loadCompanies = async () => {
      await getCompanies().then((_) => {
        dataSet = _.data;
      })
    }

    let dataSet: Company[] | null = [];
    let columns = [
      { id: "id", name: "ID"},
      { id: "name", name: "Name" },
      { id: "email", name: "Email" },
      { id: "phone_number", name: "Phone Number" },
      { id: "address", name: "Address" },
      {
        id: "actions",
        width: "10px",
        formatter: (cell: any, row: any) => {
          return h('span', {
            className: 'hover:bg-zinc-800 rounded custom-outter',
            onClick: () => {
              isUpdate = true;
              selectedItem = dataSet?.find(item => item.id === row.cells[0].data);
              showModal();
            }
          },
          [
            h('i', {
              className: 'fa-solid fa-pencil cursor-pointer block'
            }),
          ])
        }
      }
    ]
    const pagination = {
		enabled: true,
		limit: 6
    };
    onMount(async () => {
      modal = new Modal(modalElement);
      loadCompanies();
    });
  </script>
  
  <div class="flex flex-col px-10">
      <div class="flex justify-between"><h3 class="font-bold mt-8 ml-2 text-white">Companies List</h3>
        <img on:click="{showAddModal}" class="w-9 h-9 relative my-3 mx-4 hover:bg-zinc-900 cursor-pointer rounded p-1" style="top: 77px;z-index: 40;" src="src/assets/Add.svg" alt=""></div>
      <div class="flex rounded over">
        <Grid columns={columns} data={dataSet} {pagination} search/>
      </div>
  </div>

<!-- Main modal -->
<div bind:this={modalElement} style="backdrop-filter: blur(2px);" id="updateProductModal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
  <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 rounded-lg shadow custom-background sm:p-5 custom-border">
          <!-- Modal header -->
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 custom-border-bottom">
            {#if isUpdate}
              <h3 class="text-lg font-semibold custom-text-color text-white">
                  Update
              </h3>
            {:else}
              <h3 class="text-lg font-semibold custom-text-color text-white">
                  Create
              </h3>
            {/if}
              <button type="button" class="custom-text-color bg-transparent hover:custom-text-color rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-zinc-800 hover:text-white" on:click="{hideModal}">
                  <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  <span class="sr-only">Close modal</span>
              </button>
          </div>
          <!-- Modal body -->
            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium custom-text-color text-white">Name</label>
                    <input type="text" name="name" id="name" bind:value="{selectedItem.name}" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="Company Name">
                </div>
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium custom-text-color text-white">Email</label>
                  <input type="text" name="email" id="email" bind:value="{selectedItem.email}" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="Company Email">
                </div>
                <div>
                  <label for="phone" class="block mb-2 text-sm font-medium custom-text-color text-white">Phone Number</label>
                  <input type="text" name="phone" id="phone" bind:value="{selectedItem.phone_number}" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="Company Phone">
                </div>
                <div>
                  <label for="address" class="block mb-2 text-sm font-medium custom-text-color text-white">Address</label>
                  <input type="text" name="address" id="address" bind:value="{selectedItem.address}" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="Company Address">
                </div>
            </div>
            <div class="flex items-center space-x-4">
              {#if isUpdate}
                <button on:click="{updateComp}" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Update
                </button>
                <button on:click="{deleteComp}" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900">
                  <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                  Delete
                </button>
              {:else}
                <button on:click="{createComp}" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    Create
                </button>
              {/if}

            </div>
      </div>
  </div>
</div>
  
  
  