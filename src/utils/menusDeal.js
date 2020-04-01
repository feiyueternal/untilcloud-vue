// import { router_list} from '../router/router_list'

import maplist from "../router/router_list";
//暂时只做到二级菜单
export function filterAsyncRouter(asyncRouters = []) {
    const res = []
    
    asyncRouters.forEach((route) => {
        var routeItem = route
        console.log(routeItem)
        route.component=maplist[route.name]
        if(route.children){
            filterAsyncRouter(route.children)
        }
        // if (routeItem.children) {
        //     for (var i = 0; i < routeItem.children.length; i++) {
        //         for (var j = 0; j < map.length; j++) {
        //             map[j].children=routeItem.children
        //             if (routeItem.children[i].name == map[j].name) {
        //                 routeItem.children[i].component = map[i].component
                        
        //                 break
        //             }
        //         }
                
        //     }
        // }
        // }else{
            // for(var k=0;k<map.length;k++){
            //     if(routeItem.name==map[k].name){
            //         routeItem.component=map[k].component
            //         map[k].id=routeItem.id
            //         map[k].iconCls=routeItem.iconCls
            //         map[k].nameZh=routeItem.nameZh
            //         // map[k].children=routeItem.children
            //         console.log(map[k])
            //         res.push(map[k])
                    
            //     }
            // }

        // }
        // res.push(routeItem)
        
    })
    this.$router.addRoutes()
// console.log("menures")
// console.log(res)
return res;
}