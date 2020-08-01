<template>
  <div>
    Chapters List
    <ChapterItem v-for="(chapter, index) in this.chapters" :key="index" :chapter="chapter"></ChapterItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import ChapterItem from "@/components/ChapterItem.vue";
import { RootState } from "../typings/store"; // @ doesn't work for some reason

@Component({
  components: {
    ChapterItem
  },
  computed: mapState({
    chapters: (state: RootState) => state.chapters,
  })
})
export default class ChaptersList extends Vue {
}
</script>

<style>
</style>