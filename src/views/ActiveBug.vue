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
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Your Name</span>
            </div>
            <input v-model="newNote.creator" type="text" class="form-control" aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default">
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="newNote.content" class="form-control" placeholder="Content" aria-label="Content"
              aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Submit Note</button>
            </div>
          </div>
          <!-- <input type="text" placeholder="Your Name" v-model="newNote.creator">
          <textarea type="text-area" placeholder="Content" v-model="newNote.content"></textarea>
          <button type="submit">Submit Note</button> -->
        </form>
      </span>
    </div>
    <note></note>
  </div>
</template>

<script>
  import Note from '@/components/Note.vue'
  export default {
    name: "activeBug",
    props: ["bugId"],
    mounted() {
      this.$store.dispatch('setActiveBug', this.bugId || this._id)

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
    components: {
      Note
    }
  }
</script>