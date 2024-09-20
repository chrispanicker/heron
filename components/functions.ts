export const openFilters = (e:number) =>{
    let hed = document.querySelector("header")
    let plus = document.querySelector("header span button")
    let filters = document.querySelector("header section")
    if(filters?.classList.contains("h-0")){
        hed?.classList.replace("max-h-[2em]","lg:max-h-[6rem]")
        hed?.classList.add("max-h-[100dvh]")
        filters.classList.replace("h-0","h-[4rem]")
        filters.classList.add("py-2")
        filters?.classList.replace("overflow-hidden", "overflow-x-hidden")
        plus?.classList.add("rotate-[45deg]")
    }else if(filters?.classList.contains("h-[4rem]") && e===1){
        hed?.classList.replace("lg:max-h-[6rem]","max-h-[2em]")
        hed?.classList.remove("max-h-[100dvh]")
        filters?.classList.replace("h-[4rem]","h-0")
        filters?.classList.replace("overflow-x-hidden","overflow-hidden")
        hed?.classList.replace("overflow-x-hidden","overflow-hidden")
        filters?.classList.remove("py-2")
        plus?.classList.remove("rotate-[45deg]")
    }
}