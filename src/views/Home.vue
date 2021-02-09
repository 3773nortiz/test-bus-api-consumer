<template>
  <div class="page">
    <h1 class="text-center">Nearest Bus Stops</h1>
    <template v-if="gettingLocation">
      <h2 class="text-center"></h2>
    </template>

    <v-container>
      <v-row>
        <BusStops :location="location" />
      </v-row>
  </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import BusStops from '@/components/BusStops.vue'
// import { busRequest } from '@/mixins/busRequest'

export default {
  name: 'Home',
  data () {
    return {
      location: null,
      gettingLocation: false,
      errorStr: null
    }
  },
  components: {
    BusStops
  },
  created () {
    if (!('geolocation' in navigator)) {
      this.errorStr = 'Geolocation is not available.'
      return
    }
    this.gettingLocation = true
    navigator.geolocation.getCurrentPosition(
      position => {
        this.gettingLocation = false
        if (position) {
          this.location = position
        }
      },
      error => {
        this.gettingLocation = false
        this.errorStr = error.message
      }
    )
  }
}
</script>
