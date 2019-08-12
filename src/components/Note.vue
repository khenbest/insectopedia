<template>
   <div class="note">
      <div class="d-flex row justify-content-center">
         <div v-for="note in notes" :key="note.id" class="card col-4 justify-content-center border-dark mb-3">
            <div class="card-header bg-transparent border-dark">{{note.user}}</div>
            <div class="card-body text-primary">
               <h5 class="card-title">{{note.content}}</h5>
            </div>
            <div class="card-footer bg-transparent border-dark">Last Updated: {{note.updatedAt}}</div>
            <button class="btn btn-danger" @click="deleteNote(note)">Delete Note</button>
         </div>
      </div>
   </div>
</template>

<script>
   export default {
      name: "note",
      props: [],
      data() {
         return {}
      },
      computed: {
         notes() {
            return this.$store.state.notes;
         }
      },
      methods: {
         deleteNote(note) {
            this.$store.dispatch("deleteNote", note)
         }
      },
      components: {}
   }
</script>