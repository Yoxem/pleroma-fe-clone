<template>
  <span
    v-if="contrast"
    class="contrast-ratio"
  >
    <span
      :title="hint"
      class="rating"
    >
      <span v-if="contrast.aaa">
        <FAIcon icon="thumbs-up" />
      </span>
      <span v-if="!contrast.aaa && contrast.aa">
        <FAIcon icon="adjust" />
      </span>
      <span v-if="!contrast.aaa && !contrast.aa">
        <FAIcon icon="exclamation-triangle" />
      </span>
    </span>
    <span
      v-if="contrast && large"
      class="rating"
      :title="hint_18pt"
    >
      <span v-if="contrast.laaa">
        <FAIcon icon="thumbs-up" />
      </span>
      <span v-if="!contrast.laaa && contrast.laa">
        <FAIcon icon="adjust" />
      </span>
      <span v-if="!contrast.laaa && !contrast.laa">
        <FAIcon icon="exclamation-triangle" />
      </span>
    </span>
  </span>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAdjust,
  faExclamationTriangle,
  faThumbsUp
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faAdjust,
  faExclamationTriangle,
  faThumbsUp
)

export default {
  props: {
    large: {
      required: false,
      type: Boolean,
      default: false
    },
    // TODO: Make theme switcher compute theme initially so that contrast
    // component won't be called without contrast data
    contrast: {
      required: false,
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hint () {
      const levelVal = this.contrast.aaa ? 'aaa' : (this.contrast.aa ? 'aa' : 'bad')
      const level = this.$t(`settings.style.common.contrast.level.${levelVal}`)
      const context = this.$t('settings.style.common.contrast.context.text')
      const ratio = this.contrast.text
      return this.$t('settings.style.common.contrast.hint', { level, context, ratio })
    },
    hint_18pt () {
      const levelVal = this.contrast.laaa ? 'aaa' : (this.contrast.laa ? 'aa' : 'bad')
      const level = this.$t(`settings.style.common.contrast.level.${levelVal}`)
      const context = this.$t('settings.style.common.contrast.context.18pt')
      const ratio = this.contrast.text
      return this.$t('settings.style.common.contrast.hint', { level, context, ratio })
    }
  }
}
</script>

<style lang="scss">
.contrast-ratio {
  display: flex;
  justify-content: flex-end;
  margin-top: -4px;
  margin-bottom: 5px;

  .label {
    margin-right: 1em;
  }

  .rating {
    display: inline-block;
    text-align: center;
    margin-left: 0.5em;
  }
}
</style>
