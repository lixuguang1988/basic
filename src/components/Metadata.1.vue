<script>
    export default {
        name: "metadata",
        props: ["key", "value", "classname", "tag"],
        render: (h)=>{
            return h(
                this.tag,
                [
                    h(
                        "span",
                        {
                            class: {
                                "meta-data-key": true
                            },
                            domProps: {
                                innerHTML : this.key
                            }
                        }
                    ),
                    h(
                        "span",
                         {
                            class: {
                                "meta-data-value": true
                            },
                            domProps: {
                                innerHTML : this.value
                            }
                        }                       
                    )
                ]
            )
        }
    }
</script>