const axios = require("axios");
const amqp = require("amqplib");
const accessToken = "1/1205351360052859:aee8079fa9dd08d0c3af747177563935";
const projectId = "1205363916787728"
const sectionId = "1205364109716404"



exports.bugsAsanapubsub = async function bugsAsana(content) {
    console.log("accessToken", typeof accessToken);
    console.log("accessToken", accessToken);
  
    // Assuming 'content' holds the data needed to create the task
  
    const { name, desc } = JSON.parse(content);
    console.log("PubSubAsaana",name, desc);
    const formattedDescription = desc.map(item => {
        return Object.entries(item)
          .map(([key, value]) => `${key}:  ${value}`)
            .join('\n');
      });
      // Combine the formatted description strings into a single string
      const formattedDescriptionString = formattedDescription.join('\n\n');
      console.log(formattedDescriptionString);

    try {
        const bugData = {
            data: {
                name: name,
                notes: formattedDescriptionString,
                projects: [projectId],
                memberships: [
                    {
                        project: projectId,
                        section: sectionId,
                    },
                ],
            },
        };
        const response = await axios.post(
            "https://app.asana.com/api/1.0/tasks",
            bugData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Bug posted successfully on Asaana!");
        // console.log("Bug ID:", response.data.data.gid);
    } catch (error) {
        console.error("Error sending bug to Asana:", error);
    }
  }
  

 
  
  // Call the consumer function to start consuming messages from RabbitMQ
//   connect(); // Start consuming messages when the module is imported
  
  
  
  
  
  
  
  
  