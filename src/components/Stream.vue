<template>
  <div class="stream">
    <h1 class="stream__title">CamTrace stream</h1>
    <div class="stream__player">
      <video height="500" id="test_video" controls autoplay src="https://youtu.be/4via-J98jwM"></video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stream',
  props: {
    msg: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
