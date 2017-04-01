<script>
    export default {
        name: "metadata",
        props: ["item",  "classname", "tag"],
        render: function(h){
            // debugger;
            //render函数不能用箭头来做，this值会不对.
            var context = this;
            return h(
                context.tag,
                [
                    h(
                        "span",
                        {
                            class: {
                                "meta-data-key": true
                            },
                            domProps: {
                                innerHTML : context.item.name + "："
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
                                innerHTML : context.item.value
                            }
                        }                       
                    )
                ]
            )
        }
    }
</script>