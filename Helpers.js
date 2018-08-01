const axios = require('axios');

const Helpers = {

    search : (searchedText , callback )=>{
        if(! searchedText) return {};
        //request using axios
        const options = {
            method: 'GET',
            headers: { 'Authorization' : config.APP_ID },
    
            responseType: 'json', // default
            baseURL : config.BASE_URL ,
            url : `search/photos?page=1&query=${searchedText}`,
            transformResponse: [function (data) {
                callback( data );
            }],
                
        };
        
        axios(options);
    },
  
  
  
}

const config ={
    APP_ID : 'Client-ID 3135ae63c7cdac515fd6486582ed3b935b2390486494a49ecd9d8aecdd8b2ae0' ,
    BASE_URL : 'https://api.unsplash.com/',
}



module.exports = Helpers;