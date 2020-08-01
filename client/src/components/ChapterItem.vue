<template>
  <div>
    <img src="https://picsum.photos/60/?random" alt="chapter-thumbnail" />
    <span>{{ chapter.title }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ChapterItem extends Vue {
  @Prop() private chapter!: object;
}
</script>

<style>
</style>