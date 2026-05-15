<template>
  <router-view />
</template>

<script setup lang="ts">
import { useAntdCssVars } from "./hooks/useAntdCssVars";

useAntdCssVars();
</script>
