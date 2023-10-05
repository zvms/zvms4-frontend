<template>
  <p class="text-2xl">2021 级 周济睿</p>
  <div class="zjr">
    <h1 class="zjr">这是周济睿<br />文档编写以及流程测试<br />纯合致死<br />不啻微芒，造炬成阳</h1>
  </div>
</template>
<style scoped>
div.zjr {
  background-color: #252525;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

h1.zjr {
  color: #000000;
  font-family: 'STKaiti', sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 6vw;
  padding: 0.25em;
  line-height: 1;
  animation: pop-up 2s ease-out forwards infinite alternate;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border: none;
  outline: none;
}

h1.zjr:hover {
  text-shadow: none;
  transform: rotateY(360deg);
}

@keyframes pop-up {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
