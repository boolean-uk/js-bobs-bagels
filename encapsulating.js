

class SecretDairy {

    lock(){
        //takes in ID, if ID !== password, unlock === false
        //lock() after addEntry() returns
    }

    unlock(){
        //asks user for an ID, if ID === password, unlock === true
    }

    addEntry(){
        //declare entries{} wiht properties - date, string, entry number
        //if unlock !== true, addEntry returns false
        //if unlock === true, addEntry returns properties to entries{}
    }


    getEntries(){
        //if unlock === true
        //filter entries{} for spefic entry number
        //return entry is exists, return false if does not exist
    }
}