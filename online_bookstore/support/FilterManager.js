class FilterManager{
    //Manages the filtering of a list of elements using Filters
    #originalList;
    #filteredList;
    #filters;
    #listeners;
    constructor(originalList){
        this.#originalList = originalList;
        this.#filteredList = Array.from(originalList);
        this.#filters = new Map();
        this.#listeners = new Set();
    }
    get filteredList(){
        return this.#filteredList;
    }
    addFilter(filter){
        this.#filters.set(filter.filterProperty, filter);
        this.applyFilters();
    }
    removeFilter(filterProperty){
        this.#filters.delete(filterProperty);
        this.applyFilters();
    }
    applyFilters(){
        this.#filteredList = this.#originalList.filter(this.isIncluded,this);
        this.notifyListeners();
    }
    isIncluded(element){
        //Returns true if the element should be included in the filtered list
        for(let filter of this.#filters.values()){
            if(!filter.isAllowed(element)){
                return false;
            }
        }
        return true;
    }
    addListener(listenerFn){
        //Adds a listener function to the filter manager
        this.#listeners.add(listenerFn);
    }
    notifyListeners(){
        //Executes all the listeners functions placed on the filter manager
        for(let listenerFn of this.#listeners){
            listenerFn();
        }
    }
}
export default FilterManager;