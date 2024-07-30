module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
        await strapi.plugins["email"].services.email.send({
            to:'devendradhakad745@gmail.com',
            from:"devendradhakad745@gmail.com",
            subject:"xyz",
            text:"fergerger"

        })
    } catch (error) {
        console.log(error)
    }
  },
}; 
