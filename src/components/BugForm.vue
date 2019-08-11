<template>
  <div vif="user.length > 0" class="col-4 bugform container-fluid">
    <form @submit.prevent="createBug">
      <div class="form-row m-1">
        <input
          class="form-control"
          v-model="newBug.title"
          type="text"
          name="title"
          placeholder="Title"
        />
      </div>
      <div class="form-row m-1">
        <input
          class="form-control"
          v-model="newBug.description"
          type="text"
          name="description"
          placeholder="What's bugging you?"
        />
      </div>
      <div class="form-group row justify-content-center">
        <button class="form-control btn btn-outline-light col-2" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "BugForm",
  props: ["user"],
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  data() {
    return {
      newBug: {
        title: "",
        description: "",
        status: "open"
      }
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  methods: {
    createBug() {
      (this.newBug.creator = this.$store.getters.AuthorCreds().currentUser.displayName),
        this.$store.dispatch("createBug", this.newBug);
      (this.newBug.title = ""), (this.newBug.description = "");
    }
  },
  components: {}
};
</script>


<style>
</style>