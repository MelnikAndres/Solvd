import CustomHashTable from "./CustomHashTable.mjs";

function testInsert() {
    let hashTable = new CustomHashTable();
    const insterList = [
        "a",
        "ab",
        "cb",
        "dcb",
        "edcb",
        "fedcb",
        "gfedcb",
        "hgfedcb",
        "ihgfedcb",
        "jihgfedcb",
        "kjihgfedcb",
        "lkjihgfedcb",
        "mlkjihgfedcb",
        "nmlkjihgfedcb",
        "onmlkjihgfedcb",
        "ponmlkjihgfedcb",
        "qponmlkjihgfedcb",
        "!%$32{+}"

    ]
    for(let i = 0; i < insterList.length; i++){
        hashTable.insert(insterList[i], i);
    }
    for(let i = 0; i < insterList.length; i++){
        if(!hashTable.has(insterList[i])){
            throw new Error(`Insertion failed
            Expected: key->${insterList[i]} doesn't exist`);
        }
    }
    let throwsError = false;
    try{
        hashTable.insert("");
    }catch(e){
        throwsError = true;
    }
    if(!throwsError){
        throw new Error(`Insert failed, expected error on insert empty string key`);
    }

}

function testInsertDuplicate() {
    const hashTable = new CustomHashTable();
    hashTable.insert("a", 1);
    hashTable.insert("a", 2);
    if(hashTable.length !== 1){
        throw new Error(`Insertion failed
        Expected: hashTable.length to be 1 after inserting duplicate`);
    }
    if(hashTable.get("a") !== 2){
        throw new Error(`Insert duplicate failed
        Expected: key->a value->2`);
    }
}

function testInsertMany() {
    let hashTable = new CustomHashTable();
    for(let i = 0; i < 10000; i++){
        hashTable.insert(i.toString(), i);
    }
    for(let i = 0; i < 10000; i++){
        if(!hashTable.has(i.toString())){
            throw new Error(`Insert failed on inserting many
            Expected: key->${i} to exist`);
        }
        if(hashTable.get(i.toString()) !== i){
            throw new Error(`Insert failed on inserting many
            Expected: key->${i} value->${i}`);
        }
    }
}

function testGet() {
    let hashTable = new CustomHashTable();
    const insterList = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
    ]
    for(let i = 0; i < insterList.length; i++){
        hashTable.insert(insterList[i], i);
    }
    for(let i = 0; i < insterList.length; i++){
        if(hashTable.get(insterList[i]) !== i){
            throw new Error(`Get failed
            Expected: key->${insterList[i]} value->${i}
            Actual: key->${insterList[i]} value->${hashTable.get(insterList[i])}`);
        }
    }
    let throwsError = false;
    try{
        hashTable.get("z");
    }catch(e){
        throwsError = true;
    }
    if(!throwsError){
        throw new Error(`Get failed, expected error on get: key->z`);
    }
    hashTable.delete("a");
    throwsError = false;
    try{
        hashTable.get("a");
    }catch(e){
        throwsError = true;
    }
    if(!throwsError){
        throw new Error(`Get failed, expected error on get: key->a, after deleting a`);
    }
}

function testDelete() {
    let hashTable = new CustomHashTable();
    const insterList = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h"
    ]
    for(let i = 0; i < insterList.length; i++){
        hashTable.insert(insterList[i], i);
    }
    for(let i = 0; i < insterList.length; i++){
        if(!hashTable.delete(insterList[i])){
            throw new Error(`Delete failed
            Expected: key->${insterList[i]} to be deleted and return true`);
        }
        if(hashTable.has(insterList[i])){
            throw new Error(`Delete failed
            Expected: key->${insterList[i]} to be deleted and return false`);
        }
    }

    if(hashTable.length !== 0){
        throw new Error(`Delete failed
        Expected: hashTable.length to be 0 after deleting all elements`);
    }
    if(hashTable.delete("z")){
        throw new Error(`Delete failed
        Expected: key->z to not exist and return false`);
    }
}

function testAll() {
    testInsert();
    testInsertDuplicate();
    testInsertMany();
    testGet();
    testDelete();
}

testAll();