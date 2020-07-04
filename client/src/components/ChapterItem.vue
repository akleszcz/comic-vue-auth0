<template>
  <div>
    <img src="https://picsum.photos/60/?random" alt="chapter-thumbnail" />
    <span>{{ chapter.title }}</span>
  </div>
</template>

<script>
export default {
  props: ["chapter"]
};
</script>

<style>
</style>