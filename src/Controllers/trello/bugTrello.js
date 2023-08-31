const axios = require("axios");


exports.sendBugTrello = async (content) => {
    const { apiKey, apiToken, boardId, listId, name, desc} = JSON.parse(content);
    console.log(apiKey, apiToken, boardId, listId, name, desc);
    
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${apiKey}&token=${apiToken}`,
        {
          name: name,
          desc: JSON.stringify(desc),
          idList: listId,
          idBoard: boardId
        }
      );
      console.log("Bug Succesfully Send to Trello");
    } catch (error) {
      console.log((error));
     }
  };