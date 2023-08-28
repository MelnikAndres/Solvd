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
            element.setAttribute("count",count+1)
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
            element.setAttribute("count",count+1)
            return count+1
        }
        
    }
    return 0
}

const drawTable = (data,tableId,countOnRed=false) => {
    const table = document.getElementById(tableId)
    table.appendChild(createHeader())
    for(let i = 0; i< data.mergeSort.length; i++){
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
        table.appendChild(row)
    }
}

fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/orderedArray.json").then(response => response.json()).then(data => {
    for(let i = 0; i<6; i++){
        drawTable(data[i],"o-data-table-"+i,true)
    }
})
fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/backOrderedArray.json").then(response => response.json()).then(data => {
    for(let i = 0; i<6; i++){
        drawTable(data[i],"bo-data-table-"+i)
    }
})
fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/randomArray.json").then(response => response.json()).then(data => {
    for(let i = 0; i<6; i++){
        drawTable(data[i],"r-data-table-"+i)
    }
})
fetch("https://melnikandres.github.io/Solvd/sorting_algorithms/criticalLength.json").then(response => response.json()).then(data => {
    for(let i = 0; i<6; i++){
        drawTable(data[i],"c-data-table-"+i)
    }
})
const showNext = (fatherId) =>{
    const father = document.getElementById(fatherId)
    console.log(father)
    const active = father.querySelector(".show-table")
    const id = active.id
    if(id.slice(-1)==="5"){
        return
    }
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
    const previous = document.getElementById(id.slice(0,-1)+(+id.slice(-1)-1))
    active.classList.remove("show-table")
    previous.classList.add("show-table")
}