<template>
  <v-container>
   <v-row
      class="fill-height"
      align-content="center"
      justify="center"
      v-if="!entries.length"
    >
      <v-col
        class="subtitle-1 text-center"
        cols="6"
      >
        <span v-if="!isLoading">
          No bus stops available
        </span>
        <span v-else-if="isLoading">
          Loading bus stops.....
        </span>
      </v-col>

      <v-col cols="8" v-if="isLoading">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
{{ entries }}
    <v-row v-if="entries.length || !isLoading">
      <v-col cols="12"
        sm="6"
        md="3"
        v-for="entry in entries" :key="entry._id">

        <v-card>
          <v-spacer></v-spacer>
          <v-card-actions>
              <v-btn btn block color="primary" :to="{ path: `/${entry._id}`}">
                View Details
              </v-btn>
            </v-card-actions>
          <v-spacer></v-spacer>

          <v-slide-y-transition>
          </v-slide-y-transition>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: [
    'position'
  ],
  data: () => ({
    items: false,
    isLoading: false,
    entries: [],
    breed: null,
    entriesInserted: {},
    totalEntriesLength: 0,
    lat: 7.041235,
    lng: 125.36464
  }),
  mounted () {
    if (this.position) {
      this.setPosition(this.position)
    }
    this.loadBusStops()
  },
  methods: {
    loadBusStops () {
      if (this.isLoading) return
      this.isLoading = true
      this.axios.get(`/bus-stops?lat=${this.lat}&lng=${this.lng}`)
        .then(res => {
          console.log(res)
          res.data.forEach((data) => {
            this.entries.push(data)
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    setPosition (position) {
      this.lat = position.coords.latitude
      this.lng = position.coords.longitude
    }
  }
}
</script>
