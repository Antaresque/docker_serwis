const API_URI = "http://localhost:3000";

async function getData(){
    try {
        const res = await axios.get(API_URI + '/items');

        if(res.status !== 200)
            throw(res.statusText);

        return res.data;
    }
    catch(err) {
        console.error(err);
    }
}
//papiez polak gwalcil male dzieci
document.getElementById("test").addEventListener("click", async (ev) => {
    let data = await getData();
    document.getElementById("dane").innerHTML = JSON.stringify(data);
});