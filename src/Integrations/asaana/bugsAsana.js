const axios = require("axios");

// const accessToken = "1/1205351360052859:aee8079fa9dd08d0c3af747177563935";

exports.bugsAsana = async function (content) {
//   console.log("accessToken", accessToken);

  const { title, projectId, sectionId, description, accessToken } = JSON.parse(content);

  const formattedDescription = description.map(item => {
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
              name: title,
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
      console.log("Bug posted successfully!");
      console.log("Bug ID:", response.data.data.gid);
  } catch (error) {
      console.error("Error sending bug to Asana:", error);
  }
}










































