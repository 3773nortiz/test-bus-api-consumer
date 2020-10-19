<template>
  <v-row>
    <v-col cols="12">
      <v-btn btn color="primary" v-on:click="goBack">Back</v-btn>
    </v-col>
    <v-col cols="12">
      <v-card
        class="mx-auto my-12 mt-0"
      >
        <v-img
          :src="entry.url"
        ></v-img>

        <v-card-title class="display-1 font-weight-bold">{{ details.name }}</v-card-title>
        <v-card-subtitle class="headline">Origin: {{ details.origin }}</v-card-subtitle>
        <v-card-subtitle class="subtitle-1 mt-0 pt-0 font-italic">{{ details.temperament }}</v-card-subtitle>

        <v-card-text class="subtitle-1">
          <div>{{ details.description }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data: () => ({
    busStopId: null,
    details: {},
    entry: {}
  }),
  mounted () {
    this.busStopId = this.$route.params.busStopId
    if (this.busStopId) {
      this.loadBusDetails(this.busStopId)
    }
  },
  methods: {
    loadBusDetails (busStopId) {
      // Items have already been requested
      this.axios.get(`/bus-stops/${busStopId}`)
        .then(res => {
          this.entry = res.data
          const { id, name, origin, temperament, description } = this.entry.breeds[0] || {}
          this.details = { id, name, origin, temperament, description }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (console.log('dd')))
    },
    goBack () {
      const breedFilter = JSON.parse(localStorage.getItem('breedFilter'))
      this.$router.push({ path: '/', query: { breed: breedFilter.id } })
      localStorage.removeItem('breedFilter')
    }
  }
}
</script>
