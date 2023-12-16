<script lang="ts">
    import { onMount } from 'svelte';
    import Grid from "gridjs-svelte";
    import { h,html } from 'gridjs';
    import { Modal } from 'flowbite'
    import type { ModalInterface } from 'flowbite'
    import { supabaseAdmin } from '../../lib/supabaseAdmin';
    import { addCustomer, updateCustomer } from '../../api/CustomerApi';
    import { getCompanies } from '../../api/CompanyApi';
    import moment from 'moment';

    let isUpdate: boolean = true;
    let modalElement: any;
    let modal: ModalInterface;
    let selectedItem: any = {
      app_metadata: {}
    };
    let selectedCustomer: any = {}
    let userRoleSelect: any;
    let companies: any[] = [];
    let companySelect: any;

    const roles = [
      "admin",
      "company admin",
      "customer"
    ]

    const showModal = () => {
      modal.show();
    }

    const hideModal = () => {
      modal.hide();
    }
    const addUser = () => {
      isUpdate = false;
      selectedItem = {
        app_metadata: {}
      };
      showModal();
    }

    const loadUsers = async () => {
      await supabaseAdmin.auth.admin.listUsers().then((_) => {
        dataSet = _.data.users;
      });
    }

    const deleteUser = async () => {
      await supabaseAdmin.auth.admin.deleteUser(selectedItem.id).then((_) => {
        loadUsers();
        hideModal();
      });
    }

    const createUser = async () => {
      selectedItem.app_metadata.role = userRoleSelect.value;
      selectedItem.email_confirm = true;
      selectedCustomer.company_id = companySelect.value;
      await addCustomer(selectedCustomer).then((_) => {
        if(_.data == null) {
          return;
        }
        selectedItem.app_metadata.customer = _.data[0];
        supabaseAdmin.auth.admin.createUser(selectedItem).then((_) => {
          loadUsers();
          hideModal();
        });
      })
    }

    const updateUser = async () => {
      selectedItem.app_metadata.role = userRoleSelect.value;
      if(selectedItem.password == null) {
        delete selectedItem.password;
      }
      await updateCustomer(selectedCustomer.id, selectedCustomer).then((_) => {
        if(_.data == null) {
          return;
        }
        selectedItem.app_metadata.customer = _.data[0];
        supabaseAdmin.auth.admin.updateUserById(selectedItem.id, selectedItem).then((_) => {
          loadUsers();
          hideModal();
        });
      })
 
    }

    const formatDate = (date: any) => {
      return moment(date).format("YYYY-MM-DD");
    }

    let dataSet: any[] | null = [];
    let columns = [
      { id: "id", name: "ID"},
      { id: "email", name: "Email" },
      { id: "phone", name: "Phone Number" },
      { id: "created_at", name: "Created At",
      formatter: (cell: any) => html(`<span>${formatDate(cell)}</span>`) },
      { id: "app_metadata", name: "Role",
      formatter: (cell: any) => html(`<span>${cell.role}</span>`)},
      {
        id: "actions",
        width: "10px",
        formatter: (cell: any, row: any) => {
          return h('span', {
            className: 'hover:bg-zinc-800 rounded custom-outter',
            onClick: () => {
                isUpdate = true;
                selectedItem = dataSet?.find(item => item.id === row.cells[0].data);
                selectedCustomer = selectedItem.app_metadata.customer;
                showModal();
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
    const pagination = {
		enabled: true,
		limit: 6
    };
    onMount(async () => {
      modal = new Modal(modalElement);
      loadUsers();
      await getCompanies().then((_) => {
        companies = _.data ?? [];
      })
    });
  </script>
  
  <div class="flex flex-col px-10">
      <div class="flex justify-between"><h3 class="font-bold mt-8 ml-2 text-white">Users List</h3>
        <img on:click="{addUser}" class="w-9 h-9 relative my-3 mx-4 hover:bg-zinc-900 cursor-pointer rounded p-1" style="top: 77px;z-index: 40;" src="src/assets/Add.svg" alt=""></div>
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
                    <label for="name" class="block mb-2 text-sm font-medium custom-text-color text-white">Customer Name</label>
                    <input type="text" name="name" id="name" bind:value="{selectedCustomer.name}" placeholder="Customer Name" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
                  </div>
                  <div>
                    <label for="email" class="block mb-2 text-sm font-medium custom-text-color text-white">User Email</label>
                    <input type="text" name="email" id="email" bind:value="{selectedItem.email}" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="User Email">
                  </div>
                  <div>
                    <label for="company" class="block mb-2 text-sm font-medium custom-text-color text-white">Customer Company</label>
                    <select bind:this="{companySelect}" id="category" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
                      {#each companies as company}
                        {#if company.id == selectedCustomer.company_id}
                          <option value="{company.id}" selected>{company.name}</option>
                        {:else}   
                          <option value="{company.id}">{company.name}</option>                 
                        {/if}
                      {/each}
                    </select>
                  </div>  
                  <div>
                    <label for="password" class="block mb-2 text-sm font-medium custom-text-color text-white">User Password</label>
                    <input type="text" name="password" id="password" bind:value="{selectedItem.password}" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="User Password">
                  </div> 
                  <div>
                      <label for="address" class="block mb-2 text-sm font-medium custom-text-color text-white">Customer Address</label>
                      <input type="text" name="address" id="address" bind:value="{selectedCustomer.address}" placeholder="Customer Address" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
                  </div> 
                  <div>
                    <label for="role" class="block mb-2 text-sm font-medium custom-text-color text-white">User Role</label>
                    <select bind:this="{userRoleSelect}" id="userRoleSelect" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300">
                      {#each roles as role}
                      {#if roles == selectedItem.role}
                        <option value="{role}" selected>{role}</option>
                      {:else}   
                        <option value="{role}">{role}</option>                 
                      {/if}
                      {/each}
                    </select>
                  </div> 
                  <div>
                    <label for="phone" class="block mb-2 text-sm font-medium custom-text-color text-white">Customer Phone</label>
                    <input type="text" name="phone" id="phone" bind:value="{selectedCustomer.phone_number}" class="custom-light-background border custom-text-color text-sm rounded-lg block w-full p-2.5 bg-gray-700 custom-border placeholder-gray-400 text-white focus:outline-none focus:ring focus:ring-green-300" placeholder="User Phone Number">
                  </div>
              </div>
              <div class="flex items-center space-x-4">
                {#if isUpdate}
                  <button on:click="{updateUser}" type="submit" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                      Update
                  </button>
                  <button on:click="{deleteUser}"  type="button" class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center border-red-500 text-red-500 hover:text-white hover:bg-red-600 focus:ring-red-900">
                    <svg class="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    Delete
                  </button> 
                {:else}
                  <button on:click="{createUser}" type="submit" class="custom-text-color custom-background custom-border focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                      Create
                  </button>
                {/if}
              </div>
      </div>
  </div>
</div>
  
  
  