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
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    clearError() {
      this.$emit('update:error', '')
    }
  }
}
</script>

<template>
  <label id="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <p v-if="error" class="errorMessage">
    {{ error }}
  </p>
</template>

<style scoped>
label {
  color: var(--secondary-dark);
  font-size: 24px;
  margin: 10px 0;
}
input {
  height: 40px;
  padding: 10px;
  font-size: 20px;
}
.errorMessage {
  color: red;
  margin: 5px 0;
}
</style>
