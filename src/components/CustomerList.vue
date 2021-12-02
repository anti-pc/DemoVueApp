<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Customer List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(customer, index) in customers"
          :key="index"
          @click="setActiveCustomer(customer, index)"
        >
         {{ customer.firstName }}  {{ customer.lastName }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentCustomer">
        <h4>Customer</h4>
        <div>
          <label><strong>Id:</strong></label> {{ currentCustomer.id }}
        </div>
        <div>
          <label><strong>FirstName:</strong></label> {{ currentCustomer.firstName }}
        </div>
        <div>
          <label><strong>LastName:</strong></label> {{ currentCustomer.lastName }}
        </div>
        <div>
          <label><strong>CategoryId:</strong></label> {{ currentCustomer.categoryId }}
        </div>

        <router-link :to="'/customers/' + currentCustomer.id" class="badge badge-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Customer...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "customer-list",
  data() {
    return {
      customers: [],
      currentCustomer: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveCustomers() {
      CustomerDataService.getAll()
        .then(response => {
          this.customers = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCustomers();
      this.currentCustomer = null;
      this.currentIndex = -1;
    },

    setActiveCustomer(customer, index) {
      this.currentCustomer = customer;
      this.currentIndex = customer ? index : -1;
    },
 
  },
  mounted() {
    this.retrieveCustomers();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
