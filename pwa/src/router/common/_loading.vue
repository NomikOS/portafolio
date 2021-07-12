<script>
export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }]
  }
}
</script>

<template>
  <div>
    <Transition appear>
      <FontAwesomeIcon icon="sync" spin size="lg" />
    </Transition>
  </div>
</template>
