<template>
  <div
    class="poll"
    :class="containerClass"
  >
    <div
      :role="showResults ? 'section' : (poll.multiple ? 'group' : 'radiogroup')"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="poll-option"
      >
        <div
          v-if="showResults"
          :title="resultTitle(option)"
          class="option-result"
        >
          <div class="option-result-label">
            <span class="result-percentage">
              {{ percentageForOption(option.votes_count) }}%
            </span>
            <RichContent
              :html="option.title_html"
              :handle-links="false"
              :emoji="emoji"
            />
          </div>
          <div
            class="result-fill"
            :style="{ 'width': `${percentageForOption(option.votes_count)}%` }"
          />
        </div>
        <div
          v-else
          tabindex="0"
          :role="poll.multiple ? 'checkbox' : 'radio'"
          :aria-labelledby="`option-vote-${randomSeed}-${index}`"
          :aria-checked="choices[index]"
          @click="activateOption(index)"
        >
          <input
            v-if="poll.multiple"
            type="checkbox"
            class="poll-checkbox"
            :disabled="loading"
            :value="index"
          >
          <input
            v-else
            type="radio"
            :disabled="loading"
            :value="index"
          >
          <label class="option-vote">
            <RichContent
              :id="`option-vote-${randomSeed}-${index}`"
              :html="option.title_html"
              :handle-links="false"
              :emoji="emoji"
            />
          </label>
        </div>
      </div>
    </div>
    <div class="footer faint">
      <button
        v-if="!showResults"
        class="btn button-default poll-vote-button"
        type="button"
        :disabled="isDisabled"
        @click="vote"
      >
        {{ $t('polls.vote') }}
      </button>
      <div class="total">
        <template v-if="typeof poll.voters_count === 'number'">
          {{ $tc("polls.people_voted_count", poll.voters_count, { count: poll.voters_count }) }}&nbsp;·&nbsp;
        </template>
        <template v-else>
          {{ $tc("polls.votes_count", poll.votes_count, { count: poll.votes_count }) }}&nbsp;·&nbsp;
        </template>
      </div>
      <span>
        <i18n-t
          scope="global"
          :keypath="expired ? 'polls.expired' : 'polls.expires_in'"
        >
          <Timeago
            :time="expiresAt"
            :auto-update="60"
            :now-threshold="0"
          />
        </i18n-t>
      </span>
    </div>
  </div>
</template>

<script src="./poll.js"></script>

<style lang="scss">
@import "../../variables";

.poll {
  .votes {
    display: flex;
    flex-direction: column;
    margin: 0 0 0.5em;
  }

  .poll-option {
    margin: 0.75em 0.5em;
  }

  .option-result {
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
    color: $fallback--lightText;
    color: var(--lightText, $fallback--lightText);
  }

  .option-result-label {
    display: flex;
    align-items: center;
    padding: 0.1em 0.25em;
    z-index: 1;
    word-break: break-word;
  }

  .result-percentage {
    width: 3.5em;
    flex-shrink: 0;
  }

  .result-fill {
    height: 100%;
    position: absolute;
    color: $fallback--text;
    color: var(--pollText, $fallback--text);
    background-color: $fallback--lightBg;
    background-color: var(--poll, $fallback--lightBg);
    border-radius: $fallback--panelRadius;
    border-radius: var(--panelRadius, $fallback--panelRadius);
    top: 0;
    left: 0;
    transition: width 0.5s;
  }

  .option-vote {
    display: flex;
    align-items: center;
  }

  input {
    width: 3.5em;
  }

  .footer {
    display: flex;
    align-items: center;
  }

  &.loading * {
    cursor: progress;
  }

  .poll-vote-button {
    padding: 0 0.5em;
    margin-right: 0.5em;
  }

  .poll-checkbox {
    display: none;
  }
}
</style>
