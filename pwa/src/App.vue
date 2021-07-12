<script>
import '@/components/modules/home'

export default {
  name: 'App'
}
</script>

<template>
  <VApp>
    <VAppBar app dark color="primary" fixed>
      <VToolbarTitle
        @click="$router.push('/home')"
        style="cursor: pointer"
        class="brand"
      >
        Aplicación tipo PWA
      </VToolbarTitle>
      <VSpacer />
      <MenuAccount />
    </VAppBar>

    <VMain>
      <RouterView />
    </VMain>

    <VFooter app width="auto" dark min-height="60" padless color="primary">
      <LoadingCard />
    </VFooter>
  </VApp>
</template>

<style>
@font-face {
  font-family: 'xenotron';
  src: url('assets/fonts/xenotron.ttf') format('truetype');
}
.brand {
  letter-spacing: 1.5px;
  font-size: 20px;
  font-weight: bold;
  font-family: 'xenotron';
  padding: 0;
}
</style>
