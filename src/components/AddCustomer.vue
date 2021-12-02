<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="firstname">FirstName</label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          required
          v-model="customer.FirstName"
          name="firstname"
        />
      </div>

      <div class="form-group">
        <label for="lastname">LastName</label>
        <input
          type="text"
          class="form-control"
          id="lastname"
          required
          v-model="customer.LastName"
          name="lastname"
        />
      </div>

      <div class="form-group">
        <label for="categoryId">CategoryId</label>
        <input
          type="text"
          class="form-control"
          id="categoryId"
          required
          v-model="customer.CategoryId"
          name="categoryId"
        />
      </div>

      <button @click="saveCustomer" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCustomer">Add</button>
    </div>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "add-customer",
  data() {
    return {
      customer: {
        id: null,
        categoryid: null,
        firstname: "",
        lastname: "",
        updated: false
      },
      submitted: false
    };
  },
  methods: {
    saveCustomer() {
      var data = {
        FirstName: this.customer.FirstName,
        LastName: this.customer.LastName,
        CategoryId: this.customer.CategoryId
      };

      CustomerDataService.create(data)
        .then(response => {
          this.customer.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCustomer() {
      this.submitted = false;
      this.customer = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
