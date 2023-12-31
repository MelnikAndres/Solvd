const createHeader = () => {
    const header = document.createElement("tr")
    const headerLength = document.createElement("th")
    headerLength.innerHTML = "Length"
    header.appendChild(headerLength)
    const headerBubble = document.createElement("th")
    headerBubble.innerHTML = "Bubble"
    header.appendChild(headerBubble)
    const headerMerge = document.createElement("th")
    headerMerge.innerHTML = "Merge"
    header.appendChild(headerMerge)
    const headerQuick = document.createElement("th")
    headerQuick.innerHTML = "Quick"
    header.appendChild(headerQuick)
    const headerQuickIP = document.createElement("th")
    headerQuickIP.innerHTML = "I-P Quick"
    header.appendChild(headerQuickIP)
    return header
}
const defineStyle = (element, bubbleValue,value,count,countOnRed) => {
    if(bubbleValue*2<value){
        element.style.color = "red"
        const arrow = document.createElement("span")
        arrow.classList.add("arrow-red")
        element.appendChild(arrow)
        if(countOnRed){
            return count+1
        }
    }else if(bubbleValue<value){
        element.style.color = "goldenrod"
        const arrow = document.createElement("span")
        arrow.classList.add("arrow-yellow")
        element.appendChild(arrow)
    }else{
        element.style.color = "green"
        const arrow = document.createElement("span")
        arrow.classList.add("arrow-green")
        element.appendChild(arrow)
        if(!countOnRed){
            return count+1
        }
        
    }
    return 0
}

const drawTable = (data,tableId,countOnRed=false) => {
    const table = document.getElementById(tableId)
    table.appendChild(createHeader())
    let i = 0
    const lazyLoad = () =>{
        if(i< data.mergeSort.length){
            setTimeout(() => {
                let count = 0
                const row = document.createElement("tr")
                const length = document.createElement("td")
                length.innerHTML = data.length[i]
                row.appendChild(length)
                const bubble = document.createElement("td")
                bubble.innerHTML = data.bubbleSort[i].toFixed(6)
                row.appendChild(bubble)
                const merge = document.createElement("td")
                merge.innerHTML = data.mergeSort[i].toFixed(6)
                count = defineStyle(merge,data.bubbleSort[i].toFixed(6),data.mergeSort[i].toFixed(6),count,countOnRed)
                row.appendChild(merge)
                const quick = document.createElement("td")
                quick.innerHTML = data.quickSort[i].toFixed(6)
                count = defineStyle(quick,data.bubbleSort[i].toFixed(6),data.quickSort[i].toFixed(6),count,countOnRed)
                row.appendChild(quick)
                const quickIP = document.createElement("td")
                quickIP.innerHTML = data.quickSortIP[i].toFixed(6)
                count = defineStyle(quickIP,data.bubbleSort[i].toFixed(6),data.quickSortIP[i].toFixed(6),count,countOnRed)
                row.appendChild(quickIP)
                row.setAttribute("count",count)
                table.appendChild(row)
                i++
                lazyLoad()
            }, 0);
        }  
    }
    lazyLoad()

}

;(async function(){
    const orderedData = await fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/orderedArray.json").then(response => response.json()).then(data => {
        return data  
    })
    const reversedData = await fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/backOrderedArray.json").then(response => response.json()).then(data => {
        return data
    })
    const randomData = await fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/randomArray.json").then(response => response.json()).then(data => {
        return data
    
    })
    const lengthData = await fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/criticalLength.json").then(response => response.json()).then(data => {
        return data
    })
    let i = 1;
    const lazyLoad = () =>{
        if(i<6){
            setTimeout(()=>{
                drawTable(orderedData[i],"o-data-table-"+i,true)
                drawTable(reversedData[i],"bo-data-table-"+i)
                drawTable(randomData[i],"r-data-table-"+i)
                drawTable(lengthData[i],"c-data-table-"+i)
                i++
                lazyLoad()
            },0)
        } 
    }
    lazyLoad()
})()


const showNext = (fatherId) =>{
    const father = document.getElementById(fatherId)
    const active = father.querySelector(".show-table")
    const id = active.id
    if(id.slice(-1)==="5"){
        return
    }
    if(id.slice(-1)==="4"){
        father.classList.add("no-next")
    }else{
        father.classList.remove("no-next")
    }
    father.classList.remove("no-previous")
    const next = document.getElementById(id.slice(0,-1)+(+id.slice(-1)+1))
    active.classList.remove("show-table")
    next.classList.add("show-table")
}

const showPrevious = (fatherId) =>{
    const father = document.getElementById(fatherId)
    const active = father.querySelector(".show-table")
    const id = active.id
    if(id.slice(-1)==="0"){
        return
    }
    if(id.slice(-1)==="1"){
        father.classList.add("no-previous")
    }else{
        father.classList.remove("no-previous")
    }
    father.classList.remove("no-next")
    const previous = document.getElementById(id.slice(0,-1)+(+id.slice(-1)-1))
    active.classList.remove("show-table")
    previous.classList.add("show-table")
}