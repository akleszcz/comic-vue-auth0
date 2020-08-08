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
// import { RootState } from "../typings/store"; // @ doesn't work for some reason

@Component({
  components: {
    ChapterItem
  },
  computed: mapState({
    chapters: (state: any) => state.chapters // @TODO: check why 'state: RootState' causes an error in the console
  })
})
export default class ChaptersList extends Vue {}
</script>

<style></style>
