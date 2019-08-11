<template>
  <div vif="user.length > 0" class="col-12 bugform container-fluid">
    <form @submit.prevent="createBug">
      <input v-model="newBug.title" type="text" name="title" placeholder="Title">
      <input v-model="newBug.description" type="text" name="description" placeholder="What's bugging you?">
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
<script>

  export default {
    name: "BugForm",
    props: ["user"],
    mounted() {
      this.$store.dispatch('getAllBugs')
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
        this.newBug.creator = this.$store.getters.AuthorCreds().currentUser.displayName,

          this.$store.dispatch("createBug", this.newBug);
        this.newBug.title = "",
          this.newBug.description = ""
      }
    },
    components: {}
  };
</script>


<style>
  .list-group {
    text-align: center;
    justify-content: center;
  }

  .bugform {
    text-align: center;
    justify-content: center;
  }
</style>