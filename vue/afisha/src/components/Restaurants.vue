<template>
    <div>
      <h1>Restaurants in {{ city }}</h1>
      <p>Selected variant: {{ variant }}</p>
      <!-- Rest of your component -->
    </div>
  </template>
  
  <script>
  export default {
    props: ['city', 'variant'],
    // Rest of your component logic
  }
  </script>