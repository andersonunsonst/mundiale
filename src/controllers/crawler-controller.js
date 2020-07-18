const axios = require('axios')
const Log = require('../services/log-service')
const cheerioHelper = require('../Helpers/cheerio-helper');
const fileHelper = require('../Helpers/file-helper');

class CrawlerController {

    search(req, res) {

        let {search, limit} = req.body;

        if(!search || search == "" || search == null){
            res.json({
                code: "500",
                message: "O campo search é obrigatório!"
            });        
        }

        if(!limit || limit == "" || limit == null){
            res.json({
                code: "500",
                message: "O campo limit é obrigatório!"
            });        
        }

        if(!Number.isInteger(limit)){
            res.json({
                code: "500",
                message: "O campo limit deve ser um número!"
            });
        }

        if(limit > 50){
            res.json({
                code: "500",
                message: "O campo limit tem tamanho máximo de 50!"
            });
        }

        const url = `https://lista.mercadolivre.com.br/${search}#D[A:${search}]`;


        requestBody(req, res, url, callbackPrimaryBody, null,limit);

    }

}

    async function requestBody(req, res, url = null, _callback, adId = null, limit = null){

      try{
        const {data} = await axios.get(url)
        
      
        _callback(req, res, data, adId, limit);
        
        
      }catch(error){
        Log.err(`errors | ${error}`)
      }

    }

    errCallback = (message, err) => {
        res.json({
            message: message,
            erro: err
        });
    }

    finalCallback = (req, res) => {
        let firstFileUrl = './json/tempPrincipal.json.txt';
        let secondFileUrl = './json/tempStores.json.txt';
        let finalObject = fileHelper.mergeFiles(firstFileUrl, secondFileUrl);

    }
    
    callbackAdsBody = (req, res, body, adId, limit) => {
        
        var arrUrlDataStore = cheerioHelper.createArrayUrlDataStore(body);   
       
        arrUrlDataStore.forEach(e => {
            requestBody(req, res, e.linkStore, callbackStoresBody, adId, limit);                
        });
    }

    callbackStoresBody = (req, res, body, adId, limit) => {
        var arrLocationStore = cheerioHelper.createArrayLocationStore(body, adId);   
        let url = './json/tempStores.json.txt';
        let fileErrMessage = "Ocorreu um erro ao adicionar dados ao arquivo temporário!";
        fileHelper.appendFile(url, JSON.stringify(arrLocationStore, null, 4), errCallback, fileErrMessage);
        if(limit){
            let amountItems = fileHelper.countItemsFile(url, limit);
            if(amountItems == limit){
                let firstFileUrl = './json/tempPrincipal.json.txt';
                let finalObject = fileHelper.mergeFiles(firstFileUrl, url);
                res.json(finalObject)
            }        
        }

     
    }     

    callbackPrimaryBody = (req, res, body, adId, limit) => {
      
        let arrAdsInitial = cheerioHelper.createAdsInitialArray(body, limit);
         
        arrAdsInitial.forEach(e => {

            requestBody(req, res, e.link, callbackAdsBody, e.id, limit)
        });    

        let urlPrincipal = './json/tempPrincipal.json.txt';
        let urlStores = './json/tempStores.json.txt';
        let fileErrMessage = "Ocorreu um erro ao criar o arquivo temporário!!";            
        
        fileHelper.createFile(urlPrincipal, JSON.stringify(arrAdsInitial, null, 4), errCallback, fileErrMessage);
        fileHelper.createFile(urlStores, '', errCallback, fileErrMessage);

    }
    


module.exports = new CrawlerController();