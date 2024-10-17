<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<template>
  <label v-if="label">{{ label }}</label>
  <select
    :value="modelValue"
    class="field"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option
      v-for="option in options"
      :value="option"
      :key="option"
      :selected="option === modelValue"
    >
      {{ option }}
    </option>
  </select>

  <p v-if="error" class="errorMessage">
    {{ error }}
  </p>
</template>

<style scoped>
label {
  font-size: 20px;
  margin: 10px 0;
}
select {
  padding: 4px;
}

.errorMessage {
  color: red;
  margin: 5px 0;
}
</style>
