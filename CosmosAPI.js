//=====to connect azure database
const { CosmosClient } = require("@azure/cosmos");
const endpoint = "https://sampledb123.documents.azure.com:443/"; // Add your endpoint
const key = "[FhHc2ssWgaENG4IJDGQKGmAG5RYHSy90Gj8U7kFvuP7M31f0WOGR4nEEQHkYBrTEEypzvhGmeQQuv6ujSeCBUw==]"; // Add the masterkey of the endpoint
const client = new CosmosClient({ endpoint, key });

var http = require('http')
var port = process.env.PORT || 1337;

const databaseid = "sample database";
const containerId = "sample collection";

var express = require('express');
var app = express();

//=====end azure database========

//app.get('/', function (req, res)
//{

//    //Promise.all([promise1, promise2, promise3]).then(function (values) {
//    //    console.log(values);
//    //});  
//    //var str = FetchData();
//    res.send(str.then(() => FetchData()));
//   //res.send(str.all([promise1, promise2, promise3]).then(function (values) { console.log(values) }));
//  });


app.get('/', async (request, response) => {
    // awaiting Promises here

    // if you just await a single promise, you could simply return with it,
    // no need to await for it
    let result = await FetchData();
    let resultString = "";
    let printresultString = [];
      
    let i = 0;

    //for (var queryResult of result) {        
      //  printresultString = result[i].content["Sheet1"];
//        i = i + 1;
  //  }

    for (i = 0; i < result.length; i++) {
        printresultString.push(result[i].content["Sheet1"]);
    }

    //for (i = 0; i <= printresultString.length; i++) {
    //    resultString += printresultString[i].A + "<br/>";
    //   //i = i + 1;
   // }
        //for (var queryResult of result) {
          //    resultString = JSON.stringify('id:' + queryResult.id + ' , content: ' + queryResult.content);    
            //  response.json(resultString);
            // console.log(`\tQuery returned ${resultString}\n`);                          
            //}       
   
    ////    //response.send(`\tQuery returned ${resultString}\n`);
    //for (let i = 0; i < result.length; i++) {
    //    printresultString.push(result[i].content["Sheet1"]);
    //}

    response.json(printresultString);   
    response.end();
})

app.listen(process.env.port);
return;

//========Get Method to get entry data
async function FetchData() {
    //const querySpec = {query: "SELECT * FROM c where c.partno = '" + partno + "' " };
    const querySpec = { query: "SELECT * FROM c " };
    try {
        let resultString = "";
        //return "hello";
        const { resources } = await client.database(databaseid).container(containerId).items.query(querySpec, { enableCrossPartitionQuery: true }).fetchAll();
        return resources;
    }
    catch (error) {
        console.log(error);
    }
}


//==========Post method to post excel data in cosmos db
async function uploaddata(groupname, companyname, userid, fileName, content) {
    try {
        let date_ob = new Date(); // current datetime
        var today = new Date();
        var strdate = today.toGMTString();
        const Exldocument = { groupname: groupname, companyname: companyname, userid: userid, fileName: fileName, GMT: strdate, content: content };
        const { resource } = await client.database(databaseid).container(containerId).items.create(Exldocument);
        let retval = "";
        if (!resource) {
            retval = "successfully saved";
        }
        else {
            retval = "could not saved..kindly try again";
        }
        return retval;
    }
    catch (error) {
        //console.log(error);            
        return error;
    }
}

//FetchData() //.catch(handleError);;
////FetchData(); 




