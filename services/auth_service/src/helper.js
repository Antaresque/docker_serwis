const bcrypt = require("bcrypt");

async function createHash(plainPassword){
    const saltRounds = 10;

    try {
        let hash = await bcrypt.hash(plainPassword, saltRounds);
        return hash;
    }
    catch(err) {
        console.error(err.message);
        return null;
    }
}
(async () => {
    ['janusz123', 'legia', 'kremowka', 'h@selk0', '2137'].forEach(
        async el => {
            let text = await createHash(el);
            console.log(el + ": " + text + '\n')
        });
})();
