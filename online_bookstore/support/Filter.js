class Filter{
    //Allows to create specific filters for an object's property
    filterProperty;
    filterValue;
    constructor(filterProperty, filterValue){
        this.filterProperty = filterProperty;
        this.filterValue = filterValue;
    }
    isAllowed(element){
        return true;
    }
    static makeEquality(filter){
        //Makes the given filter an equality filter (true if the element's property is equal to the filter's value)
        filter.isAllowed = function(element){return element[filter.filterProperty] === filter.filterValue;}
        return filter;
    }
    static makeGreaterOrEqual(filter){
        //Makes the given filter a greater or equal filter (true if the element's property is greater or equal to the filter's value)
        filter.isAllowed = function(element){return element[filter.filterProperty] >= filter.filterValue;}
        return filter;
    }
    static makeLesserOrEqual(filter){
        //Makes the given filter a lesser or equal filter (true if the element's property is lesser or equal to the filter's value)
        filter.isAllowed = function(element){return element[filter.filterProperty] <= filter.filterValue;}
        return filter;
    }
    static makeIncludes(filter){
        //Makes the given filter an includes filter (true if the element's property includes the filter's value)
        filter.isAllowed = function(element){return element[filter.filterProperty].toLowerCase().includes(filter.filterValue.toLowerCase());}
        return filter;
    }
}
export default Filter;