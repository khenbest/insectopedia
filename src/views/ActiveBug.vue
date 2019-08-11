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
        <!-- <div class="card-footer bg-transparent border-dark">Last Updated: {{activeBug.updatedAt}}</div> -->
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
            <span class="form-control">{{user.name}}</span>
          </div>
          <div class="input-group mb-3">
            <input type="text" v-model="newNote.content" class="form-control" placeholder="Content" aria-label="Content"
              aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Submit Note</button>
            </div>
          </div>

        </form>
      </span>
    </div>
    <note></note>
  </div>
</template>

<script>
  import Note from '@/components/Note.vue'
  export default {
    name: "ActiveBug",
    props: ["bugId", "user"],
    mounted() {
      this.$store.dispatch("setActiveBug", this.$route.params.bugId)
    },
    data() {
      return {
        showForm: false,
        newNote: {
          bugId: this.$route.params.bugId,
          content: '',
        }
      }
    },
    computed: {
      activeBug() {
        return this.$store.state.activeBug
      },


    },
    methods: {
      addNote() {
        this.newNote.creator = this.user.name,
          this.$store.dispatch('createNote', this.newNote)
      }
    },
    components: {
      Note
    }
  }
</script>