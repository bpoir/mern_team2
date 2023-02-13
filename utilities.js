const die = (exitStatus) => {
    process.exit(exitStatus)
}

// This is not necessary for the capstone starter code. 
// It is included to demonstrate one type of unit test. 
const average = (arr) => {
    let result = arr.reduce(function (avg, value, _, { length }) {
        return avg + value / length;
    }, 0)
    return result
}    

module.exports = { die, average }
