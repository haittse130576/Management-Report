

<script>
import packageJson from '../../package.json'
export default {
  name: 'DocsCallout',
  props: {
    content: {
      type: String,
      default: undefined,
      required: false,
    },
    href: {
      type: String,
      default: undefined,
      required: false,
    },
    name: {
      type: String,
      default: undefined,
      required: false,
    },
    plural: Boolean,
  },
  setup(props) {
    const url = `https://coreui.io/vue/docs/${packageJson.config.coreui_library_short_version}/${props.url}`

    return {
      url,
    }
  },
}
</script>
