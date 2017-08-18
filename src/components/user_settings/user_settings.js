import StyleSwitcher from '../style_switcher/style_switcher.vue'

const UserSettings = {
  data () {
    return {
      newname: this.$store.state.users.currentUser.name,
      newbio: this.$store.state.users.currentUser.description,
      uploading: [ false, false, false ],
      previews: [ null, null, null ]
    }
  },
  components: {
    StyleSwitcher
  },
  computed: {
    user () {
      return this.$store.state.users.currentUser
    }
  },
  methods: {
    updateProfile () {
      const name = this.newname
      const description = this.newbio
      this.$store.state.api.backendInteractor.updateProfile({params: {name, description}}).then((user) => {
        if (!user.error) {
          this.$store.commit('addNewUsers', [user])
          this.$store.commit('setCurrentUser', user)
        }
      })
    },
    uploadFile (slot, e) {
      const file = e.target.files[0]
      if (!file) { return }
      // eslint-disable-next-line no-undef
      const reader = new FileReader()
      reader.onload = ({target}) => {
        const img = target.result
        this.previews[slot] = img
        this.$forceUpdate() // just changing the array with the index doesn't update the view
      }
      reader.readAsDataURL(file)
    },
    submitAvatar () {
      if (!this.previews[0]) { return }

      let img = this.previews[0]
      // eslint-disable-next-line no-undef
      let imginfo = new Image()
      let cropX, cropY, cropW, cropH
      imginfo.src = img
      if (imginfo.height > imginfo.width) {
        cropX = 0
        cropW = imginfo.width
        cropY = Math.floor((imginfo.height - imginfo.width) / 2)
        cropH = imginfo.width
      } else {
        cropY = 0
        cropH = imginfo.height
        cropX = Math.floor((imginfo.width - imginfo.height) / 2)
        cropW = imginfo.height
      }
      this.uploading[0] = true
      this.$store.state.api.backendInteractor.updateAvatar({params: {img, cropX, cropY, cropW, cropH}}).then((user) => {
        if (!user.error) {
          this.$store.commit('addNewUsers', [user])
          this.$store.commit('setCurrentUser', user)
          this.previews[0] = null
        }
        this.uploading[0] = false
      })
    },
    submitBanner () {
      if (!this.previews[1]) { return }

      let banner = this.previews[1]
      // eslint-disable-next-line no-undef
      let imginfo = new Image()
      /* eslint-disable camelcase */
      let offset_top, offset_left, width, height
      imginfo.src = banner
      width = imginfo.width
      height = imginfo.height
      offset_top = 0
      offset_left = 0
      this.uploading[1] = true
      this.$store.state.api.backendInteractor.updateBanner({params: {banner, offset_top, offset_left, width, height}}).then((data) => {
        if (!data.error) {
          let clone = JSON.parse(JSON.stringify(this.$store.state.users.currentUser))
          clone.cover_photo = data.url
          this.$store.commit('addNewUsers', [clone])
          this.$store.commit('setCurrentUser', clone)
          this.previews[1] = null
        }
        this.uploading[1] = false
      })
      /* eslint-enable camelcase */
    },
    submitBg () {
      if (!this.previews[2]) { return }
      let img = this.previews[2]
      // eslint-disable-next-line no-undef
      let imginfo = new Image()
      let cropX, cropY, cropW, cropH
      imginfo.src = img
      cropX = 0
      cropY = 0
      cropW = imginfo.width
      cropH = imginfo.width
      this.uploading[2] = true
      this.$store.state.api.backendInteractor.updateBg({params: {img, cropX, cropY, cropW, cropH}}).then((data) => {
        if (!data.error) {
          let clone = JSON.parse(JSON.stringify(this.$store.state.users.currentUser))
          clone.background_image = data.url
          this.$store.commit('addNewUsers', [clone])
          this.$store.commit('setCurrentUser', clone)
          this.previews[2] = null
        }
        this.uploading[2] = false
      })
    }
  }
}

export default UserSettings
