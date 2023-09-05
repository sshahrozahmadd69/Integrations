const axios = require("axios");
const amqp = require("amqplib");
const accessToken = "1/1205351360052859:aee8079fa9dd08d0c3af747177563935";

const apiKey = "66b828a0fe395b6e88cacf0c4c21d4bf"
const apiToken= "ATTAd2761919d67b92e0f96e3ae80a4c0a8dde797ae89befda598be681893d6529de08233D23"
const boardId= "602d36e37588527f3d87a691"
const listId= "602d36e80791a8617b8c0e51"



// exports.sendBugTrello = async (content) => {
//      const {  name, desc } = JSON.parse(content);
//     console.log(apiKey, apiToken, boardId, listId, name, desc);

//     // const formattedDescription = desc.map(item => {
//     //     return Object.entries(item)
//     //         .map(([key, value]) => `${key}:  ${value}`)
//     //         .join('\n');
//     // });
//     // // Combine the formatted description strings into a single string
//     // const formattedDescriptionString = formattedDescription.join('\n\n');
//     // console.log(formattedDescriptionString);

//     try {
//         const response = await axios.post(
//             `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
//             {
//                 name: name,
//                 desc: desc,
//                 idList: listId,
//                 idBoard: boardId
//             }
//         );
//         console.log("Bug Successfully Sent to Trello");
//     } catch (error) {
//         console.error("Error sending bug to Trello:", error);
//     }
// };


exports.sendBugTrello = async (content) => {
    const { name, desc } = JSON.parse(content);

    const formattedDescription = desc.map(item => {
        return Object.entries(item)
            .map(([key, value]) => `${key}:  ${value}`)
            .join('\n');
    });

    // Combine the formatted description strings into a single string
    const formattedDescriptionString = formattedDescription.join('\n\n');
    console.log(formattedDescriptionString); 
    try {
        const response = await axios.post(
            `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
            {
                name: name,
                desc: formattedDescriptionString, // Use the formatted description string
                idList: listId,
                idBoard: boardId
            }
        );
        if (response.status === 200) {
            console.log("Bug Successfully Sent to Trello");
        } else {
            console.error("Error sending bug to Trello: Unexpected response status", response.status);
        }
    } catch (error) {
        if (error.response) {
            console.error("Error sending bug to Trello:", error.response.data);
        } else {
            console.error("Error sending bug to Trello:", error.message);
        }
    }
};


  
exports.sendBugTrello = async (content) => {
    const { name, desc } = JSON.parse(content);

    const formattedDescription = desc.map(item => {
        return Object.entries(item)
            .map(([key, value]) => `${key}:  ${value}`)
            .join('\n');
    });

    // Combine the formatted description strings into a single string
    const formattedDescriptionString = formattedDescription.join('\n\n');
    console.log(formattedDescriptionString); 
    try {
        const response = await axios.post(
            `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
            {
                name: name,
                desc: formattedDescriptionString, // Use the formatted description string
                idList: listId,
                idBoard: boardId
            }
        );
        if (response.status === 200) {
            console.log("Bug posted successfully on Trello!");
        } else {
            console.error("Error sending bug to Trello: Unexpected response status", response.status);
        }
    } catch (error) {
        if (error.response) {
            console.error("Error sending bug to Trello:", error.response.data);
        } else {
            console.error("Error sending bug to Trello:", error.message);
        }
    }
};

  
  
  
  
  
  
  