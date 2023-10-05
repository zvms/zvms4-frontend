<script lang="ts" setup>
var el = document.createElement('script')
el.src = '//i.6v6.work/v/?uid=387952'
var cnzz = document.getElementsByTagName('script')[0]
cnzz.parentNode?.insertBefore(el, cnzz)
</script>
<template>
  <p class="text-2xl">2022 级 黄浩杰</p>
  <h1 class="rainbow-text">HHJ</h1>
  <p>我是黄浩杰，来自2022级5班。</p>
  <p>我的个人博客可以在 010305.xyz 找到。</p>
  <p>如果你想联系我，可以通过QQ：2648616832。</p>
  <div id="tcomment"></div>
</template>
<style>
/* 添加彩虹动画 */
@keyframes rainbow {
  0% {
    color: red;
  }
  16% {
    color: orange;
  }
  33% {
    color: yellow;
  }
  50% {
    color: green;
  }
  66% {
    color: blue;
  }
  83% {
    color: indigo;
  }
  100% {
    color: violet;
  }
}

/* 添加动画效果 */
.rainbow-text {
  animation: rainbow 2s infinite;
}
</style>
