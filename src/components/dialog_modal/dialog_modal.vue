<template>
  <span
    :class="{ 'dark-overlay': darkOverlay }"
    @click.self.stop="onCancel()"
  >
    <div
      class="dialog-modal panel panel-default"
      @click.stop=""
    >
      <div class="panel-heading dialog-modal-heading">
        <div class="title">
          <slot name="header" />
        </div>
      </div>
      <div class="dialog-modal-content">
        <slot name="default" />
      </div>
      <div class="dialog-modal-footer user-interactions panel-footer">
        <slot name="footer" />
      </div>
    </div>
  </span>
</template>

<script src="./dialog_modal.js"></script>

<style lang="scss">
@import "../../variables";

// TODO: unify with other modals.
.dark-overlay {
  &::before {
    bottom: 0;
    content: " ";
    display: block;
    cursor: default;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    background: rgb(27 31 35 / 50%);
    z-index: 2000;
  }
}

.dialog-modal.panel {
  top: 0;
  left: 50%;
  max-height: 80vh;
  max-width: 90vw;
  margin: 15vh auto;
  position: fixed;
  transform: translateX(-50%);
  z-index: 2001;
  cursor: default;
  display: block;
  background-color: $fallback--bg;
  background-color: var(--bg, $fallback--bg);

  .dialog-modal-heading {
    .title {
      text-align: center;
    }
  }

  .dialog-modal-content {
    margin: 0;
    padding: 1rem;
    background-color: $fallback--bg;
    background-color: var(--bg, $fallback--bg);
    white-space: normal;
  }

  .dialog-modal-footer {
    margin: 0;
    padding: 0.5em;
    background-color: $fallback--bg;
    background-color: var(--bg, $fallback--bg);
    border-top: 1px solid $fallback--border;
    border-top: 1px solid var(--border, $fallback--border);
    display: flex;
    justify-content: flex-end;

    button {
      width: auto;
      margin-left: 0.5rem;
    }
  }
}

</style>
