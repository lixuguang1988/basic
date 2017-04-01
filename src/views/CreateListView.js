import ItemList from "../components/ItemList.vue";


export default function createListView(type){
    return {
        name: type + "-list-store", 
        preFetch (store) {
            console.log("preFetch");
            return store.dispatch("FETCH_LIST_DATA", {type})
        },
        render(h){
            return h( ItemList, { props: {type} } );
        }
    }
}