const schema = {
    jobdescription: {
        presence: { allowEmpty: false },
    },
    jobTitle: {
        presence: { allowEmpty: false },
    },
    keywords: {
        presence: { allowEmpty: false },
    },
     location: {
        presence: { allowEmpty: false },
    },
   /* city: {
        presence: { allowEmpty: false },
    } */



};
console.log(`Enter into Schema`)
export default schema;
