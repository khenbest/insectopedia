<template>
    <div class="col-6  bugform">
        <form @submit.prevent="createBug">
            <input v-model="newBug.creator" type="text" name="creator" placeholder="Name" />
            <input v-model="newBug.title" type="text" name="title" placeholder="What happened?" />
            <input v-model="newBug.description" type="text" name="description" placeholder="What's bugging you?" />
            <button type="submit">Submit</button>
        </form>
        <div class="row">
            <div class="col-6" v-for="bug in bugs">
                <h5>{{bug.creator}}</h5>
                <h5>{{bug.title}}</h5>
                <h5>{{bug.description}}</h5>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'bugform',
        data() {
            return {
                newBug: {
                    creator: '',
                    title: '',
                    description: ''
                }
            }
        },
        mounted() {
            this.$store.dispatch('getAllBugs')
        },
        computed: {
            bugs() {
                return this.$store.state.bugs
            }
        },
        methods: {
            createBug() {
                this.$store.dispatch('createBug', this.newBug)
            }
        },
        components: {}
    }
</script>


<style>

</style>