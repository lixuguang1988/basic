<template>
    <li>
        <div class="item-hd">
            <router-link class="item-hd-title" :to="'/item/' + item.id">{{item.title}}</router-link>
            <router-link :to="'/author/' + item.authorId">{{item.author}}</router-link>
        </div>
        <div class="item-bd">{{item.content}}</div>
    </li>
</template>

<script>
    export default {
        name: "item",
        props: ["item"]
    }
</script>