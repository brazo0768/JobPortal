module.exports = mongoose => {
const  PortalSchema=mongoose.model("jobs",mongoose.Schema(
        {
          title: String,
          description: String,
          keywords: String,
          location: String,
          status:String,
          city: String,

        },
        { timestamps: true }
      )
    );
     return PortalSchema;
  };