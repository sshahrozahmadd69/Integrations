const axios = require("axios");


exports.sendBugTrello = async (content) => {
    const { apiKey, apiToken, boardId, listId, name, desc} = JSON.parse(content);
    console.log(apiKey, apiToken, boardId, listId, name, desc);
     
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
          desc: formattedDescriptionString,
          idList: listId,
          idBoard: boardId
        }
      );
      console.log("Bug Succesfully Send to Trello");
    } catch (error) {
      console.log((error));
     }
  };