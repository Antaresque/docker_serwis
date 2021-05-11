function isEmpty(arg){
    return (
      arg == null || // Check for null or undefined
      arg.length === 0 || // Check for empty String (Bonus check for empty Array)
      (typeof arg === 'object' && Object.keys(arg).length === 0) // Check for empty Object or Array
    );
  }

module.exports = {
    isEmpty
}