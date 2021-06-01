function getVote(id) {
    if(token !== null) {
        var url = document.location.protocol + "//" + document.location.hostname + ":4000";
        var api = url + `/images/${id}/votes`;
        var options = { headers: { "Authorization": "Bearer " + token } };

        var votingButtonT = document.getElementById("voteBtnT-" + id);
        var votingButtonF = document.getElementById("voteBtnF-" + id);

        axios.get(api, options).then(res => {
            let value = res.json().found;
            if(value){
                votingButtonT.style.display = "inline";
                votingButtonF.style.display = "none"; 
            }
            else{
                votingButtonT.style.display = "none";
                votingButtonF.style.display = "inline"; 
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

function vote(id, mode){
    if(token !== null) {
        var url = document.location.protocol + "//" + document.location.hostname + ":4000";
        var api = url + `/images/${id}/votes`;
        var options = { headers: { "Authorization": "Bearer " + token } };

        var votingButtonT = document.getElementById("voteBtnT-" + id);
        var votingButtonF = document.getElementById("voteBtnF-" + id);
        var voteCount = document.getElementById("votes-" + id);
        
        if(mode) {
            axios.delete(api, options).then(res => {
                votingButtonT.style.display = "none";
                votingButtonF.style.display = "inline"; 
                voteCount.innerHTML = parseInt(voteCount.innerHTML) - 1;
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            axios.post(api, null, options).then(res => {
                votingButtonT.style.display = "inline";
                votingButtonF.style.display = "none"; 
                voteCount.innerHTML = parseInt(voteCount.innerHTML) + 1;
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
