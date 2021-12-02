<template>
  <div v-if="currentCustomer" class="edit-form">
    <h4>Customer</h4>
    <form>

      <div class="form-group">
        <label for="FirstName">FistName</label>
        <input type="text" class="form-control" id="FirstName"
          v-model="currentCustomer.firstName"
        />
      </div>
      <div class="form-group">
        <label for="LastName">LastName</label>
        <input type="text" class="form-control" id="LastName"
          v-model="currentCustomer.lastName"
        />
      </div>
      <div class="form-group">
        <label for="CategoryId">CategoryId</label>
        <input type="text" class="form-control" id="CategoryId"
          v-model="currentCustomer.categoryId"
        />
      </div>


    </form>



    <button class="badge badge-danger mr-2"
      @click="deleteCustomer"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCustomer"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Customer...</p>
  </div>
</template>

<script>
import CustomerDataService from "../services/CustomerDataService";

export default {
  name: "Customer",
  data() {
    return {
      currentCustomer: null,
      message: ''
    };
  },
  methods: {
    getCustomer(id) {
      CustomerDataService.get(id)
        .then(response => {
          this.currentCustomer = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },


    updateCustomer() {
      CustomerDataService.update(this.currentCustomer.id, this.currentCustomer)
        .then(response => {
          console.log(response.data);
          this.message = 'The Customer was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCustomer() {
      CustomerDataService.delete(this.currentCustomer.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "Customers" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCustomer(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
