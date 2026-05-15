<template>
  <div class="wave-bg-container">
    <div class="wave-bg-main" :style="{ background: mainBgStyle }" />
    <div class="wave-bg-top">
      <svg width="100%" height="100%" viewBox="0 0 1200 320" preserveAspectRatio="none">
        <path :fill="waveColor" d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,213.3C672,235,768,245,864,229.3C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" opacity="0.5" />
      </svg>
    </div>
    <div class="wave-bg-bottom">
      <svg width="100%" height="100%" viewBox="0 0 1200 320" preserveAspectRatio="none">
        <path :fill="waveColor" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,170.7C672,149,768,139,864,154.7C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" opacity="0.5" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Color from "color";
import { computed } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const mainBgStyle = computed(() => {
  const color = themeStore.primaryColor;
  if (themeStore.themeMode === "light") {
    return Color(color).mix(Color("#ffffff"), 0.7).hex();
  }
  else {
    return Color(color).mix(Color("#000000"), 0.7).hex();
  }
});

const waveColor = computed(() => {
  return themeStore.primaryColor;
});
</script>

<style lang="less" scoped>
.wave-bg-container {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .wave-bg-main {
    position: absolute;
    inset: 0;
  }

  .wave-bg-top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 35%;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .wave-bg-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35%;

    svg {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
