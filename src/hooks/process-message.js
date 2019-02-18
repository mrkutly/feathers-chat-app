// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context

    // Throw an error if we didn't get any text
    if(!data.text) {
      throw new Error('A message must have text')
    }

    // The authenticated user
    const user = context.params.user
    // The message text
    const text = data.text
      // Messages cannot be longer that 400 chars
      .substring(0, 400)

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      text,
      // Set the user id
      userId: user._id,
      // Add the current date
      createdAt: new Date().getTime()
    };

    // Hooks should always return the context
    return context;
  };
};
