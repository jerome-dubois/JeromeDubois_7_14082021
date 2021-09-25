<template>
  <div>
    <b-form-group>
      <div>        
        <b-form-textarea        
          :value="value"
          @input="updateValue"
        ></b-form-textarea>

      </div>

      <!-- <div>
        <img v-if="url" :src="url" alt="" />
      </div> -->

    </b-form-group> 
        
    <b-form-group>
      <div>
        <!-- <button          
          @click="triggerInput"
          type="button"
        >
          <span>Choisir un fichier</span>
          
        </button> -->

        <!-- <button
          
          :disabled="emptyField"
          type="submit"
        >
          <span>Publier un post</span>
          
        </button> -->
        
        <!-- <input
          ref="fileInput"
          class="d-none"
          type="file"
          @change="fileSelected"
        /> -->

      </div>
    </b-form-group>
  </div>
</template>

<script>

export default {
  name: 'PostForm',
  components: {},
  props: ['value', 'url', 'onFormSubmit', 'isCreating'],
  watch: {
    onFormSubmit () {
      this.url = null
    }
  },
  methods: {
    // fileSelected (event) {
    //   this.url = URL.createObjectURL(event.target.files[0])
    //   this.$emit('fileSelected', event.target.files[0])
    // },
    updateValue (value) {
      this.$emit('input', value)
    },
    // triggerInput () {
    //   this.$refs.fileInput.click()
    // }
  },
  computed: {
    // emptyField () {
    //   return !this.value.trim().length && !this.url
    // }
  }
}
</script>