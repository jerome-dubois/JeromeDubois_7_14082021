<template>
  <div>
    <b-form-group
      label-for="post-content"
    >
      <div>        
        <b-form-textarea
          id="post-content"     
          :value="value"
          @input="updateValue"
          aria-label="Écrire une publication"
        ></b-form-textarea>

        <!-- <b-form-input
          id="input-post"
          v-model ="Post.content"
          type="text"
          placeholder="Rédigez votre publication ici"
        >
        </b-form-input> -->

      </div>

      <div>
        <img v-if="url" :src="url" alt="" />
      </div>

    </b-form-group> 
        
    <b-form-group
          label-for="post-file"    
    >
      <div>
        <button          
          @click="triggerInput"
          type="button"
          aria-label="Choisir un fichier"
          class="btn-post"
        >
          <span>Choisir un fichier</span>
          
        </button>

        <button
          v-if="isCreating"
          type="submit"
          aria-label="Publier un post"
          class="btn-post"
        >
          <span>Publier un post</span>
          
        </button>
        
        <input
          id="post-file"
          ref="fileInput"
          class="d-none"
          type="file"
          name="image"
          @change="onFileSelected"          
        />

      </div>
    </b-form-group>
  </div>
</template>

<script>

export default {
  name: 'PostForm',
  components: {},
  props: ['value', 'imgUrl', 'onFormSubmit', 'isCreating','inputFile'],
  data () {
    return {
      // userData: JSON.parse(localStorage.getItem('userData')),
      url: this.imgUrl
    }
  },
  watch: {
    onFormSubmit () {
      this.url = null
    }
  },
  methods: {
    onFileSelected (event) {
      this.url = URL.createObjectURL(event.target.files[0])
      this.$emit('onFileSelected', event.target.files[0])
    },
    updateValue (value) {
      this.$emit('input', value)
    },
    triggerInput () {
      this.$refs.fileInput.click()
    }
  },
  computed: {
    emptyField () {
      return !this.value.trim().length && !this.url
    }
  }
}
</script>

<style>
  
  .btn-post {
    color: #fd2d01;
    background:#ffffff;
    border-radius:8px;
    font-weight: bold!important;
    font-size: 15px;
    border: none;
    width: 40%;
    padding: 16px;
    margin: 3px;
  }
  
</style>