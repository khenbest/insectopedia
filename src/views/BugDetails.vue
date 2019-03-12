<template>
  <div class="bug">
    <div class="card">
      <div class="card-header">{{bug.title}}</div>
      <div class="card-body">
        <h5 class="card-title">{{bug.creator}}</h5>
        <p class="card-text">{{bug.description}}</p>
        <button class="btn btn-primary" v-on:click="showForm = !showForm">Add Notes</button>
        <span v-show="showForm">
          <form @submit.prevent="createNote">
            <input type="text" v-model="newNote.creator" placeholder="Name">
            <input type="text" v-model="newNote.content" placeholder="Note...">
            <button type="submit">Submit Note</button>
          </form>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bug",
  props: ["id"],
  data() {
    return {
      showForm: true,
      newNote: {
        creator: "",
        content: "",
        flagged: ""
      }
    };
  },
  computed: {
    bug() {
      return this.$store.state.bugs.find(b => b._id == this.id);
    }
  },
  methods: {
    createNote() {
      this.$store.dispatch("createNote", this.newNote);
    }
  },
  components: {},
  mounted() {
    let id = this.$route.params.id;
    this.$store.dispatch("setId", id);
  }
};
</script>