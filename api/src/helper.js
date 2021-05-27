function isEmpty(arg){
    return (
      arg == null || // Check for null or undefined
      arg.length === 0 || // Check for empty String (Bonus check for empty Array)
      (typeof arg === 'object' && Object.keys(arg).length === 0) // Check for empty Object or Array
    );
  }

function handleErrors(err){
  if(err.response) {
    if(err.response.status == 400) { // złe dane
        throw({ message: err.response.data, status: err.response.status })
    }
  } 
  else throw({ message: "", status: 500 });
}

module.exports = {
    isEmpty, 
    handleErrors
}