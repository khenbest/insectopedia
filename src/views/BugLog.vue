<template>
  <div class="home">
    <button @click="logout" class="btn btn-outline-danger">Logout</button>

    <BugForm :user="$store.getters.AuthorCreds"></BugForm>
    <div class="d-flex flex-row justify-content-center">
      <table class="table table-md table-dark table-striped table-hover col-8 mt-3">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Reported By</th>
            <th scope="col">Status</th>
            <!-- <th scope="col">Updated</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="bug in bugs"
            scope="row"
            id="bugRowItem"
            @click="setActiveBug(bug.id)"
            :user="$store.getters.AuthorCreds"
          >
            <td>{{bug.title}}</td>
            <td>{{bug.description}}</td>
            <td>{{bug.creator}}</td>
            <td class="dropdown">
              {{bug.status}}
              <button
                class="btn btn-sm btn-outline-light dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              ></button>
              <div class="dropdown-menu">
                <p @click="editStatus(bug.id, 'closed')" class="dropdown-item">Closed</p>
                <p @click="editStatus(bug.id, 'open')" class="dropdown-item">Re-Open</p>
              </div>
            </td>
            <td>
              <button
                @click="deleteBug(bug.id)"
                class="btn d-flex row align-self-flex-end"
                style="color:red;"
              >X</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BugForm from "@/components/BugForm.vue";
export default {
  name: "BugLog",
  props: ["user"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    }
  },
  components: {
    BugForm
  },
  methods: {
    setActiveBug(id) {
      this.$store.dispatch("setActiveBug", id);
    },
    editStatus(id, status) {
      let payload = { id: id, status: status };
      this.$store.dispatch("editBugStatus", payload);
    },
    deleteBug(bugId) {
      this.$store.dispatch("deleteBug", bugId);
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
#bugRowItem:hover {
  cursor: pointer;
}
</style>