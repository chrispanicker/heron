export const openFilters = (e:number) =>{
    let hed = document.querySelector("header")
    let plus = document.querySelector("header span .filters")
    let filters = document.querySelector("header section")
    let foot = document.querySelector("footer")

    if(filters?.classList.contains("h-0")){
        hed?.classList.replace("max-h-[2rem]","lg:max-h-[7rem]")
        hed?.classList.add("max-h-[100vh]", "overflow-x-hidden")
        hed?.classList.replace("overflow-hidden","overflow-y-scroll")
        filters.classList.replace("h-0","h-[5rem]")
        filters?.classList.replace("overflow-hidden", "overflow-x-hidden")
        plus?.classList.add("rotate-[45deg]")
        foot?.classList.add("min-h-screen")
    }else if(filters?.classList.contains("h-[5rem]") && e===1){
        hed?.classList.replace("lg:max-h-[7rem]","max-h-[2rem]")
        hed?.classList.remove("max-h-[100vh]", "overflow-x-hidden")
        hed?.classList.replace("overflow-y-scroll","overflow-hidden")
        filters?.classList.replace("h-[5rem]","h-0")
        filters?.classList.replace("overflow-x-hidden","overflow-hidden")
        hed?.classList.replace("overflow-x-hidden","overflow-hidden")
        plus?.classList.remove("rotate-[45deg]")
        foot?.classList.remove("min-h-screen")
    }
    
}

