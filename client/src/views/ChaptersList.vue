<template>
  <div>
    Chapters List
    <ChapterItem v-for="(chapter, index) in this.chapters" :key="index" :chapter="chapter"></ChapterItem>
  </div>
</template>

<script>
import ChapterItem from "@/components/ChapterItem.vue";
import { mapState } from "vuex";
export default {
  components: {
    ChapterItem
  },
  computed: mapState({
    chapters: state => state.chapters,
  })
};
</script>

<style>
</style>