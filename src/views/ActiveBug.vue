<template>
  <div class="activeBug container-fluid">
    <div class="d-flex row">
      <div class="card col-8 offset-2 justify-content-center border-dark mb-3">
        <div class="card-header bg-transparent border-dark">{{activeBug.title}}</div>
        <div class="card-body text-primary">
          <h5 class="card-title">{{activeBug.creator}}</h5>
          <p class="card-text">{{activeBug.description}}
          </p>
        </div>
        <div class="card-footer bg-transparent border-dark">Last Updated: {{activeBug.updatedAt}}</div>
        <button class="btn btn-primary" v-on:click="showForm = !showForm">Add Note</button>
      </div>
    </div>
    <div class="d-flex row justify-content-center">
      <span v-show="showForm">
        <form @submit.prevent="addNote">
          <input type="text" placeholder="Your Name" v-model="newNote.creator">
          <input type="textarea" placeholder="Content" v-model="newNote.content">
          <button type="submit">Submit Note</button>
        </form>
      </span>
    </div>
  </div>
</template>

<script>
  export default {

    name: "activeBug",
    props: ["bugId"],
    mounted() {
      this.$store.dispatch('setActiveBug', this.bugId)
    },
    data() {
      return {
        showForm: false,
        newNote: {
          content: '',
          creator: ''
        }

      }
    },
    computed: {
      activeBug() {
        return this.$store.state.activeBug
      }
    },
    methods: {
      addNote() {
        this.$store.dispatch('createNote', this.newNote)
      }
    },
    components: {}
  }
</script>