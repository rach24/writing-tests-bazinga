var mongoose=require('mongoose');
var schema=mongoose.Schema;



var post= schema({ 
    user_post : {type:String,max:10000,required:true},
    email: {type:String,required:true},
    hide:{type:String}
});

/**from http://mongoosejs.com/docs/guide.html
 * Virtuals are document properties that you can get and set but that do not get persisted to MongoDB. 
 * The getters are useful for formatting or combining fields, while setters are useful for de-composing a single value into multiple values for storage.
 * Here we use virtual because we do not really need to save the url in our database.
 */
post.virtual('url').get(function(){return '/viewposts/detail/'+this._id})

var Post=mongoose.model('Post',post);
module.exports = Post;