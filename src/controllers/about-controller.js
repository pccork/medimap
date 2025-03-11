export const aboutController = {
    index: {
        handler: async function (request, h) {
          const viewData = {
            title: "Medimap Dashboard",
          };
          return h.view("about-view", viewData);
        },
      },
  };
   