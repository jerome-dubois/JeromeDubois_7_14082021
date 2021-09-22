<template>

  <div>

    <button v-b-toggle.collapse-1>   
       ...     
    </button>

    <b-collapse id="collapse-1">
        
      <b-card> 

        <p>
          
          <b-button           
            v-b-modal="`modal-${postModalId}`"
          >
            <span>Modifier le post</span>
          </b-button>
          
        </p>

        <p class="card-text">

          <b-button>   
            <span>Supprimer le post</span>
          </b-button>

        </p>

      </b-card>

    </b-collapse>

  </div>
</template>

<script>

export default {
  name: 'ModifyPostButton',
  props: [
    'post',
    'postModalId'
  ],
  data () {
    return {
      isModificationsWindowVisible: false
    }
  },
  methods: {
       
        // deletePostTrigger () {
        //   this.$emit('deletePostTrigger')
        // }    
  },
//   mounted () {
//       console.log(postModalId);
//   }
}
</script>