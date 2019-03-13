<template>
   <div class="note container-fluid">
      <div class="d-flex row">
         <div v-for="note in notes" :key="note._id">
            <div class="card col-6 justify-content-center border-dark mb-3">
               <div class="card-header bg-transparent border-dark">{{note.user}}</div>
               <div class="card-body text-primary">
                  <h5 class="card-title">{{note.content}}</h5>
               </div>
               <div class="card-footer bg-transparent border-dark">Last Updated: {{note.updatedAt}}</div>
               <!-- <button class="btn btn-primary" v-on:click="showForm = !showForm">Add Note</button> -->
            </div>
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
      methods: {},
      components: {}
   }
</script>