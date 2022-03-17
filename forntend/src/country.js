var countryList = [];
var languageList = [];
var currencyList = [];
var flagURLList = {};

const fetchCountryData = async () => {
    // async function returns a promise
  
    // Calling API using fetch() function
    // Using await makes the callCovidAPI function wait for the promise
    var requestURL = "https://restcountries.com/v3.1/all";
    const response = await fetch(requestURL, {
      method: "GET",
    //   headers: {
    //     "x-rapidapi-host": "covid-193.p.rapidapi.com",
    //     "x-rapidapi-key": "1fb6f374f2msh806ba5cd2162307p1929a3jsn8ec55589893b",
    //   },
    });
    const myJson = await response.json();
    myJson.map((c) => {
        if((c["name"]["common"]) && !(countryList.includes(c["name"]["common"]))){
            countryList.push(c["name"]["common"]);
            flagURLList[c["name"]["common"]] = c["flags"]["svg"];
        }
        if((c["languages"])){
            for (var key in c["languages"]) {
                if(!(languageList.includes(c["languages"][key]))){
                    languageList.push(c["languages"][key]);
                }
            }
              
        }
        
        if((c["currencies"])){
            for (var key2 in c["currencies"]) {
                var s = c["currencies"][key2]["symbol"] + " " + key2;
                if(!(currencyList.includes(s))){
                    currencyList.push(s);
                }
            }
            // return 0;
        }
      });
    return myJson; //return response array
};

fetchCountryData().then(c => {
    //console.log(currencyList);
})


export { countryList, languageList, currencyList, flagURLList };