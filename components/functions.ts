export const openFilters = (e:number) =>{
    let hed = document.querySelector("header")
    let plus = document.querySelector("header span .filters")
    let filters = document.querySelector("header section")

    if(filters?.classList.contains("h-0")){
        hed?.classList.replace("max-h-[1.8rem]","lg:max-h-[7rem]")
        hed?.classList.add("max-h-[100vh]", "overflow-x-hidden")
        hed?.classList.replace("overflow-hidden","overflow-y-scroll")
        filters.classList.replace("h-0","h-[5rem]")
        filters?.classList.replace("overflow-hidden", "overflow-x-hidden")
        plus?.classList.add("rotate-[45deg]")
    }else if(filters?.classList.contains("h-[5rem]") && e===1){
        hed?.classList.replace("lg:max-h-[7rem]","max-h-[1.8rem]")
        hed?.classList.remove("max-h-[100vh]", "overflow-x-hidden")
        hed?.classList.replace("overflow-y-scroll","overflow-hidden")
        filters?.classList.replace("h-[5rem]","h-0")
        filters?.classList.replace("overflow-x-hidden","overflow-hidden")
        hed?.classList.replace("overflow-x-hidden","overflow-hidden")
        plus?.classList.remove("rotate-[45deg]")
    }
    
}

